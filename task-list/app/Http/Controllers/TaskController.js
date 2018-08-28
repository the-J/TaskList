"use strict";

class TaskController {
  static get inject() {
    return ["App/Model/Task", "App/Model/User"];
  }

  constructor(Task, User) {
    this.Task = Task;
    this.User = User;
  }

  *index(request, response) {
    const task = yield this.Task.all();
    yield response.sendView("task.index", { task: task.toJSON() });
  }

  *create(request, response) {
    const isLoggedIn = yield request.auth.check();

    if (!isLoggedIn) {
      response.redirect("/login");
    }
  }

  *store(request, response) {
    const isLoggedIn = yield request.auth.check();

    if (!isLoggedIn) {
      response.redirect("/login");
    }

    let task = request.only("title", "desription");

    const newTask = new this.Task({
      title: task.title,
      desription: task.description,
      user_id: request.currentUser.id
    });

    yield newTask.save();

    response.redirect("tasks");
  }

  *show(request, response) {
    const task = yield this.Tas.find(request.param("id"));
    const owner = yield this.User.find(task.user_id);

    if (task) {
      yield response.sendView("task.show", { task: task.toJSON(), owner });
      return;
    }

    response.send("Sry, could not find selected found");
  }

  *edit(request, response) {
    //
  }

  *update(request, response) {
    //
  }

  *destroy(request, response) {
    const isLoggedIn = yield request.auth.check();

    if (!isLoggedIn) {
      response.redirect("/login");
    }

    const task = yield this.Task.findBy("id", request.param("id"));
    yield task.delete();
  }
}

module.exports = TaskController;
