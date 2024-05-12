const router = require("express").Router();
const taskController = require('../controllers/taskController');

// Adding new task
router.post("/addTask", taskController.addTask);

// Retriving all tasks
router.get("/tasks", taskController.fetchTasks);

// Retrieve single task by id
router.get("/task/:id", taskController.fetchTask);

// Update task by its id
router.patch("/updateTask/:id", taskController.updateTask);

// Delete task by its id
router.delete("/deleteTask/:id", taskController.deleteTask);

module.exports = router;
