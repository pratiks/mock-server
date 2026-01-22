const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`\n${req.method} ${req.path}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

app.use(express.static('public'));

// Initialize SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('✓ Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database schema
function initializeDatabase() {
    // Create users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            age INTEGER NOT NULL
        )
    `, (err) => {
        if (err) console.error('Error creating users table:', err.message);
        else console.log('✓ Users table ready');
    });

    // Create products table
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            category TEXT NOT NULL
        )
    `, (err) => {
        if (err) console.error('Error creating products table:', err.message);
        else console.log('✓ Products table ready');
    });

    // Create orders table
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            productId INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            status TEXT NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (productId) REFERENCES products(id)
        )
    `, (err) => {
        if (err) console.error('Error creating orders table:', err.message);
        else console.log('✓ Orders table ready');
        
        // Check if tables are empty and seed data
        seedDataIfEmpty();
    });
}

// Seed initial data if tables are empty
function seedDataIfEmpty() {
    db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
        if (err) {
            console.error('Error checking users:', err.message);
            return;
        }
        
        if (row.count === 0) {
            console.log('Seeding initial data...');
            
            // Seed users
            const users = [
                ['Alice Johnson', 'alice@example.com', 28],
                ['Bob Smith', 'bob@example.com', 34],
                ['Charlie Brown', 'charlie@example.com', 22]
            ];
            
            const userStmt = db.prepare('INSERT INTO users (name, email, age) VALUES (?, ?, ?)');
            users.forEach(user => userStmt.run(user));
            userStmt.finalize();
            
            // Seed products
            const products = [
                ['Laptop', 999.99, 'Electronics'],
                ['Desk Chair', 299.99, 'Furniture'],
                ['Coffee Maker', 79.99, 'Appliances']
            ];
            
            const productStmt = db.prepare('INSERT INTO products (name, price, category) VALUES (?, ?, ?)');
            products.forEach(product => productStmt.run(product));
            productStmt.finalize();
            
            // Seed orders
            const orders = [
                [1, 1, 1, 'delivered'],
                [2, 2, 2, 'pending'],
                [3, 3, 1, 'shipped']
            ];
            
            const orderStmt = db.prepare('INSERT INTO orders (userId, productId, quantity, status) VALUES (?, ?, ?, ?)');
            orders.forEach(order => orderStmt.run(order));
            orderStmt.finalize();
            
            console.log('✓ Initial data seeded');
        }
    });
}

// ==================== USERS ENDPOINTS ====================

// GET all users
app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET single user
app.get('/users/:id', (req, res) => {
    db.get('SELECT * FROM users WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            console.error('Error fetching user:', err.message);
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(row);
    });
});

// POST new user
app.post('/users', (req, res) => {
    console.log('\n=== POST /users ===');
    console.log('Request body:', req.body);
    
    const { name, email, age } = req.body;
    
    // Validation
    if (!name || !email || !age) {
        console.error('Validation failed: Missing fields');
        return res.status(400).json({ 
            error: 'Validation Error', 
            details: 'name, email, and age are required' 
        });
    }
    
    if (typeof age !== 'number' || age <= 0) {
        console.error('Validation failed: Invalid age');
        return res.status(400).json({ 
            error: 'Validation Error', 
            details: 'age must be a positive number' 
        });
    }
    
    db.run(
        'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
        [name, email, age],
        function(err) {
            if (err) {
                console.error('Error inserting user:', err.message);
                return res.status(500).json({ error: err.message });
            }
            
            const newUser = { id: this.lastID, name, email, age };
            console.log('✓ User created:', newUser);
            res.status(201).json(newUser);
        }
    );
});

// PUT update user
app.put('/users/:id', (req, res) => {
    console.log('\n=== PUT /users/:id ===');
    console.log('Request body:', req.body);
    
    const { name, email, age } = req.body;
    const { id } = req.params;
    
    // Validation
    if (!name || !email || !age) {
        return res.status(400).json({ 
            error: 'Validation Error', 
            details: 'name, email, and age are required' 
        });
    }
    
    db.run(
        'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
        [name, email, age, id],
        function(err) {
            if (err) {
                console.error('Error updating user:', err.message);
                return res.status(500).json({ error: err.message });
            }
            
            if (this.changes === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            const updatedUser = { id: parseInt(id), name, email, age };
            console.log('✓ User updated:', updatedUser);
            res.json(updatedUser);
        }
    );
});

// DELETE user
app.delete('/users/:id', (req, res) => {
    console.log('\n=== DELETE /users/:id ===');
    console.log('User ID:', req.params.id);
    
    db.run('DELETE FROM users WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            console.error('Error deleting user:', err.message);
            return res.status(500).json({ error: err.message });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        console.log('✓ User deleted');
        res.json({ message: 'User deleted successfully' });
    });
});

