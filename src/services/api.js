const BASE_URL = 'https://foodcash.com.br/sistema/apiv4/api.php';

const buildUrl = (action, params = {}) => {
  const url = new URL(BASE_URL);
  url.searchParams.set('action', action);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
};

const safeFetch = async (action, params = {}) => {
  try {
    const response = await fetch(buildUrl(action, params));
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${action} data:`, error);
    return { success: false, data: [], page: params.page || 1, error: error.message };
  }
};

const normalizeResponse = (payload = {}, overrides = {}) => {
  if (payload && typeof payload === 'object') {
    const merged = { ...payload, ...overrides };
    const { success, data, items, page, ...rest } = merged;
    return {
      success: success ?? true,
      data: data ?? items ?? [],
      page: page ?? 1,
      ...rest,
    };
  }

  return { success: false, data: [], page: 1, ...overrides };
};

export const api = {
  getHome: async () => {
    const payload = await safeFetch('indonesian-movies', { page: 1 });
    return normalizeResponse(payload);
  },

  getMovies: async (page = 1) => {
    const payload = await safeFetch('indonesian-movies', { page });
    return normalizeResponse(payload, { page });
  },

  getSeries: async (page = 1) => {
    const payload = await safeFetch('indonesian-drama', { page });
    return normalizeResponse(payload, { page });
  },

  getTrending: async (page = 1) => {
    const payload = await safeFetch('trending', { page });
    return normalizeResponse(payload, { page });
  },

  getCategory: async (action, page = 1) => {
    const payload = await safeFetch(action, { page });
    return normalizeResponse(payload, { page });
  },

  search: async (query, page = 1) => {
    if (!query) {
      return { success: false, data: [], page };
    }
    const payload = await safeFetch('search', { q: query, page });
    return normalizeResponse(payload, { page });
  },

  getDetail: async (detailPath) => {
    if (!detailPath) {
      return { success: false, data: null };
    }
    const payload = await safeFetch('detail', { detailPath });
    return normalizeResponse(payload);
  }
};
