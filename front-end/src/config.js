import axios from 'axios';
const config = {
    SERVER_URL: {
        SIGNIN: 'http://localhost:9000/signin',
        SIGNUP: 'http://localhost:9000/signup',
        VALIDATE_TOKEN: 'http://localhost:9000/validate-token'
    }
}

export const validateToken = async (token) => {

    try {
        const response = await axios.get(
            config.SERVER_URL.VALIDATE_TOKEN,
            { headers: { Authorization: token } }
        );
        if (!response.data) {
            window.location.href = window.location.origin;
            window.localStorage.clear();
        }
    } catch {
        window.location.href = window.location.origin;
        window.localStorage.clear();
    }

}

export const signin = async ({ email, password }) => {
    signin.onStarted && signin.onStarted();
    try {
        const response = await axios.post(config.SERVER_URL.SIGNIN, {
            email,
            password
        });
        window.localStorage.setItem('user-data',
            btoa(JSON.stringify(response.data))
        );
        signin.onError && signin.onError(null);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            signin.onError && signin.onError(error.response.data);
        } else {
            signin.onError && signin.onError('there was an error');
        }
    } finally {
        signin.onFinish && signin.onFinish();
    }
}

export const signup = async ({ name, email, password, confirmPassword }) => {
    signup.onStarted && signup.onStarted();
    try {
        await axios.post(config.SERVER_URL.SIGNUP, {
            name,
            email,
            password,
            confirmPassword
        });
        await signin({ email, password });
    } catch (error) {
        if (error.response && error.response.status === 400) {
            signup.onError && signup.onError(error.response.data);
        } else {
            signup.onError && signup.onError('there was an error');
        }
    } finally {
        signup.onFinish && signup.onFinish();
    }
}

export default config;