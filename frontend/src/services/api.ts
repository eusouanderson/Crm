const BASE_URL = "http://localhost:3000";

async function apiFetch(method: string, endpoint: string, data?: unknown) {
  const url = `${BASE_URL}${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(url, options);
  const text = await res.text();

  let responseData;
  try {
    responseData = JSON.parse(text);
  } catch {
    responseData = text;
  }

  return { status: res.status, data: responseData };
}

export const api = {
  get: (endpoint: string) => apiFetch("GET", endpoint),
  post: (endpoint: string, data?: unknown) => apiFetch("POST", endpoint, data),
  put: (endpoint: string, data?: unknown) => apiFetch("PUT", endpoint, data),
  delete: (endpoint: string) => apiFetch("DELETE", endpoint),
};
