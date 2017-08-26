'use strict';

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var KEY_CODES = {
  enter: 13,
  esc: 27
};

var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var pin = tokyoPinMap.querySelector('.pin');
var offerDialog = document.querySelector('.dialog');
var dialogTitle = offerDialog.querySelector('.dialog__title');
var dialogTitleImg = dialogTitle.querySelector('img');
var dialogPanel = offerDialog.querySelector('.dialog__panel');
var lodgeTemplate = document.querySelector('#lodge-template').content;
var pins = [];
var offerDialogClose = offerDialog.querySelector('.dialog__close');
var offerObjects;
var pinIndex;

var form = document.querySelector('.notice__form');
var noticeTitle = form.querySelector('#title');
var noticeAddress = form.querySelector('#address');
var noticePrice = form.querySelector('#price');
var noticeTimeIn = form.querySelector('#timein');
var noticeTimeOut = form.querySelector('#timeout');
var noticeType = form.querySelector('#type');
var noticeCapacity = form.querySelector('#capacity');
var noticeRoomNumber = form.querySelector('#room_number');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffleArr(arr) {
  for (var i = 0; i < arr.length; i++) {
    var arrItem = arr[i];
    var j = getRandomInt(0, arr.length - 1);
    arr[i] = arr[j];
    arr[j] = arrItem;
  }
}

function getObjectFeatures(featuresList) {
  var objectFeaturesList = [];
  for (var i = 0; i < featuresList.length; i++) {
    if (getRandomInt(0, 1)) {
      objectFeaturesList.push(featuresList[i]);
    }
  }
  return objectFeaturesList;
}

function getObject() {
  var objects = [];
  shuffleArr(OFFER_TITLES);
  for (var i = 0; i < 8; i++) {
    var locationX = getRandomInt(300, 900);
    var locationY = getRandomInt(175, 500);
    var roomNumber = getRandomInt(1, 5);
    var offerFeatures = [];
    offerFeatures = getObjectFeatures(FEATURES);
    objects[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: OFFER_TITLES[getRandomInt(0, OFFER_TITLES.length - 1)],
        address: locationX + ',' + ' ' + locationY,
        price: getRandomInt(1000, 1000000),
        type: OFFER_TYPES[getRandomInt(0, 2)],
        rooms: roomNumber,
        guests: roomNumber * 2,
        checkin: OFFER_TIMES[getRandomInt(0, 2)],
        checkout: OFFER_TIMES[getRandomInt(0, 2)],
        features: offerFeatures,
        description: '',
        photos: []
      },

      location: {
        x: locationX,
        y: locationY
      }
    };
  }
  return objects;
}

function renderPins(offerList) {
  var pinElement = pin.cloneNode(true);
  var pinImg = pinElement.querySelector('img');
  pinElement.style.left = (offerList.location.x - 28) + 'px';
  pinElement.style.top = (offerList.location.y - 75) + 'px';
  pinElement.classList.remove('pin__main');
  pinImg.src = offerList.author.avatar;
  pinImg.removeAttribute('Alt');
  pinImg.height = 40;
  return pinElement;
}

function initPins(offerList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offerList.length; i++) {
    fragment.appendChild(renderPins(offerList[i]));
  }
  tokyoPinMap.appendChild(fragment);
}

function getOffer(object) {
  var offerElement = lodgeTemplate.cloneNode(true);
  offerElement.querySelector('.lodge__title').textContent = object.offer.title;
  offerElement.querySelector('.lodge__address').textContent = object.offer.address;
  offerElement.querySelector('.lodge__price').textContent = object.offer.price;
  offerElement.querySelector('.lodge__type').textContent = object.offer.type;
  offerElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + object.offer.guests + ' в ' + object.offer.rooms + ' комнатах';
  offerElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
  object.offer.features.forEach(function (item) {
    var span = document.createElement('span');
    span.classList.add('feature__image');
    span.classList.add('feature__image--' + item);
    offerElement.querySelector('.lodge__features').appendChild(span);
  });
  offerElement.querySelector('.lodge__description').textContent = object.offer.description;
  dialogTitleImg.src = object.author.avatar;
  return offerElement;
}

function getPins() {
  var pinsNL = tokyoPinMap.querySelectorAll('.pin');
  return pinsNL;
}

