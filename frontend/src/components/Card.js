import React from "react";
import {CurrentUserContext} from "../contexts/currentUser/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(element => element === currentUser._id);

  const cardDeleteButtonClassName = (
    `place__remove-button ${isOwn ? 'place__remove-button_visible' : ''}`
  );
  const cardLikeButtonClassName = `place__like-button ${isLiked ? 'place__like-button_active' : ''}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card);
  }

  return (
    <li className="place">
      <div className="place__pic" style={{backgroundImage: `url(${card.link})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} onClick={handleClick}/>
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDelete}/>
      <div className="place__sign">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-area">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLike}/>
          <p className="place__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;