const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors")
const router = express.Router()
router.get('/what', (req, res) =>{
  res.send('haha')
})
router.get(
  "/user/:id",
  function (req, res, next) {
    const user_id = req.params.id;
    if (user_id<10){
      const err = new Error('Cant find user with this ID')
      err.status = 'fail'
      // err.statusCode = 500
      return next(err)
    }
    // if (user_id > 2000) next("route");
    // if (user_id < 50) next();
    // res.send("I will send user information #1");
    
  },
  function (req, res) {
    res.send("User info with id"+ user_id);
  }
);
router.get(
  "/user2/:id",
  function (req, res, next) {
    const user_id = req.params.id;
    if (user_id<10){
      const err = new Error('Cant find user with this ID')
      err.status = 'faillll'
      err.statusCode = 500
      next(err)
    }
    res.send("User info with ID"+ user_id)
  },
  function (err, req, res, next) {
    res.status(500).json({"message": err.status})
  }
);
router.get('/user3/:id', function (req,res){
  const user_id = req.params.id
  if (user_id<10){
    return res.status(500). json({"message": "something went wrong"})
  }
  res.send("User info with id"+ user_id)
})
router.get("/user/:id", function (req, res) {
  res.send("I will send user information #2");
});
router.get('/user4/:id', function(req, res, next){
  const user_id = req.params.id
  if (user_id<10){
    const err = new Error ('Cant find the fn user')
    err.status = 'Failff'
    err.statusCode = 500 
    return next(err)
  }
  res.send ('User info with id'+ user_id)
})
router.use(function(err, req, res, next){
  res.status(500).json({'err': err, "message": "Wrong", "custom": err.status})
})
router.get("/user/:id", function (req, res, next) {
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
router.get("/user/:id", function (req, res) {
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

module.exports = router
