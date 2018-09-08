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
  res.send("Account Created Successfully");
});

//SignIn
app.post("/signIn", jsonParser, (req, res) => {
  fs.readFile("../data/react_app_data.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    var userData = {};
    var tokenUserData;
    var c = false;
    var userName, userMail;
    userName = data.find(
      x => x.email == req.body["email"] && x.password == req.body["password"]
    ).name;
    userMail = data.find(
      x => x.email == req.body["email"] && x.password == req.body["password"]
    ).email;
    userData = { name: userName };
    tokenUserData = { name: userName, email: userMail };
    // console.log(userName + userMail);
    if ((userData.name = null)) {
      res.send("Not Found");
    } else {
      jwt.sign(tokenUserData, "secretKey", (err, token) => {
        userData = {
          name: userName,
          token: token
        };
        // userData["token"] = token;
        // console.log(userData);
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
// app.delete("/deleteNote", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretKey", (err, authData) => {
//     console.log(req.body);
//     res.send("Deleted");
//   });
// });

app.post("/deleteNote", jsonParser, verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    fs.readFile("../data/react_app_data.json", "utf8", (err, DATA) => {
      DATA = JSON.parse(DATA);
      var d = DATA.find(x => x.email == authData.email);
      d.notes.splice(d.notes.indexOf(req.body), 1);
      // d.notes.splice(d.notes.indexOf(req.body), 1);
      // DATA.find(x => x.email == authData.email).notes = newNotes;
      // console.log(DATA);
      fs.writeFileSync(
        "../data/react_app_data.json",
        JSON.stringify(DATA, null, 2)
      );
    });
    console.log(req.body);
    res.send("Deleted");
  });
});

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
