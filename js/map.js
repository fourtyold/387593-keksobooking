'use strict';

var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerTypes = ['flat', 'house', 'bungalo'];
var offerTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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
  for (var i = 0; i < 8; i++) {
    var locationX = getRandomInt(300, 900);
    var locationY = getRandomInt(175, 500);
    var roomNumber = getRandomInt(1, 5);
    var offerFeatures = [];
    offerFeatures = getObjectFeatures(features);
    objects[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: offerTitles[getRandomInt(0, offerTitles.length - 1)],
        address: locationX + ',' + ' ' + locationY,
        price: getRandomInt(1000, 1000000),
        type: offerTypes[getRandomInt(0, 2)],
        rooms: roomNumber,
        guests: roomNumber * 2,
        checkin: offerTimes[getRandomInt(0, 2)],
        checkout: offerTimes[getRandomInt(0, 2)],
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

var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var pin = tokyoPinMap.querySelector('.pin');

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

var offerDialog = document.querySelector('.dialog');
var dialogTitle = offerDialog.querySelector('.dialog__title');
var dialogTitleImg = dialogTitle.querySelector('img');
var dialogPanel = offerDialog.querySelector('.dialog__panel');
var lodgeTemplate = document.querySelector('#lodge-template').content;

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

function init() {
  var offerObjects = getObject();
  initPins(offerObjects);
  offerDialog.replaceChild(getOffer(offerObjects[0]), dialogPanel);
}

init();
