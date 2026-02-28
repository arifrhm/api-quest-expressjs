# API Quest - REST API Challenge

A production-ready REST API built with Node.js and Express.js to pass the "Desent Solutions – Backend Challenge (API Quest)" with all 8 levels.

## Project Structure

```
api-quest/
├── server.js                 # Main entry point
├── package.json              # Dependencies and scripts
├── src/
│   ├── controllers/          # Request handlers
│   │   └── booksController.js
│   ├── routes/               # Route definitions
│   │   ├── index.js
│   │   ├── auth.js
│   │   └── books.js
│   ├── services/             # Business logic
│   │   └── authService.js
│   ├── storage/              # In-memory data store
│   │   └── memoryStore.js
│   └── middleware/           # Custom middleware
│       ├── auth.js
│       └── errorHandler.js
```

## Local Setup

```bash
cd api-quest
npm install
npm start
```

Server runs on `http://localhost:3000`

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Level 1 - Ping
```
GET /ping
```
Response: `{"message": "pong"}`

### Level 2 - Echo
```
POST /echo
Body: {"message": "hello"}
```
Response: `{"echo": "hello"}`

### Level 3 & 4 - Books CRUD
```
POST   /books          # Create book (auth required)
GET    /books          # List all books (auth required)
GET    /books/:id      # Get book by ID (auth required)
PUT    /books/:id      # Update book (auth required)
DELETE /books/:id      # Delete book (auth required)
```

Book object:
```json
{
  "id": 1,
  "title": "string",
  "author": "string"
}
```

### Level 5 - Authentication
```
POST /auth/token
Body: {"username": "admin", "password": "admin"}
```
Response:
```json
{
  "access_token": "...",
  "token_type": "bearer"
}
```

Use the token in Authorization header:
```
Authorization: Bearer <access_token>
```

### Level 6 - Search & Pagination
```
GET /books?author=John          # Filter by author
GET /books?page=1&limit=2       # Pagination
```

### Level 7 - Error Handling
All errors return consistent format:
```json
{
  "detail": "error message"
}
```

Status codes:
- `422` - Validation error
- `404` - Resource not found
- `401` - Unauthorized
- `500` - Internal server error

## Deploy to Render

1. Create a new account at [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables** (optional):
     - `PORT`: 3000 (auto-assigned by Render)
5. Click "Deploy"

Your API will be available at: `https://your-app-name.onrender.com`

## Deploy to Railway

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login:
```bash
railway login
```

3. Initialize and deploy:
```bash
cd api-quest
railway init
railway up
```

Or via the Railway dashboard:
1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Railway will auto-detect Node.js settings
5. Click "Deploy"

## Testing Example

```bash
# Get auth token
TOKEN=$(curl -s -X POST http://localhost:3000/auth/token \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}' | jq -r '.access_token')

# Create a book
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"1984","author":"George Orwell"}'

# Get all books
curl http://localhost:3000/books \
  -H "Authorization: Bearer $TOKEN"

# Get book by ID
curl http://localhost:3000/books/1 \
  -H "Authorization: Bearer $TOKEN"

# Update book
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Nineteen Eighty-Four"}'

# Delete book
curl -X DELETE http://localhost:3000/books/1 \
  -H "Authorization: Bearer $TOKEN"
```
