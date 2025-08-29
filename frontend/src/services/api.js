import axios from 'axios';

// API base configuration
const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Sustainability Actions API Service
 * Handles all CRUD operations for sustainability actions
 */
export const sustainabilityActionsAPI = {
  /**
   * Get all sustainability actions
   * @returns {Promise<Array>} Array of sustainability actions
   */
  getAllActions: async () => {
    try {
      const response = await apiClient.get('/actions');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch actions: ${error.response?.data?.error || error.message}`);
    }
  },

  /**
   * Create a new sustainability action
   * @param {Object} actionData - The action data
   * @param {string} actionData.action - Action description
   * @param {string} actionData.date - Action date
   * @param {number} actionData.points - Points earned
   * @returns {Promise<Object>} Created action object
   */
  createAction: async (actionData) => {
    try {
      const response = await apiClient.post('/actions', actionData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create action: ${error.response?.data?.error || error.message}`);
    }
  },

  /**
   * Update an existing sustainability action (PUT - replace entire object)
   * @param {number} id - Action ID
   * @param {Object} actionData - The complete action data
   * @returns {Promise<Object>} Updated action object
   */
  updateAction: async (id, actionData) => {
    try {
      const response = await apiClient.put(`/actions/${id}`, actionData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update action: ${error.response?.data?.error || error.message}`);
    }
  },

  /**
   * Partially update an existing sustainability action (PATCH - update specific fields)
   * @param {number} id - Action ID
   * @param {Object} actionData - Partial action data
   * @returns {Promise<Object>} Updated action object
   */
  patchAction: async (id, actionData) => {
    try {
      const response = await apiClient.patch(`/actions/${id}`, actionData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to patch action: ${error.response?.data?.error || error.message}`);
    }
  },

  /**
   * Delete a sustainability action
   * @param {number} id - Action ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  deleteAction: async (id) => {
    try {
      const response = await apiClient.delete(`/actions/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete action: ${error.response?.data?.error || error.message}`);
    }
  },
};

export default apiClient;
