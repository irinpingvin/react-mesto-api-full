function ImagePopup({card, onClose}) {
  const isCard = !!card;

  return (
    <div className={`popup popup_type_image ${isCard ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" onClick={onClose}/>
        {isCard ? (
          <figure className="popup__figure">
            <img className="popup__picture" src={card.link} alt={`Достопримечательность ${card.title}`}/>
            <figcaption className="popup__caption">{card.title}</figcaption>
          </figure>
        ) : null}
      </div>
    </div>
  );
}

export default ImagePopup;