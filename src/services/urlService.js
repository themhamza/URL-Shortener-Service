const Url = require('../models/urlModel');
const { generateShortUrl } = require('../utils/hashUtil');

const createShortUrl = async (originalUrl, expiresAt) => {
  const shortUrl = generateShortUrl();
  const url = new Url({ originalUrl, shortUrl, expiresAt });
  await url.save();
  return shortUrl;
};

const getOriginalUrl = async (shortUrl) => {
  const url = await Url.findOne({ shortUrl });
  if (url) {
    if (url.expiresAt && new Date() > url.expiresAt) {
      return null; // URL has expired
    }
    url.clicks += 1; // Increment click count
    await url.save();
    return url.originalUrl;
  }
  return null; // URL not found
};

module.exports = { createShortUrl, getOriginalUrl };