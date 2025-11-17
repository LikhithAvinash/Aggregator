const HackerNewsDevToSwitcher = () => {
    const [source, setSource] = React.useState('hackernews'); // 'hackernews' or 'devto'
    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);

            const FASTAPI_BASE_URL = "http://127.0.0.1:8000";
            const endpoint = source === 'hackernews'
                ? '/hackernews/topstories'
                : '/devto/articles';

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
        setSource(prevSource => prevSource === 'hackernews' ? 'devto' : 'hackernews');
    };

    const renderContent = () => {
        if (loading) return <p className="loading-state">Loading...</p>;
        if (error) return <p className="error-state">Error: {error}</p>;
        if (!items || items.length === 0) return <p>No items found.</p>;

        if (source === 'hackernews') {
            return items.map(item => (
                <div key={item.id} className="list-item">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                    <div className="list-item-meta">
                        <span><i className="fa-solid fa-arrow-up"></i> {item.score || 0}</span>
                        <span><i className="fa-solid fa-comments"></i> {item.descendants || 0}</span>
                    </div>
                </div>
            ));
        } else { // dev.to
            return items.map(item => (
                <div key={item.id} className="list-item">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                    <div className="list-item-meta">
                        <span><i className="fa-solid fa-heart"></i> {item.public_reactions_count || 0}</span>
                        <span><i className="fa-solid fa-comments"></i> {item.comments_count || 0}</span>
                    </div>
                </div>
            ));
        }
    };

    return (
        <React.Fragment>
            <div className="card-header">
                 <div className="card-title-wrapper">
                    <i className={source === 'hackernews' ? 'fa-brands fa-hacker-news' : 'fa-brands fa-dev'}></i>
                    <span>{source === 'hackernews' ? 'Hacker News' : 'DEV.to'}</span>
                </div>
                <button onClick={handleSwitch} className="switch-btn">
                    {source === 'hackernews' ? 'Switch to DEV.to' : 'Switch to Hacker News'}
                </button>
            </div>
            <div className="card-content scrollable-card-content">
                {renderContent()}
            </div>
        </React.Fragment>
    );
};

ReactDOM.render(<HackerNewsDevToSwitcher />, document.getElementById('react-hackernews-devto-root'));
