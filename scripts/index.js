const profile = document.querySelector('.profile');

const popupProfileEdit = document.querySelector('.popup');
const popupCardAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');

const template = document.querySelector('.template');
const cardContainer = document.querySelector('.elements');

const cardAddSubmit = document.forms.addForm;
const profileEditSubmit = document.forms.editForm;

const buttonProfileEdit = profile.querySelector('.button_type_edit');

const buttonClosePopupEdit = popupProfileEdit.querySelector('.button_type_close');
const buttonClosePopupAdd = popupCardAdd.querySelector('.button_type_close');

const buttonCardAdd = profile.querySelector('.button_type_add');

const author = popupProfileEdit.querySelector('.input_type_author');
const title = popupProfileEdit.querySelector('.input_type_title');
const infoAuthor = profile.querySelector('.info__author-name');
const infoTitle = profile.querySelector('.info__title');

const buttonClosePopupImage = popupImage.querySelector('.button_place_image-popup');

const popupOpen = (evt) => {
  evt.classList.add('popup_on');
};

const openPopupProfileEdit = () => {
  author.value = infoAuthor.textContent;
  title.value = infoTitle.textContent;
  popupOpen(popupProfileEdit);
};

const openPopupCardAdd = () => {
  popupOpen(popupCardAdd);
};

const openPopupImage = (evt) => {
  popupOpen(popupImage);
};

const popupClose = (evt) => {
  evt.classList.remove('popup_on');
};

const editProfile = (button) => {
  button.preventDefault();  
  infoAuthor.textContent = author.value;   
  infoTitle.textContent = title.value;
  popupClose(popupProfileEdit);
};

const render = () => {
  const cards = initialCards.map(newElement);
  cardContainer.append(...cards)
};

const likeElement = (evt) => {
  const element = evt.target.closest(".element__like");
  element.classList.toggle('element__like_type_active');
};

const removeElement = (evt) => {
  const element = evt.target.closest(".element");
  element.remove();
};

const showElementImage = (evt) => {
  const title = popupImage.querySelector('.popup__title');
  const image = popupImage.querySelector('.popup__image');
  image.setAttribute('src', evt.link);
  image.setAttribute('alt', evt.name);
  title.textContent = evt.name;
  openPopupImage();
};

const newElement = (elem) => {
  const card = template.content.cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardTitle = card.querySelector('.element__title');
  const cardButtonLike = card.querySelector('.element__like');
  const cardButtonRemove = card.querySelector('.element__remove');
  cardImage.setAttribute("src", elem.link);
  cardImage.setAttribute("alt", elem.name);
  console.log(cardImage);
  cardTitle.textContent = elem.name;
  
  cardButtonRemove.addEventListener("click", removeElement);
  cardButtonLike.addEventListener("click", likeElement);
  cardImage.addEventListener('click', () => showElementImage(elem));
  return card;
};

const addElement = (evt) => {
  evt.preventDefault(); 
  const placeName = popupCardAdd.querySelector('.name');
  const placeUrl = popupCardAdd.querySelector('.place');
  const card = { name: placeName.value, link: placeUrl.value };
  const element = newElement(card);
  cardContainer.prepend(element);
  placeName.value = "";
  placeUrl.value = "";
  popupClose(popupCardAdd);
};


buttonClosePopupEdit.addEventListener('click', () => popupClose(popupProfileEdit));

buttonClosePopupAdd.addEventListener('click', () => popupClose(popupCardAdd));

buttonClosePopupImage.addEventListener('click', () => popupClose(popupImage));

profileEditSubmit.addEventListener('submit', editProfile);

cardAddSubmit.addEventListener('submit', addElement);

buttonCardAdd.addEventListener('click', openPopupCardAdd);
// buttonCardAdd.addEventListener('click', () = > popupOpen(popupCardAdd));

buttonProfileEdit.addEventListener('click', openPopupProfileEdit); 

render();
