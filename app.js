var express = require('express');
var multer = require('multer');


var app = express();

var morgan = require('morgan');
var methodOverride = require('method-override');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser')

var router = require('express').Router();

var PUBLIC_DIR = './dist/';

app.use(express.static(PUBLIC_DIR));
app.use(morgan('combined'));
app.use(methodOverride());
// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/', function(req, res) {
    res.sendFile(PUBLIC_DIR + "index.html");
});


/*Configure the multer.*/

app.use(multer({
    dest: './resources/photos/',
    rename: function(fieldname, filename) {
        return filename + Date.now();
    },
    onFileUploadStart: function(file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function(file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        done = true;
    }
}));

router.post('/api/photo', function(req, res) {
    if (done == true) {
        console.log(req.files);
        res.end("File uploaded.");
    }
});

app.use('/', router);

app.listen(3000);
console.log("Server is up on 3000 ");

