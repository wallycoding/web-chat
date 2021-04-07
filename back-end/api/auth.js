if (process.env.NODE_ENV !== 'production') {
    const { secretToken } = require('../.env');
    process.env.SECRET_TOKEN = secretToken;
}
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

module.exports = app => {

    const secretToken = process.env.SECRET_TOKEN;
    const { User } = app.config.schema;
    const { validate } = app.config;

    const signin = async (req, res) => {

        const { email, password } = req.body;
        const userFromDB = await User.findOne({ email });

        try {
            validate({ email, error: 'email is required' }, 'email');
            validate({ text: password, min: 6, max: 32, error: 'password is required' }, 'text');

            validate({ value: userFromDB, error: 'Email not found' }, 'exists');
            if (!bcrypt.compareSync(password, userFromDB.password)) {
                throw 'Password does not match.';
            }

        } catch (error) {
            return res.status(400).send(error);
        }

        const payload = {
            id: userFromDB._id,
            name: userFromDB.name,
            email: userFromDB.email
        }

        const token = jwt.encode(payload, secretToken);

        res.json({
            ...payload,
            token
        });

    }

    const validateToken = async (req, res) => {
        const token = req.headers.authorization;
        try {
            const payload = jwt.decode(token, secretToken);
            const userFromDB = await User.findOne({ email: payload.email });
            validate({ value: userFromDB, error: null }, 'exists');
            res.send(true);
        } catch (error) {
            res.send(false);
        }
    }

    return { signin, validateToken };

}