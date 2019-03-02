// Get references to page elements
var $username = $("#username");
var $firstName = $("#firstName");
var $lastName = $("#lastName");
var $phone = $("#phone");
var $email = $("#email");
var $password = $("#password");
var $passwordConfirm = $("#passwordConfirm");
var $submitBtn = $("#newUserSubmit");
var $exampleList = $("#example-list");
var $groupName = $("#groupName");
var $date = $("#date");
var $restaurant = $("#restaurant");
var $runner = $("#runner");
var $newUserButton = $("#newUserButton");
var $newUserSubmitBtn = $("#newUserSubmitBtn")
var $newOrderButton = $("#newOrderButton")

// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(user)
    });
  },
  saveOrderGroup: function(orderGroup) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/order",
      data: JSON.stringify(orderGroup)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/users",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/users/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshUser = function() {
  API.getExamples().then(function(data) {
    var $user = data.map(function(user) {
      var $a = $("<a>")
        .text(user.username)
        .attr("href", "/example/" + user.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": user.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($user);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var newUserSubmit = function(event) {
  event.preventDefault();

  var user = {
    
    username: $username.val().trim(),
    firstname: $firstName.val().trim(),
    lastname: $lastName.val().trim(),
    phone: $phone.val().trim(),
    email: $email.val().trim(),
    password: $password.val().trim()
  };

  if (!user.password) {
    alert("You must enter an password!");
    return;
  }

  API.saveUser(user).then(function() {
    refreshUser();
  });

    $username.val("");
    $firstName.val("");
    $lastName.val("");
    $phone.val("");
    $email.val("");
    $password.val("");
};

var orderGroupSubmit = function(event) {
  event.preventDefault();

  var orderGroup = {
    
    ordername: $groupName.val().trim(),
    orderDate: $orderDate.val().trim(),
    restaurant: $restaurant.val().trim(),
    runner: $runner.val().trim()
  };

  if (!orderGroup.ordername) {
    alert("You must enter an order name!");
    return;
  }

  API.saveOrderGroup(orderGroup).then(function() {
    refreshUser();
  });

    $groupName.val("");
    $orderDate.val("");
    $restaurant.val("");
    $runner.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshUser();
  });
};

// This is the listener for the home page
$newUserButton.on("click");
//This is the listener for the new user submit button
$newUserSubmitBtn.on("click", newUserSubmit);

$exampleList.on("click", ".delete", handleDeleteBtnClick);
$newOrderButton.on("click", orderGroupSubmit);
