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
    // Create tables table
    db.run(`
        CREATE TABLE IF NOT EXISTS tables (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tableNumber INTEGER NOT NULL,
            section TEXT NOT NULL,
            capacity INTEGER NOT NULL,
            status TEXT NOT NULL
        )
    `, (err) => {
        if (err) console.error('Error creating tables table:', err.message);
        else console.log('✓ Tables table ready');
    });

    // Create menuitems table
    db.run(`
        CREATE TABLE IF NOT EXISTS menuitems (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            category TEXT NOT NULL,
            available INTEGER NOT NULL DEFAULT 1
        )
    `, (err) => {
        if (err) console.error('Error creating menuitems table:', err.message);
        else console.log('✓ MenuItems table ready');
    });

    // Create orders table
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tableId INTEGER NOT NULL,
            menuItemId INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            status TEXT NOT NULL,
            specialInstructions TEXT,
            FOREIGN KEY (tableId) REFERENCES tables(id),
            FOREIGN KEY (menuItemId) REFERENCES menuitems(id)
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
    db.get('SELECT COUNT(*) as count FROM tables', (err, row) => {
        if (err) {
            console.error('Error checking tables:', err.message);
            return;
        }

        if (row.count === 0) {
            console.log('Seeding initial data...');

            // Seed tables
            const tables = [
                [5, 'Patio', 4, 'occupied'],
                [12, 'Main Dining', 6, 'available'],
                [3, 'Bar Area', 2, 'reserved']
            ];

            const tableStmt = db.prepare('INSERT INTO tables (tableNumber, section, capacity, status) VALUES (?, ?, ?, ?)');
            tables.forEach(table => tableStmt.run(table));
            tableStmt.finalize();

            // Seed menuitems
            const menuitems = [
                ['Margherita Pizza', 12.99, 'Main Course', 1],
                ['Caesar Salad', 8.99, 'Appetizer', 1],
                ['Tiramisu', 7.50, 'Dessert', 0]
            ];

            const menuStmt = db.prepare('INSERT INTO menuitems (name, price, category, available) VALUES (?, ?, ?, ?)');
            menuitems.forEach(item => menuStmt.run(item));
            menuStmt.finalize();

            // Seed orders
            const orders = [
                [1, 1, 2, 'preparing', 'No olives'],
                [2, 2, 1, 'received', null],
                [1, 3, 3, 'served', 'Extra whipped cream']
            ];

            const orderStmt = db.prepare('INSERT INTO orders (tableId, menuItemId, quantity, status, specialInstructions) VALUES (?, ?, ?, ?, ?)');
            orders.forEach(order => orderStmt.run(order));
            orderStmt.finalize();

            console.log('✓ Initial data seeded');
        }
    });
}

// ==================== VALIDATION ====================

// Validation constants
const VALID_TABLE_STATUSES = ['available', 'occupied', 'reserved', 'cleaning'];
const VALID_ORDER_STATUSES = ['received', 'preparing', 'ready', 'served', 'cancelled'];
const VALID_MENU_CATEGORIES = ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Side'];
const VALID_SECTIONS = ['Main Dining', 'Patio', 'Bar Area', 'Private Room'];

function validateTable(data) {
    const errors = [];
    if (!data.tableNumber || typeof data.tableNumber !== 'number' || data.tableNumber < 1) {
        errors.push('tableNumber must be a positive number');
    }
    if (!data.section || !VALID_SECTIONS.includes(data.section)) {
        errors.push(`section must be one of: ${VALID_SECTIONS.join(', ')}`);
    }
    if (!data.capacity || typeof data.capacity !== 'number' || data.capacity < 1 || data.capacity > 12) {
        errors.push('capacity must be between 1 and 12');
    }
    if (!data.status || !VALID_TABLE_STATUSES.includes(data.status)) {
        errors.push(`status must be one of: ${VALID_TABLE_STATUSES.join(', ')}`);
    }
    return errors;
}

