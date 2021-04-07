import { useState, useEffect } from 'react';
import './index.css';

import { emitMessages, sendMessage } from '../../firebase';
import { validateToken } from '../../config';

export const Chat = props => {

    const [user, setUser] = useState({});
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const logout = () => {
        window.localStorage.clear();
        window.location.href = window.location.origin;
    }

    useEffect(() => {
        try {
            const user = JSON.parse(atob(window.localStorage.getItem('user-data')));
            validateToken(user.token);
            setUser(user);
        } catch {
            window.location.href = window.location.origin;
            window.localStorage.clear();
        };
        emitMessages(setMessages);
    }, []);

    return (
        <div className="chat-container">
            <div className="chat-tab">
                <div className="chat-tab-left">
                    <span>HandChat - {user.name}</span>
                </div>
                <div className="chat-tab-right">
                    <button onClick={logout}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div className="chat-messages">
                {
                    messages.map((message, i) => {
                        const date = new Date(message.createdAt).toLocaleTimeString();
                        return (
                            <div className="chat-message" key={i}>
                                <div>
                                    <span>{message.author}</span>
                                    <span>{date}</span>
                                </div>
                                <p>{message.content}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="chat-controls">
                <div className="chat-input-box">
                    <input
                        type="text"
                        value={message}
                        onChange={({ target: { value } }) => setMessage(value)}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                sendMessage(user.name, message, () => setMessage(''));
                            }
                        }}
                        onFocus={(e) => {
                            const inputBox = e.target.parentNode;
                            inputBox.setAttribute('class', 'chat-input-box chat-input-box-focus');
                        }}
                        onBlur={(e) => {
                            const inputBox = e.target.parentNode;
                            inputBox.setAttribute('class', 'chat-input-box');
                        }}
                        placeholder="Message..."
                    />
                    <button onClick={() => {
                        sendMessage(user.name, message, () => setMessage(''));
                    }}>
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Chat;