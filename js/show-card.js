'use strict';

(function () {

  var offerDialog = document.querySelector('.dialog');
  var dialogPanel = offerDialog.querySelector('.dialog__panel');

  window.showCard = function (pins, index) {
    offerDialog.classList.remove('hidden');
    for (var i = 1; i < pins.length; i++) {
      window.util.removeClassIfExist(pins[i], 'pin--active');
    }
    window.util.addClassIfNotExist(pins[index], 'pin--active');
    offerDialog.replaceChild(window.map.getOfferObject(index - 1), dialogPanel);
    dialogPanel = offerDialog.querySelector('.dialog__panel');
    document.addEventListener('keydown', window.map.onOfferDialogEscPress);
  };
})();
