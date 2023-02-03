import React from "react";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import ImagePopup from "./ImagePopup.js";
import Footer from "./Footer";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirmation from './PopupWithConfirmation';
import {api} from '../utils/Api';
import {authApi} from "../utils/AuthApi";
import {CurrentUserContext} from '../contexts/currentUser/CurrentUserContext';
import {CardsContext} from "../contexts/cards/CardsContext";
import ProtectedRoute from './ProtectedRoute';
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: '',
    _id: '',
    cohort: ''
  });
  const [cards, setCards] = React.useState([]);
  const [cardForDelete, setCardForDelete] = React.useState(null);
  const [cardSubmitButtonText, setCardSubmitButtonText] = React.useState('Создать');
  const [profileSubmitButtonText, setProfileSubmitButtonText] = React.useState('Сохранить');
  const [avatarSubmitButtonText, setAvatarSubmitButtonText] = React.useState('Сохранить');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [authRequestSuccess, setAuthRequestSuccess] = React.useState(true);
  const [userEmail, setUserEmail] = React.useState('');
  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(data => {
          const [userInfo, cardsInfo] = data;
          setCurrentUser(userInfo);
          setCards(cardsInfo);
        })
        .catch(error => console.log(error));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      authApi.validateToken(token)
        .then(res => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          history.push('/');
        })
        .catch(error => console.log(error));
    }
  });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userInfo) {
    setProfileSubmitButtonText('Сохранение...');
    api.editUserInfo(userInfo)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(error => console.log(error))
      .finally(() => setProfileSubmitButtonText('Сохранить'));
  }

  function handleUpdateAvatar(avatar) {
    setAvatarSubmitButtonText('Сохранение...');
    api.editUserAvatar(avatar)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(error => console.log(error))
      .finally(() => setAvatarSubmitButtonText('Сохранить'));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(element => element._id === currentUser._id);

    if (isLiked) {
      api.dislikeCard(card._id)
        .then((newCard) => {
          setCards(cards.map((card) => card._id === newCard._id ? newCard : card));
        })
        .catch(error => console.log(error));

    } else {
      api.likeCard(card._id)
        .then((newCard) => {
          setCards(cards.map((card) => card._id === newCard._id ? newCard : card));
        })
        .catch(error => console.log(error));
    }
  }

  function handleCardDeleteClick(card) {
    setIsConfirmPopupOpen(true);
    setCardForDelete(card);
  }

  function handleCardDelete() {
    api.removeCard(cardForDelete._id)
      .then(() => {
        setCards(cards.filter(element => element._id !== cardForDelete._id));
        closeAllPopups();
      })
      .catch(error => console.log(error));
  }

  function handleAddPlaceSubmit(cardInfo) {
    setCardSubmitButtonText('Создание...');
    api.addCard(cardInfo)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch(error => console.log(error))
      .finally(() => setCardSubmitButtonText('Создать'));
  }

  function handleLogin(userData) {
    if (!userData.password || !userData.email)
      return;

    authApi.signIn(userData)
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch(err => {
        console.log(err);
        setAuthRequestSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleRegister(userData) {
    if (!userData.password || !userData.email)
      return;

    authApi.signUp(userData)
      .then(() => {
        history.push('/sign-in');
        setAuthRequestSuccess(true);
        setIsInfoTooltipOpen(true);
      })
      .catch(err => {
        console.log(err);
        setAuthRequestSuccess(false);
        setIsInfoTooltipOpen(true);
      })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setUserEmail('');
    setLoggedIn(false);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page">
          <div className="page__container">
            <Switch>
              <ProtectedRoute exact path="/" loggedIn={loggedIn} component={() => (
                <>
                  <Header linkUrl='/sign-in' linkTitle='Выйти' userEmail={userEmail} onSignOut={handleSignOut}/>
                  <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
                        onCardLike={handleCardLike} onCardDelete={handleCardDeleteClick} cards={cards}/>
                </>
              )}/>
              <Route path="/sign-up" render={() => (
                <>
                  <Header linkUrl='/sign-in' linkTitle='Войти'/>
                  <Register onRegister={handleRegister}/>
                </>
              )}>
              </Route>
              <Route path="/sign-in" render={() => (
                <>
                  <Header linkUrl='/sign-up' linkTitle='Регистрация'/>
                  <Login onLogin={handleLogin}/>
                </>
              )}>
              </Route>
              {
                <Route>
                  {loggedIn ? (
                    <Redirect to="/"/>
                  ) : (
                    <Redirect to="/sign-in"/>
                  )}
                </Route>
              }
            </Switch>
            <Footer/>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}
                              submitButtonText={profileSubmitButtonText}/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}
                           submitButtonText={cardSubmitButtonText}/>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            <PopupWithConfirmation isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onConfirm={handleCardDelete}
                                   title='Вы уверены?' name='confirm' buttonText='Да'/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                             onUpdateAvatar={handleUpdateAvatar} submitButtonText={avatarSubmitButtonText}/>
            <InfoTooltip isSuccess={authRequestSuccess} onClose={closeAllPopups} isOpen={isInfoTooltipOpen}
                         successAuthTitle="Вы успешно зарегистрировались!"
                         failureAuthTitle="Что-то пошло не так! Попробуйте ещё раз."/>
          </div>
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
