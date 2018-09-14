const PORT = 4001;
const HOST = '127.0.0.1';

var express = require('express');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(express.json()); // to support JSON-encoded bodies


let count = 0;
/* Main routes */
app.get('/list-data', function(req, res) {
    console.log('count: ', count);

    if (count++ < 3) {
        res.status(404).send({
            message: 'Page not found!'
        });
        return;
    }

    count = 0;
    res.status(200).send({
        success: true,
        data: 'Some data from BE'
    });
});

app.listen(PORT, function() {
    console.log('Mock back-end is listening on port ' + PORT + '...');
});