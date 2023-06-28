function PopupWithForm({ name, formName, title, children, isOpen, onSubmit, onClose }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <form className={`form form_type_${name}`} name={formName} method="post" onSubmit={onSubmit} noValidate>
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;