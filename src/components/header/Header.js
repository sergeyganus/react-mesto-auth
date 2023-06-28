import React from 'react';
import logo from '../../images/logo.svg';
import HeaderUserProfile from '../headeruserprofile/HeaderUserProfile';

function Header({ loggedIn, onLogout }) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип проекта &quot;Место&quot;" title="Логотип проекта &quot;Место&quot;" />
      <HeaderUserProfile loggedIn={loggedIn} onLogout={onLogout} />
    </header>
  );
}

export default Header;