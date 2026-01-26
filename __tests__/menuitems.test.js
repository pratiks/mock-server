const request = require('supertest');
const app = require('../server');

describe('MenuItems API', () => {
    describe('GET /menuitems', () => {
        it('should return all menu items', async () => {
            const res = await request(app).get('/menuitems');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        });

        it('should return menu items with correct fields', async () => {
            const res = await request(app).get('/menuitems');
            expect(res.statusCode).toBe(200);
            const item = res.body[0];
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('name');
            expect(item).toHaveProperty('price');
            expect(item).toHaveProperty('category');
            expect(item).toHaveProperty('available');
        });
    });

    describe('GET /menuitems/:id', () => {
        it('should return a single menu item', async () => {
            const res = await request(app).get('/menuitems/1');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id', 1);
        });

        it('should return 404 for non-existent menu item', async () => {
            const res = await request(app).get('/menuitems/99999');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error', 'Menu item not found');
        });
    });

    describe('POST /menuitems', () => {
        it('should create new menu item with valid data', async () => {
            const newItem = {
                name: 'Grilled Salmon',
                price: 18.99,
                category: 'Main Course',
                available: true
            };
            const res = await request(app)
                .post('/menuitems')
                .send(newItem);
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.name).toBe('Grilled Salmon');
            expect(res.body.price).toBe(18.99);
        });

        it('should reject invalid category', async () => {
            const invalidItem = {
                name: 'Test Item',
                price: 10.99,
                category: 'InvalidCategory',
                available: true
            };
            const res = await request(app)
                .post('/menuitems')
                .send(invalidItem);
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Validation Error');
        });

        it('should reject price out of range', async () => {
            const invalidItem = {
                name: 'Expensive Item',
                price: 1500.00,  // Too high
                category: 'Main Course',
                available: true
            };
            const res = await request(app)
                .post('/menuitems')
                .send(invalidItem);
            expect(res.statusCode).toBe(400);
        });

        it('should reject missing required fields', async () => {
            const invalidItem = {
                name: 'Test Item'
                // Missing price and category
            };
            const res = await request(app)
                .post('/menuitems')
                .send(invalidItem);
            expect(res.statusCode).toBe(400);
        });

        it('should default available to true if not provided', async () => {
            const newItem = {
                name: 'Default Item',
                price: 12.99,
                category: 'Dessert'
                // available not provided
            };
            const res = await request(app)
                .post('/menuitems')
                .send(newItem);
            expect(res.statusCode).toBe(201);
            expect(res.body.available).toBe(1); // SQLite stores as 1
        });
    });

    describe('PUT /menuitems/:id', () => {
        it('should update existing menu item', async () => {
            const updatedItem = {
                name: 'Updated Pizza',
                price: 14.99,
                category: 'Main Course',
                available: true
            };
            const res = await request(app)
                .put('/menuitems/1')
                .send(updatedItem);
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe('Updated Pizza');
            expect(res.body.price).toBe(14.99);
        });

        it('should return 404 for non-existent menu item', async () => {
            const updatedItem = {
                name: 'Test',
                price: 10.99,
                category: 'Appetizer',
                available: true
            };
            const res = await request(app)
                .put('/menuitems/99999')
                .send(updatedItem);
            expect(res.statusCode).toBe(404);
        });

        it('should toggle availability', async () => {
            const updatedItem = {
                name: 'Margherita Pizza',
                price: 12.99,
                category: 'Main Course',
                available: false
            };
            const res = await request(app)
                .put('/menuitems/1')
                .send(updatedItem);
            expect(res.statusCode).toBe(200);
            expect(res.body.available).toBe(0); // SQLite stores false as 0
        });
    });

    describe('DELETE /menuitems/:id', () => {
        it('should delete existing menu item', async () => {
            // First create an item to delete
            const newItem = {
                name: 'Temp Item',
                price: 9.99,
                category: 'Side',
                available: true
            };
            const createRes = await request(app)
                .post('/menuitems')
                .send(newItem);
            const itemId = createRes.body.id;

            // Now delete it
            const res = await request(app).delete(`/menuitems/${itemId}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message');

            // Verify it's deleted
            const getRes = await request(app).get(`/menuitems/${itemId}`);
            expect(getRes.statusCode).toBe(404);
        });

        it('should return 404 for non-existent menu item', async () => {
            const res = await request(app).delete('/menuitems/99999');
            expect(res.statusCode).toBe(404);
        });
    });
});
