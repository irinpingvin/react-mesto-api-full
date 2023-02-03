function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_form">
        <button className="popup__close-button" type="button" onClick={props.onClose}/>
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" name={`${props.name}-form`} onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__submit-button">{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;