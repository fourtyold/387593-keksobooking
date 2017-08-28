'use strict';

(function () {

  var offerDialog = document.querySelector('.dialog');
  var dialogPanel = offerDialog.querySelector('.dialog__panel');

  window.showCard = function (pins, index) {
    offerDialog.classList.remove('hidden');
    for (var i = 1; i < pins.length; i++) {
      if (pins[i].classList.contains('pin--active')) {
        pins[i].classList.remove('pin--active');
      }
    }
    pins[index].classList.add('pin--active');
    offerDialog.replaceChild(window.getOffer(window.offerObjects[index - 1]), dialogPanel);
    dialogPanel = offerDialog.querySelector('.dialog__panel');
    document.addEventListener('keydown', window.map.onOfferDialogEscPress);
  };
})();
