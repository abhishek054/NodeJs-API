const express = require("express");
const app = express();
const fs = require("fs");
const jsonParser = require("body-parser").json();
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.listen(10000, () => {
  console.log("Working at port 10000");
});

app.use(cors());

//SignUp
app.post("/signUp", jsonParser, (req, res) => {
  fs.readFile("../data/react_app_data.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    data.push(req.body);
    fs.writeFileSync(
      "../data/react_app_data.json",
      JSON.stringify(data, null, 2)
    );
  });
  res.send("Saved Successfully");
});

//SignIn
app.post("/signIn", jsonParser, (req, res) => {
  fs.readFile("../data/react_app_data.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    var userData;
    var tokenUserData;
    var c = false;
    data.map(x => {
      if (x.email == req.body["email"] && x.password == req.body["password"]) {
        c = true;
        userData = { name: x.name };
        tokenUserData = { name: x.name, email: x.email };
      }
    });
    if (!c) {
      res.send("Not Found");
    } else {
      jwt.sign(tokenUserData, "secretKey", (err, token) => {
        userData["token"] = token;
        res.send(userData);
      });
    }
  });
});

//Add notes
app.post("/addNotes", jsonParser, verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      var user;
      fs.readFile("../data/react_app_data.json", "utf8", (err, data) => {
        data = JSON.parse(data);
        data.find(x => x.email == authData.email).notes.push(req.body);
        fs.writeFileSync(
          "../data/react_app_data.json",
          JSON.stringify(data, null, 2)
        );
      });
    }
  });
  res.send("Data Saved");
});

//Delete notes

//Send Notes Data
app.get("/getInfo", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      var found = false;
      var emailId = authData.email;
      fs.readFile("../data/react_app_data.json", "utf8", (err, data) => {
        data = JSON.parse(data);
        data.map(x => {
          if (x.email == emailId) {
            res.send(x.notes);
            found = true;
          }
        });
        if (!found) {
          res.send("Data not found");
        }
      });
    }
  });
});

//verifyToken
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
