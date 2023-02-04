import { BASE_AUTH_URL, HEADERS } from "./constants";

class AuthApi {
  #baseUrl;
  #headers;

  constructor(baseUrl, headers) {
    this.#baseUrl = baseUrl;
    this.#headers = headers;
  }

  #handleServerResponse(promise) {
    return promise.then(response => {
      if (response.ok)
        return response.json();
      return Promise.reject(`Ошибка: ${response.status}`);
    })
  }

  signUp(userData) {
    return this.#handleServerResponse(fetch(`${this.#baseUrl}/signup`, {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify(userData)
    }));
  }

  signIn(userData) {
    return this.#handleServerResponse(fetch(`${this.#baseUrl}/signin`, {
      method: 'POST',
      headers: this.#headers,
      credentials: 'include',
      body: JSON.stringify(userData)
    }));
  }

  validateToken() {
    return this.#handleServerResponse(fetch(`${this.#baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
    }));
  }
}

export const authApi = new AuthApi(BASE_AUTH_URL, HEADERS);