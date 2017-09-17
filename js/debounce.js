'use strict';

(function () {
  window.debounce = function (func, wait) {
    var timeout;
    return function (arg1, arg2) {
      function later() {
        timeout = null;
        func(arg1, arg2);
      }
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
})();
