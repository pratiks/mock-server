// Learning Modules Content
const learningModules = {
    intro: {
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
            
            <div class="module-practice">
                <h3>🎯 Try It Yourself</h3>
                <p>Explore the API Tester and try clicking on different sections to familiarize yourself with the layout.</p>
                <a href="index.html" class="btn btn-success">Go to API Tester</a>
            </div>
        `
    },
    
    get: {
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
            
            <h3>Common Use Cases</h3>
            <ul>
                <li>📄 Fetching a list of users, products, or posts</li>
                <li>👤 Getting details about a specific item by ID</li>
                <li>🔍 Searching or filtering data</li>
                <li>📊 Loading dashboard information</li>
            </ul>
            
            <h3>Example GET Requests</h3>
            <pre><code>GET /users          → Get all users
GET /users/1        → Get user with ID 1
GET /products       → Get all products
GET /orders         → Get all orders</code></pre>
            
            <h3>Expected Response</h3>
            <p>✅ <strong>200 OK</strong> - Request successful, data returned</p>
            <p>❌ <strong>404 Not Found</strong> - Requested resource doesn't exist</p>
            
            <div class="module-practice">
                <h3>🎯 Try It Yourself</h3>
                <p>Go to the API Tester and try getting all users with <code>GET /users</code> or a specific user with <code>GET /users/1</code></p>
                <a href="index.html" class="btn btn-success">Go to API Tester</a>
            </div>
        `
    },
    
    post: {
        content: `
            <h2>✨ POST Request - Creating Data</h2>
            <p><strong>POST</strong> is used to <strong>create new data</strong> on the server. It sends data in the request body.</p>
            
            <h3>Key Characteristics</h3>
            <ul>
                <li>✏️ <strong>Not Safe</strong> - Changes data on the server</li>
                <li>🔄 <strong>Not Idempotent</strong> - Each request may create a new resource</li>
                <li>➕ <strong>Creates Resources</strong> - Adds new records to database</li>
                <li>📦 <strong>Includes Body</strong> - Sends data in JSON format</li>
            </ul>
            
            <h3>Common Use Cases</h3>
            <ul>
                <li>👤 Creating a new user account</li>
                <li>📝 Submitting a new form</li>
                <li>🛒 Adding an item to cart</li>
                <li>💬 Posting a comment or message</li>
            </ul>
            
            <h3>Example POST Request</h3>
            <pre><code>POST /users
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "age": 28
}</code></pre>
            
            <h3>Expected Response</h3>
            <p>✅ <strong>201 Created</strong> - New resource successfully created</p>
            <p>❌ <strong>400 Bad Request</strong> - Invalid data provided</p>
            
            <div class="module-practice">
                <h3>🎯 Try It Yourself</h3>
                <p>Use the API Tester to create a new user with <code>POST /users</code> and include name, email, and age in the request body.</p>
                <a href="index.html" class="btn btn-success">Go to API Tester</a>
            </div>
        `
    },
    
    put: {
        content: `
            <h2>✏️ PUT Request - Updating Data</h2>
            <p><strong>PUT</strong> is used to <strong>update existing data</strong> on the server. It replaces the entire resource.</p>
            
            <h3>Key Characteristics</h3>
            <ul>
                <li>✏️ <strong>Not Safe</strong> - Modifies data on the server</li>
                <li>✅ <strong>Idempotent</strong> - Multiple identical requests have the same effect</li>
                <li>🔄 <strong>Full Update</strong> - Replaces entire resource</li>
                <li>📦 <strong>Includes Body</strong> - Sends complete updated data</li>
            </ul>
            
            <h3>Common Use Cases</h3>
            <ul>
                <li>👤 Updating user profile information</li>
                <li>📝 Editing a document or post</li>
                <li>⚙️ Changing account settings</li>
                <li>📊 Modifying existing records</li>
            </ul>
            
            <h3>Example PUT Request</h3>
            <pre><code>PUT /users/1
{
  "name": "Jane Smith",
  "email": "jane.new@example.com",
  "age": 29
}</code></pre>
            
            <h3>Expected Response</h3>
            <p>✅ <strong>200 OK</strong> - Resource successfully updated</p>
            <p>❌ <strong>404 Not Found</strong> - Resource to update doesn't exist</p>
            
            <div class="module-practice">
                <h3>🎯 Try It Yourself</h3>
                <p>Try updating an existing user with <code>PUT /users/1</code> and provide the complete updated user object.</p>
                <a href="index.html" class="btn btn-success">Go to API Tester</a>
            </div>
        `
    },
    
    delete: {
        content: `
            <h2>🗑️ DELETE Request - Removing Data</h2>
            <p><strong>DELETE</strong> is used to <strong>remove data</strong> from the server.</p>
            
            <h3>Key Characteristics</h3>
            <ul>
                <li>❌ <strong>Not Safe</strong> - Removes data from server</li>
                <li>✅ <strong>Idempotent</strong> - Deleting same resource multiple times has same effect</li>
                <li>🗑️ <strong>Permanent</strong> - Once deleted, data is gone</li>
                <li>🎯 <strong>Specific</strong> - Usually targets a specific resource by ID</li>
            </ul>
            
            <h3>Common Use Cases</h3>
            <ul>
                <li>👤 Deleting a user account</li>
                <li>📝 Removing a post or comment</li>
                <li>🛒 Removing item from cart</li>
                <li>📄 Deleting a file or document</li>
            </ul>
            
            <h3>Example DELETE Request</h3>
            <pre><code>DELETE /users/1     → Delete user with ID 1
DELETE /products/5  → Delete product with ID 5
DELETE /orders/10   → Delete order with ID 10</code></pre>
            
            <h3>Expected Response</h3>
            <p>✅ <strong>200 OK</strong> or <strong>204 No Content</strong> - Successfully deleted</p>
            <p>❌ <strong>404 Not Found</strong> - Resource to delete doesn't exist</p>
            
            <div class="module-practice">
                <h3>🎯 Try It Yourself</h3>
                <p>Use the API Tester to delete a user with <code>DELETE /users/1</code></p>
                <a href="index.html" class="btn btn-success">Go to API Tester</a>
            </div>
        `
    },
    
    status: {
        content: `
            <h2>🚦 HTTP Status Codes</h2>
            <p>Status codes tell you what happened with your API request. They're grouped into categories:</p>
            
            <h3>2xx - Success ✅</h3>
            <ul>
                <li><strong>200 OK</strong> - Request succeeded</li>
                <li><strong>201 Created</strong> - New resource created</li>
                <li><strong>204 No Content</strong> - Success but no data to return</li>
            </ul>
            
            <h3>4xx - Client Errors ⚠️</h3>
            <ul>
                <li><strong>400 Bad Request</strong> - Invalid data sent</li>
                <li><strong>401 Unauthorized</strong> - Authentication required</li>
                <li><strong>403 Forbidden</strong> - No permission</li>
                <li><strong>404 Not Found</strong> - Resource doesn't exist</li>
            </ul>
            
            <h3>5xx - Server Errors 🔥</h3>
            <ul>
                <li><strong>500 Internal Server Error</strong> - Server crashed</li>
                <li><strong>503 Service Unavailable</strong> - Server temporarily down</li>
            </ul>
            
            <div class="module-practice">
                <h3>🎯 Try It Yourself</h3>
                <p>Try different requests in the API Tester and observe the status codes. Try fetching a non-existent user to see a 404 error!</p>
                <a href="index.html" class="btn btn-success">Go to API Tester</a>
            </div>
        `
    },
    
    json: {
        content: `
            <h2>📋 Working with JSON</h2>
            <p><strong>JSON</strong> (JavaScript Object Notation) is the standard format for sending data in APIs.</p>
            
            <h3>JSON Structure</h3>
            <p>JSON data consists of key-value pairs:</p>
            <pre><code>{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "isActive": true
}</code></pre>
            
            <h3>JSON Data Types</h3>
            <ul>
                <li><strong>String</strong> - <code>"text"</code></li>
                <li><strong>Number</strong> - <code>42</code> or <code>3.14</code></li>
                <li><strong>Boolean</strong> - <code>true</code> or <code>false</code></li>
                <li><strong>Array</strong> - <code>["item1", "item2"]</code></li>
                <li><strong>Object</strong> - <code>{"key": "value"}</code></li>
                <li><strong>Null</strong> - <code>null</code></li>
            </ul>
            
            <h3>Common Mistakes</h3>
            <ul>
                <li>❌ Using single quotes - Use double quotes: <code>"name"</code></li>
                <li>❌ Trailing commas - <code>{"a": 1,}</code> is invalid</li>
                <li>❌ Unquoted keys - Keys must be strings: <code>"key"</code></li>
            </ul>
            
            <div class="module-practice">
                <h3>🎯 Try It Yourself</h3>
                <p>In the API Tester, try creating a user with properly formatted JSON in the request body.</p>
                <a href="index.html" class="btn btn-success">Go to API Tester</a>
            </div>
        `
    },
    
    errors: {
        content: `
            <h2>🔧 Handling Errors</h2>
            <p>Errors are a normal part of working with APIs. Learning to identify and fix them is crucial!</p>
            
            <h3>Common API Errors</h3>
            <ul>
                <li><strong>Network Error</strong> - Can't reach server (check internet, server URL)</li>
                <li><strong>400 Bad Request</strong> - Invalid JSON or missing required fields</li>
                <li><strong>404 Not Found</strong> - Wrong endpoint or resource doesn't exist</li>
                <li><strong>500 Server Error</strong> - Problem on server side</li>
            </ul>
            
            <h3>How to Debug</h3>
            <ul>
                <li>✅ Check the status code first</li>
                <li>✅ Read the error message carefully</li>
                <li>✅ Verify your JSON syntax</li>
                <li>✅ Check required vs optional fields</li>
                <li>✅ Test with a simple request first</li>
            </ul>
            
            <h3>JSON Syntax Errors</h3>
            <pre><code>// ❌ Wrong
{name: "John", 'age': 30,}

// ✅ Correct
{"name": "John", "age": 30}</code></pre>
            
            <div class="module-practice">
                <h3>🎯 Try It Yourself</h3>
                <p>Try intentionally making errors in the API Tester to see different error messages. This helps you recognize them later!</p>
                <a href="index.html" class="btn btn-success">Go to API Tester</a>
            </div>
        `
    }
};

// Initialize accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(function(item) {
        const header = item.querySelector('.accordion-header');
        const toggle = item.querySelector('.accordion-toggle');
        const content = item.querySelector('.accordion-content');
        const moduleId = item.getAttribute('data-module');
        
        header.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');
            
            // Close all other accordions
            accordionItems.forEach(function(otherItem) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-toggle').textContent = '▼';
            });
            
            // Toggle current accordion
            if (!isOpen) {
                item.classList.add('active');
                toggle.textContent = '▲';
                
                // Load content if not already loaded
                if (!content.innerHTML) {
                    content.innerHTML = learningModules[moduleId].content;
                }
                
                // Scroll to the item smoothly
                setTimeout(function() {
                    item.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    });
});
