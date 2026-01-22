// API Base URL - dynamically detect the current server
const API_BASE = window.location.origin;

// Global state
let requestHistory = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadAllData();
    setupEventListeners();
    updateRequestBodyVisibility();
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('method').addEventListener('change', updateRequestBodyVisibility);
    document.getElementById('endpoint').addEventListener('change', updateEndpointUrl);
    document.getElementById('resourceId').addEventListener('input', updateEndpointUrl);
    document.getElementById('sendRequest').addEventListener('click', sendApiRequest);
    document.getElementById('refreshData').addEventListener('click', loadAllData);
    
    // Initialize endpoint URL
    updateEndpointUrl();
    
    // Modal close
    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('modal');
        if (e.target === modal) closeModal();
    });
}

// Update endpoint URL display
function updateEndpointUrl() {
    const method = document.getElementById('method').value;
    const endpoint = document.getElementById('endpoint').value;
    const resourceId = document.getElementById('resourceId').value;
    const endpointUrlField = document.getElementById('endpointUrl');
    
    let url = `${API_BASE}/${endpoint}`;
    if (resourceId && (method === 'PUT' || method === 'DELETE' || method === 'GET')) {
        url += `/${resourceId}`;
    }
    
    endpointUrlField.value = url;
}

// Update form visibility based on HTTP method
function updateRequestBodyVisibility() {
    const method = document.getElementById('method').value;
    const idRow = document.getElementById('id-row');
    const bodyRow = document.getElementById('body-row');
    const bodyTextarea = document.getElementById('requestBody');
    
    if (method === 'GET') {
        idRow.style.display = 'block';
        bodyRow.style.display = 'none';
        bodyTextarea.value = ''; // Clear body for GET requests
    } else if (method === 'POST') {
        idRow.style.display = 'none';
        bodyRow.style.display = 'block';
        // Pre-fill with example if empty
        if (!bodyTextarea.value || bodyTextarea.value.trim() === '') {
            bodyTextarea.value = getExampleBody();
        }
    } else if (method === 'PUT' || method === 'DELETE') {
        idRow.style.display = 'block';
        bodyRow.style.display = method === 'PUT' ? 'block' : 'none';
        if (method === 'PUT' && (!bodyTextarea.value || bodyTextarea.value.trim() === '')) {
            bodyTextarea.value = getExampleBody();
        } else if (method === 'DELETE') {
            bodyTextarea.value = ''; // Clear body for DELETE requests
        }
    }
    
    // Update endpoint URL when method changes
    updateEndpointUrl();
}

// Get example body based on endpoint
function getExampleBody() {
    const endpoint = document.getElementById('endpoint').value;
    const examples = {
        users: '{\n  "name": "John Doe",\n  "email": "john@example.com",\n  "age": 28\n}',
        products: '{\n  "name": "Tablet",\n  "price": 300,\n  "category": "Electronics"\n}',
        orders: '{\n  "userId": 1,\n  "productId": 2,\n  "quantity": 1,\n  "status": "pending"\n}'
    };
    return examples[endpoint] || '{}';
}

