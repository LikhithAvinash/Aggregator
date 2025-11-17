const StackOverflowRedditSwitcher = () => {
    const [source, setSource] = React.useState('stackoverflow'); // 'stackoverflow' or 'reddit'
    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);

            const FASTAPI_BASE_URL = "http://127.0.0.1:8000";
            const endpoint = source === 'stackoverflow'
                ? '/stackoverflow/featured'
                : '/reddit/r/learnprogramming/search?query=react';

            try {
                const response = await fetch(`${FASTAPI_BASE_URL}${endpoint}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch. Status: ${response.status}`);
                }
                const data = await response.json();
                setItems(data);
            } catch (e) {
                setError(e.message);
                setItems([]);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [source]);

    const handleSwitch = () => {
        setSource(prevSource => prevSource === 'stackoverflow' ? 'reddit' : 'stackoverflow');
    };

    const renderContent = () => {
        if (loading) return <p className="loading-state">Loading...</p>;
        if (error) return <p className="error-state">Error: {error}</p>;
        if (!items || items.length === 0) return <p>No items found.</p>;

        if (source === 'stackoverflow') {
            return items.map(item => (
                <div key={item.link} className="list-item">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                    <div className="list-item-meta">
                        <span><i className="fa-solid fa-trophy"></i> Bounty: {item.bounty_amount || 0}</span>
                        <span><i className="fa-solid fa-comments"></i> Answers: {item.answer_count || 0}</span>
                    </div>
                </div>
            ));
        } else {
            return items.map(item => (
                <div key={item.id} className="list-item">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                    <div className="list-item-meta">
                        <span><i className="fa-solid fa-arrow-up"></i> {item.score || 0}</span>
                        <span><strong>u/</strong>{item.author || 'N/A'}</span>
                    </div>
                </div>
            ));
        }
    };

    return (
        <React.Fragment>
            <div className="card-header">
                 <div className="card-title-wrapper">
                    <i className={source === 'stackoverflow' ? 'fa-brands fa-stack-overflow' : 'fa-brands fa-reddit-alien'}></i>
                    <span>{source === 'stackoverflow' ? 'Stack Overflow' : 'Reddit /r/learnprogramming'}</span>
                </div>
                <button onClick={handleSwitch} className="switch-btn">
                    {source === 'stackoverflow' ? 'Switch to Reddit' : 'Switch to StackOverflow'}
                </button>
            </div>
            <div className="card-content scrollable-card-content">
                {renderContent()}
            </div>
        </React.Fragment>
    );
};

ReactDOM.render(<StackOverflowRedditSwitcher />, document.getElementById('react-stackoverflow-reddit-root'));
