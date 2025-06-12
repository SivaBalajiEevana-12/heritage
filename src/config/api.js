// API configuration for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://heritage-server.onrender.com/contest"

export const API_ENDPOINTS = {
  EVENTS: `${API_BASE_URL}/events`,
  REGISTRATION: (schoolId) => `${API_BASE_URL}/registrations/${schoolId}`,
}

export default API_BASE_URL
