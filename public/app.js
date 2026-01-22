// API Base URL - dynamically detect the current server
const API_BASE = window.location.origin;

// Global state
let requestHistory = [];

// ==================== LEARNING MODULES ====================
// Learning modules have been moved to a separate page: learning.html / learning.js

// ==================== TOOLTIP SYSTEM ====================
// Tooltips are loaded below (after initialization section)

// ==================== INITIALIZATION ====================

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadAllData();
    setupEventListeners();
    updateRequestBodyVisibility();
    setupTooltipSystem();
});

// OLD LEARNING MODULE CONTENT - TO DELETE (commented out)
/*
const OLD_LEARNING_MODULES_CONTENT = {
    'api-intro': {
        title: "Introduction to APIs",
        icon: "🌟",
        content: `
            <h2>🌟 What is an API?</h2>
            <p><strong>API</strong> stands for <strong>Application Programming Interface</strong>. Think of it as a waiter in a restaurant:</p>
            <ul>
                <li>👤 <strong>You (the client)</strong> - You want to order food</li>
                <li>👔 <strong>The waiter (the API)</strong> - Takes your order to the kitchen</li>
                <li>👨‍🍳 <strong>The kitchen (the server)</strong> - Prepares your food</li>
                <li>🍽️ <strong>Your meal (the response)</strong> - Gets delivered back to you</li>
            </ul>
            
            <h3>Why Do We Use APIs?</h3>
            <p>APIs let different software applications talk to each other. Examples:</p>
            <ul>
                <li>📱 Weather apps get data from weather services</li>
                <li>💳 Payment buttons connect to payment processors</li>
                <li>🗺️ Map displays pull data from mapping services</li>
                <li>📱 Social media apps share posts across platforms</li>
            </ul>
            
            <h3>REST APIs</h3>
            <p>REST (Representational State Transfer) is a popular API style that uses:</p>
            <ul>
                <li><strong>HTTP Methods</strong> - GET, POST, PUT, DELETE (like verbs)</li>
                <li><strong>URLs/Endpoints</strong> - Where to send requests (like addresses)</li>
                <li><strong>JSON Data</strong> - How data is formatted (like a language)</li>
                <li><strong>Status Codes</strong> - What happened (like confirmation receipts)</li>
            </ul>
        `,
        practice: "Explore the interface above and try clicking on different sections to familiarize yourself with the layout.",
        setupAction: null
    },
    
    get: {
        title: "GET - Reading Data",
        icon: "📖",
        content: `
            <h2>📖 GET Request - Retrieving Data</h2>
            <p><strong>GET</strong> is used to <strong>retrieve/read data</strong> from the server. It's the most common and safest HTTP method.</p>
            
            <h3>Key Characteristics</h3>
            <ul>
                <li>✅ <strong>Safe</strong> - Doesn't change any data</li>
                <li>✅ <strong>Idempotent</strong> - You can repeat it without side effects</li>
                <li>📖 <strong>Read-only</strong> - Only retrieves information</li>
                <li>🔓 <strong>Cacheable</strong> - Results can be saved for faster access</li>
            </ul>
            
            <h3>Real-World Examples</h3>
            <ul>
                <li>Loading a webpage in your browser</li>
                <li>Checking your email inbox</li>
                <li>Viewing your bank account balance</li>
                <li>Searching for products on a website</li>
            </ul>
            
            <h3>GET All vs GET One</h3>
            <p><strong>GET All:</strong> <code>GET /users</code> - Retrieves all users (returns an array)</p>
            <p><strong>GET One:</strong> <code>GET /users/1</code> - Retrieves user with ID 1 (returns one object)</p>
            
            <h3>Expected Response</h3>
            <p>✅ <strong>200 OK</strong> - Data retrieved successfully</p>
            <p>❌ <strong>404 Not Found</strong> - The requested resource doesn't exist</p>
        `,
        practice: "Retrieve all users from the server by selecting GET method, choosing 'Users' as the resource, and clicking 'Send Request'.",
        setupAction: () => {
            document.getElementById('method').value = 'GET';
            document.getElementById('endpoint').value = 'users';
            document.getElementById('resourceId').value = '';
            updateRequestBodyVisibility();
            updateEndpointUrl();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    
    post: {
        title: "POST - Creating Data",
        icon: "✨",
        content: `
            <h2>✨ POST Request - Creating New Data</h2>
            <p><strong>POST</strong> is used to <strong>create new records</strong> on the server.</p>
            
            <h3>Key Characteristics</h3>
            <ul>
                <li>➕ <strong>Creates</strong> - Adds new data to the database</li>
                <li>📦 <strong>Requires Body</strong> - You must send data in the request</li>
                <li>🔄 <strong>Not Idempotent</strong> - Each request creates a new record</li>
                <li>🆔 <strong>Generates ID</strong> - Server assigns a unique identifier</li>
            </ul>
            
            <h3>Real-World Examples</h3>
            <ul>
                <li>Creating a new user account</li>
                <li>Submitting a form</li>
                <li>Posting a comment or message</li>
                <li>Adding an item to your shopping cart</li>
            </ul>
            
            <h3>Request Body (JSON)</h3>
            <p>POST requests need a <strong>request body</strong> with the data to create:</p>
            <pre><code>{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 28
}</code></pre>
            
            <h3>Expected Response</h3>
            <p>✅ <strong>201 Created</strong> - New record created successfully</p>
            <p>❌ <strong>400 Bad Request</strong> - Invalid or missing data</p>
            <p>❌ <strong>409 Conflict</strong> - Record already exists (e.g., duplicate email)</p>
        `,
        practice: "Create a new user by selecting POST method, choosing 'Users', filling in the request body with valid JSON, and clicking 'Send Request'.",
        setupAction: () => {
            document.getElementById('method').value = 'POST';
            document.getElementById('endpoint').value = 'users';
            updateRequestBodyVisibility();
            updateEndpointUrl();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    
    put: {
        title: "PUT - Updating Data",
        icon: "✏️",
        content: `
            <h2>✏️ PUT Request - Updating Existing Data</h2>
            <p><strong>PUT</strong> is used to <strong>update/modify existing records</strong> on the server.</p>
            
            <h3>Key Characteristics</h3>
            <ul>
                <li>✏️ <strong>Updates</strong> - Modifies existing data</li>
                <li>🆔 <strong>Requires ID</strong> - Must specify which record to update</li>
                <li>📦 <strong>Requires Body</strong> - Must send the updated data</li>
                <li>🔄 <strong>Idempotent</strong> - Same request = same result</li>
                <li>🔁 <strong>Full Replacement</strong> - Replaces entire record (in most implementations)</li>
            </ul>
            
            <h3>Real-World Examples</h3>
            <ul>
                <li>Editing your profile information</li>
                <li>Changing your password</li>
                <li>Updating product details</li>
                <li>Modifying an address</li>
            </ul>
            
            <h3>URL Format</h3>
            <p><code>PUT /users/1</code> - Updates user with ID 1</p>
            
            <h3>Request Body</h3>
            <pre><code>{
  "name": "John Updated",
  "email": "john.new@example.com",
  "age": 29
}</code></pre>
            
            <h3>Expected Response</h3>
            <p>✅ <strong>200 OK</strong> - Record updated successfully</p>
            <p>❌ <strong>404 Not Found</strong> - Record with that ID doesn't exist</p>
            <p>❌ <strong>400 Bad Request</strong> - Invalid data format</p>
        `,
        practice: "Update an existing user by selecting PUT method, entering a valid user ID (like 1), providing updated data in the request body, and clicking 'Send Request'.",
        setupAction: () => {
            document.getElementById('method').value = 'PUT';
            document.getElementById('endpoint').value = 'users';
            document.getElementById('resourceId').value = '1';
            updateRequestBodyVisibility();
            updateEndpointUrl();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    
    delete: {
        title: "DELETE - Removing Data",
        icon: "🗑️",
        content: `
            <h2>🗑️ DELETE Request - Removing Data</h2>
            <p><strong>DELETE</strong> is used to <strong>remove records</strong> from the server.</p>
            
            <h3>Key Characteristics</h3>
            <ul>
                <li>🗑️ <strong>Removes</strong> - Permanently deletes data</li>
                <li>🆔 <strong>Requires ID</strong> - Must specify which record to delete</li>
                <li>❌ <strong>No Body</strong> - Usually doesn't need request body</li>
                <li>⚠️ <strong>Irreversible</strong> - Can't undo (in most systems)</li>
                <li>🔄 <strong>Idempotent</strong> - Deleting multiple times = same result</li>
            </ul>
            
            <h3>Real-World Examples</h3>
            <ul>
                <li>Deleting your account</li>
                <li>Removing an item from cart</li>
                <li>Canceling an order</li>
                <li>Deleting a comment or post</li>
            </ul>
            
            <h3>URL Format</h3>
            <p><code>DELETE /users/1</code> - Deletes user with ID 1</p>
            
            <h3>⚠️ Important Notes</h3>
            <ul>
                <li>Always confirm before deleting</li>
                <li>Some systems use "soft delete" (marks as deleted but keeps data)</li>
                <li>Check if you have permission to delete</li>
                <li>Consider cascading deletes (related data)</li>
            </ul>
            
            <h3>Expected Response</h3>
            <p>✅ <strong>200 OK</strong> - Record deleted successfully</p>
            <p>✅ <strong>204 No Content</strong> - Deleted successfully (no response body)</p>
            <p>❌ <strong>404 Not Found</strong> - Record doesn't exist</p>
            <p>❌ <strong>403 Forbidden</strong> - You don't have permission</p>
        `,
        practice: "Delete a user by selecting DELETE method, entering a user ID (like 3), and clicking 'Send Request'. ⚠️ This will permanently remove the user!",
        setupAction: () => {
            document.getElementById('method').value = 'DELETE';
            document.getElementById('endpoint').value = 'users';
            document.getElementById('resourceId').value = '3';
            updateRequestBodyVisibility();
            updateEndpointUrl();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    
    status: {
        title: "Understanding Status Codes",
        icon: "🚦",
        content: `
            <h2>🚦 HTTP Status Codes</h2>
            <p>Status codes tell you what happened with your request. Think of them like traffic lights!</p>
            
            <h3>✅ 2xx - Success (Green Light)</h3>
            <ul>
                <li><strong>200 OK</strong> - Request successful, here's your data</li>
                <li><strong>201 Created</strong> - New resource created successfully</li>
                <li><strong>204 No Content</strong> - Success, but no data to return</li>
            </ul>
            
            <h3>🔄 3xx - Redirection (Yellow Light)</h3>
            <ul>
                <li><strong>301 Moved Permanently</strong> - Resource moved to new URL</li>
                <li><strong>304 Not Modified</strong> - Use cached version</li>
            </ul>
            
            <h3>❌ 4xx - Client Error (Red Light - Your Fault)</h3>
            <ul>
                <li><strong>400 Bad Request</strong> - Invalid data or format</li>
                <li><strong>401 Unauthorized</strong> - Need to log in</li>
                <li><strong>403 Forbidden</strong> - Logged in but no permission</li>
                <li><strong>404 Not Found</strong> - Resource doesn't exist</li>
                <li><strong>409 Conflict</strong> - Request conflicts with current state</li>
            </ul>
            
            <h3>💥 5xx - Server Error (Red Light - Server's Fault)</h3>
            <ul>
                <li><strong>500 Internal Server Error</strong> - Something broke on server</li>
                <li><strong>502 Bad Gateway</strong> - Server got invalid response</li>
                <li><strong>503 Service Unavailable</strong> - Server temporarily down</li>
            </ul>
            
            <h3>Quick Reference</h3>
            <p>💚 <strong>2xx</strong> = Everything worked!</p>
            <p>💛 <strong>3xx</strong> = Go somewhere else</p>
            <p>🧡 <strong>4xx</strong> = You made a mistake</p>
            <p>❤️ <strong>5xx</strong> = Server had a problem</p>
        `,
        practice: "Try making different requests and observe the status codes. Try a GET with an invalid ID (like 999) to see a 404 error.",
        setupAction: () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    
    json: {
        title: "Working with JSON",
        icon: "📋",
        content: `
            <h2>📋 JSON - JavaScript Object Notation</h2>
            <p><strong>JSON</strong> is the standard format for sending data in REST APIs. It's lightweight, readable, and easy to parse.</p>
            
            <h3>Basic Structure</h3>
            <pre><code>{
  "key": "value",
  "number": 42,
  "boolean": true,
  "null": null
}</code></pre>
            
            <h3>Data Types</h3>
            <ul>
                <li><strong>String</strong> - <code>"text in quotes"</code></li>
                <li><strong>Number</strong> - <code>42</code> or <code>3.14</code></li>
                <li><strong>Boolean</strong> - <code>true</code> or <code>false</code></li>
                <li><strong>Null</strong> - <code>null</code></li>
                <li><strong>Array</strong> - <code>[1, 2, 3]</code></li>
                <li><strong>Object</strong> - <code>{"nested": "value"}</code></li>
            </ul>
            
            <h3>Example: User Object</h3>
            <pre><code>{
  "id": 1,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 28,
  "active": true,
  "roles": ["user", "admin"],
  "address": {
    "city": "New York",
    "country": "USA"
  }
}</code></pre>
            
            <h3>Common Mistakes ❌</h3>
            <ul>
                <li>❌ Single quotes: <code>{'name': 'John'}</code></li>
                <li>✅ Double quotes: <code>{"name": "John"}</code></li>
                <li>❌ Trailing comma: <code>{"name": "John",}</code></li>
                <li>✅ No trailing comma: <code>{"name": "John"}</code></li>
                <li>❌ Unquoted keys: <code>{name: "John"}</code></li>
                <li>✅ Quoted keys: <code>{"name": "John"}</code></li>
            </ul>
            
            <h3>Tools</h3>
            <p>Use online JSON validators to check your JSON:</p>
            <ul>
                <li>jsonlint.com</li>
                <li>jsonformatter.org</li>
            </ul>
        `,
        practice: "Try creating a POST request with valid JSON in the request body. Make sure to use double quotes and proper formatting!",
        setupAction: () => {
            document.getElementById('method').value = 'POST';
            document.getElementById('endpoint').value = 'users';
            updateRequestBodyVisibility();
            updateEndpointUrl();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    
    errors: {
        title: "Handling Errors",
        icon: "🔧",
        content: `
            <h2>🔧 Common Errors and How to Fix Them</h2>
            
            <h3>1. 400 Bad Request</h3>
            <p><strong>Problem:</strong> Your data is invalid or malformed</p>
            <p><strong>Common Causes:</strong></p>
            <ul>
                <li>Invalid JSON syntax (missing quotes, commas, braces)</li>
                <li>Missing required fields</li>
                <li>Wrong data type (string instead of number)</li>
            </ul>
            <p><strong>Solution:</strong> Check your JSON format, validate all required fields</p>
            
            <h3>2. 404 Not Found</h3>
            <p><strong>Problem:</strong> The resource you're looking for doesn't exist</p>
            <p><strong>Common Causes:</strong></p>
            <ul>
                <li>Wrong ID number</li>
                <li>Record was already deleted</li>
                <li>Typo in the endpoint URL</li>
            </ul>
            <p><strong>Solution:</strong> Verify the ID exists, check the endpoint spelling</p>
            
            <h3>3. 409 Conflict</h3>
            <p><strong>Problem:</strong> Your request conflicts with existing data</p>
            <p><strong>Common Causes:</strong></p>
            <ul>
                <li>Duplicate email/username</li>
                <li>Trying to create something that already exists</li>
            </ul>
            <p><strong>Solution:</strong> Use different data or update instead of create</p>
            
            <h3>4. 500 Internal Server Error</h3>
            <p><strong>Problem:</strong> Something broke on the server</p>
            <p><strong>Common Causes:</strong></p>
            <ul>
                <li>Server bug</li>
                <li>Database connection issue</li>
                <li>Server overload</li>
            </ul>
            <p><strong>Solution:</strong> Wait and retry, contact server administrator</p>
            
            <h3>Debugging Tips 🔍</h3>
            <ul>
                <li>✅ Read the error message carefully</li>
                <li>✅ Check your JSON syntax first</li>
                <li>✅ Verify all required fields are present</li>
                <li>✅ Confirm the resource ID exists</li>
                <li>✅ Look at the response body for details</li>
                <li>✅ Try the request in a tool like Postman</li>
            </ul>
            
            <h3>Best Practices</h3>
            <ul>
                <li>Always handle errors gracefully</li>
                <li>Provide helpful error messages to users</li>
                <li>Log errors for debugging</li>
                <li>Validate data before sending</li>
            </ul>
        `,
        practice: "Try making an invalid request (like a POST with empty body, or GET with ID 999) to see different error responses.",
        setupAction: () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}; 
*/
// End of duplicate content to delete

