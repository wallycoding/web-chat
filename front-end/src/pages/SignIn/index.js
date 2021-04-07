import { useState } from 'react';

import './index.css';
import Loader from '../../components/Loader';
import { signin } from '../../config';

export const SingIn = props => {

    const [hasLoading, setHasLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    signin.onStarted = () => setHasLoading(true);
    signin.onError = setError;
    signin.onFinish = () => {
        setEmail('');
        setPassword('');
        setHasLoading(false);
        props.onRedirect();
    };

    const login = async () =>
        await signin({ email, password });

    return (
        <div className="signin-container">
            <div className="signin-form">
                <Loader hasLoading={hasLoading} />
                <header>
                    <h1>Sign In</h1>
                </header>
                <main>
                    <div className="signin-form-content">
                        <div className="signin-form-input-boxs">
                            <div className="signin-form-input-box">
                                <i className="far fa-envelope"></i>
                                <input
                                    value={email}
                                    onChange={({ target: { value } }) => setEmail(value)}
                                    type="text"
                                    placeholder="E-mail..."
                                    onFocus={(e) => {
                                        const inputBox = e.target.parentNode;
                                        inputBox.setAttribute('class', 'signin-form-input-box signin-form-input-box-focus');
                                    }}
                                    onBlur={(e) => {
                                        const inputBox = e.target.parentNode;
                                        inputBox.setAttribute('class', 'signin-form-input-box');
                                    }}
                                />
                            </div>
                            <div className="signin-form-input-box">
                                <i className="fas fa-lock"></i>
                                <input
                                    value={password}
                                    onChange={({ target: { value } }) => setPassword(value)}
                                    placeholder="Password..."
                                    type="password"
                                    onFocus={(e) => {
                                        const inputBox = e.target.parentNode;
                                        inputBox.setAttribute('class', 'signin-form-input-box signin-form-input-box-focus');
                                    }}
                                    onBlur={(e) => {
                                        const inputBox = e.target.parentNode;
                                        inputBox.setAttribute('class', 'signin-form-input-box');
                                    }}
                                />
                            </div>
                            <div className="signin-form-error">
                                <span>{error}</span>
                            </div>
                        </div>
                        <button onClick={login}>Sign In</button>
                    </div>
                </main>
            </div>
        </div>
    )

}

export default SingIn;