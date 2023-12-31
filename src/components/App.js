import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import defaultProfilePhoto from '../images/profile-photo.png';
import { api } from '../utils/Api';
import * as auth from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  // Переменные состояния
  const [isEditUserPhotoPopupOpen, setIsEditUserPhotoPopupOpen] = React.useState(false);
  const [isEditUserProfilePopupOpen, setIsEditUserProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isGalleryPopupOpen, setIsGalleryPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Жак Ив Кусто',
    description: 'Исследователь океанов',
    avatar: defaultProfilePhoto
  });
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Основные функции
  function handleEditUserPhotoClick() {
    setIsEditUserPhotoPopupOpen(true);
  }

  function handleEditUserProfileClick() {
    setIsEditUserProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsGalleryPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditUserPhotoPopupOpen(false);
    setIsEditUserProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsGalleryPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => printError(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(res => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .catch(err => printError(err));
  }

  function handleUpdateProfile({ userName, userDescription }) {
    api.setUserInfo({ userName, userDescription })
      .then(userData => {
        // Актуализация переменной состояния currentUser
        setCurrentUser({
          ...currentUser,
          _id: userData._id,
          name: userData.name,
          description: userData.about,
          avatar: userData.avatar
        });
        closeAllPopups();
      })
      .catch(err => printError(err));
  }

  function handleUpdateAvatar(avatar) {
    api.updateUserPhoto(avatar)
      .then(res => {
        setCurrentUser({
          ...currentUser,
          avatar: avatar
        });
        closeAllPopups();
      })
      .catch(err => printError(err));
  }

  function handleAddPlace(cardItem) {
    api.addCard(cardItem)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => printError(err));
  }

  function handleRegister(userData) {
    setCurrentUser({
      ...currentUser,
      _id: userData._id,
      email: userData.email,
      password: userData.password
    });
  }

  function handleLogin(userData) {
    setCurrentUser({
      ...currentUser,
      email: userData.email,
      password: userData.password,
      jwt: userData.token
    });
    setLoggedIn(true);
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  // Проверка токена в хранилище
  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then(userData => {
          if (userData) {
            setCurrentUser({
              ...currentUser,
              email: userData.data.email
            });
            setLoggedIn(true);
            navigate('/', { replace: true });
          }
        })
        .catch(err => printError(err));
    }
  }

  // Получение информации о пользователе
  function getUserInfo() {
    api.getUserInfo()
      .then(userData => {
        setCurrentUser({
          ...currentUser,
          _id: userData._id,
          name: userData.name,
          description: userData.about,
          avatar: userData.avatar
        });
      })
      .catch(err => printError(err));
  }

  // Получение карточек
  function getCards() {
    api.getCards()
      .then(currentCards => {
        setCards([...currentCards]);
      })
      .catch(err => printError(err));
  }

  // Впомогательная функция фиксации ошибок
  function printError(err) {
    console.log(err);
  }

  // Хук useNavigate
  const navigate = useNavigate();

  // Хук, срабатывающий при загрузке компонента
  React.useEffect(() => {
    checkToken();
  }, []);

  // Хук, срабатывающий при загрузке компонента
  React.useEffect(() => {
    if (loggedIn) {
      getUserInfo();
      getCards();
    }
  }, [loggedIn]);

  return (
    // Внедряем данные из currentUser с помощью провайдера контекста
    <CurrentUserContext.Provider value={currentUser}>
      {/* Главная обёртка - Page */}
      <div className="page">
        {/* Шапка сайта - Header */}
        <Header loggedIn={loggedIn} onLogout={handleLogout} />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditUserPhoto={handleEditUserPhotoClick}
                onEditUserProfile={handleEditUserProfileClick}
                onAddCard={handleAddCardClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route
            path='/signup'
            element={
              <Register
                onRegister={handleRegister}
              />}
          />
          <Route
            path='/signin'
            element={
              <Login
                onLogin={handleLogin}
              />
            }
          />
          <Route
            path='*'
            element={
              <Login
                onLogin={handleLogin}
              />
            }
          />
        </Routes>
        {/*  Подвал сайта - Footer */}
        <Footer />
        {/* Модальное окно редактирования аватара - Popup */}
        <EditAvatarPopup
          isOpen={isEditUserPhotoPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
        {/* Модальное окно редактирования информации в профиле - Popup */}
        <EditProfilePopup
          isOpen={isEditUserProfilePopupOpen}
          onUpdateProfile={handleUpdateProfile}
          onClose={closeAllPopups}
        />
        {/* Модальное окно добавления нового места - Popup */}
        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onAddPlace={handleAddPlace}
          onClose={closeAllPopups}
        />
        {/* Модальное окно галереи - Popup */}
        <ImagePopup
          card={selectedCard}
          isOpen={isGalleryPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