// ==================== ACTUAL TOOLTIP SYSTEM ====================

// Tooltip Content (for help icons)
const tooltipContent = {
    'api-intro': {
        title: 'What is an API?',
        content: 'An API (Application Programming Interface) is like a waiter at a restaurant. You (the client) tell the waiter what you want, the waiter tells the kitchen (server), and the kitchen prepares your order and sends it back through the waiter. APIs let different software applications talk to each other in a structured way.'
    },
    'http-get': {
        title: 'GET Request',
        content: 'GET retrieves data without changing anything - like looking at a menu or checking your bank balance. It\'s safe to use repeatedly because it only reads data. Example: Getting a list of all users or viewing a specific product.'
    },
    'http-post': {
        title: 'POST Request',
        content: 'POST creates new data on the server - like submitting a form or placing an order. You send data in the request body, and the server creates a new record with a unique ID. Example: Creating a new user account or adding a product to your cart.'
    },
    'http-put': {
        title: 'PUT Request',
        content: 'PUT updates existing data - like editing your profile or changing an order. You need to specify which item to update (using its ID) and provide the new data. Example: Updating a user\'s email address or changing a product price.'
    },
    'http-delete': {
        title: 'DELETE Request',
        content: 'DELETE removes data from the server - like canceling an order or deleting a comment. You specify which item to delete using its ID. Be careful - this action typically can\'t be undone! Example: Removing a user account or deleting a product.'
    },
    'http-method': {
        title: 'HTTP Methods',
        content: 'HTTP methods (also called verbs) tell the server what operation to perform. Think of them as actions:<br><br>• <strong>GET</strong> = Read/Retrieve<br>• <strong>POST</strong> = Create<br>• <strong>PUT</strong> = Update<br>• <strong>DELETE</strong> = Remove<br><br>Together, these form CRUD operations (Create, Read, Update, Delete).'
    },
    'resource-type': {
        title: 'Resource Types',
        content: 'Resources are the types of data your API manages. In this training server, we have:<br><br>• <strong>Users</strong> - People with accounts<br>• <strong>Products</strong> - Items for sale<br>• <strong>Orders</strong> - Purchase records<br><br>Each resource has its own endpoint (URL path) and can be created, read, updated, or deleted.'
    },
    'endpoint-url': {
        title: 'Endpoint URL',
        content: 'The endpoint URL is the specific web address where your request is sent. It combines:<br><br>1. <strong>Base URL</strong>: http://localhost:4000<br>2. <strong>Resource path</strong>: /users, /products, or /orders<br>3. <strong>ID (optional)</strong>: /users/1 for specific items<br><br>Think of it like a building address - it tells the request exactly where to go!'
    },
    'resource-id': {
        title: 'Resource ID',
        content: 'Every item in the database has a unique ID number. When you want to get, update, or delete a specific item, you need to provide its ID. It\'s like a student ID number - it uniquely identifies one record. Example: User ID 1, Product ID 2, etc.'
    },
    'request-body': {
        title: 'Request Body (JSON)',
        content: 'The request body contains the data you\'re sending to the server. It must be in JSON format - a standard way to structure data using key-value pairs.<br><br>Example:<br><code>{\n  "name": "John",\n  "email": "john@example.com",\n  "age": 25\n}</code><br><br>Required for POST (create) and PUT (update) requests.'
    },
    'status-code': {
        title: 'HTTP Status Codes',
        content: 'Status codes tell you what happened with your request:<br><br>• <strong>2xx (Success)</strong> - It worked!<br>&nbsp;&nbsp;200: OK, 201: Created<br><br>• <strong>4xx (Client Error)</strong> - You made a mistake<br>&nbsp;&nbsp;400: Bad Request, 404: Not Found<br><br>• <strong>5xx (Server Error)</strong> - Server problem<br>&nbsp;&nbsp;500: Internal Server Error<br><br>Think of them like traffic lights: green (2xx), yellow (3xx), red (4xx/5xx).'
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadAllData();
    setupEventListeners();
    updateRequestBodyVisibility();
    setupTooltipSystem();
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

// ==================== LEARNING SYSTEM FUNCTIONS ====================

// Setup learning system
function setupTooltipSystem() {
    // Tooltip system
    document.querySelectorAll('.help-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            showTooltip(e.target);
        });
    });
    
    // Close tooltip when clicking outside
    document.addEventListener('click', () => {
        document.getElementById('tooltip').style.display = 'none';
    });
}

// Tooltip System
function showTooltip(icon) {
    const tooltipId = icon.getAttribute('data-tooltip');
    const content = tooltipContent[tooltipId];
    
    if (!content) return;
    
    const tooltip = document.getElementById('tooltip');
    const tooltipContentEl = tooltip.querySelector('.tooltip-content');
    
    tooltipContentEl.innerHTML = `
        <h4>${content.title}</h4>
        <p>${content.content}</p>
    `;
    
    // Position tooltip near icon
    const rect = icon.getBoundingClientRect();
    tooltip.style.display = 'block';
    tooltip.style.top = (rect.bottom + 10) + 'px';
    tooltip.style.left = (rect.left - 150) + 'px';
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
