var express = require("express");
var app = express();
var fs = require("fs");

app.get("/", function(req, res, next) {
  res.send(
    "Get request is working  " +
      fs.readFileSync("../data/file.txt", (err, data) => {
        console.log(JSON.parse(data));
      })
  );
});

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`${port} working`);
});

app.post();

// app.put();

// app.delete();
