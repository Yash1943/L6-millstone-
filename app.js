const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
const todo = require("./models/todo");
// const { response } = require("express");

app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/", async (request,response) => {
  const allTodos = await Todo.getTodos();
  if(request.accepts("html")) {
    response.render('index', {
      allTodos
    });
  } else {
    response.json({
      allTodos
    })
  }
});
app.use(express.static(path.join(__dirname,"public")));

// app.get("/", async (req, res) => {
//   const allTodos = await Todo.getTodos();
//   const overdue = await Todo.overDue();
//   const dueLater = await Todo.dueLater();
//   const dueToday = await Todo.dueToday();
//   if (req.accepts("html")) {
//     res.render("index", {
//       allTodos,
//       overdue,
//       dueLater,
//       dueToday,
//     });
//   } else {
//     res.json(allTodos);
//   }
// });

app.get("/todos", async (req, res) => {
  console.log("Todo list",request.body);
  })

app.post("/todos", async (req, response) => {
  console.log("Creating a todo", req.body);
  try {
    const todo = await Todo.addTodo({
      title: req.body.title,
      dueDate: req.body.dueDate,
    });
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

// app.put("/todos/:id/markAsCompleted", async (req, res) => {
//   console.log("Todo marks completed : ", req.params.id);
//   const todo = await Todo.findByPk(req.params.id);
//   try {
//     const updateTodo = await todo.markAsCompleted();
//     return res.json(updateTodo);
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error);
//   }
// });

// eslint-disable-next-line no-unused-vars
app.delete("/todos/:id", async (req, res) => {
  console.log("We have to delete a Todo with ID: ", req.params.id);
  const affectedRow = await Todo.destroy({ where: { id: req.params.id } });
  res.send(affectedRow ? true : false);
});

module.exports = app;