function validateMenuItem(data) {
    const errors = [];
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
        errors.push('name is required and must be a non-empty string');
    }
    if (data.name && data.name.length > 100) {
        errors.push('name must be 100 characters or less');
    }
    if (data.price === undefined || typeof data.price !== 'number' || data.price < 0 || data.price > 999.99) {
        errors.push('price must be a number between 0 and 999.99');
    }
    if (!data.category || !VALID_MENU_CATEGORIES.includes(data.category)) {
        errors.push(`category must be one of: ${VALID_MENU_CATEGORIES.join(', ')}`);
    }
    return errors;
}

function validateOrder(data) {
    const errors = [];
    if (!data.tableId || typeof data.tableId !== 'number' || data.tableId < 1) {
        errors.push('tableId must be a positive number');
    }
    if (!data.menuItemId || typeof data.menuItemId !== 'number' || data.menuItemId < 1) {
        errors.push('menuItemId must be a positive number');
    }
    if (!data.quantity || typeof data.quantity !== 'number' || data.quantity < 1 || data.quantity > 20) {
        errors.push('quantity must be between 1 and 20');
    }
    if (!data.status || !VALID_ORDER_STATUSES.includes(data.status)) {
        errors.push(`status must be one of: ${VALID_ORDER_STATUSES.join(', ')}`);
    }
    if (data.specialInstructions && data.specialInstructions.length > 200) {
        errors.push('specialInstructions must be 200 characters or less');
    }
    return errors;
}

// ==================== TABLES ENDPOINTS ====================

// GET all tables
app.get('/tables', (req, res) => {
    db.all('SELECT * FROM tables', [], (err, rows) => {
        if (err) {
            console.error('Error fetching tables:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET single table
app.get('/tables/:id', (req, res) => {
    db.get('SELECT * FROM tables WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            console.error('Error fetching table:', err.message);
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Table not found' });
        }
        res.json(row);
    });
});

// POST new table
app.post('/tables', (req, res) => {
    console.log('\n=== POST /tables ===');
    console.log('Request body:', req.body);

    const { tableNumber, section, capacity, status } = req.body;

    // Validation
    const errors = validateTable(req.body);
    if (errors.length > 0) {
        console.error('Validation failed:', errors);
        return res.status(400).json({
            error: 'Validation Error',
            details: errors
        });
    }

    db.run(
        'INSERT INTO tables (tableNumber, section, capacity, status) VALUES (?, ?, ?, ?)',
        [tableNumber, section, capacity, status],
        function(err) {
            if (err) {
                console.error('Error inserting table:', err.message);
                return res.status(500).json({ error: err.message });
            }

            const newTable = { id: this.lastID, tableNumber, section, capacity, status };
            console.log('✓ Table created:', newTable);
            res.status(201).json(newTable);
        }
    );
});

// PUT update table
app.put('/tables/:id', (req, res) => {
    console.log('\n=== PUT /tables/:id ===');
    console.log('Request body:', req.body);

    const { tableNumber, section, capacity, status } = req.body;
    const { id } = req.params;

    // Validation
    const errors = validateTable(req.body);
    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Validation Error',
            details: errors
        });
    }

    db.run(
        'UPDATE tables SET tableNumber = ?, section = ?, capacity = ?, status = ? WHERE id = ?',
        [tableNumber, section, capacity, status, id],
        function(err) {
            if (err) {
                console.error('Error updating table:', err.message);
                return res.status(500).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: 'Table not found' });
            }

            const updatedTable = { id: parseInt(id), tableNumber, section, capacity, status };
            console.log('✓ Table updated:', updatedTable);
            res.json(updatedTable);
        }
    );
});

// DELETE table
app.delete('/tables/:id', (req, res) => {
    console.log('\n=== DELETE /tables/:id ===');
    console.log('Table ID:', req.params.id);

    db.run('DELETE FROM tables WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            console.error('Error deleting table:', err.message);
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Table not found' });
        }

        console.log('✓ Table deleted');
        res.json({ message: 'Table deleted successfully' });
    });
});

// ==================== MENUITEMS ENDPOINTS ====================

