import React from "react";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function HeaderUserProfile({ loggedIn, onLogout }) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  // Хук useNavigate
  const navigate = useNavigate();

  // Хук useLocation
  const location = useLocation();

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
        <>
          {(location.pathname === '/signup') && <NavLink to="/signin" className="header__link">Войти</NavLink>}
          {(location.pathname === '/signin') && <NavLink to="/signup" className="header__link">Регистрация</NavLink>}
        </>
      }
    </div>
  );
}

export default HeaderUserProfile;