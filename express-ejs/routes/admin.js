const express = require("express");
const path = require("path")
const app = express();
const { quotes } = require("../data/data.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.set("view option", { layout: false });

console.log(path.join(__dirname, "../views"))
app.get("/", (req, res) => {
  res.render("index", { name: "Baatarkhuu" });
});
app.get("/quotes", (req, res) => {
  res.render("quotes", { title: "Quote lists", quotes});
});
app.get("/quote/:id", (req, res) => {
  res.render("quote", {id: quotes[req.params.id].id+1,
    quote: quotes[req.params.id].quote, 
    author:quotes[req.params.id].source });
  
});
app.get("/a", (req, res) => {
    if(true){
        res.redirect("/quotes");
    }
});


app.get("*", (req, res) => {
  res.render("404", { message: "Not found" });
});

module.exports = app;