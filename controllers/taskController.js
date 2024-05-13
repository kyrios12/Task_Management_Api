const mongoose = require("mongoose");
const Task = require("../models/taskDb");

module.exports.addTask = async (req, res) => {
    try {
      let { title, description, status } = req.body;
      // Validation
      if (!title || !description || !status) {
        res
          .status(400)
          .json({ message: "Title and Description cannot be empty" });
      }
      let taskExist = await Task.findOne({title:title});
      if(taskExist){
         res.status(403).json({"message":"Task already exists please update existing task"})
      } 
      else {
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
  };

// module.exports.addTask = function(req,res){
//    let{title,description,status} = req.body;
//    if(!title || !description || !status){
//     res.status(400).json({"message":"Input cannot be empty"})
//    }

//    Task.create({
//     title,
//     description,
//     status
//    }).then((task)=>{
//      res.status(200).json({"message":task})
//    }).catch((err)=>{
//     console.error(err);
//     res.status(500).json({"message":"Internal Server Error"})
//    })
// }

module.exports.fetchTasks = async (req, res) => {
    try {
      let tasks = await Task.find();
      res.status(200).json({ message: tasks });
    } catch (error) {
      console.error("Error Fetching tasks:", error);
      res.status(500).json({ message: "error" });
    }
}
// module.exports.fetchTasks = function (req,res){
//    Task.find().then((tasks)=>{
//       res.status(200).json({"message":tasks});
//    }).catch((err)=>{
//       console.error(err);
//       res.status(500).json({"message":"Internal Server Error"})
//    })
// }

module.exports.fetchTask = async (req, res) => {
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
  }

// module.exports.fetchTask = function(req,res){
//   let _id = req.params.id;
//   if(!mongoose.Types.ObjectId.isValid(_id)){
//     res.status(404).json({"message":"Invalid Id"})
//   }
  
//   Task.findById(_id).then((task)=>{
//     if(!task){
//       res.status(400).json({"message":"Task does not exist"})
//     }
//     res.status(200).json({"message":task})
//   }).catch((err)=>{
//     console.error(err);
//     res.status(500).json({"message":"Internal Server Error"})
//   })
// }

module.exports.updateTask = async (req, res) => {
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
}

// module.exports.updateTask = function(req,res){
//     let _id = req.params.id;
        // if(!mongoose.Types.ObjectId.isValid(_id)){
        //   res.status(400).json({"message":"Invalid Id"})
        // }
//     Task.findById(_id).then((task)=>{
//       if(!task){
//         res.status(400).json({"message":"Task does not exist"})
//       }
//       let {title,description,status} = req.body;
//       if(title && title != null){
//         task.title = title;
//       }
//       if(description && description != null){
//         task.description = description;
//       }
//       if(status && status != null){
//         task.status = status;
//       }
//       task.save().then(()=>{
//         res.status(200).json({"message":task})
//       })
//     }).catch((err)=>{
//       console.error(err);
//       res.status(500).json({"message":"Internal Server Error"})
//     })
// }

module.exports.deleteTask = async (req, res) => {
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
  }

// module.exports.deleteTask = function(req,res){
//    let _id = req.params.id;
//    if(!mongoose.Types.ObjectId.isValid(_id)){
//     res.status(400).json({"message":"Invalid Id"})
//    }
//    Task.findByIdAndDelete(_id).then(()=>{
//     res.status(200).json({"message":"Successfully Deleted"})
//    }).catch((err)=>{
//     console.error(err);
//     res.status(500).json({"message":"Internal Server Error"})
//    })
// }