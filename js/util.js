'use strict';

(function () {

  var KEY_CODES = {
    enter: 13,
    esc: 27
  };

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function isEscEvent(evt, action) {
    if (evt.keyCode === KEY_CODES.esc) {
      action(evt);
    }
  }

  function isEnterEvent(evt, action) {
    if (evt.keyCode === KEY_CODES.enter) {
      action(evt);
    }
  }

  function removeClassIfExist(element, className) {
    var ind = false;
    if (element.classList.contains(className)) {
      element.classList.remove(className);
      ind = true;
    }
    return ind;
  }

  function addClassIfNotExist(element, className) {
    if (!element.classList.contains(className)) {
      element.classList.add(className);
    }
  }

  function setThisValue(value, element) {
    element.value = value;
  }

  function setThisValueMin(value, element) {
    element.min = value;
  }

  window.util = {
    getRandomInt: getRandomInt,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    removeClassIfExist: removeClassIfExist,
    addClassIfNotExist: addClassIfNotExist,
    setThisValue: setThisValue,
    setThisValueMin: setThisValueMin
  };
})();
