const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
let ejs = require('ejs');

const routes = require("./routes");
app.set("view engine", "ejs");
       
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(express.static(__dirname + '/public'));

app.get("/", routes.balance);

app.get("*", routes.notFound);

//upload
app.post('/', routes.upload);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Listening on port: " + port));