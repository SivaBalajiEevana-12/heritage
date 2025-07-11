// API configuration for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://heritage-server-389286764509.asia-south1.run.app/contest"

export const API_ENDPOINTS = {
  EVENTS: `${API_BASE_URL}/events`,
  REGISTRATION: (schoolId) => `${API_BASE_URL}/registrations/${schoolId}`,
}

export default API_BASE_URL
