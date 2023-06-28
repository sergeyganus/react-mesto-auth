import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  // Вспомогательные переменные
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `place__favorite-button ${isLiked && 'place__favorite-button_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="place" key={card._id}>
      <img className="place__image" src={card.link} alt={card.name} title={card.name} onClick={handleClick} />
      {isOwn && <button className="place__delete-button place__delete-button_active" type="button" onClick={handleDeleteClick} />}
      <div className="place__description">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__favorites">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="place__favorite-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;