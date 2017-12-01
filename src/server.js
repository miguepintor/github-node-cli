'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {get} = require('./utilities/config');

let app = express();
app.use(bodyParser.json());
app.get('/Query/PreferredLanguage/:username', require('./rest/preferred-language'));
let server = app.listen(get('rest-port') || 5000);

module.exports = server;