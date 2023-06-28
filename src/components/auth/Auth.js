const BASE_URL = 'https://auth.nomoreparties.co';

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      email
    })
  })
    .then((res) => {
      try {
        if (res.ok) {
          return res.json();
        }
      } catch (err) {
        return (err);
      }
    });
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      email
    })
  })
    .then(res => res.json())
    .then(userData => {
      if (userData.token) {
        localStorage.setItem('token', userData.token);
        return userData;
      }
    })
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then(data => data);
}