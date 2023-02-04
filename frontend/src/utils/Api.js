import {BASE_URL, HEADERS} from "./constants.js";

class Api {
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

  getUserInfo() {
    return this.#handleServerResponse(fetch(`${this.#baseUrl}/users/me`, {
      headers: this.#headers,
      credentials: 'include',
    }));
  }

  editUserInfo(userInfo) {
    return this.#handleServerResponse(fetch(`${this.#baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.#headers,
      credentials: 'include',
      body: JSON.stringify(userInfo)
    }));
  }

  editUserAvatar(avatarInfo) {
    return this.#handleServerResponse(fetch(`${this.#baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.#headers,
      credentials: 'include',
      body: JSON.stringify(avatarInfo)
    }));
  }

  getCards() {
    return this.#handleServerResponse(fetch(`${this.#baseUrl}/cards`, {
      headers: this.#headers,
      credentials: 'include',
    }));
  }

  addCard(cardInfo) {
    return this.#handleServerResponse(fetch(`${this.#baseUrl}/cards`, {
      method: 'POST',
      headers: this.#headers,
      credentials: 'include',
      body: JSON.stringify(cardInfo)
    }));
  }

  removeCard(id) {
    return this.#handleServerResponse(fetch(`${this.#baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.#headers,
      credentials: 'include',
    }));
  }

  likeCard(id) {
    return this.#handleServerResponse(fetch(`${this.#baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.#headers,
      credentials: 'include',
    }));
  }

  dislikeCard(id) {
    return this.#handleServerResponse(fetch(`${this.#baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.#headers,
      credentials: 'include',
    }));
  }
}

export const api = new Api(BASE_URL, HEADERS);