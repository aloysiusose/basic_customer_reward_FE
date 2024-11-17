// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/customer'; // Adjust the base URL as needed

export const spinRewardWheel = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/spin/${id}`, { withCredentials: true });
    return response.data;
};

export const addRewardWinners = async (claimReward, id, sessionId) => {
    const response = await axios.post(`${API_BASE_URL}/add-winners/${id}`, claimReward, { params: { sessionId }, withCredentials: true });
    return response.data;
};

export const refreshSpinner = async (rewardId) => {
    const response = await axios.get(`${API_BASE_URL}/update-spinner`, { params: { rewardId }, withCredentials: true });
    return response.data;
};