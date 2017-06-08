var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var mongoose=require('mongoose');

var todo = [ {term: "Sample Item 1"}, {term: "Sample Item 2"}, {term: "Sample Item 3"} ];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	next();
});

app.use(express.static("./public"));

app.use(cors());

app.get("/todo", function(req, res) {
	res.json(todo);
});

app.post("/todo", function(req, res) {
    todo.push(req.body);
    res.json(todo);
});

app.delete("/todo/:term", function(req, res) {
    todo = todo.filter(function(definition) {
        return definition.term.toLowerCase() !== req.params.term.toLowerCase();
    });
    res.json(todo);
});

app.listen(process.env.PORT);

console.log("Express app running on heroku");

module.exports = app;
