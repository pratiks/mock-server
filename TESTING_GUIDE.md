# 🧪 Testing Guide - Verify All Fixes

Open the browser console (F12 or Cmd+Option+I) while testing to see debug logs.

## ✅ Feature 1: Editable Request Body Field

### Test Case 1.1: Manual POST via API Tester
1. Open http://localhost:4000
2. In API Tester section:
   - Select **POST** method
   - Select **users** endpoint
   - **Endpoint URL should show:** `http://localhost:4000/users`
3. In the "Request Body (JSON)" textarea, type:
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "age": 25
   }
   ```
4. Click "Send Request"
5. **Expected Results:**
   - ✅ Status: 201 (green badge)
   - ✅ Response section has GREEN left border
   - ✅ Response body shows the created user with all fields
   - ✅ New user appears in Users table with name, email, and age
   - ✅ Request appears in history log

### Test Case 1.2: Invalid JSON Error
1. In Request Body field, enter INVALID JSON:
   ```
   {name: "test"}
   ```
2. Click "Send Request"
3. **Expected Results:**
   - ✅ Status: 400 (red badge)
   - ✅ Response section has RED left border
   - ✅ Error message: "Invalid JSON in request body"
   - ✅ Details show the JSON parse error

---

## ✅ Feature 2: Endpoint URL Display

### Test Case 2.1: URL Updates Automatically
1. In API Tester:
   - Method: **GET**
   - Endpoint: **users**
   - **Endpoint URL should show:** `http://localhost:4000/users`

2. Enter Resource ID: **1**
   - **Endpoint URL should update to:** `http://localhost:4000/users/1`

3. Change Endpoint to: **products**
   - **Endpoint URL should update to:** `http://localhost:4000/products/1`

4. Change Method to: **POST**
   - **Endpoint URL should show:** `http://localhost:4000/products` (no ID for POST)

5. Change Method to: **PUT**
   - **Endpoint URL should show:** `http://localhost:4000/products/1` (ID appears again)

### Test Case 2.2: URL is Read-Only
1. Try to click in the "Endpoint URL" field
2. Try to type
3. **Expected Result:** ✅ Field is read-only, cannot edit

---

## ✅ Feature 3: Complete Data Storage (No More Partial Records)

### Test Case 3.1: Add User via Modal Form
1. Click **"+ Add User"** button (below Users table)
2. Fill in the form:
   - Name: `Jane Doe`
   - Email: `jane@example.com`
   - Age: `30`
3. Check browser console - you should see logs like:
   ```
   Form elements found: {nameEl: input#name, emailEl: input#email, ageEl: input#age}
   Form values: {name: "Jane Doe", email: "jane@example.com", age: 30}
   Submitting data: {name: "Jane Doe", email: "jane@example.com", age: 30}
   Data as JSON: {"name":"Jane Doe","email":"jane@example.com","age":30}
   ```
4. Click "Add user"
5. **Expected Results:**
   - ✅ Modal closes
   - ✅ Response section shows Status 201
   - ✅ Response shows complete user object with all fields
   - ✅ Users table refreshes and shows new user with ALL fields (not just ID)
   - ✅ No partial records like `{"id": "xxx"}`

### Test Case 3.2: Add Product via Modal Form
1. Click **"+ Add Product"** button
2. Fill in:
   - Name: `Tablet`
   - Price: `599`
   - Category: `Electronics`
3. Click "Add product"
4. **Expected Results:**
   - ✅ Complete product appears in table with all fields

### Test Case 3.3: Validation - Missing Fields
1. Click **"+ Add User"** button
2. Leave Name field EMPTY
3. Fill in Email: `test@example.com`
4. Fill in Age: `25`
5. Click "Add user"
6. **Expected Results:**
   - ✅ Alert shows: "Validation Error: Missing or invalid fields: name"
   - ✅ Response section shows error
   - ✅ Modal stays open (can fix and resubmit)

### Test Case 3.4: PUT Request Updates Complete Data
1. Click **Edit** on any user
2. Change all fields:
   - Name: `Updated Name`
   - Email: `updated@example.com`
   - Age: `35`
3. Check console logs
4. Click "Update user"
5. **Expected Results:**
   - ✅ ALL fields updated in table
   - ✅ Response shows complete updated object

### Test Case 3.5: DELETE Request
1. Click **Delete** on any user
2. Confirm deletion
3. **Expected Results:**
   - ✅ Status 200
   - ✅ User removed from table
   - ✅ Response shown in response section

---

## ✅ Feature 4: Error Display in UI

### Test Case 4.1: 404 Not Found
1. API Tester:
   - Method: **GET**
   - Endpoint: **users**
   - Resource ID: **99999**
2. Click "Send Request"
3. **Expected Results:**
   - ✅ Status: 404 (red badge)
   - ✅ RED left border on response section
   - ✅ Response body shows error details

### Test Case 4.2: Network Error Simulation
1. Stop the server (Ctrl+C in terminal)
2. Try any API request
3. **Expected Results:**
   - ✅ Status: 500
   - ✅ RED border
   - ✅ Error: "Request failed"
   - ✅ Details show the error message

### Test Case 4.3: Visual Error Indicators
1. Make a successful request (POST with valid data)
   - **Response section should have:** 🟢 GREEN left border
2. Make a failed request (GET /users/99999)
   - **Response section should have:** 🔴 RED left border

---

## 🔍 Checking Database Directly

1. Open `db.json` file in your editor
2. Look at the "users" array
3. **Expected:** All users should have complete objects like:
   ```json
   {
     "id": "1",
     "name": "Alice Johnson",
     "email": "alice@example.com",
     "age": 30
   }
   ```
4. **NOT expected:** Partial objects like:
   ```json
   {
     "id": "98e7"
   }
   ```

---

## 🐛 Debugging Checklist

If something doesn't work:

1. **Open Browser Console** (F12)
   - Look for console.log messages
   - Check for any errors (red messages)

2. **Check Network Tab**
   - See what data is actually being sent in requests
   - Verify the request payload

3. **Verify Server is Running**
   - Terminal should show: "JSON Server started on PORT :4000"
   - Try accessing http://localhost:4000/users directly

4. **Clear Browser Cache**
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

5. **Check db.json**
   - Make sure no corrupted records exist
   - Should only have complete objects

---

## ✨ Summary of What Should Work

- ✅ Request body textarea is fully editable
- ✅ Endpoint URL field shows complete URL with hostname
- ✅ POST creates records with ALL fields (no partial data)
- ✅ PUT updates records with ALL fields
- ✅ DELETE removes records properly
- ✅ Errors show in UI with colored borders
- ✅ Error messages are detailed and helpful
- ✅ Status codes displayed correctly
- ✅ Console logs help with debugging

---

## 🆘 If Issues Persist

1. Take a screenshot of:
   - The browser console
   - The response section
   - The db.json file showing the problematic record

2. Note:
   - What action triggered the issue
   - What you expected to happen
   - What actually happened

3. Check if JavaScript errors appear in console
