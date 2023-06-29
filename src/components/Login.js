import React from "react";
import { useNavigate } from 'react-router-dom';
import ComponentWithForm from './ComponentWithForm';
import * as auth from '../utils/Auth';

function Login({ onLogin }) {
  // Переменные состояния
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  // Хук useNavigate
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    auth.authorize(formValue.email, formValue.password)
      .then(userData => {
        if (userData.token) {
          setFormValue({
            email: '',
            password: ''
          });
          onLogin({
            ...userData,
            email: formValue.email,
            password: formValue.password
          });
          navigate('/', { replace: true });
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <ComponentWithForm
      name={'login'}
      formName={'loginform'}
      title={'Вход'}
      onSubmit={handleSubmit}
    >
      <label className="form__field form__field_type_user-email">
        <input
          id="user-email-input"
          className="form__input form__input_type_user-email"
          name="email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <span className="user-email-input-error form__input-error"></span>
      </label>
      <label className="form__field form__field_type_user-password">
        <input
          id="user-password-input"
          className="form__input form__input_type_user-password"
          name="password"
          type="password"
          value={formValue.password}
          onChange={handleChange}
          minLength="8"
          maxLength="44"
          placeholder="Пароль"
          required
        />
        <span className="user-password-input-error form__input-error"></span>
      </label>
      <button className="form__button form__button_type_login" type="submit">Войти</button>
    </ComponentWithForm>
  );
}

export default Login;