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
describe(`POST ${tasksRoute}`, () => {
	describe.concurrent('Valid POST', async () => {
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
		it('should be initialized as not completed', async ({ expect }) => {
			expect(res.body.task.completed).toBe(false);
		});
		testTaskId = res.body.task._id;
	});

	describe.concurrent('Invalid POST', async () => {
		const res = await supertest(app).post(tasksRoute).send({
			test: 'test'
		});
		it('should return JSON', async ({ expect }) => {
			expect(res.type).toBe('application/json');
		});
		it('should return 400 Bad Request', async ({ expect }) => {
			expect(res.statusCode).toBe(400);
		});
		it('should not return a task', async ({ expect }) => {
			expect(res.body.task).toBeUndefined();
		});
	});
});

describe(`GET ${tasksRoute}/:id`, () => {
	describe.concurrent(`Valid GET id`, async () => {
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

	describe.concurrent(`Invalid GET id (ID incorrect format)`, async () => {
		const res = await supertest(app).get(`${tasksRoute}/1234`);
		it('should return JSON', async ({ expect }) => {
			expect(res.type).toBe('application/json');
		});
		it('should return 400 Bad Request', async ({ expect }) => {
			expect(res.statusCode).toBe(400);
		});
		it('should not return a task', async ({ expect }) => {
			expect(res.body.task).toBeUndefined();
		});
	});

	describe.concurrent(`Invalid GET id (ID correct format)`, async () => {
		const fakeId = new mongoose.Types.ObjectId();
		const res = await supertest(app).get(`${tasksRoute}/${fakeId}`);
		it('should return JSON', async ({ expect }) => {
			expect(res.type).toBe('application/json');
		});
		it('should return 404 Not Found', async ({ expect }) => {
			expect(res.statusCode).toBe(404);
		});
		it('should not return a task', async ({ expect }) => {
			expect(res.body.task).toBeUndefined();
		});
	});
});

describe(`PATCH ${tasksRoute}/:id`, () => {
	describe.concurrent(`Valid PATCH (name and completed)`, async () => {
		const testName = 'Task testing...';
		const completed = true;
		const res = await supertest(app).patch(`${tasksRoute}/${testTaskId}`).send({
			name: testName,
			completed
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
		it('should return the correct task (by id)', async ({ expect }) => {
			expect(res.body.task?._id).toBeDefined();
			expect(res.body.task._id).toEqual(testTaskId);
		});
		it('should return correct task name', async ({ expect }) => {
			expect(res.body.task.name).toBe(testName);
		});
		it('should set completed accordingly', async ({ expect }) => {
			expect(res.body.task.completed).toBe(completed);
		});
	});

	describe.concurrent(`Valid PATCH (completed)`, async () => {
		const completed = false;
		const res = await supertest(app).patch(`${tasksRoute}/${testTaskId}`).send({
			completed
		});
		it('should return JSON', async ({ expect }) => {
			expect(res.type).toBe('application/json');
		});
		it('should return 200 OK', async ({ expect }) => {
			expect(res.statusCode).toBe(200);
		});
		it('should return the correct task (by id)', async ({ expect }) => {
			expect(res.body.task?._id).toBeDefined();
			expect(res.body.task._id).toEqual(testTaskId);
		});
		it('should return updated task', async ({ expect }) => {
			expect(res.body.task).toBeDefined();
		});
		it('should set completed accordingly', async ({ expect }) => {
			expect(res.body.task.completed).toBe(completed);
		});
	});

	describe.concurrent(`Valid PATCH (name only)`, async () => {
		const testName = 'Task name only test';
		const res = await supertest(app).patch(`${tasksRoute}/${testTaskId}`).send({
			name: testName
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
		it('should return the correct task (by id)', async ({ expect }) => {
			expect(res.body.task?._id).toBeDefined();
			expect(res.body.task._id).toEqual(testTaskId);
		});
		it('should return correct task name', async ({ expect }) => {
			expect(res.body.task.name).toBe(testName);
		});
	});

	describe.concurrent('Invalid PATCH', async () => {
		const res = await supertest(app).patch(`${tasksRoute}/${testTaskId}`).send({
			fake: 'test'
		});
		it('should return JSON', async ({ expect }) => {
			expect(res.type).toBe('application/json');
		});
		it('should return 400 Bad Request', async ({ expect }) => {
			expect(res.statusCode).toBe(400);
		});
		it('should not return a task', async ({ expect }) => {
			expect(res.body.task).toBeUndefined();
		});
	});

	describe.concurrent('Invalid PATCH (ID incorrect format)', async () => {
		const res = await supertest(app).patch(`${tasksRoute}/1234`).send({
			completed: true
		});
		it('should return JSON', async ({ expect }) => {
			expect(res.type).toBe('application/json');
		});
		it('should return 400 Bad Request', async ({ expect }) => {
			expect(res.statusCode).toBe(400);
		});
		it('should not return a task', async ({ expect }) => {
			expect(res.body.task).toBeUndefined();
		});
	});

	describe.concurrent('Invalid PATCH (ID correct format)', async () => {
		const fakeId = new mongoose.Types.ObjectId();
		const res = await supertest(app).patch(`${tasksRoute}/${fakeId}`).send({
			completed: true
		});
		it('should return JSON', async ({ expect }) => {
			expect(res.type).toBe('application/json');
		});
		it('should return 404 Not Found', async ({ expect }) => {
			expect(res.statusCode).toBe(404);
		});
		it('should not return a task', async ({ expect }) => {
			expect(res.body.task).toBeUndefined();
		});
	});
});

describe(`DELETE ${tasksRoute}/:id`, () => {
	describe.concurrent(`Valid DELETE`, async () => {
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

	describe.concurrent(`Invalid DELETE (ID incorrect format)`, async () => {
		const res = await supertest(app).delete(`${tasksRoute}/1234`);
		it('should return JSON', async ({ expect }) => {
			expect(res.type).toBe('application/json');
		});
		it('should return 400 Bad Request', async ({ expect }) => {
			expect(res.statusCode).toBe(400);
		});
		it('should not return a task', async ({ expect }) => {
			expect(res.body.task).toBeUndefined();
		});
	});

	describe.concurrent(`Invalid DELETE (ID correct format)`, async () => {
		const fakeId = new mongoose.Types.ObjectId();
		const res = await supertest(app).delete(`${tasksRoute}/${fakeId}`);
		it('should return JSON', async ({ expect }) => {
			expect(res.type).toBe('application/json');
		});
		it('should return 404 Not Found', async ({ expect }) => {
			expect(res.statusCode).toBe(404);
		});
		it('should not return a task', async ({ expect }) => {
			expect(res.body.task).toBeUndefined();
		});
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
