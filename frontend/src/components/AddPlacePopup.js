import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm title='Новое место' name='card' isOpen={props.isOpen} onClose={props.onClose}
                   onSubmit={handleSubmit} buttonText={props.submitButtonText}>
      <input type="text" name="title" required className="popup__input popup__input_text_name"
             id="card-name-input" placeholder="Название" minLength="2" maxLength="30" value={name}
             onChange={handleNameChange}/>
      <span className="popup__input-error name-input-error card-name-input-error"/>
      <input type="url" name="link" required className="popup__input popup__input_text_info"
             id="card-link-input" placeholder="Ссылка на картинку" value={link} onChange={handleLinkChange}/>
      <span className="popup__input-error info-input-error card-link-input-error"/>
    </PopupWithForm>
  );
}

export default AddPlacePopup;