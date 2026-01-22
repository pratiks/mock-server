# API Training Mock Server

A comprehensive training platform for teaching non-technical users how APIs work through hands-on practice.

## 🎯 Purpose

This mock server provides a safe, interactive environment where learners can:
- Understand REST API concepts (GET, POST, PUT, DELETE)
- Practice making API requests
- See real-time data changes
- Learn HTTP methods and responses
- Experiment without fear of breaking anything

## 🚀 Quick Start

### 1. Start the Mock Server

```bash
npm start
```

The server will start on **http://localhost:4000**

### 2. Access the Training Interface

Open your browser and navigate to:
```
http://localhost:4000
```

You'll see a beautiful, interactive interface with:
- Educational content explaining APIs
- Live data tables (Users, Products, Orders)
- Interactive API testing tool
- Request/response viewer
- Request history log

## 📡 Available Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get a specific user
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get a specific product
- `POST /products` - Create a new product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

### Orders
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get a specific order
- `POST /orders` - Create a new order
- `PUT /orders/:id` - Update an order
- `DELETE /orders/:id` - Delete an order

## 🌐 Making it Accessible Remotely

For remote teams, use **ngrok** to create a public URL:

```bash
# In a new terminal window
ngrok http 4000
```

Ngrok will provide a public URL like:
```
https://abc123.ngrok.io
```

Share this URL with your remote team. They can access the training interface and API endpoints through this link.

## 💡 Training Features

### 1. **Visual Data Tables**
- Real-time display of all database records
- Color-coded for easy reading
- Instant updates when data changes

### 2. **Interactive API Tester**
- Select HTTP method (GET, POST, PUT, DELETE)
- Choose endpoint (users, products, orders)
- View formatted responses
- See HTTP status codes
- Monitor response times

### 3. **CRUD Operations via UI**
- Add new records with forms
- Edit existing records
- Delete records with confirmation
- All changes reflected immediately

### 4. **Request History**
- Track all API calls made during session
- See method, URL, status code, and timestamp
- Learn from successful and failed requests

### 5. **Educational Content**
- Built-in explanations of REST concepts
- HTTP method descriptions
- Example request bodies
- Best practices

## 📚 Training Exercises

### Exercise 1: Understanding GET Requests
1. Use the API tester to fetch all users
2. Note the response structure
3. Try fetching a specific user by ID
4. Compare the responses

### Exercise 2: Creating Data (POST)
1. Select POST method
2. Choose "users" endpoint
3. Use the example JSON provided
4. Send the request
5. Watch the new user appear in the table

### Exercise 3: Updating Data (PUT)
1. Click "Edit" on any user in the table
2. Modify the information
3. Submit and observe the changes
4. Verify in the data table

### Exercise 4: Deleting Data (DELETE)
1. Select a record to delete
2. Confirm the deletion
3. Watch it disappear from the table
4. Try to fetch it again (should return 404)

## 🔧 Customization

### Adding More Sample Data

Edit `db.json` to add more records:

```json
{
  "users": [...],
  "products": [...],
  "orders": [...]
}
```

### Changing the Port

Edit `package.json`:

```json
"scripts": {
  "start": "json-server --watch db.json --port YOUR_PORT"
}
```

## 💾 Data Persistence

All changes made through the API are saved to `db.json`. The data persists between server restarts, allowing learners to:
- Build on previous sessions
- See cumulative changes
- Reset by restoring the original `db.json`

## 🛠️ Technical Stack

- **json-server**: Lightweight REST API mock server
- **Vanilla JavaScript**: No frameworks, easy to understand
- **Modern CSS**: Beautiful, responsive design
- **HTML5**: Semantic markup

## 📖 Teaching Tips

1. **Start Simple**: Begin with GET requests to show data retrieval
2. **Build Up**: Progress to POST, then PUT, then DELETE
3. **Use Real Scenarios**: Create realistic user stories
4. **Encourage Experimentation**: Let learners break things safely
5. **Show Both Methods**: Demonstrate both UI buttons and API tester
6. **Explain Status Codes**: Use failures as teaching moments

## 🐛 Troubleshooting

### Server Won't Start
- Check if port 4000 is already in use
- Run `lsof -i :4000` to find conflicting processes

### Data Not Updating
- Refresh the page
- Click the "Refresh Data" button
- Check browser console for errors

### ngrok Connection Issues
- Ensure ngrok is authenticated
- Try a different region
- Check firewall settings

## 📝 License

MIT - Feel free to use this for training purposes!

## 🤝 Support

For issues or questions about using this training platform, check:
- The browser console for errors
- Network tab in DevTools to see API calls
- `db.json` for current data state

---

Happy Learning! 🎓
