# 📋 API Quick Reference Card

Print this or keep it handy during training!

---

## 🌐 Access URLs

**Training Interface:** http://localhost:4000  
**Remote Access:** *[Instructor will provide ngrok URL]*

---

## 🔤 HTTP Methods Cheat Sheet

| Method | Purpose | Has Body? | Example |
|--------|---------|-----------|---------|
| **GET** | Get data | ❌ No | Get all users |
| **POST** | Create new | ✅ Yes | Add new user |
| **PUT** | Update existing | ✅ Yes | Update user #1 |
| **DELETE** | Remove | ❌ No | Delete user #1 |

---

## 📡 Available Endpoints

### Users
- **GET** `/users` - List all users
- **GET** `/users/1` - Get user #1
- **POST** `/users` - Create new user
- **PUT** `/users/1` - Update user #1
- **DELETE** `/users/1` - Delete user #1

### Products
- **GET** `/products` - List all products
- **GET** `/products/1` - Get product #1
- **POST** `/products` - Create new product
- **PUT** `/products/1` - Update product #1
- **DELETE** `/products/1` - Delete product #1

### Orders
- **GET** `/orders` - List all orders
- **GET** `/orders/1` - Get order #1
- **POST** `/orders` - Create new order
- **PUT** `/orders/1` - Update order #1
- **DELETE** `/orders/1` - Delete order #1

---

## 📝 Example JSON Bodies

### Create User (POST /users)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

### Create Product (POST /products)
```json
{
  "name": "Laptop",
  "price": 999,
  "category": "Electronics"
}
```

### Create Order (POST /orders)
```json
{
  "userId": 1,
  "productId": 2,
  "quantity": 1,
  "status": "pending"
}
```

### Update User (PUT /users/1)
```json
{
  "name": "John Updated",
  "email": "john.new@example.com",
  "age": 31
}
```

---

## 🚦 Status Codes

| Code | Meaning | What happened? |
|------|---------|----------------|
| **200** | OK | Request succeeded |
| **201** | Created | New resource created |
| **400** | Bad Request | Invalid data sent |
| **404** | Not Found | Resource doesn't exist |
| **500** | Server Error | Server problem |

---

## 🎯 Quick Practice Exercises

### Exercise 1: Read Data
1. Open the training interface
2. Use API Tester with GET method
3. Select "users" endpoint
4. Click "Send Request"
5. ✅ You should see all users in the response

### Exercise 2: Create Data
1. Select POST method
2. Choose "products" endpoint
3. Copy the example product JSON above
4. Paste into Request Body field
5. Click "Send Request"
6. ✅ Check the products table for your new item

### Exercise 3: Update Data
1. Note the ID of a user in the table
2. Select PUT method
3. Choose "users" endpoint
4. Enter the ID number
5. Modify the JSON with new values
6. Click "Send Request"
7. ✅ Verify changes in the table

### Exercise 4: Delete Data
1. Click "Delete" button on any table row
2. Confirm deletion
3. ✅ Item disappears from table

---

## 🛠️ Tips & Tricks

### ✨ Pro Tips
- **Valid JSON:** Always use double quotes for strings
- **Refresh:** Click "Refresh Data" if tables don't update
- **History:** Check request history to see what you did
- **Experiment:** You can't break anything - try it out!

### ⚠️ Common Mistakes
- Forgetting quotes around string values
- Using single quotes instead of double quotes
- Trailing commas in JSON
- Wrong HTTP method for the operation
- Forgetting to specify ID for PUT/DELETE

---

## 🎓 Key Takeaways

1. **APIs enable communication** between different software systems
2. **REST APIs use HTTP methods** for different operations
3. **JSON** is the standard format for data exchange
4. **Status codes** tell you if your request succeeded
5. **GET is safe** - it only reads, doesn't modify
6. **POST creates, PUT updates, DELETE removes**

---

## 📚 After Training

### Practice More
- Try combining operations (create then update)
- Experiment with different values
- See what errors you can trigger
- Try using query parameters

### Tools to Explore
- **Postman** - Popular API testing tool
- **cURL** - Command-line HTTP tool
- **Browser DevTools** - Network tab
- **Insomnia** - Alternative to Postman

### Next Steps
- Build your own simple API
- Integrate with real APIs (weather, maps, etc.)
- Learn about API authentication
- Explore API documentation standards

---

## 📞 Need Help?

**During Training:**
- Ask the instructor
- Check the request history for clues
- Look at the response status code
- Verify your JSON format

**After Training:**
- Review the README.md file
- Check the TRAINING_GUIDE.md
- Practice with the interface
- Research online resources

---

**Remember:** The best way to learn APIs is by doing. Don't be afraid to experiment! 🚀

---

*Created with ❤️ for API learners everywhere*
