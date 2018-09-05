var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

app.get("/get", function(req, res) {
  fs.readFile("../data/file.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    res.send(data);
  });
});

app.post("/post", jsonParser, (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }
  fs.readFile("../data/file.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    data.push(req.body);
    console.log(data);
    fs.writeFileSync("../data/file.json", JSON.stringify(data, null, 2));
    res.send(data);
  });
});

console.log(this);
// const port = process.env.port || 3000;

app.listen(4200, () => {
  console.log(`working on 4200`);
});

// app.put();

// app.delete();
