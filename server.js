var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/bin', express.static(path.join(__dirname, 'bin')));

app.listen(8080);

console.log('Express server started on port 8080');