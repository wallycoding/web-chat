module.exports = app => {

    const User = app.mongoose.model('User', {
        name: String,
        email: String,
        password: String
    });

    return User;

}