// ==================== PRODUCTS ENDPOINTS ====================

// GET all products
app.get('/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET single product
app.get('/products/:id', (req, res) => {
    db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(row);
    });
});

// POST new product
app.post('/products', (req, res) => {
    console.log('\n=== POST /products ===');
    console.log('Request body:', req.body);
    
    const { name, price, category } = req.body;
    
    if (!name || !price || !category) {
        return res.status(400).json({ 
            error: 'Validation Error', 
            details: 'name, price, and category are required' 
        });
    }
    
    db.run(
        'INSERT INTO products (name, price, category) VALUES (?, ?, ?)',
        [name, price, category],
        function(err) {
            if (err) {
                console.error('Error inserting product:', err.message);
                return res.status(500).json({ error: err.message });
            }
            
            const newProduct = { id: this.lastID, name, price, category };
            console.log('✓ Product created:', newProduct);
            res.status(201).json(newProduct);
        }
    );
});

// PUT update product
app.put('/products/:id', (req, res) => {
    console.log('\n=== PUT /products/:id ===');
    console.log('Request body:', req.body);
    
    const { name, price, category } = req.body;
    const { id } = req.params;
    
    if (!name || !price || !category) {
        return res.status(400).json({ 
            error: 'Validation Error', 
            details: 'name, price, and category are required' 
        });
    }
    
    db.run(
        'UPDATE products SET name = ?, price = ?, category = ? WHERE id = ?',
        [name, price, category, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            
            const updatedProduct = { id: parseInt(id), name, price, category };
            console.log('✓ Product updated:', updatedProduct);
            res.json(updatedProduct);
        }
    );
});

// DELETE product
app.delete('/products/:id', (req, res) => {
    console.log('\n=== DELETE /products/:id ===');
    
    db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        console.log('✓ Product deleted');
        res.json({ message: 'Product deleted successfully' });
    });
});

// ==================== ORDERS ENDPOINTS ====================

// GET all orders
app.get('/orders', (req, res) => {
    db.all('SELECT * FROM orders', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET single order
app.get('/orders/:id', (req, res) => {
    db.get('SELECT * FROM orders WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(row);
    });
});

// POST new order
app.post('/orders', (req, res) => {
    console.log('\n=== POST /orders ===');
    console.log('Request body:', req.body);
    
    const { userId, productId, quantity, status } = req.body;
    
    if (!userId || !productId || !quantity || !status) {
        return res.status(400).json({ 
            error: 'Validation Error', 
            details: 'userId, productId, quantity, and status are required' 
        });
    }
    
    db.run(
        'INSERT INTO orders (userId, productId, quantity, status) VALUES (?, ?, ?, ?)',
        [userId, productId, quantity, status],
        function(err) {
            if (err) {
                console.error('Error inserting order:', err.message);
                return res.status(500).json({ error: err.message });
            }
            
            const newOrder = { id: this.lastID, userId, productId, quantity, status };
            console.log('✓ Order created:', newOrder);
            res.status(201).json(newOrder);
        }
    );
});

// PUT update order
app.put('/orders/:id', (req, res) => {
    console.log('\n=== PUT /orders/:id ===');
    console.log('Request body:', req.body);
    
    const { userId, productId, quantity, status } = req.body;
    const { id } = req.params;
    
    if (!userId || !productId || !quantity || !status) {
        return res.status(400).json({ 
            error: 'Validation Error', 
            details: 'userId, productId, quantity, and status are required' 
        });
    }
    
    db.run(
        'UPDATE orders SET userId = ?, productId = ?, quantity = ? WHERE id = ?',
        [userId, productId, quantity, status, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Order not found' });
            }
            
            const updatedOrder = { id: parseInt(id), userId, productId, quantity, status };
            console.log('✓ Order updated:', updatedOrder);
            res.json(updatedOrder);
        }
    );
});

// DELETE order
app.delete('/orders/:id', (req, res) => {
    console.log('\n=== DELETE /orders/:id ===');
    
    db.run('DELETE FROM orders WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        console.log('✓ Order deleted');
        res.json({ message: 'Order deleted successfully' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n✓ API Training Server running on http://localhost:${PORT}`);
    console.log(`✓ Using SQLite database: ./database.db`);
    console.log(`\nAvailable endpoints:`);
    console.log(`  GET    /users`);
    console.log(`  GET    /users/:id`);
    console.log(`  POST   /users`);
    console.log(`  PUT    /users/:id`);
    console.log(`  DELETE /users/:id`);
    console.log(`  (Same pattern for /products and /orders)\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('\n✓ Database connection closed');
        }
        process.exit(0);
    });
});
