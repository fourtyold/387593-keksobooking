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
          }
        });
        break;
      case 'any':
        for (var i = 1; i < pinsList.length; i++) {
          window.util.removeClassIfExist(pinsList[i], 'pin--active');
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
          }
        });
        break;
      case 'middle':
        offersList.forEach(function (it, i) {
          window.util.removeClassIfExist(pinsList[i + 1], 'pin--active');
          if (it.offer.price < 10000 || it.offer.price > 50000) {
            window.util.addClassIfNotExist(pinsList[i + 1], 'hidden');
          }
        });
        break;
      case 'high':
        offersList.forEach(function (it, i) {
          window.util.removeClassIfExist(pinsList[i + 1], 'pin--active');
          if (it.offer.price <= 50000) {
            window.util.addClassIfNotExist(pinsList[i + 1], 'hidden');
          }
        });
        break;
      case 'any':
        for (var i = 1; i < pinsList.length; i++) {
          window.util.removeClassIfExist(pinsList[i], 'pin--active');
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
          }
        });
        break;
      case 'any':
        for (var i = 1; i < pinsList.length; i++) {
          window.util.removeClassIfExist(pinsList[i], 'pin--active');
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
          }
        });
        break;
      case 'any':
        for (var i = 1; i < pinsList.length; i++) {
          window.util.removeClassIfExist(pinsList[i], 'pin--active');
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
        }
      });
    });
  }

  window.pin = {
    setPinsHandler: function (pins, index) {
      for (var i = 1; i < pins.length; i++) {
        pins[i].tabIndex = 1;
        pins[i].addEventListener('click', function (evt) {
          var thisPin = evt.target.classList.contains('pin') ? evt.target : evt.target.parentNode;
          for (var j = 0; j < pins.length; j++) {
            if (pins[j] === thisPin) {
              index = j;
              break;
            }
          }
          window.showCard(pins, index);
        });
        pins[i].addEventListener('keydown', function (evt) {
          var thisPin = evt.target.classList.contains('pin') ? evt.target : evt.target.parentNode;
          window.util.isEnterEvent(evt, function () {
            for (var j = 0; j < pins.length; j++) {
              if (pins[j] === thisPin) {
                index = j;
                break;
              }
            }
            window.showCard(pins, index);
          });
        });
      }
    },
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
      }
      typeHandler(offersList, pinsList);
      priceHandler(offersList, pinsList);
      roomNumberHandler(offersList, pinsList);
      guestsNumberHandler(offersList, pinsList);
      featuresHandler(offersList, pinsList);
    }
  };
})();
