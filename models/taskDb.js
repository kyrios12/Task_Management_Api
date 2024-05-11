const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/taskDb').then(()=>{
    console.log(`Connected to DB succesfully`);
}).catch((err)=>{
    console.error(err);
})

const TaskSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String
    }
}, { timestamps: true });

// Define indexes
TaskSchema.index({ title: 1 }); // Single field index on 'title' in ascending order
TaskSchema.index({ creation_date: -1 }); // Single field index on 'creation_date' in descending order
TaskSchema.index({ title: 'text', description: 'text' }); // Text index on 'title' and 'description' fields

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;