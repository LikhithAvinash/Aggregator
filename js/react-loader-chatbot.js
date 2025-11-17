const Chatbot = () => {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: 'user', text: input }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/chatbot/invoke', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: input }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMessages([...newMessages, { sender: 'bot', text: data.response }]);
        } catch (error) {
            setMessages([...newMessages, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            <div className="card-header">
                <div className="card-title-wrapper">
                    <i className="fa-solid fa-robot"></i>
                    <span>Chatbot</span>
                </div>
            </div>
            <div className="card-content chatbot-container">
                <div className="chatbot-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chatbot-message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                    {loading && <div className="chatbot-message bot">...</div>}
                </div>
                <div className="chatbot-input-form">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Ask me anything..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </React.Fragment>
    );
};

ReactDOM.render(<Chatbot />, document.getElementById('react-chatbot-root'));
