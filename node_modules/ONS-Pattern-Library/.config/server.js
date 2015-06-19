"use strict";

var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../converted-html'));

module.exports = app.listen(app.get('port'));