'use strict';

(function () {

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var pin = tokyoPinMap.querySelector('.pin');

  var tokyoFilters = document.querySelector('.tokyo__filters');
  var housingType = tokyoFilters.querySelector('#housing_type');
  var housingPrice = tokyoFilters.querySelector('#housing_price');
  var housingRoomNumber = tokyoFilters.querySelector('#housing_room-number');
  var housingGuestsNumber = tokyoFilters.querySelector('#housing_guests-number');
  var filtersGroup = tokyoFilters.feature;

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

  function typeHandler(offersList, pinsList) {
    switch (housingType.value) {
      case 'flat':
      case 'house':
      case 'bungalo':
        offersList.forEach(function (it, i) {
          window.util.removeClassIfExist(pinsList[i + 1], 'pin--active');
          if (it.offer.type !== housingType.value) {
            window.util.addClassIfNotExist(pinsList[i + 1], 'hidden');
            removePinHandler(pinsList, i + 1);
          }
        });
        break;
      case 'any':
        for (var i = 1; i < pinsList.length; i++) {
          if (window.util.removeClassIfExist(pinsList[i], 'pin--active')) {
            break;
          }
        }
        break;
    }
  }

  function priceHandler(offersList, pinsList) {
    switch (housingPrice.value) {
      case 'low':
        offersList.forEach(function (it, i) {
          window.util.removeClassIfExist(pinsList[i + 1], 'pin--active');
          if (it.offer.price >= 10000) {
            window.util.addClassIfNotExist(pinsList[i + 1], 'hidden');
            removePinHandler(pinsList, i + 1);
          }
        });
        break;
      case 'middle':
        offersList.forEach(function (it, i) {
          window.util.removeClassIfExist(pinsList[i + 1], 'pin--active');
          if (it.offer.price < 10000 || it.offer.price > 50000) {
            window.util.addClassIfNotExist(pinsList[i + 1], 'hidden');
            removePinHandler(pinsList, i + 1);
          }
        });
        break;
      case 'high':
        offersList.forEach(function (it, i) {
          window.util.removeClassIfExist(pinsList[i + 1], 'pin--active');
          if (it.offer.price <= 50000) {
            window.util.addClassIfNotExist(pinsList[i + 1], 'hidden');
            removePinHandler(pinsList, i + 1);
          }
        });
        break;
      case 'any':
        for (var i = 1; i < pinsList.length; i++) {
          if (window.util.removeClassIfExist(pinsList[i], 'pin--active')) {
            break;
          }
        }
        break;
    }
  }

  function roomNumberHandler(offersList, pinsList) {
    switch (housingRoomNumber.value) {
      case '1':
      case '2':
      case '3':
        offersList.forEach(function (it, i) {
          window.util.removeClassIfExist(pinsList[i + 1], 'pin--active');
          if (it.offer.rooms !== +housingRoomNumber.value) {
            window.util.addClassIfNotExist(pinsList[i + 1], 'hidden');
            removePinHandler(pinsList, i + 1);
          }
        });
        break;
      case 'any':
        for (var i = 1; i < pinsList.length; i++) {
          if (window.util.removeClassIfExist(pinsList[i], 'pin--active')) {
            break;
          }
        }
        break;
    }
  }

  function guestsNumberHandler(offersList, pinsList) {
    switch (housingGuestsNumber.value) {
      case '1':
      case '2':
        offersList.forEach(function (it, i) {
          window.util.removeClassIfExist(pinsList[i + 1], 'pin--active');
          if (it.offer.guests !== +housingGuestsNumber.value) {
            window.util.addClassIfNotExist(pinsList[i + 1], 'hidden');
            removePinHandler(pinsList, i + 1);
          }
        });
        break;
      case 'any':
        for (var i = 1; i < pinsList.length; i++) {
          if (window.util.removeClassIfExist(pinsList[i], 'pin--active')) {
            break;
          }
        }
        break;
    }
  }

  function featuresHandler(offersList, pinsList) {
    var featuresFilters = [];
    filtersGroup.forEach(function (it) {
      if (it.checked) {
        featuresFilters.push(it.value);
      }
    });
    offersList.forEach(function (it, i) {
      featuresFilters.forEach(function (filter) {
        if (it.offer.features.indexOf(filter) === -1) {
          window.util.addClassIfNotExist(pinsList[i + 1], 'hidden');
          removePinHandler(pinsList, i + 1);
        }
      });
    });
  }

  function setPinHandler(pins, index) {
    pins[index].tabIndex = 1;
    pins[index].addEventListener('click', function () {
      window.showCard(pins, index);
    });
    pins[index].addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, function () {
        window.showCard(pins, index);
      });
    });
  }

  function removePinHandler(pins, index) {
    pins[index].tabIndex = 0;
    pins[index].removeEventListener('click', function () {
      window.showCard(pins, index);
    });
    pins[index].removeEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, function () {
        window.showCard(pins, index);
      });
    });
  }

  window.pin = {
    initPins: function (offerList) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < offerList.length; i++) {
        fragment.appendChild(renderPins(offerList[i]));
      }
      tokyoPinMap.appendChild(fragment);
    },
    filterPins: function (offersList, pinsList) {
      for (var i = 1; i < pinsList.length; i++) {
        window.util.removeClassIfExist(pinsList[i], 'hidden');
        setPinHandler(pinsList, i);
      }
      typeHandler(offersList, pinsList);
      priceHandler(offersList, pinsList);
      roomNumberHandler(offersList, pinsList);
      guestsNumberHandler(offersList, pinsList);
      featuresHandler(offersList, pinsList);
    },
    hidePins: function (offersList, pinsList) {
      var pinNumbers = [];
      var randomIndex;
      while (pinNumbers.length < 3) {
        randomIndex = window.util.getRandomInt(1, offersList.length);
        if (pinNumbers.indexOf(randomIndex) === -1) {
          pinNumbers.push(randomIndex);
        }
      }
      pinNumbers.forEach(function (it) {
        setPinHandler(pinsList, it);
      });
      for (var i = 1; i < pinsList.length; i++) {
        if (pinNumbers.indexOf(i) === -1) {
          pinsList[i].classList.add('hidden');
        }
      }
    }
  };
})();
