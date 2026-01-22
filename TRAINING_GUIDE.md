# 🎓 API Training Workshop - Instructor Guide

## Quick Access Information

### Local Access
**Training Interface:** http://localhost:4000

### Remote Access (for distributed teams)
**Public URL:** Check the ngrok terminal output for the current URL
- Format: `https://[random-id].ngrok-free.app`
- Changes each time ngrok restarts
- Share this URL with all remote participants

---

## 🎯 Workshop Overview

This interactive training platform teaches API fundamentals through hands-on practice with a real mock server.

### Learning Objectives
By the end of this workshop, participants will:
1. Understand what APIs are and why they matter
2. Know the four main HTTP methods (GET, POST, PUT, DELETE)
3. Be able to read and interpret JSON responses
4. Understand HTTP status codes
5. Feel comfortable testing APIs

---

## 📋 Workshop Agenda (2-hour session)

### Part 1: Introduction (15 minutes)
- What are APIs?
- Real-world API examples
- REST API basics
- Tour of the training interface

### Part 2: Reading Data - GET (20 minutes)
- Understanding GET requests
- Viewing all records
- Fetching specific records by ID
- Query parameters (optional advanced topic)

### Part 3: Creating Data - POST (25 minutes)
- Understanding POST requests
- JSON request body format
- Creating new users, products, orders
- Handling validation errors

**BREAK** (10 minutes)

### Part 4: Updating Data - PUT (20 minutes)
- Understanding PUT requests
- Modifying existing records
- Comparing GET vs PUT
- Best practices for updates

### Part 5: Deleting Data - DELETE (15 minutes)
- Understanding DELETE requests
- Removing records
- Handling 404 errors
- Understanding cascading effects

### Part 6: Practice & Q&A (15 minutes)
- Free exploration
- Real-world scenarios
- Questions and answers
- Next steps

---

## 🎨 Interface Features Explained

### 1. Information Banner (Top)
- **Purpose:** Quick reference for HTTP methods
- **Teaching Tip:** Refer back here when introducing each method

### 2. API Endpoints Section
- **Purpose:** Show available resources
- **Teaching Tip:** Explain resource-based URL structure

### 3. API Tester Tool
- **Purpose:** Hands-on API request building
- **Key Features:**
  - Method selector (GET/POST/PUT/DELETE)
  - Endpoint selector (users/products/orders)
  - Dynamic form fields based on method
  - Response viewer with status codes
  - Response time measurement

### 4. Data Visualization Tables
- **Purpose:** See live database state
- **Features:**
  - Real-time data display
  - Inline edit/delete actions
  - Color-coded for readability
  - Auto-refresh after changes

### 5. Request History Log
- **Purpose:** Track and learn from all API calls
- **Teaching Tip:** Use this to review what was done

---

## 👨‍🏫 Teaching Scenarios

### Scenario 1: "The User Registration"
**Objective:** Create a new user account

**Steps:**
1. Show current users in the table
2. Use API Tester: POST /users
3. Provide example JSON:
   ```json
   {
     "name": "Jane Doe",
     "email": "jane@example.com",
     "age": 27
   }
   ```
4. Send request
5. Point out:
   - 201 Created status code
   - New user in response
   - Table updates automatically
   - Request appears in history

### Scenario 2: "The Price Update"
**Objective:** Update a product price

**Steps:**
1. Show products table
2. Click "Edit" on a product OR use API Tester
3. If using API Tester:
   - Method: PUT
   - Endpoint: products
   - ID: 1
   - Body with updated price
4. Send request
5. Point out:
   - 200 OK status
   - Updated data in response
   - Table reflects new price

### Scenario 3: "The Order Fulfillment"
**Objective:** Change order status to delivered

**Steps:**
1. Find pending order
2. Use inline edit or API Tester
3. Change status: "pending" → "delivered"
4. Show how this represents real-world workflow

### Scenario 4: "The Product Discontinuation"
**Objective:** Remove a product from catalog

**Steps:**
1. Identify product to remove
2. Click Delete OR use API Tester with DELETE method
3. Confirm action
4. Point out:
   - 200 OK response (even though body is empty)
   - Product disappears from table
   - Try to GET the deleted product (404 error)

---

## 🎓 Key Concepts to Emphasize

