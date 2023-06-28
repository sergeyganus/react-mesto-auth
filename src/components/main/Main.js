import React from 'react';
import Card from '../card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main({ cards, onEditUserPhoto, onEditUserProfile, onAddCard, onCardClick, onCardLike, onCardDelete }) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      {/* Секция профиля пользователя - Profile */}
      <section className="profile">
        <div className="profile__details">
          <div className="profile__photo-container">
            <img className="profile__photo" src={currentUser.avatar} alt="Фото профиля" title="Фото профиля" />
            <button className="profile__photo-button" type="button" onClick={onEditUserPhoto}></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditUserProfile}></button>
            <p className="profile__description">{currentUser.description}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddCard}></button>
      </section>
      {/* Секция с элементами галереи красивых мест - Places */}
      <section className="places" aria-label="Галерея красивых мест">
        <ul className="places__list">
          {cards.map(card => (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;