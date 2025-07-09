# 📎 Mini URL Shortener API

A simple REST API that shortens long URLs and redirects to the original link.

## 🚀 Tech Stack
- Node.js
- Express.js
- MongoDB (via Mongoose)
- nanoid
- valid-url
- dotenv
- (optional) express-rate-limit

## 📦 Setup Instructions

1. Clone the repository
2. Install dependencies  
   `npm install`
3. Create `.env` file and set:

    MONGO_URI=mongodb+srv://mounikagoudlingala:mounika@cluster0.sultzep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0urlshortener
    BASE_URL=http://localhost:3000
    PORT=3000

4. Start MongoDB
5. Run the server  
`node index.js`

## 📌 API Endpoints

### POST /shorten

- **Body:**  
`{ "url": "https://example.com/verylongurl" }`
- **Response:**  
`{ "shortUrl": "http://localhost:3000/S5nMac" }`

### GET /:code

- Redirects to original URL if valid, or 404/410 if not found/expired.

## 🎁 Bonus Features
- URL validation using `valid-url`
- Rate limiting with `express-rate-limit`
- Click tracking
- Optional expiration logic




