const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const redis = require('../redis')

async function initTodoCount() {
  const count = await Todo.countDocuments();
  await redis.set("added_todos", count);
}
initTodoCount().catch(err => console.error("Failed to init todo count:", err));


/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  let current_todos = await redis.get("added_todos")

  if (current_todos === null) {
    current_todos = await Todo.countDocuments()
  }

  await redis.set("added_todos", parseInt(current_todos, 10) + 1)

  res.send(todo);
});



const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.deleteOne() 
  
  current_todos = await redis.get("added_todos")
  if (current_todos === null) {
    current_todos = await Todo.countDocuments()
  }
  await redis.set("added_todos", parseInt(current_todos, 10) - 1)

  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;
  if (text !== undefined) {
    req.todo.text = text;
  }
  if (done !== undefined) {
    req.todo.done = done;
  }

  await req.todo.save();
  res.send(req.todo); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
