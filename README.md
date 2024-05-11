# Task Management API

This is a simple Task Management API built with Node.js, Express, and MongoDB using Mongoose. It allows users to perform CRUD operations on tasks.

## Prerequisites

Before running the application, ensure you have the following installed on your machine:
- Node.js and npm (Node Package Manager)
- MongoDB

## Installation

1. Clone the repository:

```bash
git clone <(https://github.com/kyrios12/Task_Management_Api)>
```
## Install Dependencies
cd task-management-api
npm install

## Setup Environment Variables
-Create a .env file in the root directory. 
-Add the following variables to the .env file:
```bash
MONGODB_URI=mongodb://localhost:27017/taskDb
```
## Start the Server
```bash
npm start
```
The server will start running on http://localhost:8080.

## API EndPoints
1. Add Task
- URL:/addTask
- Method: POST
  Request Body
```json
{
  "title": "Task Title",
  "description": "Task Description",
  "status": "Pending"
}
```
Response
```json
{
  "message": "Task added successfully",
  "task": {
    "_id": "609e5aeccf6a153e3b012345",
    "title": "Task Title",
    "description": "Task Description",
    "status": "Pending",
    "createdAt": "2021-05-14T12:00:00.000Z",
    "updatedAt": "2021-05-14T12:00:00.000Z"
  }
}
```
2. Get All Tasks
- URL:/tasks
- Method: GET
- Response
```json
{
  "message": [
    {
      "_id": "609e5aeccf6a153e3b012345",
      "title": "Task Title",
      "description": "Task Description",
      "status": "Pending",
      "createdAt": "2021-05-14T12:00:00.000Z",
      "updatedAt": "2021-05-14T12:00:00.000Z"
    },
    ...
  ]
}
```
3. Get task by Id
- URL:/task/:id
- Method: GET
- Response
```json
{
  "message": {
    "_id": "609e5aeccf6a153e3b012345",
    "title": "Task Title",
    "description": "Task Description",
    "status": "Pending",
    "createdAt": "2021-05-14T12:00:00.000Z",
    "updatedAt": "2021-05-14T12:00:00.000Z"
  }
}
```
4. Update task by Id
- URL:/updateTask/:id
- Method: PATCH
- Request Body
```json
{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "status": "Completed"
}
```
- Response
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "609e5aeccf6a153e3b012345",
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "status": "Completed",
    "createdAt": "2021-05-14T12:00:00.000Z",
    "updatedAt": "2021-05-15T08:30:00.000Z"
  }
}
```
5. Delete Task By Id
- URL:/deleteTask/:id
- Method: DELETE
- Response
```json
{
  "message": "Task Deleted Successfully"
}
```