### HTTP Methods (CRUD Operations)
| Method | CRUD | Purpose | Safe? | Idempotent? |
|--------|------|---------|-------|-------------|
| GET | Read | Retrieve data | Yes | Yes |
| POST | Create | Add new data | No | No |
| PUT | Update | Modify existing data | No | Yes |
| DELETE | Delete | Remove data | No | Yes |

### HTTP Status Codes
- **200 OK** - Request successful
- **201 Created** - New resource created
- **400 Bad Request** - Invalid data sent
- **404 Not Found** - Resource doesn't exist
- **500 Server Error** - Something went wrong on server

### JSON Format
- Key-value pairs
- Data interchange format
- Human-readable
- Used in request bodies and responses

---

## 💡 Teaching Tips

### Do's ✅
- **Encourage experimentation** - "You can't break anything!"
- **Use real-world analogies** - "Like calling a restaurant to place an order"
- **Show both methods** - UI buttons AND API tester
- **Celebrate errors** - "Great! Let's see what this error tells us"
- **Use the history log** - Review what participants did
- **Let them drive** - Screen share and let them click

### Don'ts ❌
- Don't rush through GET - it's the foundation
- Don't skip error scenarios - they're learning opportunities
- Don't use technical jargon without explaining
- Don't assume prior knowledge
- Don't forget to show response times
- Don't move on until everyone understands

---

## 🔧 Common Issues & Solutions

### Issue: "I don't see my changes"
**Solution:** Click the "Refresh Data" button

### Issue: "I got a 404 error"
**Solution:** Perfect teaching moment! Explain resource not found

### Issue: "My JSON is invalid"
**Solution:** Show them the error, explain JSON formatting rules
- Strings need quotes
- Numbers don't need quotes
- Commas between properties
- No trailing commas

### Issue: "Can't create order with userId that doesn't exist"
**Solution:** json-server doesn't validate relationships, but good discussion point

---

## 📊 Assessment Questions

Use these to gauge understanding:

1. **What HTTP method would you use to get a list of all products?**
   - Answer: GET

2. **If you want to update a user's email, which method do you use?**
   - Answer: PUT

3. **What does a 404 status code mean?**
   - Answer: Resource not found

4. **True or False: POST and PUT do the same thing**
   - Answer: False (POST creates, PUT updates)

5. **What format is used for sending data in the request body?**
   - Answer: JSON

---

## 🚀 Advanced Topics (Time Permitting)

### Query Parameters
- Filtering: `/users?age=30`
- Sorting: `/products?_sort=price&_order=asc`
- Pagination: `/orders?_page=1&_limit=10`

### Relationships
- Embedding: `/orders?_embed=user`
- Expansion: Show how userId relates to actual user

### Headers
- Content-Type: application/json
- Authorization (conceptual)

### Real-World Integration
- How web apps use these APIs
- Mobile apps and APIs
- Third-party integrations

---

## 📚 Resources for Participants

**After the workshop, share:**
1. Link to the training server (if keeping it running)
2. This README.md file
3. Recommended tools:
   - Postman (GUI for API testing)
   - cURL (command-line tool)
   - Browser DevTools Network tab

**Further Learning:**
- RESTful API design principles
- API authentication (OAuth, API keys)
- API documentation (Swagger/OpenAPI)
- GraphQL as an alternative

---

## 🎬 Pre-Workshop Checklist

- [ ] Server is running (`npm start`)
- [ ] ngrok is running (for remote participants)
- [ ] Share the ngrok URL with participants
- [ ] Test the interface in a browser
- [ ] Verify all CRUD operations work
- [ ] Have example JSON ready to copy-paste
- [ ] Prepare screen sharing setup
- [ ] Have backup examples ready

## 📝 Post-Workshop Follow-up

- [ ] Share recording (if recorded)
- [ ] Send out additional resources
- [ ] Provide practice exercises
- [ ] Collect feedback
- [ ] Answer follow-up questions

---

## 🎉 Success Metrics

Participants successfully completed training if they can:
- [ ] Explain what an API is in their own words
- [ ] Differentiate between GET, POST, PUT, and DELETE
- [ ] Successfully create a new record using the interface
- [ ] Update an existing record
- [ ] Interpret HTTP status codes
- [ ] Read and understand JSON responses

---

**Happy Teaching! 🎓**

Questions? Need help? Check the main README.md or explore the code - it's well-commented for learning!
