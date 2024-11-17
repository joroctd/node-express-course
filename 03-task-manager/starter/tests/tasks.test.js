import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import { beforeAll, describe, it, afterAll } from 'vitest';

beforeAll(async () => {
	await mongoose.connect(process.env.MONGO_URI);
});

const tasksRoute = '/api/v1/tasks';
describe.concurrent(`GET ${tasksRoute}`, async () => {
	const res = await supertest(app).get(tasksRoute);
	it('should return JSON', async ({ expect }) => {
		expect(res.type).toBe('application/json');
	});
	it('should return 200 OK', async ({ expect }) => {
		expect(res.statusCode).toBe(200);
	});
	it('should return task list', async ({ expect }) => {
		expect(res.body.tasks?.length).toBeDefined();
	});
});

let testTaskId;
describe.concurrent(`POST ${tasksRoute}`, async () => {
	const testName = 'TEST TASK!';
	const res = await supertest(app).post(tasksRoute).send({
		name: testName
	});
	it('should return JSON', async ({ expect }) => {
		expect(res.type).toBe('application/json');
	});
	it('should return 201 Created', async ({ expect }) => {
		expect(res.statusCode).toBe(201);
	});
	it('should return newly created task', async ({ expect }) => {
		expect(res.body.task).toBeDefined();
	});
	it('should have the correct name', async ({ expect }) => {
		expect(res.body.task.name).toBe(testName);
	});
	testTaskId = res.body.task._id;
});

describe.concurrent(`GET ${tasksRoute}/:id`, async () => {
	const res = await supertest(app).get(`${tasksRoute}/${testTaskId}`);
	it('should return JSON', async ({ expect }) => {
		expect(res.type).toBe('application/json');
	});
	it('should return 200 OK', async ({ expect }) => {
		expect(res.statusCode).toBe(200);
	});
	it('should return task with name', async ({ expect }) => {
		expect(res.body.task?.name).toBeDefined();
	});
	it('should return expected task with correct ID', async ({ expect }) => {
		expect(res.body.task._id).toBe(testTaskId);
	});
});

describe.concurrent(`PATCH ${tasksRoute}/:id`, async () => {
	const testName = 'Task testing...';
	const res = await supertest(app).patch(`${tasksRoute}/${testTaskId}`).send({
		name: testName,
		completed: true
	});
	it('should return JSON', async ({ expect }) => {
		expect(res.type).toBe('application/json');
	});
	it('should return 200 OK', async ({ expect }) => {
		expect(res.statusCode).toBe(200);
	});
	it('should return updated task', async ({ expect }) => {
		expect(res.body.task).toBeDefined();
	});
	it('should return correct task name', async ({ expect }) => {
		expect(res.body.task.name).toBe(testName);
	});
});

describe.concurrent(`DELETE ${tasksRoute}/:id`, async () => {
	const res = await supertest(app).delete(`${tasksRoute}/${testTaskId}`);
	it('should return JSON', async ({ expect }) => {
		expect(res.type).toBe('application/json');
	});
	it('should return 200 OK', async ({ expect }) => {
		expect(res.statusCode).toBe(200);
	});
	it('should return the deleted task', async ({ expect }) => {
		expect(res.body.task?._id).toBeDefined();
		expect(res.body.task._id).toEqual(testTaskId);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
