// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update this with your actual API URL

export const searchApi = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Search API error:', error);
    throw error;
  }
};

export const getResultsApi = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cache`, { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Get Results API error:', error);
    throw error;
  }
};

export const sendEmailApi = async (results) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/email/send`, { results });
    return response.data;
  } catch (error) {
    console.error('Send Email API error:', error);
    throw error;
  }
};