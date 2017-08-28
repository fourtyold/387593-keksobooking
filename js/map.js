'use strict';

(function () {

  var offerDialog = document.querySelector('.dialog');
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var pins = [];
  var offerDialogClose = offerDialog.querySelector('.dialog__close');
  var pinIndex;
  var noticeAddress = document.querySelector('#address');

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

  function setDragHandler() {
    noticeAddress.disabled = true;
    noticeAddress.value = 'x: y:';
    pins[0].addEventListener('mousedown', function (evt) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      evt.preventDefault();
      noticeAddress.value = 'x: ' + (pins[0].offsetLeft + 37) + ' y: ' + (pins[0].offsetTop + 94);
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
        noticeAddress.value = 'x: ' + (pins[0].offsetLeft + 37) + ' y: ' + (pins[0].offsetTop + 94);
        pins[0].style.top = (pins[0].offsetTop - shift.y) + 'px';
        if (pins[0].offsetTop <= 80) {
          pins[0].style.top = '80px';
        } else if (pins[0].offsetTop >= 615) {
          pins[0].style.top = '615px';
        } else {
          pins[0].style.top = (pins[0].offsetTop - shift.y) + 'px';
        }
        if (pins[0].offsetLeft <= -36) {
          pins[0].style.left = '-35px';
        } else if (pins[0].offsetLeft >= 1164) {
          pins[0].style.left = '1163px';
        } else {
          pins[0].style.left = (pins[0].offsetLeft - shift.x) + 'px';
        }
      }

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  function init() {
    window.pin.initPins(window.offerObjects);
    pins = getPins();
    offerDialog.classList.add('hidden');
    window.pin.setPinsHandler(pins, pinIndex);
    setOfferDialogHandler();
    setDragHandler();
  }

  init();
})();
