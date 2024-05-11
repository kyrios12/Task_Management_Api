const router = require("express").Router();
const mongoose = require("mongoose");
const Task = require("../models/taskDb");

// Adding new task
router.post("/addTask", async (req, res) => {
  try {
    let { title, description, status } = req.body;
    // Validation
    if (!title || !description) {
      res
        .status(400)
        .json({ message: "Title and Description cannot be empty" });
    } else {
      let addedTask = await Task.create({
        title: title,
        description: description,
        status: status,
      });
      res
        .status(200)
        .json({ message: "Task added successfully", task: addedTask });
    }
  } catch (error) {
    console.error("Error adding task:", error);
    res
      .status(500)
      .json({ message: "Task could not be added. Please try again later." });
  }
});

// Retriving all tasks
router.get("/tasks", async (req, res) => {
  try {
    let tasks = await Task.find();
    res.status(200).json({ message: tasks });
  } catch (error) {
    console.error("Error Fetching tasks:", error);
    res.status(500).json({ message: "error" });
  }
});

// Retrieve single task by id
router.get("/task/:id", async (req, res) => {
  try {
    let _id = req.params.id;

    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }

    let task = await Task.findById(_id);
    if (!task) {
      res.status(404).json({ message: "There is no such task" });
    }
    res.status(200).json({ message: task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot fetch the task" });
  }
});

// Update task by its id
router.patch("/updateTask/:id", async (req, res) => {
  try {
    let _id = req.params.id;

    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }

    let { title, description, status } = req.body;

    // Find the task by ID
    let task = await Task.findById(_id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ message: "Task does not exist" });
    }

    // Update task properties if provided in the request body

    if (title) {
      task.title = title;
    }
    if (description) {
      task.description = description;
    }
    if (status) {
      task.status = status;
    }

    // Save the updated task to the database
    await task.save();

    // Return a success message along with the updated task
    res.status(200).json({ message: "Task updated successfully", task: task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      message: "Internal server error occurred while updating the task",
    });
  }
});

// Delete task by its id
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    let _id = req.params.id;
   // Validation of Id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }
    let task = await Task.findById(_id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    } else {
      let deleteTask = await Task.findByIdAndDelete(_id);
    }
    res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      message: "Internal server error occurred while updating the task",
    });
  }
});

module.exports = router;
