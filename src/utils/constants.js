// Конфиг приложения / сайта
export const applicationConfig = {
  cardSelector: '.place',
  cardTitleSelector: '.place__title',
  cardListSelector: '.places__list',
  cardTemplateSelector: '#place',
  formSelector: '.form',
  userElementSelector: '.profile',
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description',
  userProfilePhotoSelector: '.profile__photo',
  editUserButtonSelector: '.profile__edit-button',
  editUserPhotoSelector: '.profile__photo',
  editUserPhotoButtonSelector: '.profile__photo-button',
  addCardButtonSelector: '.profile__add-button',
  editUserPopupSelector: '.popup_type_edit-profile',
  formUserNameSelector: '.form__input_type_profile-name',
  formUserDescriptionSelector: '.form__input_type_profile-description',
  saveUserButtonSelector: '.form__button_type_save-profile',
  editUserPhotoPopupSelector: '.popup_type_edit-profile-photo',
  saveUserPhotoButtonSelector: '.form__button_type_save-profile-photo',
  formUserPhotoSelector: '.form__input_type_profile-photo',
  addCardPopupSelector: '.popup_type_add-place',
  formCardNameSelector: '.form__input_type_place-name',
  formCardLinkSelector: '.form__input_type_place-link',
  addFormCardButtonSelector: '.form__button_type_add-place',
  galleryPopupSelector: '.popup_type_gallery',
  getConfirmationPopupSelector: '.popup_type_get-confirmation'
};

// Конфиг для валидации
export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

// Настройки API для общения с сервером
export const apiSettings = {
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  cohortId: 'cohort-65',
  authorizationToken: '620e33d0-cba9-4dd2-8dd8-35730626663b',
  headers: {
    authorization: '620e33d0-cba9-4dd2-8dd8-35730626663b',
    'Content-Type': 'application/json'
  }
};