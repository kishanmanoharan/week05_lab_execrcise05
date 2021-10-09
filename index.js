const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const router = express.Router();

var userData = {};
fs.readFile("./user.json", "utf8", (err, data) => {
  if (err) {
    console.log(`Error reading file`);
  } else {
    userData = JSON.parse(data);
  }
});
/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "/home.html"));
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get("/profile", (req, res) => {
  res.header("Content-Type", "application/json");
  res.end(JSON.stringify(userData, null, 3));
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get("/login", (req, res) => {
  res.header("Content-Type", "application/json");

  if (req.query.username === userData.username) {
    if (req.query.password === userData.password) {
      res.send(
        JSON.stringify(
          {
            status: true,
            message: "User Is valid",
          },
          null,
          3
        )
      );
    } else {
      res.send(
        JSON.stringify(
          {
            status: false,
            message: "Password is invalid",
          },
          null,
          3
        )
      );
    }
  } else {
    res.send(
      JSON.stringify(
        {
          status: false,
          message: "User Name is invalid",
        },
        null,
        3
      )
    );
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get("/logout", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send("<b>" + req.query.username + " successfully logout.</b>");
});

app.use("/", router);

app.listen(process.env.port || 8081);

console.log("Web Server is listening at port " + (process.env.port || 8081));
