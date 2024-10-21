// server/routes/search.js
const express = require('express');
const axios = require('axios');
const SearchCache = require('../models/Cache');
const router = express.Router();

// Fetch results from Stack Overflow and Reddit
export const fetchResults = async (query) => {
  const stackOverflow = await axios.get(`https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&site=stackoverflow&q=${query}`);
  const reddit = await axios.get(`https://www.reddit.com/search.json?q=${query}`);

  return [
    ...stackOverflow.data.items.map(item => ({
      title: item.title,
      summary: item.body,
      link: item.link,
    })),
    ...reddit.data.data.children.map(child => ({
      title: child.data.title,
      summary: child.data.selftext,
      link: `https://www.reddit.com${child.data.permalink}`,
    })),
  ];
};

// GET /api/search
router.get('/', async (req, res) => {
  const { query } = req.query;

  // Check if the query is cached
  const cachedResult = await SearchCache.findOne({ query });
  if (cachedResult && (Date.now() - cachedResult.lastFetched < 24 * 60 * 60 * 1000)) {
    return res.json(cachedResult.results);
  }

  try {
    const results = await fetchResults(query);

    // Cache the results in MongoDB
    await SearchCache.create({ query, results });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching results');
  }
});

module.exports = router;
