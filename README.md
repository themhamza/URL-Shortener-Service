# URL Shortener Service

A scalable URL shortener service built with Node.js, Express, MongoDB, Redis, Docker, and NGINX.

## Features
- Shorten long URLs.
- Redirect to the original URL.
- Track URL usage statistics (clicks, timestamps).
- Set URL expiration dates.
- Rate limiting to prevent abuse.

## Prerequisites
- Docker
- Docker Compose
- Node.js

## Local Setup
---

1. Create a .env File
Create a .env file in the root directory with the following content:
`MONGO_URI=mongodb://mongo:27017/urlshortener
REDIS_HOST=redis
REDIS_PORT=6379
PORT=5000`

---

2. Build and Run the Docker Containers
Run the following command to build and start the Docker containers:

`docker-compose up --build`

---

3. Access the Application
The application will be available at:

`Backend API: http://localhost:5000`

`NGINX: http://localhost`

### API Endpoints

1. Shorten a URL
Method: POST

`URL: http://localhost:5000/api/shorten`

Body (JSON):

`{
  "originalUrl": "https://example.com",
  "expiresAt": "2025-12-31"
}`

---

2. Redirect to Original URL
Method: GET

`URL: http://localhost:5000/api/<shortUrl>`

Response: Redirects to the original URL.

3. Fetch Analytics
Method: GET

`URL: http://localhost:5000/api/analytics/<shortUrl>`

---

### Testing
---
Use Postman or your browser to test the API endpoints:

`Shorten a URL: Test the /api/shorten endpoint.`

`Redirect to Original URL: Test the /:shortUrl endpoint.`

Fetch Analytics: Test the /api/analytics/:shortUrl endpoint.
---
### Deployment to AWS (Not Completed)
---
Due to issues with creating an AWS account, the deployment to AWS has not been completed. If you have access to AWS, you can follow these steps to deploy the application:

Push Docker images to AWS ECR.

Deploy using AWS ECS.

Set up DNS using AWS Route 53.
