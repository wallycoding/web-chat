const bcrypt = require('bcrypt');

module.exports = app => {

    const { User } = app.config.schema;
    const { validate } = app.config;

    const createHash = pwd =>
        bcrypt.hashSync(
            pwd,
            bcrypt.genSaltSync(10)
        );
    
    const save = async (req, res) => {

        const _user = { ...req.body };

        try {
            validate(
                { text: _user.name, min: 4, max: 100, error: 'name is required' },
                'text'
            );
            validate({ email: _user.email, error: 'email is required' }, 'email');
            validate({ text: _user.password, min: 6, max: 32, error: 'password is required' }, 'text');
            validate({ text: _user.confirmPassword, min: 6, max: 32, error: 'confirm password is required' }, 'text');

            validate({ a: _user.password, b: _user.confirmPassword, error: 'passwords not equals' }, 'equals');

            const userFromDB = await User.findOne({ email: _user.email });
            validate({ value: userFromDB, result: false, error: 'This email has registred' }, 'exists');

        } catch (error) {
            return res.status(400).send(error);
        }

        delete _user.confirmPassword;

        const user = new User({
            name: _user.name,
            email: _user.email,
            password: createHash(_user.password)
        });

        user.save()
            .then(() => res.status(204).send())
            .catch(error => res.status(500).send(error));

    };

    return { save };

}