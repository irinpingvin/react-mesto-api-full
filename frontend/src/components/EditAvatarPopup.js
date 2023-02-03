import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm title='Обновить аватар' name='avatar' isOpen={props.isOpen} onClose={props.onClose}
                   onSubmit={handleSubmit} buttonText={props.submitButtonText}>
      <input type="url" name="avatar" required className="popup__input popup__input_text_info"
             id="avatar-url-input" placeholder="Ссылка на картинку" ref={avatarRef}/>
      <span className="popup__input-error info-input-error avatar-url-input-error"/>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;