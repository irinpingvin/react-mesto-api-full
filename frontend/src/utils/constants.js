const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const BASE_URL = 'https://mesto.nomoreparties.co/v1/cohort-52';
const BASE_AUTH_URL = 'https://auth.nomoreparties.co';
const HEADERS = {
  authorization: '16f6b6a9-a8f1-4c03-8800-2744e7cbf369',
  'Content-Type': 'application/json'
}

export {validationConfig, BASE_URL, BASE_AUTH_URL, HEADERS};