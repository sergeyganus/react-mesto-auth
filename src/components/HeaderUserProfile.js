import React from "react";
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function HeaderUserProfile({ loggedIn, onLogout }) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  // Хук useNavigate
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('jwt');
    onLogout();
    navigate('/signin', { replace: true });
  }

  return (
    <div className="header__user-profile">
      {loggedIn ?
        <div className="header__logout">
          <span className="header__user-email">{currentUser.email}</span>
          <button className="header__button" type="button" onClick={signOut}>Выйти</button>
        </div>
        :
        <Routes>
          <Route path="/" element={<NavLink to="/signup" className="header__link">Регистрация</NavLink>} />
          <Route path="/signup" element={<NavLink to="/signin" className="header__link">Войти</NavLink>} />
          <Route path="/signin" element={<NavLink to="/signup" className="header__link">Регистрация</NavLink>} />
          <Route path="*" element={<NavLink to="/signup" className="header__link">Регистрация</NavLink>} />
        </Routes>
      }
    </div>
  );
}

export default HeaderUserProfile;