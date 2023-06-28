import { apiSettings } from './constants';

class Api {
  constructor(options) {
    this._address = options.baseUrl;
    this._cohortId = options.cohortId;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка при запросе: код ошибки (${res.status}), сообщение "${res.statusText}"`);
  }

  getUserInfo() {
    return fetch(`${this._address}/${this._cohortId}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  setUserInfo({ userName, userDescription }) {
    return fetch(`${this._address}/${this._cohortId}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userDescription
      })
    })
      .then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._address}/${this._cohortId}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  addCard(cardItem) {
    return fetch(`${this._address}/${this._cohortId}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardItem.name,
        link: cardItem.link
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/${this._cohortId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  addLike(cardId) {
    return fetch(`${this._address}/${this._cohortId}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._address}/${this._cohortId}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId);
    } else {
      return this.deleteLike(cardId);
    }
  }

  updateUserPhoto(avatar) {
    return fetch(`${this._address}/${this._cohortId}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: apiSettings.baseUrl,
  cohortId: apiSettings.cohortId,
  headers: apiSettings.headers
});