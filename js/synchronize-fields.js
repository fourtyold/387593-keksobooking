'use strict';

(function () {
  window.synchronizeFields = function (initElement, toSyncElement, callback) {
    initElement.addEventListener('change', function () {
      callback(initElement.value, toSyncElement);
    });
  };
})();
