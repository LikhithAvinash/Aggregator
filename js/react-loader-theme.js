const ThemeToggleButton = () => {
    const [theme, setTheme] = React.useState('dark'); // Default to dark

    React.useEffect(() => {
        let savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            savedTheme = 'dark';
            localStorage.setItem('theme', 'dark');
        }
        setTheme(savedTheme);
        document.body.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'black' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
    };

    return (
        <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'dark' ? <i className="fas fa-star"></i> : <i className="fas fa-moon"></i>}
        </button>
    );
};

ReactDOM.render(<ThemeToggleButton />, document.getElementById('react-theme-toggle-root'));
