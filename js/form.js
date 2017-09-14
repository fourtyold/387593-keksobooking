'use strict';

(function () {

  var ROOMS_CAPACITY = {
    '1': '1',
    '2': '2',
    '3': '2',
    '100': '0'
  };
  var APPARTEMENT_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var CAPACITY_OPTIONS = [
    [0, 1, 3],
    [0, 3],
    [3],
    [0, 1, 2]
  ];

  var form = document.querySelector('.notice__form');
  var noticeTitle = form.querySelector('#title');
  var noticeAddress = form.querySelector('#address');
  var noticePrice = form.querySelector('#price');
  var noticeTimeIn = form.querySelector('#timein');
  var noticeTimeOut = form.querySelector('#timeout');
  var noticeType = form.querySelector('#type');
  var noticeCapacity = form.querySelector('#capacity');
  var noticeRoomNumber = form.querySelector('#room_number');

  function setNoticePrice(type, price) {
    window.util.setThisValue(APPARTEMENT_PRICES[type], price);
    window.util.setThisValueMin(APPARTEMENT_PRICES[type], price);
  }

  function setNoticeCapacity(roomNumbers, capacity) {
    window.util.setThisValue(ROOMS_CAPACITY[roomNumbers], capacity);
    setMaxCapacity();
  }

  function setMaxCapacity() {
    Array.prototype.forEach.call(noticeCapacity.options, function (it) {
      it.disabled = false;
    });
    for (var i = 0; i < CAPACITY_OPTIONS[noticeRoomNumber.selectedIndex].length; i++) {
      noticeCapacity.options[CAPACITY_OPTIONS[noticeRoomNumber.selectedIndex][i]].disabled = true;
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

  function resetForm() {
    form.reset();
    initForm();
  }

  function submitForm(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), resetForm, window.backend.errorHandler);
  }

  function initForm() {
    noticeAddress.readOnly = true;
    noticeAddress.value = 'x: y:';

    noticeTitle.required = true;
    noticeTitle.minLength = 30;
    noticeTitle.maxLength = 100;

    noticePrice.required = true;

    setNoticePrice(noticeType.value, noticePrice);
    setNoticeCapacity(noticeRoomNumber.value, noticeCapacity);

    form.action = 'https://1510.dump.academy/keksobooking';

    window.synchronizeFields(noticeTimeIn, noticeTimeOut, window.util.setThisValue);
    window.synchronizeFields(noticeTimeOut, noticeTimeIn, window.util.setThisValue);
    window.synchronizeFields(noticeType, noticePrice, setNoticePrice);
    window.synchronizeFields(noticeRoomNumber, noticeCapacity, setNoticeCapacity);

    checkFieldValidity(noticeAddress);
    checkFieldValidity(noticePrice);
    checkFieldValidity(noticeTitle);

    form.addEventListener('submit', submitForm);
  }

  initForm();
})();
