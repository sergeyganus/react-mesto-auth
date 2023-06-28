import React from 'react';
import PopupWithForm from '../popupwithform/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Переменные состояния
  const [avatar, setAvatar] = React.useState(currentUser.avatar);

  // Рефы
  const avatarRef = React.useRef();

  function handleAvatarChange(e) {
    setAvatar(avatarRef.current.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(avatar);
  }

  return (
    <PopupWithForm
      name={'edit-profile-photo'}
      formName={'editphotoform'}
      title={'Обновить аватар'}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label className="form__field form__field_type_profile-photo">
        <input
          ref={avatarRef}
          id="profile-photo-input"
          className="form__input form__input_type_profile-photo"
          name="profile-photo"
          type="url"
          value={avatar}
          onChange={handleAvatarChange}
          placeholder="Ссылка на картинку"
          required />
        <span className="profile-photo-input-error form__input-error"></span>
      </label>
      <button className="form__button form__button_type_save-profile-photo" type="submit">Сохранить</button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;