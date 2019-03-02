var db = require("../models");

module.exports = function (app) {
  // Load Homepage where new users button is.
  app.get("/", function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.render("home", {
        msg: "This is the Homepage!",
        users: dbExamples
      });
    });
  });

  //New users page where a new user can be added and already added users are displayed
  app.get("/newuser", function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.render("newuser", {
        users: dbExamples
      });
    });
  });

  //pull up a specific users profile, where the order create button is.
  app.get("/users/:id", function (req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("profile", {
        users: dbExample
      });
    });
  });

  //create order page, then click to go to add individual users orders.
  app.get("/order", function (req, res) {
    db.OrderGroup.findAll({}).then(function (dborders) {
      res.render("order", {
        ordergroup: dborders
      });
    });
  });

  //pull up a specific order profile, where the order create button is.
  app.get("/order/:id", function (req, res) {
    db.OrderGroup.findOne({ where: { id: req.params.id } }).then(function (dbOrders) {
      res.render("orderdetails", {
        ordergroup: dbOrders
      });
    });
    // db.User.findAll({}).then(function(dbUsers) {
    //   res.render("orderdetails", {
    //     users: dbUsers
    //   })
    // })

  });



  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
