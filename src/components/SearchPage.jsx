/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('relevance');
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const stackOverflowRes = await axios.get(`/api/search/stackoverflow`, { params: { query } });
      const redditRes = await axios.get(`/api/search/reddit`, { params: { query } });

      const combinedResults = [
        ...stackOverflowRes.data.items.map(item => ({
          title: item.title,
          summary: item.body,
          link: item.link,
          upvotes: item.score,
          source: 'Stack Overflow',
          date: item.creation_date,
        })),
        ...redditRes.data.data.children.map(child => ({
          title: child.data.title,
          summary: child.data.selftext || 'No summary available',
          link: `https://www.reddit.com${child.data.permalink}`,
          upvotes: child.data.ups,
          source: 'Reddit',
          date: child.data.created_utc,
        })),
      ];

      setResults(combinedResults);
    } catch (err) {
      console.error('Error fetching results:', err);
      setError('An error occurred while fetching results.');
    }
  };

  const sendEmail = (title, summary, upvotes, source, e) => {
    e.preventDefault();

    const to_email = prompt("Enter your email:");
    if (!to_email) return;

    const templateParams = {
      from_email: to_email, // Your email where form submissions will be sent
      to_email: to_email,
      title: title,
      summary: summary,
      upvotes: upvotes,
      source: source,
    };

    emailjs.send(
      "service_t1fn4q8",  // Replace with your EmailJS service ID
      "template_0vjfnxg",  // Replace with your EmailJS template ID
      templateParams,
      "LXdwi3mqW3UtT0bzI"  // Replace with your EmailJS user ID
    )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      }, (err) => {
        console.log("FAILED...", err);
      });
  };

  const sortResults = useCallback((results) => {
    let sortedResults = [...results];
    if (sort === 'relevance') {
      // Sort based on source or title length as an example of relevance
      sortedResults = sortedResults.sort((a, b) => a.title.length - b.title.length);
    } else if (sort === 'date') {
      sortedResults = sortedResults.sort((a, b) => b.date - a.date);
    } else if (sort === 'upvotes') {
      sortedResults = sortedResults.sort((a, b) => b.upvotes - a.upvotes);
    }
    return sortedResults;
  }, [sort]);

  useEffect(() => {
    setResults(prevResults => sortResults(prevResults));
  }, [sort, sortResults]);

  const filteredResults = results.filter(result => {
    if (filter === 'all') return true;
    return result.source === filter;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">CODEQUEST ALMASHINES</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search term"
          className="border border-gray-300 p-2 mr-2 rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Search
        </button>
      </form>

      <div className="mb-4 flex space-x-4">
        <select onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded">
          <option value="all">All Sources</option>
          <option value="Stack Overflow">Stack Overflow</option>
          <option value="Reddit">Reddit</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)} className="border p-2 rounded">
          <option value="relevance">Sort by Relevance</option>
          <option value="date">Sort by Date</option>
          <option value="upvotes">Sort by Upvotes</option>
        </select>
      </div>

      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 gap-4">
        {filteredResults.length > 0 ? (
          filteredResults.map((result, index) => (
            <div key={index} className="border p-4 rounded-md bg-white shadow-md">
              <h3 className="font-bold text-xl mb-2">{result.title}</h3>
              <p className="text-gray-700">{result.summary}</p>
              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read more
              </a>
              <p className="mt-2 text-gray-500">Upvotes: {result.upvotes} | Source: {result.source}</p>
              <button
                onClick={(e) => sendEmail(result.title, result.summary, result.upvotes, result.source, e)}
                style={{ backgroundColor: 'gray', padding: '10px' }}
              >
                Send email
              </button>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;