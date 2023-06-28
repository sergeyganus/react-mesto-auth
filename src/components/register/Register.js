import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import ComponentWithForm from '../componentwithform/ComponentWithForm';
import InfoTooltip from '../infotooltip/InfoTooltip';
import * as auth from '../auth/Auth';

function Register({ onRegister }) {
  // Переменные состояния
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  // Хук useNavigate
  const navigate = useNavigate();

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    auth.register(formValue.email, formValue.password)
      .then(userData => {
        setFormValue({
          email: '',
          password: ''
        });
        onRegister({
          ...userData.data,
          password: formValue.password
        });
        setIsRegisterSuccess(true);
        setIsInfoTooltipOpen(true);
        setTimeout(() => {
          navigate('/signin', { replace: true })
        }, 3000);
      })
      .catch(err => {
        setIsRegisterSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  return (
    <>
      {/* Основной компонент с формой - Register */}
      <ComponentWithForm
        name={'register'}
        formName={'registerform'}
        title={'Регистрация'}
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
        <button className="form__button form__button_type_register" type="submit">Зарегистрироваться</button>
        <NavLink to="/signin" className="form__link">Уже зарегистрированы? Войти</NavLink>
      </ComponentWithForm>

      {/* Модальное окно об успехе/ошибке - InfoTooltip */}
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isOk={isRegisterSuccess}
        onClose={closeInfoTooltip}
      />
    </>
  );
}

export default Register;