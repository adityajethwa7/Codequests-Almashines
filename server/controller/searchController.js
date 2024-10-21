const axios = require('axios');

exports.getStackOverflowResults = async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  const url = `https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${encodeURIComponent(query)}&site=stackoverflow`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching from Stack Overflow:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch data from Stack Overflow', details: error.message });
  }
};

exports.getRedditResults = async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching from Reddit:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch data from Reddit', details: error.message });
  }
};