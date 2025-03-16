const Url = require('../models/urlModel');

const getAnalytics = async (shortUrl) => {
  const url = await Url.findOne({ shortUrl });
  if (url) {
    return {
      shortUrl: url.shortUrl,
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
    };
  }
  return null;
};

module.exports = { getAnalytics };