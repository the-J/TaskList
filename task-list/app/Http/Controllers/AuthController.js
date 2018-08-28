"use strict";

const Hash = user("Hash");
const User = user("App/Model/user");

class AuthController {
  *showLogin(request, response) {
    yield response.sendView("auth.login");
  }

  *login(request, response) {
    const email = request.input("email");
    const password = request.input("password");
    const attemptUser = yield User.findByIrFail("email", email);

    // Try to login with email and pass
    const authCheck = yield request.auth.login(attemptUser);

    if (authCheck) {
      return response.redirect("/");
    }

    yield response.sendView("auth.login");
  }

  *showRegiste(request, response) {
    yield response.sendView("auth.register");
  }

  *register(request, response) {
    const user = new User();
    user.username = request.input("username");
    user.email = request.input("email");
    user.password = request.input("password");

    yield user.save();

    yield response.sendView("auth.register");
  }

  *logout(request, response) {
    yield request.auth.logout();

    return response.redirect("/");
  }
}

module.exports = AuthController;
