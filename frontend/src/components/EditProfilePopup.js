import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from '../contexts/currentUser/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm title='Редактировать профиль' name='profile' isOpen={props.isOpen} onClose={props.onClose}
                   onSubmit={handleSubmit} buttonText={props.submitButtonText}>
      <input type="text" name="name" required className="popup__input popup__input_text_name" id="name-input"
             minLength="2" maxLength="40" value={name} onChange={handleNameChange}/>
      <span className="popup__input-error name-input-error"/>
      <input type="text" name="info" required className="popup__input popup__input_text_info" id="info-input"
             minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange}/>
      <span className="popup__input-error info-input-error"/>
    </PopupWithForm>
  );
}

export default EditProfilePopup;