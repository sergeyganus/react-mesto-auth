function ImagePopup({ card, isOpen, onClose }) {
  return (card !== null) && (
    <div className={`popup popup_type_gallery ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_gallery">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name} title={card.name} />
        <h2 className="popup__title popup__title_type_gallery">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;