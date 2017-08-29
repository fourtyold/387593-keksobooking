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

  var offerDialog = document.querySelector('.dialog');
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var pins = [];
  var offerDialogClose = offerDialog.querySelector('.dialog__close');
  var pinIndex;
  var noticeAddress = document.querySelector('#address');
  var startCoords;

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
    noticeAddress.disabled = true;
    noticeAddress.value = 'x: y:';
    pins[0].addEventListener('mousedown', onMouseDown);
  }

  function init() {
    window.pin.initPins(window.offerObjects);
    pins = getPins();
    window.util.addClassIfNotExist(offerDialog, 'hidden');
    window.pin.setPinsHandler(pins, pinIndex);
    setOfferDialogHandler();
    setDragHandler();
  }

  init();

  window.map = {
    onOfferDialogEscPress: function (evt) {
      window.util.isEscEvent(evt, closeOfferDialog);
    }
  };

})();
