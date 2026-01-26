const request = require('supertest');
const app = require('../server');

describe('Orders API', () => {
    describe('GET /orders', () => {
        it('should return all orders', async () => {
            const res = await request(app).get('/orders');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        });

        it('should return orders with correct fields', async () => {
            const res = await request(app).get('/orders');
            expect(res.statusCode).toBe(200);
            const order = res.body[0];
            expect(order).toHaveProperty('id');
            expect(order).toHaveProperty('tableId');
            expect(order).toHaveProperty('menuItemId');
            expect(order).toHaveProperty('quantity');
            expect(order).toHaveProperty('status');
            expect(order).toHaveProperty('specialInstructions');
        });
    });

    describe('GET /orders/:id', () => {
        it('should return a single order', async () => {
            const res = await request(app).get('/orders/1');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id', 1);
        });

        it('should return 404 for non-existent order', async () => {
            const res = await request(app).get('/orders/99999');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error', 'Order not found');
        });
    });

    describe('POST /orders', () => {
        it('should create new order with valid data', async () => {
            const newOrder = {
                tableId: 1,
                menuItemId: 2,
                quantity: 2,
                status: 'received',
                specialInstructions: 'No onions'
            };
            const res = await request(app)
                .post('/orders')
                .send(newOrder);
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.tableId).toBe(1);
            expect(res.body.menuItemId).toBe(2);
            expect(res.body.specialInstructions).toBe('No onions');
        });

        it('should create order without special instructions', async () => {
            const newOrder = {
                tableId: 2,
                menuItemId: 1,
                quantity: 1,
                status: 'received'
                // No specialInstructions
            };
            const res = await request(app)
                .post('/orders')
                .send(newOrder);
            expect(res.statusCode).toBe(201);
            expect(res.body.specialInstructions == null).toBe(true); // Accept null or undefined
        });

        it('should reject invalid order status', async () => {
            const invalidOrder = {
                tableId: 1,
                menuItemId: 2,
                quantity: 2,
                status: 'invalid_status'
            };
            const res = await request(app)
                .post('/orders')
                .send(invalidOrder);
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Validation Error');
        });

        it('should reject quantity out of range', async () => {
            const invalidOrder = {
                tableId: 1,
                menuItemId: 2,
                quantity: 25,  // Too high
                status: 'received'
            };
            const res = await request(app)
                .post('/orders')
                .send(invalidOrder);
            expect(res.statusCode).toBe(400);
        });

        it('should reject missing required fields', async () => {
            const invalidOrder = {
                tableId: 1
                // Missing menuItemId, quantity, status
            };
            const res = await request(app)
                .post('/orders')
                .send(invalidOrder);
            expect(res.statusCode).toBe(400);
        });

        it('should reject special instructions over 200 characters', async () => {
            const longInstructions = 'a'.repeat(201);
            const invalidOrder = {
                tableId: 1,
                menuItemId: 2,
                quantity: 2,
                status: 'received',
                specialInstructions: longInstructions
            };
            const res = await request(app)
                .post('/orders')
                .send(invalidOrder);
            expect(res.statusCode).toBe(400);
        });
    });

    describe('PUT /orders/:id', () => {
        it('should update existing order', async () => {
            const updatedOrder = {
                tableId: 1,
                menuItemId: 1,
                quantity: 3,
                status: 'preparing',
                specialInstructions: 'Extra sauce'
            };
            const res = await request(app)
                .put('/orders/1')
                .send(updatedOrder);
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe('preparing');
            expect(res.body.quantity).toBe(3);
        });

        it('should update order status workflow', async () => {
            // Test status progression: received -> preparing -> ready -> served
            const statuses = ['received', 'preparing', 'ready', 'served'];

            for (const status of statuses) {
                const updatedOrder = {
                    tableId: 1,
                    menuItemId: 1,
                    quantity: 2,
                    status: status
                };
                const res = await request(app)
                    .put('/orders/1')
                    .send(updatedOrder);
                expect(res.statusCode).toBe(200);
                expect(res.body.status).toBe(status);
            }
        });

        it('should return 404 for non-existent order', async () => {
            const updatedOrder = {
                tableId: 1,
                menuItemId: 1,
                quantity: 2,
                status: 'received'
            };
            const res = await request(app)
                .put('/orders/99999')
                .send(updatedOrder);
            expect(res.statusCode).toBe(404);
        });

        it('should reject invalid data on update', async () => {
            const invalidOrder = {
                tableId: 1,
                menuItemId: 1,
                quantity: 2,
                status: 'bad_status'
            };
            const res = await request(app)
                .put('/orders/1')
                .send(invalidOrder);
            expect(res.statusCode).toBe(400);
        });
    });

    describe('DELETE /orders/:id', () => {
        it('should delete existing order', async () => {
            // First create an order to delete
            const newOrder = {
                tableId: 3,
                menuItemId: 3,
                quantity: 1,
                status: 'cancelled'
            };
            const createRes = await request(app)
                .post('/orders')
                .send(newOrder);
            const orderId = createRes.body.id;

            // Now delete it
            const res = await request(app).delete(`/orders/${orderId}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message');

            // Verify it's deleted
            const getRes = await request(app).get(`/orders/${orderId}`);
            expect(getRes.statusCode).toBe(404);
        });

        it('should return 404 for non-existent order', async () => {
            const res = await request(app).delete('/orders/99999');
            expect(res.statusCode).toBe(404);
        });
    });
});
