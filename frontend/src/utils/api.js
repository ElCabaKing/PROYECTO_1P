// Utils: cualquier funcion util que se pueda utilizar varias veces como ej: (Borrar comentario)
const API_URL = 'http://localhost:5000'

async function request(path, options = {}) {
  try {
    const res = await fetch(API_URL + path, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) {
      const msg = `Error: ${res.status} - ${res.statusText}`;
      throw new Error(msg);
    }

    return await res.json();

  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}

export const api = {
  get: (path, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(query ? `${path}?${query}` : path, {
      method: "GET",
    });
  },

  post: (path, body = {}) => {
    return request(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  put: (path, body = {}) => {
    return request(path, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  del: (path, body = {}) => {
    return request(path, {
      method: "DELETE",
      body: JSON.stringify(body),
    });
  }
};
