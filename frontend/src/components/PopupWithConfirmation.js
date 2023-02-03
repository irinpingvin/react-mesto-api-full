import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onConfirm();
  }

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} title='Вы уверены?' name='confirm'
                   buttonText='Да'/>
  );
}

export default PopupWithConfirmation;