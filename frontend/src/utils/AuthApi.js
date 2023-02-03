import {BASE_AUTH_URL} from "./constants";

class AuthApi {
  #baseUrl;
  #headers;

  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
    this.#headers = { "Content-Type": "application/json" };
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
      body: JSON.stringify(userData)
    }));
  }

  validateToken(token) {
    return this.#handleServerResponse(fetch(`${this.#baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    }));
  }
}

export const authApi = new AuthApi(BASE_AUTH_URL);