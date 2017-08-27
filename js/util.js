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
    shuffleArr: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        var arrItem = arr[i];
        var j = window.util.getRandomInt(0, arr.length - 1);
        arr[i] = arr[j];
        arr[j] = arrItem;
      }
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODES.esc) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODES.enter) {
        action();
      }
    }
  };
})();
