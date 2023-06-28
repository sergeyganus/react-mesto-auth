import React from 'react';
import PopupWithForm from '../popupwithform/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onUpdateProfile, onClose }) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.description);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.description);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateProfile({
      userName: name,
      userDescription: description
    });
  }

  return (
    <PopupWithForm
      name={'edit-profile'}
      formName={'editform'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label className="form__field form__field_type_profile-name">
        <input
          id="profile-name-input"
          className="form__input form__input_type_profile-name"
          name="profile-name"
          type="text"
          value={name}
          onChange={handleNameChange}
          minLength="2"
          maxLength="40"
          required
        />
        <span className="profile-name-input-error form__input-error"></span>
      </label>
      <label className="form__field form__field_type_profile-description">
        <input
          id="profile-description-input"
          className="form__input form__input_type_profile-description"
          name="profile-description"
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          minLength="2"
          maxLength="200"
          required
        />
        <span className="profile-description-input-error form__input-error"></span>
      </label>
      <button className="form__button form__button_type_save-profile" type="submit">Сохранить</button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;