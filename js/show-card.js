'use strict';

(function () {

  var offerDialog = document.querySelector('.dialog');
  var dialogPanel = offerDialog.querySelector('.dialog__panel');
  var offerDialogClose = offerDialog.querySelector('.dialog__close');

  window.showCard = function (pins, index) {
    offerDialog.classList.remove('hidden');
    for (var i = 1; i < pins.length; i++) {
      if (window.util.removeClassIfExist(pins[i], 'pin--active')) {
        break;
      }
    }
    window.util.addClassIfNotExist(pins[index], 'pin--active');
    offerDialog.replaceChild(window.map.getOfferObject(index - 1), dialogPanel);
    dialogPanel = offerDialog.querySelector('.dialog__panel');
    document.addEventListener('keydown', window.map.onOfferDialogEscPress);
    offerDialogClose.tabIndex = 1;
    offerDialogClose.addEventListener('click', window.map.closeOfferDialog);
    offerDialogClose.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, window.map.closeOfferDialog);
    });
  };
})();
