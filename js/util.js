'use strict';

(function () {

  var KEY_CODES = {
    enter: 13,
    esc: 27
  };

  window.util = {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODES.esc) {
        action(evt);
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODES.enter) {
        action(evt);
      }
    },
    removeClassIfExist: function (element, className) {
      var ind = false;
      if (element.classList.contains(className)) {
        element.classList.remove(className);
        ind = true;
      }
      return ind;
    },
    addClassIfNotExist: function (element, className) {
      if (!element.classList.contains(className)) {
        element.classList.add(className);
      }
    },
    setThisValue: function (value, element) {
      element.value = value;
    },
    setThisValueMin: function (value, element) {
      element.min = value;
    }
  };
})();