// Send API request
async function sendApiRequest() {
    console.log('\n=== API Tester: sendApiRequest called');
    
    const method = document.getElementById('method').value;
    const endpoint = document.getElementById('endpoint').value;
    const resourceId = document.getElementById('resourceId').value;
    
    // Get textarea value multiple ways to ensure we capture it
    const bodyTextarea = document.getElementById('requestBody');
    let requestBody = '';
    
    if (bodyTextarea) {
        requestBody = bodyTextarea.value || '';
        console.log('Textarea found, value length:', requestBody.length);
    } else {
        console.error('ERROR: requestBody textarea not found!');
    }
    
    requestBody = requestBody.trim();
    
    console.log('Request parameters:', { method, endpoint, resourceId });
    console.log('Request body:', requestBody);
    
    let url = `${API_BASE}/${endpoint}`;
    if (resourceId && (method === 'PUT' || method === 'DELETE' || method === 'GET')) {
        url += `/${resourceId}`;
    }
    
    console.log('Request URL:', url);
    
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    if ((method === 'POST' || method === 'PUT') && requestBody.length > 0) {
        console.log('Request body (raw):', requestBody);
        try {
            const parsed = JSON.parse(requestBody); // Validate JSON
            console.log('Request body (parsed):', parsed);
            console.log('Setting options.body to:', requestBody);
            options.body = requestBody;
        } catch (e) {
            console.error('Invalid JSON:', e.message);
            showResponse(400, { error: 'Invalid JSON in request body', details: e.message }, 0, true);
            return;
        }
    } else if (method === 'POST' || method === 'PUT') {
        console.error('ERROR: POST/PUT request with empty body!');
        alert('Error: You must provide a request body for POST/PUT requests.\n\nPlease enter valid JSON in the "Request Body (JSON):" field.\n\nExample:\n{\n  "name": "John Doe",\n  "email": "john@example.com",\n  "age": 28\n}');
        return;
    }
    
    console.log('Final fetch options:', JSON.stringify(options, null, 2));
    
    const startTime = performance.now();
    console.log('Sending request...');
    
    try {
        const response = await fetch(url, options);
        const endTime = performance.now();
        
        console.log('Response received. Status:', response.status);
        
        let data;
        try {
            data = await response.json();
            console.log('Response data:', data);
        } catch (e) {
            console.log('Response is not JSON');
            data = { message: 'Response was not JSON' };
        }
        
        showResponse(response.status, data, endTime - startTime, !response.ok);
        addToHistory(method, url, response.status);
        
        // Reload data after successful mutation
        if (response.ok && method !== 'GET') {
            console.log('Reloading data tables...');
            setTimeout(() => loadAllData(), 500);
        }
    } catch (error) {
        const endTime = performance.now();
        console.error('Request failed:', error);
        showResponse(500, { error: 'Request failed', details: error.message }, endTime - startTime, true);
        addToHistory(method, url, 500);
    }
}

// Show API response
function showResponse(status, data, time, isError = false) {
    const statusEl = document.getElementById('statusCode');
    const timeEl = document.getElementById('responseTime');
    const bodyEl = document.getElementById('responseBody');
    const responseSection = document.querySelector('.response-section');
    
    statusEl.textContent = `Status: ${status}`;
    statusEl.className = 'status-badge ' + (status >= 200 && status < 300 ? 'status-success' : 'status-error');
    timeEl.textContent = `${time.toFixed(2)}ms`;
    bodyEl.textContent = JSON.stringify(data, null, 2);
    
    // Add error styling if request failed
    if (isError) {
        responseSection.style.borderLeft = '4px solid #dc3545';
    } else {
        responseSection.style.borderLeft = '4px solid #28a745';
    }
}

// Add to request history
function addToHistory(method, url, status) {
    const timestamp = new Date().toLocaleTimeString();
    requestHistory.unshift({ method, url, status, timestamp });
    
    // Keep only last 10
    if (requestHistory.length > 10) {
        requestHistory = requestHistory.slice(0, 10);
    }
    
    renderHistory();
}

// Render request history
function renderHistory() {
    const historyEl = document.getElementById('requestHistory');
    
    if (requestHistory.length === 0) {
        historyEl.innerHTML = '<p style="color: #999;">No requests yet. Try making an API call above!</p>';
        return;
    }
    
    historyEl.innerHTML = requestHistory.map(item => `
        <div class="history-item">
            <div>
                <span class="method">${item.method}</span>
                <span class="url">${item.url}</span>
                <span class="status-badge ${item.status >= 200 && item.status < 300 ? 'status-success' : 'status-error'}" style="margin-left: 10px; font-size: 0.8em;">
                    ${item.status}
                </span>
            </div>
            <div class="timestamp">${item.timestamp}</div>
        </div>
    `).join('');
}

// Load all data
async function loadAllData() {
    await Promise.all([
        loadUsers(),
        loadProducts(),
        loadOrders()
    ]);
}

