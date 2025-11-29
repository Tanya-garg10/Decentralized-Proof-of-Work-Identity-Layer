import axios from "axios";

const API_BASE = "http://localhost:4000/api";

export const fetchGitHub = (username) =>
  axios.get(`${API_BASE}/github/${username}`);

export const fetchLeetCode = (username) =>
  axios.get(`${API_BASE}/leetcode/${username}`);

export const verifyUser = (username) =>
  axios.get(`${API_BASE}/verify/${username}`);

export const storeOnChain = (username) =>
  axios.post(`${API_BASE}/blockchain/store/${username}`);

export const verifyOnChain = (username) =>
  axios.get(`${API_BASE}/blockchain/verify/${username}`);
