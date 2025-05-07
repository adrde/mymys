import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/computers'; // Update if your backend URL or route differs

// Fetch all computers
export const getComputers = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching computers", error);
    throw error;
  }
};

// Add a new computer
export const addComputer = async (computerData) => {
  try {
    const response = await axios.post(API_BASE_URL, computerData);
    return response.data;
  } catch (error) {
    console.error("Error adding computer", error);
    throw error;
  }
};
