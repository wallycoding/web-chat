module.exports = app => {

    app.route('/signup')
        .post(app.api.user.save);

    app.route('/signin')
        .post(app.api.auth.signin);
    
    app.route('/validate-token')
        .get(app.api.auth.validateToken);
    
}