const PORT = 4001;
const HOST = '127.0.0.1';

var express = require('express');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(express.json()); // to support JSON-encoded bodies


let value = 6;
/* Main routes */
app.get('/list-data', function(req, res) {
    let nextIndex;
    console.log('req.query', req.query);
    let pageIndex = +req.query.page;
        value = pageIndex * 5 + 1;

    if (req.query.page < 3) {
        nextIndex = pageIndex + 1;
        res.status(200).send({
            nextIndex,
            data: [value++, value++, value++, value++, value++]
        });
    } else {
        res.status(200).send({
            data: [value++, value++, value++, value++, value++]
        });
    }
});

app.listen(PORT, function() {
    console.log('Mock back-end is listening on port ' + PORT + '...');
});