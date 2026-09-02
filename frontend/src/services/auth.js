/**
 * Codevora Frontend Authentication Service
 * Communicates with FastAPI backend auth endpoints
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001';

/**
 * Helper to handle HTTP response errors and network failures
 */
const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  
  if (!response.ok) {
    let errorMessage = data.detail || 'An unexpected error occurred. Please try again.';
    
    // If Pydantic validation errors array returned
    if (Array.isArray(errorMessage)) {
      errorMessage = errorMessage.map((err) => err.msg).join(', ');
    }
    
    throw new Error(errorMessage);
  }
  
  return data;
};

/**
 * Wrapper for fetch requests with clear network error handling
 */
const safeFetch = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return await handleResponse(response);
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        `Unable to connect to Codevora backend server. Please ensure the FastAPI server is running on ${API_BASE_URL}.`
      );
    }
    throw error;
  }
};

/**
 * User Registration Request
 * @param {Object} userData - { username, email, password }
 */
export const signup = async (userData) => {
  return safeFetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

/**
 * User Login Request
 * @param {Object} credentials - { identifier, password }
 */
export const login = async (credentials) => {
  return safeFetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
};

/**
 * Fetch Current Authenticated User Info
 * @param {string} token - JWT Access Token
 */
export const getCurrentUser = async (token) => {
  if (!token) {
    throw new Error('No authentication token provided');
  }

  return safeFetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
};
