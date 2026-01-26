const request = require('supertest');
const app = require('../server');

describe('Tables API', () => {
    describe('GET /tables', () => {
        it('should return all tables', async () => {
            const res = await request(app).get('/tables');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        });

        it('should return tables with correct fields', async () => {
            const res = await request(app).get('/tables');
            expect(res.statusCode).toBe(200);
            const table = res.body[0];
            expect(table).toHaveProperty('id');
            expect(table).toHaveProperty('tableNumber');
            expect(table).toHaveProperty('section');
            expect(table).toHaveProperty('capacity');
            expect(table).toHaveProperty('status');
        });
    });

    describe('GET /tables/:id', () => {
        it('should return a single table', async () => {
            const res = await request(app).get('/tables/1');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id', 1);
        });

        it('should return 404 for non-existent table', async () => {
            const res = await request(app).get('/tables/99999');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error', 'Table not found');
        });
    });

    describe('POST /tables', () => {
        it('should create new table with valid data', async () => {
            const newTable = {
                tableNumber: 20,
                section: 'Patio',
                capacity: 4,
                status: 'available'
            };
            const res = await request(app)
                .post('/tables')
                .send(newTable);
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.tableNumber).toBe(20);
            expect(res.body.section).toBe('Patio');
        });

        it('should reject invalid table status', async () => {
            const invalidTable = {
                tableNumber: 11,
                section: 'Patio',
                capacity: 4,
                status: 'invalid_status'
            };
            const res = await request(app)
                .post('/tables')
                .send(invalidTable);
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Validation Error');
        });

        it('should reject invalid capacity', async () => {
            const invalidTable = {
                tableNumber: 12,
                section: 'Patio',
                capacity: 20,  // Too high
                status: 'available'
            };
            const res = await request(app)
                .post('/tables')
                .send(invalidTable);
            expect(res.statusCode).toBe(400);
        });

        it('should reject missing required fields', async () => {
            const invalidTable = {
                tableNumber: 13
                // Missing section, capacity, status
            };
            const res = await request(app)
                .post('/tables')
                .send(invalidTable);
            expect(res.statusCode).toBe(400);
        });
    });

    describe('PUT /tables/:id', () => {
        it('should update existing table', async () => {
            const updatedTable = {
                tableNumber: 5,
                section: 'Main Dining',
                capacity: 6,
                status: 'occupied'
            };
            const res = await request(app)
                .put('/tables/1')
                .send(updatedTable);
            expect(res.statusCode).toBe(200);
            expect(res.body.capacity).toBe(6);
        });

        it('should return 404 for non-existent table', async () => {
            const updatedTable = {
                tableNumber: 99,
                section: 'Patio',
                capacity: 4,
                status: 'available'
            };
            const res = await request(app)
                .put('/tables/99999')
                .send(updatedTable);
            expect(res.statusCode).toBe(404);
        });

        it('should reject invalid data on update', async () => {
            const invalidTable = {
                tableNumber: 5,
                section: 'InvalidSection',
                capacity: 4,
                status: 'available'
            };
            const res = await request(app)
                .put('/tables/1')
                .send(invalidTable);
            expect(res.statusCode).toBe(400);
        });
    });

    describe('DELETE /tables/:id', () => {
        it('should delete existing table', async () => {
            // First create a table to delete
            const newTable = {
                tableNumber: 99,
                section: 'Bar Area',
                capacity: 2,
                status: 'available'
            };
            const createRes = await request(app)
                .post('/tables')
                .send(newTable);
            const tableId = createRes.body.id;

            // Now delete it
            const res = await request(app).delete(`/tables/${tableId}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message');

            // Verify it's deleted
            const getRes = await request(app).get(`/tables/${tableId}`);
            expect(getRes.statusCode).toBe(404);
        });

        it('should return 404 for non-existent table', async () => {
            const res = await request(app).delete('/tables/99999');
            expect(res.statusCode).toBe(404);
        });
    });
});
