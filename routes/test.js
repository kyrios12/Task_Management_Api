let mongoose = require('mongoose');
let Task = require('../models/taskDb');
let router = require('express').Router();


function addTask(req,res){
    let {title,desc,status} = req.body;

    let addedTask = Task.create({ // Async task
        title: title,
        description: description,
        status: status
    }).then(()=>{
      res.status(200).json({"message":addedTask})
    }).catch((err)=>{
        console.error(err);
        res.status(500).json({"message":"Internal Server error"})
    })
}
router.post('/addTask',)