function setPinsHandler() {
  for (var i = 1; i < pins.length; i++) {
    pins[i].tabIndex = 1;
    pins[i].addEventListener('click', function (evt) {
      var thisPin = evt.target.classList.contains('pin') ? evt.target : evt.target.parentNode;
      for (var j = 0; j < pins.length; j++) {
        if (pins[j] === thisPin) {
          pinIndex = j;
          break;
        }
      }
      openOfferDialog(pinIndex);
    });
    pins[i].addEventListener('keydown', function (evt) {
      var thisPin = evt.target.classList.contains('pin') ? evt.target : evt.target.parentNode;
      if (evt.keyCode === KEY_CODES.enter) {
        for (var j = 0; j < pins.length; j++) {
          if (pins[j] === thisPin) {
            pinIndex = j;
            break;
          }
        }
        openOfferDialog(pinIndex);
      }
    });
  }
}

function setOfferDialogHandler() {
  offerDialogClose.tabIndex = 1;
  offerDialogClose.addEventListener('click', closeOfferDialog);
  offerDialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODES.enter) {
      closeOfferDialog();
    }
  });
}

function openOfferDialog(index) {
  offerDialog.classList.remove('hidden');
  for (var i = 1; i < pins.length; i++) {
    if (pins[i].classList.contains('pin--active')) {
      pins[i].classList.remove('pin--active');
    }
  }
  pins[index].classList.add('pin--active');
  offerDialog.replaceChild(getOffer(offerObjects[index - 1]), dialogPanel);
  dialogPanel = offerDialog.querySelector('.dialog__panel');
  document.addEventListener('keydown', onOfferDialogEscPress);
}

function closeOfferDialog() {
  offerDialog.classList.add('hidden');
  pins[pinIndex].classList.remove('pin--active');
  document.removeEventListener('keydown', onOfferDialogEscPress);
}

function onOfferDialogEscPress(evt) {
  if (evt.keyCode === KEY_CODES.esc) {
    closeOfferDialog();
  }
}

function init() {
  offerObjects = getObject();
  initPins(offerObjects);
  offerDialog.classList.add('hidden');
  pins = getPins();
  setPinsHandler();
  setOfferDialogHandler();
}

// //////////////////////////////////////////////////////ВАЛИДАЦИЯ ФОРМЫ
function initForm() {
  noticeAddress.required = true;

  noticeTitle.required = true;
  noticeTitle.minLength = 30;
  noticeTitle.maxLength = 100;

  noticePrice.required = true;
  noticePrice.value = 1000;

  setNoticeCapacity();

  form.action = 'https://1510.dump.academy/keksobooking';

  noticeTimeIn.onchange = function () {
    setNoticeTime();
  };

  noticeType.onchange = function () {
    setNoticePrice();
  };

  noticeRoomNumber.onchange = function () {
    setNoticeCapacity();
  };

  checkFieldValidity(noticeAddress);
  checkFieldValidity(noticePrice);
  checkFieldValidity(noticeTitle);
}

function setNoticeTime() {
  noticeTimeOut.value = noticeTimeIn.value;
}

function setNoticePrice() {
  switch (noticeType.value) {
    case 'bungalo':
      noticePrice.min = 0;
      noticePrice.value = 0;
      break;
    case 'flat':
      noticePrice.min = 1000;
      noticePrice.value = 1000;
      break;
    case 'house':
      noticePrice.min = 5000;
      noticePrice.value = 5000;
      break;
    case 'palace':
      noticePrice.min = 10000;
      noticePrice.value = 10000;
      break;
  }
}

function setNoticeCapacity() {
  for (var i = 0; i < noticeCapacity.options.length; i++) {
    noticeCapacity.options[i].disabled = false;
  }
  switch (noticeRoomNumber.value) {
    case '1':
      noticeCapacity.value = '1';
      noticeCapacity.options[0].disabled = true;
      noticeCapacity.options[1].disabled = true;
      noticeCapacity.options[3].disabled = true;
      break;
    case '2':
      noticeCapacity.value = '1';
      noticeCapacity.options[0].disabled = true;
      noticeCapacity.options[3].disabled = true;
      break;
    case '3':
      noticeCapacity.value = '1';
      noticeCapacity.options[3].disabled = true;
      break;
    case '100':
      noticeCapacity.value = '0';
      noticeCapacity.options[0].disabled = true;
      noticeCapacity.options[1].disabled = true;
      noticeCapacity.options[2].disabled = true;
      break;
  }
}

function checkFieldValidity(field) {
  field.addEventListener('invalid', function () {
    field.style.boxShadow = '0 0 0 2px red';
  });
  field.oninput = function () {
    field.style.boxShadow = '';
  };
}

init();
initForm();