// Load users
async function loadUsers() {
    try {
        const response = await fetch(`${API_BASE}/users`);
        const users = await response.json();
        renderTable('usersTable', users, ['id', 'name', 'email', 'age'], 'users');
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Load products
async function loadProducts() {
    try {
        const response = await fetch(`${API_BASE}/products`);
        const products = await response.json();
        renderTable('productsTable', products, ['id', 'name', 'price', 'category'], 'products');
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Load orders
async function loadOrders() {
    try {
        const response = await fetch(`${API_BASE}/orders`);
        const orders = await response.json();
        renderTable('ordersTable', orders, ['id', 'userId', 'productId', 'quantity', 'status'], 'orders');
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

// Render table
function renderTable(tableId, data, columns, resourceType) {
    const table = document.getElementById(tableId);
    const tbody = table.querySelector('tbody');
    
    tbody.innerHTML = data.map(item => `
        <tr>
            ${columns.map(col => `<td>${item[col] !== undefined ? item[col] : ''}</td>`).join('')}
            <td>
                <button class="btn btn-warning" onclick="editItem('${resourceType}', ${item.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteItem('${resourceType}', ${item.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Show add form
function showAddForm(resourceType) {
    console.log('\\n=== showAddForm called for:', resourceType);
    
    const modal = document.getElementById('modal');
    const title = document.getElementById('modalTitle');
    const formContainer = document.getElementById('modalForm');
    
    // Clear any previous form content
    formContainer.innerHTML = '';
    
    title.textContent = `Add New ${resourceType.slice(0, -1)}`;
    
    const forms = {
        users: `
            <div class="form-row">
                <label>Name:</label>
                <input type="text" id="name" class="input-field" required>
            </div>
            <div class="form-row">
                <label>Email:</label>
                <input type="email" id="email" class="input-field" required>
            </div>
            <div class="form-row">
                <label>Age:</label>
                <input type="number" id="age" class="input-field" required>
            </div>
        `,
        products: `
            <div class="form-row">
                <label>Name:</label>
                <input type="text" id="name" class="input-field" required>
            </div>
            <div class="form-row">
                <label>Price:</label>
                <input type="number" id="price" class="input-field" required>
            </div>
            <div class="form-row">
                <label>Category:</label>
                <input type="text" id="category" class="input-field" required>
            </div>
        `,
        orders: `
            <div class="form-row">
                <label>User ID:</label>
                <input type="number" id="userId" class="input-field" required>
            </div>
            <div class="form-row">
                <label>Product ID:</label>
                <input type="number" id="productId" class="input-field" required>
            </div>
            <div class="form-row">
                <label>Quantity:</label>
                <input type="number" id="quantity" class="input-field" required>
            </div>
            <div class="form-row">
                <label>Status:</label>
                <select id="status" class="input-field" required>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                </select>
            </div>
        `
    };
    
    formContainer.innerHTML = `
        <form id="addForm" onsubmit="return false;">
            ${forms[resourceType]}
            <button type="button" id="submitAddBtn" class="btn btn-primary">Add ${resourceType.slice(0, -1)}</button>
        </form>
    `;
    
    console.log('Form HTML added to modal');
    console.log('Opening modal...');
    
    modal.style.display = 'block';
    
    // Attach event listener to button (use setTimeout to ensure DOM is ready)
    setTimeout(() => {
        const submitBtn = document.getElementById('submitAddBtn');
        if (submitBtn) {
            console.log('Attaching click handler to submit button');
            submitBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Submit button clicked!');
                submitAdd(resourceType);
            };
        } else {
            console.error('Submit button not found!');
        }
    }, 50);
    
    // Verify form elements were created
    setTimeout(() => {
        console.log('Verifying form elements after modal open...');
        if (resourceType === 'users') {
            const nameEl = document.getElementById('name');
            const emailEl = document.getElementById('email');
            const ageEl = document.getElementById('age');
            console.log('Form elements check:', {
                name: nameEl ? 'EXISTS' : 'MISSING',
                email: emailEl ? 'EXISTS' : 'MISSING',
                age: ageEl ? 'EXISTS' : 'MISSING'
            });
        }
    }, 100);
}

// Submit add form
async function submitAdd(resourceType) {
    console.log('\n=== submitAdd called for:', resourceType);
    
    let data;
    try {
        // Get and validate form data - this will throw if validation fails
        data = getFormData(resourceType);
        console.log('✓ Validation passed. Data to send:', JSON.stringify(data, null, 2));
    } catch (validationError) {
        console.error('✗ Validation failed:', validationError.message);
        showResponse(400, { error: 'Validation Error', details: validationError.message }, 0, true);
        alert('Validation Error: ' + validationError.message);
        return; // Stop here - do NOT proceed with request
    }
    
    // Only proceed if validation passed
    const url = `${API_BASE}/${resourceType}`;
    const payload = JSON.stringify(data);
    
    console.log('===========================================');
    console.log('ABOUT TO SEND POST REQUEST');
    console.log('URL:', url);
    console.log('Payload (stringified):', payload);
    console.log('Payload (parsed back):', JSON.parse(payload));
    console.log('Payload length:', payload.length, 'bytes');
    console.log('===========================================');
    
    // CRITICAL DEBUG: Show the data in an alert so user can verify
    const confirmation = confirm(
        `VERIFY DATA BEFORE SENDING:\n\n` +
        `Endpoint: ${url}\n\n` +
        `Data to send:\n${JSON.stringify(data, null, 2)}\n\n` +
        `Click OK to send this request, or Cancel to abort.`
    );
    
    if (!confirmation) {
        console.log('User cancelled the request');
        return;
    }
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload
        });
        
        console.log('Response status:', response.status);
        
        const responseData = await response.json();
        console.log('Response data:', responseData);
        
        if (response.ok) {
            console.log('✓ POST successful!');
            closeModal();
            setTimeout(() => loadAllData(), 300);
            showResponse(response.status, responseData, 0, false);
            addToHistory('POST', `${API_BASE}/${resourceType}`, response.status);
        } else {
            console.error('✗ POST failed with status:', response.status);
            showResponse(response.status, responseData, 0, true);
            addToHistory('POST', `${API_BASE}/${resourceType}`, response.status);
            alert('Error adding item. Status: ' + response.status);
        }
    } catch (networkError) {
        console.error('✗ Network error:', networkError);
        showResponse(500, { error: 'Network Error', details: networkError.message }, 0, true);
        alert('Network Error: ' + networkError.message);
    }
}

// Edit item
async function editItem(resourceType, id) {
    try {
        const response = await fetch(`${API_BASE}/${resourceType}/${id}`);
        const item = await response.json();
        
        const modal = document.getElementById('modal');
        const title = document.getElementById('modalTitle');
        const formContainer = document.getElementById('modalForm');
        
        title.textContent = `Edit ${resourceType.slice(0, -1)} #${id}`;
        
        const forms = {
            users: `
                <div class="form-row">
                    <label>Name:</label>
                    <input type="text" id="name" class="input-field" value="${item.name}" required>
                </div>
                <div class="form-row">
                    <label>Email:</label>
                    <input type="email" id="email" class="input-field" value="${item.email}" required>
                </div>
                <div class="form-row">
                    <label>Age:</label>
                    <input type="number" id="age" class="input-field" value="${item.age}" required>
                </div>
            `,
            products: `
                <div class="form-row">
                    <label>Name:</label>
                    <input type="text" id="name" class="input-field" value="${item.name}" required>
                </div>
                <div class="form-row">
                    <label>Price:</label>
                    <input type="number" id="price" class="input-field" value="${item.price}" required>
                </div>
                <div class="form-row">
                    <label>Category:</label>
                    <input type="text" id="category" class="input-field" value="${item.category}" required>
                </div>
            `,
            orders: `
                <div class="form-row">
                    <label>User ID:</label>
                    <input type="number" id="userId" class="input-field" value="${item.userId}" required>
                </div>
                <div class="form-row">
                    <label>Product ID:</label>
                    <input type="number" id="productId" class="input-field" value="${item.productId}" required>
                </div>
                <div class="form-row">
                    <label>Quantity:</label>
                    <input type="number" id="quantity" class="input-field" value="${item.quantity}" required>
                </div>
                <div class="form-row">
                    <label>Status:</label>
                    <select id="status" class="input-field" required>
                        <option value="pending" ${item.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="shipped" ${item.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="delivered" ${item.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    </select>
                </div>
            `
        };
        
        formContainer.innerHTML = `
            <form id="editForm" onsubmit="return false;">
                ${forms[resourceType]}
                <button type="button" id="submitEditBtn" class="btn btn-primary">Update ${resourceType.slice(0, -1)}</button>
            </form>
        `;
        
        // Attach event listener
        setTimeout(() => {
            const submitBtn = document.getElementById('submitEditBtn');
            if (submitBtn) {
                submitBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    submitEdit(resourceType, id);
                };
            }
        }, 50);
        
        modal.style.display = 'block';
    } catch (error) {
        alert('Error loading item: ' + error.message);
    }
}

// Submit edit form
async function submitEdit(resourceType, id) {
    console.log('\n=== submitEdit called for:', resourceType, 'id:', id);
    
    let data;
    try {
        // Get and validate form data
        data = getFormData(resourceType);
        data.id = id; // Include ID for PUT
        console.log('✓ Validation passed. Data to send:', JSON.stringify(data, null, 2));
    } catch (validationError) {
        console.error('✗ Validation failed:', validationError.message);
        showResponse(400, { error: 'Validation Error', details: validationError.message }, 0, true);
        alert('Validation Error: ' + validationError.message);
        return; // Stop here
    }
    
    console.log('Sending PUT request to:', `${API_BASE}/${resourceType}/${id}`);
    
    try {
        const response = await fetch(`${API_BASE}/${resourceType}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        console.log('Response status:', response.status);
        const responseData = await response.json();
        console.log('Response data:', responseData);
        
        if (response.ok) {
            console.log('✓ PUT successful!');
            closeModal();
            setTimeout(() => loadAllData(), 300);
            showResponse(response.status, responseData, 0, false);
            addToHistory('PUT', `${API_BASE}/${resourceType}/${id}`, response.status);
        } else {
            console.error('✗ PUT failed with status:', response.status);
            showResponse(response.status, responseData, 0, true);
            addToHistory('PUT', `${API_BASE}/${resourceType}/${id}`, response.status);
            alert('Error updating item. Status: ' + response.status);
        }
    } catch (networkError) {
        console.error('✗ Network error:', networkError);
        showResponse(500, { error: 'Network Error', details: networkError.message }, 0, true);
        alert('Error updating item: ' + error.message);
    }
}

// Delete item
async function deleteItem(resourceType, id) {
    if (!confirm(`Are you sure you want to delete this ${resourceType.slice(0, -1)} (ID: ${id})?`)) {
        console.log('Delete cancelled by user');
        return;
    }
    
    console.log('\n=== deleteItem called for:', resourceType, 'id:', id);
    console.log('Sending DELETE request to:', `${API_BASE}/${resourceType}/${id}`);
    
    try {
        const response = await fetch(`${API_BASE}/${resourceType}/${id}`, {
            method: 'DELETE'
        });
        
        console.log('Delete response status:', response.status);
        
        let responseData = {};
        try {
            responseData = await response.json();
            console.log('Delete response data:', responseData);
        } catch (e) {
            console.log('No JSON response body (this is normal for DELETE)');
            responseData = { message: 'Item deleted successfully' };
        }
        
        if (response.ok) {
            console.log('✓ DELETE successful!');
            setTimeout(() => loadAllData(), 300);
            showResponse(response.status, responseData, 0, false);
            addToHistory('DELETE', `${API_BASE}/${resourceType}/${id}`, response.status);
        } else {
            console.error('✗ DELETE failed with status:', response.status);
            showResponse(response.status, responseData, 0, true);
            addToHistory('DELETE', `${API_BASE}/${resourceType}/${id}`, response.status);
            alert('Error deleting item. Status: ' + response.status);
        }
    } catch (error) {
        console.error('✗ Network error during DELETE:', error);
        showResponse(500, { error: 'Network Error', details: error.message }, 0, true);
        alert('Error deleting item: ' + error.message);
    }
}

// Get form data
function getFormData(resourceType) {
    console.log('=== getFormData called for:', resourceType);
    
    const forms = {
        users: () => {
            const nameEl = document.getElementById('name');
            const emailEl = document.getElementById('email');
            const ageEl = document.getElementById('age');
            
            console.log('User form elements:', { 
                nameEl: nameEl ? 'found' : 'NOT FOUND', 
                emailEl: emailEl ? 'found' : 'NOT FOUND', 
                ageEl: ageEl ? 'found' : 'NOT FOUND' 
            });
            
            if (!nameEl || !emailEl || !ageEl) {
                throw new Error('Form elements not found! Modal may not be properly initialized.');
            }
            
            const name = nameEl.value?.trim() || '';
            const email = emailEl.value?.trim() || '';
            const ageValue = ageEl.value?.trim() || '';
            const age = parseInt(ageValue);
            
            console.log('Raw values:', { name, email, ageValue, age });
            
            const errors = [];
            if (!name) errors.push('name is empty');
            if (!email) errors.push('email is empty');
            if (!ageValue || isNaN(age) || age <= 0) errors.push('age is invalid');
            
            if (errors.length > 0) {
                console.error('Validation errors:', errors);
                throw new Error(`Validation failed: ${errors.join(', ')}`);
            }
            
            const data = { name, email, age };
            console.log('Validated user data:', data);
            return data;
        },
        products: () => {
            const nameEl = document.getElementById('name');
            const priceEl = document.getElementById('price');
            const categoryEl = document.getElementById('category');
            
            if (!nameEl || !priceEl || !categoryEl) {
                throw new Error('Form elements not found!');
            }
            
            const name = nameEl.value?.trim() || '';
            const priceValue = priceEl.value?.trim() || '';
            const price = parseFloat(priceValue);
            const category = categoryEl.value?.trim() || '';
            
            console.log('Product values:', { name, priceValue, price, category });
            
            const errors = [];
            if (!name) errors.push('name is empty');
            if (!priceValue || isNaN(price) || price <= 0) errors.push('price is invalid');
            if (!category) errors.push('category is empty');
            
            if (errors.length > 0) {
                throw new Error(`Validation failed: ${errors.join(', ')}`);
            }
            
            const data = { name, price, category };
            console.log('Validated product data:', data);
            return data;
        },
        orders: () => {
            const userIdEl = document.getElementById('userId');
            const productIdEl = document.getElementById('productId');
            const quantityEl = document.getElementById('quantity');
            const statusEl = document.getElementById('status');
            
            if (!userIdEl || !productIdEl || !quantityEl || !statusEl) {
                throw new Error('Form elements not found!');
            }
            
            const userIdValue = userIdEl.value?.trim() || '';
            const productIdValue = productIdEl.value?.trim() || '';
            const quantityValue = quantityEl.value?.trim() || '';
            const userId = parseInt(userIdValue);
            const productId = parseInt(productIdValue);
            const quantity = parseInt(quantityValue);
            const status = statusEl.value?.trim() || '';
            
            console.log('Order values:', { userIdValue, productIdValue, quantityValue, userId, productId, quantity, status });
            
            const errors = [];
            if (!userIdValue || isNaN(userId) || userId <= 0) errors.push('userId is invalid');
            if (!productIdValue || isNaN(productId) || productId <= 0) errors.push('productId is invalid');
            if (!quantityValue || isNaN(quantity) || quantity <= 0) errors.push('quantity is invalid');
            if (!status) errors.push('status is empty');
            
            if (errors.length > 0) {
                throw new Error(`Validation failed: ${errors.join(', ')}`);
            }
            
            const data = { userId, productId, quantity, status };
            console.log('Validated order data:', data);
            return data;
        }
    };
    
    const handler = forms[resourceType];
    if (!handler) {
        throw new Error(`Unknown resource type: ${resourceType}`);
    }
    
    return handler();
}

// Close modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
