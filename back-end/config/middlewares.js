const bodyParser = require('body-parser'),
    cors = require('cors');

module.exports = app => {

    app.use(bodyParser.json());
    app.use(cors());

}