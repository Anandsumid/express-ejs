const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors")

app.get(
  "/user/:id",
  function (req, res, next) {
    const user_id = req.params.id;
    if (user_id > 2000) next("route");
    if (user_id < 50) next();
    res.send("I will send user information #1");
  },
  function (req, res) {
    res.send("He is a Loyal");
  }
);
app.get("/user/:id", function (req, res) {
  res.send("I will send user information #2");
});

app.get("/user/:id", function (req, res, next) {
  const user_id = req.params.id;
  if (user_id % 2 === 0) res.send("that id is EVEN");
  date = new Date(Date.now());
  fs.appendFile(
    "user_activity_log.json",
    "\nuser/:id" + req.params.id + " date: " + date.toString(),
    () => {}
  );
  next("route");
});
app.get("/user/:id", function (req, res) {
  date = new Date(Date.now());
  res.send("that id is ODD");
  fs.appendFile(
    "user_activity_log.json",
    "\nuser/:id" + req.params.id + " date: " + date.toString(),
    () => {}
  );
});

function logOriginalUrl(req, res, next) {
  console.log("Request URL", req.originalUrl);
  next();
}
function logMethod(req, res, next) {
  console.log("Request Type", req.method);
  next();
}
var logStuff = [logOriginalUrl, logMethod];
app.post("/arrayuser/:id", logStuff, function (req, res, next) {
  res.send("User Info");
});

module.exports = app
