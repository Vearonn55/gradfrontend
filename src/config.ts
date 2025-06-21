// src/config.ts

// You can switch between localhost and your LAN IP here
const LOCALHOST = "http://localhost:5050";
const LOCAL_STATIC_IP = "http://192.168.1.131:5050"; // replace with your actual IP if needed

// Toggle this value to switch environments
const USE_LOCAL_STATIC_IP = false;

export const API_BASE_URL = USE_LOCAL_STATIC_IP ? LOCAL_STATIC_IP : LOCALHOST;
