import React from 'react';
import PopupWithForm from '../popupwithform/PopupWithForm';

function AddPlacePopup({ isOpen, onAddPlace, onClose }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link
    });

    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
      name={'add-place'}
      formName={'addform'}
      title={'Новое место'}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label className="form__field form__field_type_place-name">
        <input
          id="place-name-input"
          className="form__input form__input_type_place-name"
          name="place-name"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required />
        <span className="place-name-input-error form__input-error"></span>
      </label>
      <label className="form__field form__field_type_place-link">
        <input
          id="place-link-input"
          className="form__input form__input_type_place-link"
          name="place-link"
          type="url"
          value={link}
          onChange={handleLinkChange}
          placeholder="Ссылка на картинку"
          required />
        <span className="place-link-input-error form__input-error"></span>
      </label>
      <button className="form__button form__button_type_add-place" type="submit">Создать</button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;