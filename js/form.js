'use strict';

(function () {

  var form = document.querySelector('.notice__form');
  var noticeTitle = form.querySelector('#title');
  var noticeAddress = form.querySelector('#address');
  var noticePrice = form.querySelector('#price');
  var noticeTimeIn = form.querySelector('#timein');
  var noticeTimeOut = form.querySelector('#timeout');
  var noticeType = form.querySelector('#type');
  var noticeCapacity = form.querySelector('#capacity');
  var noticeRoomNumber = form.querySelector('#room_number');

  function setThisValue(value, element) {
    element.value = value;
  }

  function setThisValueMin(value, element) {
    element.min = value;
  }

  function getNoticePrice() {
    var price;
    switch (noticeType.value) {
      case 'bungalo':
        price = 0;
        break;
      case 'flat':
        price = 1000;
        break;
      case 'house':
        price = 5000;
        break;
      case 'palace':
        price = 10000;
        break;
    }
    return price;
  }

  function getNoticeCapacity() {
    var capacity;
    switch (noticeRoomNumber.value) {
      case '1':
        capacity = '1';
        break;
      case '2':
        capacity = '2';
        break;
      case '3':
        capacity = '2';
        break;
      case '100':
        capacity = '0';
        break;
    }
    return capacity;
  }

  function setMaxCapacity() {
    for (var i = 0; i < noticeCapacity.options.length; i++) {
      noticeCapacity.options[i].disabled = false;
    }
    switch (noticeRoomNumber.value) {
      case '1':
        noticeCapacity.options[0].disabled = true;
        noticeCapacity.options[1].disabled = true;
        noticeCapacity.options[3].disabled = true;
        break;
      case '2':
        noticeCapacity.options[0].disabled = true;
        noticeCapacity.options[3].disabled = true;
        break;
      case '3':
        noticeCapacity.options[3].disabled = true;
        break;
      case '100':
        noticeCapacity.options[0].disabled = true;
        noticeCapacity.options[1].disabled = true;
        noticeCapacity.options[2].disabled = true;
        break;
    }
  }

  function checkFieldValidity(field) {
    field.addEventListener('invalid', function () {
      field.style.boxShadow = '0 0 0 2px red';
    });
    field.oninput = function () {
      field.style.boxShadow = '';
    };
  }

  function initForm() {
    noticeAddress.required = true;

    noticeTitle.required = true;
    noticeTitle.minLength = 30;
    noticeTitle.maxLength = 100;

    noticePrice.required = true;
    window.synchronizeFields(getNoticePrice(), noticePrice, setThisValue);

    window.synchronizeFields(getNoticeCapacity(), noticeCapacity, setThisValue);
    setMaxCapacity();

    form.action = 'https://1510.dump.academy/keksobooking';

    noticeTimeIn.onchange = function () {
      window.synchronizeFields(noticeTimeIn.value, noticeTimeOut, setThisValue);
    };

    noticeTimeOut.onchange = function () {
      window.synchronizeFields(noticeTimeOut.value, noticeTimeIn, setThisValue);
    };

    noticeType.onchange = function () {
      window.synchronizeFields(getNoticePrice(), noticePrice, setThisValue);
      window.synchronizeFields(getNoticePrice(), noticePrice, setThisValueMin);
    };

    noticeRoomNumber.onchange = function () {
      window.synchronizeFields(getNoticeCapacity(), noticeCapacity, setThisValue);
      setMaxCapacity();
    };

    checkFieldValidity(noticeAddress);
    checkFieldValidity(noticePrice);
    checkFieldValidity(noticeTitle);
  }

  initForm();
})();
