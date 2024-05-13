const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;

beforeAll(async () => {
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
});

afterAll(async () => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
});

test("Database connected successfully", async () => {
    // Ensure the connection promise resolves successfully
    await expect(mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }))
        .resolves
        .not
        .toThrow();
});

describe('Task Management API', () => {
    // Test case for adding a new task
    describe('POST /addTask', () => {
        it('should add a new task', async () => {
            const res = await request(app)
                .post('/addTask')
                .send({ title: 'Another Task', description: 'Test Description', status: 'Pending' });

            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Task added successfully');

        });

        it('should throw an error', async()=>{
            const res = await request(app)
            .post('/addTask')
            .send({title:'',description:'',status:''});
            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual("Title or Description or Status cannot be empty");
        })

    });

    // Test case for fetching all tasks
    describe('GET /tasks', () => {
        it('should fetch all tasks', async () => {
            const res = await request(app).get('/tasks');

            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    // Test case for fetching a single task by ID
    describe('GET /task/:id', () => {
        it('should fetch a single task by ID', async () => {
            // Retrieve the taskId from a previously created task
            const addTaskResponse = await request(app)
                .post('/addTask')
                .send({ title: 'Adding Task', description: 'Test Description', status: 'Pending' });
    
            const taskId = addTaskResponse.body.task._id;
    
            // Now use the taskId to fetch the task
            const res = await request(app).get(`/task/${taskId}`);
    
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toBeDefined();
        });
    });

    // Test case for updating a task by ID
    describe('PATCH /updateTask/:id', () => {
        
        it('should update a task by ID', async () => {
            const addTaskResponse = await request(app)
                        .post('/addTask')
                        .send({ title: 'Test Task', description: 'Test Description', status: 'Pending' });
            
            const taskId = addTaskResponse.body.task._id;

            const res = await request(app)
                .patch(`/updateTask/${taskId}`)
                .send({ title: 'Updated Task Title' });

            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Task updated successfully');
        });

    });

    // Test case for deleting a task by ID
    describe('DELETE /task/:id', () => {
        
        it('should delete a task by ID', async () => {
            const addTaskResponse = await request(app)
                        .post('/addTask')
                        .send({ title: 'Test Task', description: 'Test Description', status: 'Pending' });
            
            const taskId = addTaskResponse.body.task._id;

            const res = await request(app).delete(`/deleteTask/${taskId}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Task Deleted Successfully');
        });

    });
});
