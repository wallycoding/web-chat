require('./config/start');
const mongoose = require('mongoose');
const app = require('express')();
const consing = require('consign');
const PORT = process.env.PORT || 9000;

app.mongoose = mongoose;
console.clear();
consing()
    .then('./config/middlewares.js')
    .then('./config/schema')
    .then('./config/validate.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app);

app.listen(PORT, () =>  console.log("RUNNING ON:", PORT) );