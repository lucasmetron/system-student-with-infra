const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`[API Fallback] Falha ao chamar GET ${endpoint}:`, error);
      return []; // mock fallback
    }
  },
  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`[API Fallback] Falha ao chamar POST ${endpoint}:`, error);
      return { success: true, message: 'Mock data created' }; // mock fallback
    }
  }
};
