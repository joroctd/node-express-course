import supertest from 'supertest';
import app from '../app.js';
import { describe, it } from 'vitest';

describe.concurrent('GET /', async () => {
	const res = await supertest(app).get('/');
	it('should return HTML', async ({ expect }) => {
		expect(res.type).toBe('text/html');
	});
	it('should return 200 OK', async ({ expect }) => {
		expect(res.statusCode).toBe(200);
	});
});