// GET all menuitems
app.get('/menuitems', (req, res) => {
    db.all('SELECT * FROM menuitems', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET single menuitem
app.get('/menuitems/:id', (req, res) => {
    db.get('SELECT * FROM menuitems WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.json(row);
    });
});

// POST new menuitem
app.post('/menuitems', (req, res) => {
    console.log('\n=== POST /menuitems ===');
    console.log('Request body:', req.body);

    const { name, price, category, available } = req.body;
    const isAvailable = available !== undefined ? (available ? 1 : 0) : 1;

    // Validation
    const errors = validateMenuItem(req.body);
    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Validation Error',
            details: errors
        });
    }

    db.run(
        'INSERT INTO menuitems (name, price, category, available) VALUES (?, ?, ?, ?)',
        [name, price, category, isAvailable],
        function(err) {
            if (err) {
                console.error('Error inserting menu item:', err.message);
                return res.status(500).json({ error: err.message });
            }

            const newMenuItem = { id: this.lastID, name, price, category, available: isAvailable };
            console.log('✓ Menu item created:', newMenuItem);
            res.status(201).json(newMenuItem);
        }
    );
});

// PUT update menuitem
app.put('/menuitems/:id', (req, res) => {
    console.log('\n=== PUT /menuitems/:id ===');
    console.log('Request body:', req.body);

    const { name, price, category, available } = req.body;
    const { id } = req.params;
    const isAvailable = available !== undefined ? (available ? 1 : 0) : 1;

    // Validation
    const errors = validateMenuItem(req.body);
    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Validation Error',
            details: errors
        });
    }

    db.run(
        'UPDATE menuitems SET name = ?, price = ?, category = ?, available = ? WHERE id = ?',
        [name, price, category, isAvailable, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: 'Menu item not found' });
            }

            const updatedMenuItem = { id: parseInt(id), name, price, category, available: isAvailable };
            console.log('✓ Menu item updated:', updatedMenuItem);
            res.json(updatedMenuItem);
        }
    );
});

// DELETE menuitem
app.delete('/menuitems/:id', (req, res) => {
    console.log('\n=== DELETE /menuitems/:id ===');

    db.run('DELETE FROM menuitems WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        console.log('✓ Menu item deleted');
        res.json({ message: 'Menu item deleted successfully' });
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

    const { tableId, menuItemId, quantity, status, specialInstructions } = req.body;

    // Validation
    const errors = validateOrder(req.body);
    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Validation Error',
            details: errors
        });
    }

    db.run(
        'INSERT INTO orders (tableId, menuItemId, quantity, status, specialInstructions) VALUES (?, ?, ?, ?, ?)',
        [tableId, menuItemId, quantity, status, specialInstructions || null],
        function(err) {
            if (err) {
                console.error('Error inserting order:', err.message);
                return res.status(500).json({ error: err.message });
            }

            const newOrder = { id: this.lastID, tableId, menuItemId, quantity, status, specialInstructions };
            console.log('✓ Order created:', newOrder);
            res.status(201).json(newOrder);
        }
    );
});

// PUT update order
app.put('/orders/:id', (req, res) => {
    console.log('\n=== PUT /orders/:id ===');
    console.log('Request body:', req.body);

    const { tableId, menuItemId, quantity, status, specialInstructions } = req.body;
    const { id } = req.params;

    // Validation
    const errors = validateOrder(req.body);
    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Validation Error',
            details: errors
        });
    }

    db.run(
        'UPDATE orders SET tableId = ?, menuItemId = ?, quantity = ?, status = ?, specialInstructions = ? WHERE id = ?',
        [tableId, menuItemId, quantity, status, specialInstructions || null, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: 'Order not found' });
            }

            const updatedOrder = { id: parseInt(id), tableId, menuItemId, quantity, status, specialInstructions };
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

// Export app for testing
module.exports = app;

// Only start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`\n✓ Restaurant API Training Server running on http://localhost:${PORT}`);
        console.log(`✓ Using SQLite database: ./database.db`);
        console.log(`\nAvailable endpoints:`);
        console.log(`  GET    /tables`);
        console.log(`  GET    /tables/:id`);
        console.log(`  POST   /tables`);
        console.log(`  PUT    /tables/:id`);
        console.log(`  DELETE /tables/:id`);
        console.log(`  (Same pattern for /menuitems and /orders)\n`);
    });
}

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
