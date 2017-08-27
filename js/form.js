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

  function setNoticeTimeIn() {
    noticeTimeIn.value = noticeTimeOut.value;
  }

  function setNoticeTimeOut() {
    noticeTimeOut.value = noticeTimeIn.value;
  }

  function setNoticePrice() {
    switch (noticeType.value) {
      case 'bungalo':
        noticePrice.min = 0;
        noticePrice.value = 0;
        break;
      case 'flat':
        noticePrice.min = 1000;
        noticePrice.value = 1000;
        break;
      case 'house':
        noticePrice.min = 5000;
        noticePrice.value = 5000;
        break;
      case 'palace':
        noticePrice.min = 10000;
        noticePrice.value = 10000;
        break;
    }
  }

  function setNoticeCapacity() {
    for (var i = 0; i < noticeCapacity.options.length; i++) {
      noticeCapacity.options[i].disabled = false;
    }
    switch (noticeRoomNumber.value) {
      case '1':
        noticeCapacity.value = '1';
        noticeCapacity.options[0].disabled = true;
        noticeCapacity.options[1].disabled = true;
        noticeCapacity.options[3].disabled = true;
        break;
      case '2':
        noticeCapacity.value = '1';
        noticeCapacity.options[0].disabled = true;
        noticeCapacity.options[3].disabled = true;
        break;
      case '3':
        noticeCapacity.value = '1';
        noticeCapacity.options[3].disabled = true;
        break;
      case '100':
        noticeCapacity.value = '0';
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
    noticePrice.value = 1000;
    setNoticePrice();

    setNoticeCapacity();

    form.action = 'https://1510.dump.academy/keksobooking';

    noticeTimeIn.onchange = function () {
      setNoticeTimeOut();
    };

    noticeTimeOut.onchange = function () {
      setNoticeTimeIn();
    };

    noticeType.onchange = function () {
      setNoticePrice();
    };

    noticeRoomNumber.onchange = function () {
      setNoticeCapacity();
    };

    checkFieldValidity(noticeAddress);
    checkFieldValidity(noticePrice);
    checkFieldValidity(noticeTitle);
  }

  initForm();
})();
