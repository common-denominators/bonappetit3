// Get references to page elements
var $username = $("#username");
var $firstName = $("#firstName");
var $lastName = $("#lastName");
var $phone = $("#phone");
var $email = $("#email");
var $password = $("#password");
var $passwordConfirm = $("#passwordConfirm");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(user)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
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
var handleFormSubmit = function(event) {
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

  API.saveExample(user).then(function() {
    refreshExamples();
  });

    $username.val("");
    $firstName.val("");
    $lastName.val("");
    $phone.val("");
    $email.val("");
    $password.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
