var express = require("express");
var app = express();
var fs = require("fs");
app.get("/get", function(req, res) {
  // console.log(req);
  // fs.writeFileSync("../data/temp.txt", JSON.parse(req));
  res.send(fs.readFileSync("../data/file.json", "utf8"));
  // fs.readFile("../data/file.json", "utf8", (err, data) => {
  //   // var d = JSON.parse(data);
  //   console.log(data);
  //   res.send("Get request data : " + data);
  // });
});

console.log("running");
// const port = process.env.port || 3000;

app.listen(4200, () => {
  console.log(`working on 4200`);
});

app.post("/post", (req, res) => {
  // fs.writeFile("../data/temp.json", JSON.parse(p));
  res.send(req.params);
});

// app.put();

// app.delete();
