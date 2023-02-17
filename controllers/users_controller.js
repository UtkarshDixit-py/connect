const User = require("../models/user");

module.exports.profile = function (req, res) {
  // return res.end('<h1>User profle</h1>')

  return res.render("user_profile", {
    title: "Users",
  });
};

module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Connect | sign up",
  });
};

module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Connect | sign in",
  });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    console.log("password and condirm password do not match");
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log(err);
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Erro in creating user", err);
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      console.log("user already present");
      return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {
  //todo
};
