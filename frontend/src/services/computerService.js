import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/pcs'; 
 // Update if your backend URL or route differs

// Fetch all computers
export const getComputers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_BASE_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching computers", error.response?.data || error.message);
    throw error;
  }
};


// Add a new computer
export const addComputer = async (computerData) => {
  try {
    const token = localStorage.getItem('token'); // or get from context/state
    const response = await axios.post(API_BASE_URL, computerData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding computer", error.response?.data || error.message);
    throw error;
  }
};
