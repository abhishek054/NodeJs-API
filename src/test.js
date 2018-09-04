// const http = require("http");
var fs = require("fs");

// var file = fs.readFileSync("../data/file", "utf8");

// console.log(fs.readFileSync("../data/file.txt", "utf8"));

var dd = `{
    "name": "AAisha",
    "id": 52,
    "address": { "city": "Delhi", "country": "India" }
  }`;

// fs.writeFileSync("../data/file.json", "utf8", (err, data) => {
//   var js = JSON.parse(data);
//   js.push(dd);
//   fs.writeFileSync("../data/file.json", JSON.stringify(js));
// });
fs.readFile("../data/file.json", "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  var js = JSON.parse(data);
  js.push(JSON.parse(dd));
  fs.writeFileSync("../data/file.json", JSON.stringify(js));
  //   console.log(js);
});
// var js = JSON.parse(data);
// js.push(dd);
// fs.writeFileSync("../data/file.json", JSON.stringify(js));

// var rdata = JSON.parse(data);
// fs.writeFileSync("../data/file.json", JSON, "utf8", rdata);

// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.write("Hello");
//     res.end();
//   }
// });

// server.on("connection", socket => {
//   console.log("new connection");
// });

// server.listen(420);

// console.log("Port 420 opened");

// {
//     "name": "ABhishek",
//     "id": 5,
//     "address": {
//       "city": "Jsr",
//       "country": "India"
//     }
//   }
