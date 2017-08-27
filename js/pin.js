'use strict';

(function () {

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var pin = tokyoPinMap.querySelector('.pin');

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
          window.openOfferDialog(pins, index);
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
            window.openOfferDialog(pins, index);
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
    }
  };
})();
