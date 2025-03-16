const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const redis = require('redis');
const { RateLimiterRedis } = require('rate-limiter-flexible');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Redis Rate Limiting
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 200, // Requests per window
  duration: 15 * 60, // 15 minutes
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => next())
    .catch(() => res.status(429).json({ error: 'Too many requests' }));
};

// app.use(rateLimiterMiddleware);

// Routes
app.use('/api', urlRoutes);

// Database Connection
connectDB();

module.exports = app;