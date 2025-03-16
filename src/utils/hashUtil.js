const shortid = require('shortid');

const generateShortUrl = () => {
  return shortid.generate();
};

module.exports = { generateShortUrl };