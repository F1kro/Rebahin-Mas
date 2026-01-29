const BASE_URL = 'https://zeldvorik.ru/rebahin21';

export const api = {
  getHome: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api.php?action=home`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching home data:', error);
      return { success: false, data: [] };
    }
  },
  
  getMovies: async (page = 1) => {
    try {
      const response = await fetch(`${BASE_URL}/api.php?action=movies&page=${page}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching movies:', error);
      return { success: false, data: [], page };
    }
  },
  
  getSeries: async (page = 1) => {
    try {
      const response = await fetch(`${BASE_URL}/api.php?action=series&page=${page}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching series:', error);
      return { success: false, data: [], page };
    }
  },
  
  getTrending: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api.php?action=trending`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching trending:', error);
      return { success: false, data: [] };
    }
  },
  
  search: async (query, page = 1) => {
    try {
      const response = await fetch(`${BASE_URL}/api.php?action=search&q=${encodeURIComponent(query)}&page=${page}`);
      return await response.json();
    } catch (error) {
      console.error('Error searching:', error);
      return { success: false, data: [], query, page };
    }
  },
  
  getDetail: async (slug) => {
    try {
      const response = await fetch(`${BASE_URL}/api.php?action=detail&slug=${slug}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching detail:', error);
      return { success: false, data: null };
    }
  }
};