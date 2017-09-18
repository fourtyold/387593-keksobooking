'use strict';

(function () {
  function synchronizeFields(initElement, toSyncElement, callback) {
    initElement.addEventListener('change', function () {
      callback(initElement.value, toSyncElement);
    });
  }

  window.synchronizeFields = synchronizeFields;
})();
