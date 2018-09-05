var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");

app.listen(10000);

app.post("/signup", jsonParser, (req, res) => {
  fs.readFile("../data/account.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    data.push(req.body);
    fs.writeFileSync("../data/account.json", JSON.stringify(data, null, 2));
  });
  res.send("saved");
});

//TO generate a token
app.post("/generate", (req, res) => {
  let user = {
    name: "Anima",
    id: 563
  };
  jwt.sign(user, "secretkey", { expiresIn: "60s" }, (err, token) => {
    res.send(token);
  });
});

//Route to protect
app.post("/forbidden", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.send({
        message: "Done :D",
        authData
      });
    }
  });
});

//Function to extract token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    let bearer = bearerHeader.split(" ")[1];
    req.token = bearer;
    next();
  } else {
    res.sendStatus(403);
  }
}
