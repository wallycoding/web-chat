if (process.env.NODE_ENV !== 'production') {
    const { mongoURL } = require('../../.env');
    process.env.MONGODB_URL = mongoURL;
}
const mongoose = require('mongoose');

function connectTo(url) {

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('CONNECTED WITH MONGODB')
        })
        .catch(error => console.error('ERROR:', error));

}

connectTo(process.env.MONGODB_URL);