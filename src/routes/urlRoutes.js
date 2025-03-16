const express = require('express');
const router = express.Router();
const urlService = require('../services/urlService');
const analyticsService = require('../services/analyticsService');

// Shorten URL
router.post('/shorten', async (req, res) => {
  const { originalUrl, expiresAt } = req.body;
  const shortUrl = await urlService.createShortUrl(originalUrl, expiresAt);
  res.json({ shortUrl });
});

// Redirect to Original URL
router.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  const originalUrl = await urlService.getOriginalUrl(shortUrl);
  if (originalUrl) {
    // Ensure the URL has a protocol
    const formattedUrl = originalUrl.startsWith('http') ? originalUrl : `http://${originalUrl}`;
    res.redirect(301, formattedUrl); // Use 301 for permanent redirect
  } else {
    res.status(404).json({ error: 'URL not found or expired' });
  }
});

// Get Analytics
router.get('/analytics/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  const analytics = await analyticsService.getAnalytics(shortUrl);
  if (analytics) {
    res.json(analytics);
  } else {
    res.status(404).json({ error: 'URL not found' });
  }
});

module.exports = router;