var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.render("home", {
        msg: "This is the Homepage!",
        users: dbExamples
      });
    });
  });

  app.get("/newuser", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.render("newuser", {
        users: dbExamples
      });
    });
  });

  app.get("/order", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.render("order", {
        users: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/users/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("profile", {
        users: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
