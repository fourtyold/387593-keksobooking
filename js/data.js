'use strict';

(function () {

  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];
  var OFFER_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  function getObjectFeatures(featuresList) {
    var objectFeaturesList = [];
    for (var i = 0; i < featuresList.length; i++) {
      if (window.util.getRandomInt(0, 1)) {
        objectFeaturesList.push(featuresList[i]);
      }
    }
    return objectFeaturesList;
  }

  function getObject() {
    var objects = [];
    window.util.shuffleArr(OFFER_TITLES);
    for (var i = 0; i < 8; i++) {
      var locationX = window.util.getRandomInt(300, 900);
      var locationY = window.util.getRandomInt(175, 500);
      var roomNumber = window.util.getRandomInt(1, 5);
      var offerFeatures = [];
      offerFeatures = getObjectFeatures(FEATURES);
      objects[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        offer: {
          title: OFFER_TITLES[window.util.getRandomInt(0, OFFER_TITLES.length - 1)],
          address: locationX + ',' + ' ' + locationY,
          price: window.util.getRandomInt(1000, 1000000),
          type: OFFER_TYPES[window.util.getRandomInt(0, 2)],
          rooms: roomNumber,
          guests: roomNumber * 2,
          checkin: OFFER_TIMES[window.util.getRandomInt(0, 2)],
          checkout: OFFER_TIMES[window.util.getRandomInt(0, 2)],
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

  window.offerObjects = getObject();
})();
