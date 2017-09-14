'use strict';

(function () {

  var PIN_SIZE = {
    width: 75,
    height: 94
  };
  var SCREEN_BORDERS = {
    top: 80,
    bottom: 615,
    left: -36,
    right: 1164
  };

  var DEBOUNCE_DELAY = 500;

  var offerDialog = document.querySelector('.dialog');
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var pins = [];
  var offersList = [];
  var offerDialogClose = offerDialog.querySelector('.dialog__close');
  var pinIndex;
  var noticeAddress = document.querySelector('#address');
  var startCoords;

  var tokyoFilters = document.querySelector('.tokyo__filters');
  var filters = {
    housingType: tokyoFilters.querySelector('#housing_type'),
    housingPrice: tokyoFilters.querySelector('#housing_price'),
    housingRoomNumber: tokyoFilters.querySelector('#housing_room-number'),
    housingGuestsNumber: tokyoFilters.querySelector('#housing_guests-number')
  };
  var housingFeatures = tokyoFilters.querySelector('#housing_features');

  var bounce = window.debounce(window.pin.filterPins, DEBOUNCE_DELAY);

  function getPins() {
    return tokyoPinMap.querySelectorAll('.pin');
  }

  function closeOfferDialog() {
    offerDialog.classList.add('hidden');
    for (var i = 1; i < pins.length; i++) {
      window.util.removeClassIfExist(pins[i], 'pin--active');
    }
    document.removeEventListener('keydown', window.map.onOfferDialogEscPress);
  }

  function setOfferDialogHandler() {
    offerDialogClose.tabIndex = 1;
    offerDialogClose.addEventListener('click', closeOfferDialog);
    offerDialogClose.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closeOfferDialog);
    });
  }

  function onMouseDown(evt) {
    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    evt.preventDefault();
    noticeAddress.value = 'x: ' + (pins[0].offsetLeft + (PIN_SIZE.width * 0.5)) + ' y: ' + (pins[0].offsetTop + PIN_SIZE.height);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    noticeAddress.value = 'x: ' + (pins[0].offsetLeft + (PIN_SIZE.width * 0.5)) + ' y: ' + (pins[0].offsetTop + PIN_SIZE.height);
    if (pins[0].offsetTop <= SCREEN_BORDERS.top) {
      pins[0].style.top = (SCREEN_BORDERS.top + 1) + 'px';
    } else if (pins[0].offsetTop >= SCREEN_BORDERS.bottom) {
      pins[0].style.top = (SCREEN_BORDERS.bottom - 1) + 'px';
    } else {
      pins[0].style.top = (pins[0].offsetTop - shift.y) + 'px';
    }
    if (pins[0].offsetLeft <= SCREEN_BORDERS.left) {
      pins[0].style.left = (SCREEN_BORDERS.left + 1) + 'px';
    } else if (pins[0].offsetLeft >= SCREEN_BORDERS.right) {
      pins[0].style.left = (SCREEN_BORDERS.right - 1) + 'px';
    } else {
      pins[0].style.left = (pins[0].offsetLeft - shift.x) + 'px';
    }
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  function setDragHandler() {
    pins[0].addEventListener('mousedown', onMouseDown);
  }

  function getData(data) {
    offersList = data;
    window.pin.initPins(data);
    pins = getPins();
    window.pin.setPinsHandler(pins, pinIndex);
    setDragHandler();
    window.pin.filterPins(offersList, pins);
  }

  function setFilters() {
    for (var key in filters) {
      filters[key].addEventListener('change', function () {
        window.util.addClassIfNotExist(offerDialog, 'hidden');
        bounce(offersList, pins);
      });
    }
    housingFeatures.addEventListener('click', function (evt) {
      if (evt.target.parentNode.classList.contains('feature') && !evt.target.classList.contains('feature__image')) {
        window.util.addClassIfNotExist(offerDialog, 'hidden');
        bounce(offersList, pins);
      }
    });
  }

  function init() {
    window.backend.load(getData, window.backend.errorHandler);
    window.util.addClassIfNotExist(offerDialog, 'hidden');
    setOfferDialogHandler();
    setFilters();
  }

  init();

  window.map = {
    onOfferDialogEscPress: function (evt) {
      window.util.isEscEvent(evt, closeOfferDialog);
    },
    getOfferObject: function (i) {
      return window.getOffer(offersList[i]);
    }
  };
})();
