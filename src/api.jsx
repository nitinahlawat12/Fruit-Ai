import axios from 'axios';

const API_URL = "http://localhost:5000";

export const getFAQs = async () => await fetch(`${API_URL}/faqs`);
export const createFAQ = async (data) => await axios.post(`${API_URL}/faqs`, data);
export const updateFAQ = async (id, data) => await axios.put(`${API_URL}/faqs/${id}`, data);
export const deleteFAQ = async (id) => await axios.delete(`${API_URL}/faqs/${id}`);
