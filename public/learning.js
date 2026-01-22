// Learning Modules Content
const learningModules = {
    intro: {
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
        practice: "Explore the API Tester and try clicking on different sections to familiarize yourself with the layout."
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
        practice: "Retrieve all users from the server by selecting GET method, choosing 'Users' as the resource, and clicking 'Send Request'."
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
        practice: "Create a new user by selecting POST method, choosing 'Users', filling in the request body with valid JSON, and clicking 'Send Request'."
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
        practice: "Update an existing user by selecting PUT method, entering a valid user ID (like 1), providing updated data in the request body, and clicking 'Send Request'."
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
        practice: "Delete a user by selecting DELETE method, entering a user ID (like 3), and clicking 'Send Request'. ⚠️ This will permanently remove the user!"
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
        practice: "Try making different requests and observe the status codes. Try a GET with an invalid ID (like 999) to see a 404 error."
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
        practice: "Try creating a POST request with valid JSON in the request body. Make sure to use double quotes and proper formatting!"
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
        practice: "Try making an invalid request (like a POST with empty body, or GET with ID 999) to see different error responses."
    }
};

// Initialize learning system
document.addEventListener('DOMContentLoaded', () => {
    // Setup module card clicks
    document.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('module-btn') || e.target.closest('.module-btn')) {
                const moduleId = card.getAttribute('data-module');
                showModule(moduleId);
            }
        });
    });

    // Back button
    document.getElementById('backToModules').addEventListener('click', closeModuleViewer);
});

function showModule(moduleId) {
    const module = learningModules[moduleId];
    if (!module) return;

    document.getElementById('moduleContent').innerHTML = module.content;
    document.getElementById('modulePracticeText').textContent = module.practice;
    document.getElementById('moduleViewer').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeModuleViewer() {
    document.getElementById('moduleViewer').style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scroll
}
