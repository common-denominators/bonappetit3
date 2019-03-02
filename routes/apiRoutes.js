var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(result){
      res.json(result);
    })
  })

  // Create a new user
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
  //Create a new order Group
  app.post("/api/order", function(req, res) {
    db.OrderGroup.create(req.body).then(function() {
      res.status(200).json({});
    });
  });

    //Create a new order detail
    app.post("/api/orderdetail", function(req, res) {
      db.OrderDetail.create(req.body).then(function(d) {
        res.status(200).json({});
      });
    });
  // Delete an example by id
  // app.get("/api/users/:id", function(req, res) {
  //   db.User.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
