import { useState } from 'react';

import './index.css';
import Loader from '../../components/Loader';
import { signup } from '../../config';

export const SingUp = props => {

    const [hasLoading, setHasLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    signup.onStarted = () => setHasLoading(true);
    signup.onError = setError;
    signup.onFinish = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setHasLoading(false);
        props.onRedirect();
    };

    const createUser = async () => {
        await signup({ name, email, password, confirmPassword });
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <Loader hasLoading={hasLoading} />
                <header>
                    <h1>Sign Up</h1>
                </header>
                <main>
                    <div className="signup-form-content">
                        <div className="signup-form-input-boxs">
                            <div className="signup-form-input-box">
                                <i className="far fa-user"></i>
                                <input
                                    value={name}
                                    onChange={({ target: { value } }) => setName(value)}
                                    type="text" placeholder="Name..."
                                    onFocus={(e) => {
                                        const inputBox = e.target.parentNode;
                                        inputBox.setAttribute('class', 'signup-form-input-box signup-form-input-box-focus');
                                    }}
                                    onBlur={(e) => {
                                        const inputBox = e.target.parentNode;
                                        inputBox.setAttribute('class', 'signup-form-input-box');
                                    }}
                                />
                            </div>
                            <div className="signup-form-input-box">
                                <i className="far fa-envelope"></i>
                                <input
                                    value={email}
                                    onChange={({ target: { value } }) => setEmail(value)}
                                    type="text" placeholder="E-mail..."
                                    onFocus={(e) => {
                                        const inputBox = e.target.parentNode;
                                        inputBox.setAttribute('class', 'signup-form-input-box signup-form-input-box-focus');
                                    }}
                                    onBlur={(e) => {
                                        const inputBox = e.target.parentNode;
                                        inputBox.setAttribute('class', 'signup-form-input-box');
                                    }}
                                />
                            </div>
                            <div className="signup-form-input-box">
                                <i className="fas fa-lock"></i>
                                <input
                                    value={password}
                                    onChange={({ target: { value } }) => setPassword(value)}
                                    type="password"
                                    placeholder="Password..."
                                    onFocus={(e) => {
                                        const inputBox = e.target.parentNode;
                                        inputBox.setAttribute('class', 'signup-form-input-box signup-form-input-box-focus');
                                    }}
                                    onBlur={(e) => {
                                        const inputBox = e.target.parentNode;
                                        inputBox.setAttribute('class', 'signup-form-input-box');
                                    }}
                                />
                            </div>
                            <div className="signup-form-input-box">
                                <i className="fas fa-lock"></i>
                                <input
                                    value={confirmPassword}
                                    onChange={({ target: { value } }) => setConfirmPassword(value)}
                                    placeholder="Confirm Password..."
                                    type="password"
                                    onFocus={(e) => {
                                        const inputBox = e.target.parentNode;
                                        inputBox.setAttribute('class', 'signup-form-input-box signup-form-input-box-focus');
                                    }}
                                    onBlur={(e) => {
                                        const inputBox = e.target.parentNode;
                                        inputBox.setAttribute('class', 'signup-form-input-box');
                                    }}
                                />
                            </div>
                            <div className="signup-form-error">
                                <span>{error}</span>
                            </div>
                        </div>
                        <button onClick={createUser}>Sign Up</button>
                    </div>
                </main>
            </div>
        </div>
    )

}

export default SingUp;