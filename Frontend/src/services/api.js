import axios from "axios";

const PRODUCTION_API_BASE_URL =
  "https://ai-integrated-mental-health-journal.onrender.com/api";

const normalizeApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  const isProduction = import.meta.env.PROD;
  const isBrowser = typeof window !== "undefined";
  const isLocalPage =
    isBrowser &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname);

  if (configuredUrl) {
    if (
      isProduction &&
      isBrowser &&
      !isLocalPage &&
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(configuredUrl)
    ) {
      return PRODUCTION_API_BASE_URL;
    }

    const withoutTrailingSlash = configuredUrl.replace(/\/+$/, "");
    return withoutTrailingSlash.endsWith("/api")
      ? withoutTrailingSlash
      : `${withoutTrailingSlash}/api`;
  }

  return isProduction ? PRODUCTION_API_BASE_URL : "http://localhost:5000/api";
};

const BASE_URL = normalizeApiBaseUrl();

const getAuthHeaders = (token) => {
  const currentToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
  return currentToken ? { Authorization: `Bearer ${currentToken}` } : {};
};

// Auto refresh session helper
export const refreshSession = async () => {
  try {
    const storedRefreshToken =
      typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ refreshToken: storedRefreshToken }),
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    const newAccessToken = data.accessToken || data.token;
    if (newAccessToken && typeof window !== "undefined") {
      localStorage.setItem("token", newAccessToken);
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      return newAccessToken;
    }
    return null;
  } catch {
    return null;
  }
};

// Custom fetch wrapper with automatic token refresh on 401
export const authFetch = async (url, options = {}) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const mergedHeaders = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  let res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: mergedHeaders,
  });

  if (res.status === 401 && !options._retry) {
    const newToken = await refreshSession();
    if (newToken) {
      const retryHeaders = {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
      };
      res = await fetch(url, {
        ...options,
        _retry: true,
        credentials: "include",
        headers: retryHeaders,
      });
    }
  }

  return res;
};

// Configure axios interceptor for token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newToken = await refreshSession();
      if (newToken) {
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

// ---------------- AUTH ----------------
export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
};

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
};

export const refreshTokenRequest = async (refreshToken) => {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ refreshToken }),
  });
  return res.json();
};

export const logoutRequest = async (refreshToken) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ refreshToken }),
    });
    return res.json();
  } catch (error) {
    return { message: "Logged out" };
  }
};

export const updateProfileRequest = async (data, token) => {
  const res = await authFetch(`${BASE_URL}/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updatePasswordRequest = async (data, token) => {
  const res = await authFetch(`${BASE_URL}/auth/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// ---------------- JOURNALS ----------------
export const getJournals = async (token) => {
  const res = await authFetch(`${BASE_URL}/journals`, {
    headers: getAuthHeaders(token),
  });
  return res.json();
};

export const getJournalById = async (id, token) => {
  const res = await authFetch(`${BASE_URL}/journals/${id}`, {
    headers: getAuthHeaders(token),
  });
  return res.json();
};

export const createJournal = async (data, token) => {
  const res = await authFetch(`${BASE_URL}/journals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(token),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateJournal = async (id, data, token) => {
  const res = await authFetch(`${BASE_URL}/journals/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(token),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteJournal = async (id, token) => {
  const res = await authFetch(`${BASE_URL}/journals/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
  return res.json();
};

export const getJournalSuggestions = async (data, token) => {
  const res = await authFetch(`${BASE_URL}/journals/suggest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(token),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to get suggestions");
  }

  return res.json();
};

// ---------------- ANALYTICS ----------------
export const getEmotionStats = async (token) => {
  const res = await authFetch(`${BASE_URL}/journals/stats/emotions`, {
    headers: getAuthHeaders(token),
  });
  return res.json();
};

// ---------------- MEALS ----------------
export const analyzeMealRequest = async (mealText, token) => {
  const { data } = await axios.post(
    `${BASE_URL}/meals/analyze`,
    { mealText },
    { headers: getAuthHeaders(token) }
  );
  return data;
};

export const saveMealRequest = async (analysis, token) => {
  const { data } = await axios.post(
    `${BASE_URL}/meals/save`,
    analysis,
    { headers: getAuthHeaders(token) }
  );
  return data;
};

export const getMealHistoryRequest = async (token) => {
  const { data } = await axios.get(`${BASE_URL}/meals/history`, {
    headers: getAuthHeaders(token),
  });
  return data;
};

export const getTodayNutritionSummaryRequest = async (token) => {
  const { data } = await axios.get(`${BASE_URL}/meals/today-summary`, {
    headers: getAuthHeaders(token),
  });
  return data;
};

export const deleteMealRequest = async (id, token) => {
  const { data } = await axios.delete(`${BASE_URL}/meals/${id}`, {
    headers: getAuthHeaders(token),
  });
  return data;
};
