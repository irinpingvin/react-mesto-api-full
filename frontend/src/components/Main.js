import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/currentUser/CurrentUserContext";

function Main(props) {
  const userInfo = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile section">
        <div className="profile__avatar-container">
          <div className="profile__avatar" style={{
            backgroundImage: `url(${userInfo.avatar})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}/>
          <div className="profile__avatar-overlay">
            <button className="profile__avatar-edit-button" type="button" onClick={props.onEditAvatar}/>
          </div>
        </div>
        <div className="profile__personal-data">
          <div className="profile__name-editor">
            <h1 className="profile__name">{userInfo.name}</h1>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}/>
          </div>
          <p className="profile__description">{userInfo.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}/>
      </section>
      <section className="places section">
        <ul className="places__list">
          {props.cards.map((card) => <Card key={card._id} card={card} onCardClick={props.onCardClick}
                                     onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>)}
        </ul>
      </section>
    </main>
  );
}

export default Main;