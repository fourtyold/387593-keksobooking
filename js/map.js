'use strict';

(function () {

  var offerDialog = document.querySelector('.dialog');
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var pins = [];
  var offerDialogClose = offerDialog.querySelector('.dialog__close');
  var pinIndex;

  function getPins() {
    var pinsNL = tokyoPinMap.querySelectorAll('.pin');
    return pinsNL;
  }

  function closeOfferDialog() {
    offerDialog.classList.add('hidden');
    for (var i = 1; i < pins.length; i++) {
      pins[i].classList.remove('pin--active');
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

  window.map = {
    onOfferDialogEscPress: function (evt) {
      window.util.isEscEvent(evt, closeOfferDialog);
    }
  };

  function init() {
    window.pin.initPins(window.offerObjects);
    pins = getPins();
    offerDialog.classList.add('hidden');
    window.pin.setPinsHandler(pins, pinIndex);
    setOfferDialogHandler();
  }

  init();
})();
