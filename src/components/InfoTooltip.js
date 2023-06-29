import React from "react";
import okIcon from '../images/icons/ok-icon.svg';
import wrongIcon from '../images/icons/wrong-icon.svg';

function InfoTooltip({ isOpen, isOk, onClose }) {
  return (
    <div className={`popup popup_type_info ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_info">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        {isOk
          ? (
            <>
              <img className="popup__icon" src={okIcon} alt="Успешная регистрация" title="Успешная регистрация" />
              <h2 className="popup__title popup__title_type_info">Вы успешно зарегистрировались!</h2>
            </>
          )
          : (
            <>
              <img className="popup__icon" src={wrongIcon} alt="Произошла ошибка" title="Произошла ошибка" />
              <h2 className="popup__title popup__title_type_info">Что-то пошло не так! Попробуйте ещё раз.</h2>
            </>
          )
        }
      </div>
    </div>
  );
}

export default InfoTooltip;