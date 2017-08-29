'use strict';

(function () {

  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var dialogTitleImg = document.querySelector('.dialog').querySelector('.dialog__title').querySelector('img');

  window.getOffer = function (object) {
    var offerElement = lodgeTemplate.cloneNode(true);
    offerElement.querySelector('.lodge__title').textContent = object.offer.title;
    offerElement.querySelector('.lodge__address').textContent = object.offer.address;
    offerElement.querySelector('.lodge__price').textContent = object.offer.price;
    offerElement.querySelector('.lodge__type').textContent = object.offer.type;
    offerElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + object.offer.guests + ' в ' + object.offer.rooms + ' комнатах';
    offerElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    object.offer.features.forEach(function (item) {
      var span = document.createElement('span');
      span.classList.add('feature__image');
      span.classList.add('feature__image--' + item);
      offerElement.querySelector('.lodge__features').appendChild(span);
    });
    offerElement.querySelector('.lodge__description').textContent = object.offer.description;
    dialogTitleImg.src = object.author.avatar;
    return offerElement;
  };
})();

