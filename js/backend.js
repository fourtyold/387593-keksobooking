'use strict';

(function () {

  var URL = {
    download: 'https://1510.dump.academy/keksobooking/data',
    upload: 'https://1510.dump.academy/keksobooking'
  };

  function requestHandler(request, onLoad, onError) {
    request.responseType = 'json';
    request.addEventListener('load', function () {
      if (request.status === 200) {
        onLoad(request.response);
      } else {
        onError('Неизвестный статус: ' + request.status + ' ' + request.statusText);
      }
    });
    request.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    request.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + request.timeout + 'мс');
    });
    request.timeout = 10000;
  }

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    requestHandler(xhr, onLoad, onError);
    xhr.open('GET', URL.download);
    xhr.send();
  }

  function save(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    requestHandler(xhr, onLoad, onError);
    xhr.open('POST', URL.upload);
    xhr.send(data);
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; width: 500px; height: 80px; text-align: center; ' +
      'background-color: white; border-radius: 10px; box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.5); ' +
      'padding-top: 20px;';
    node.style.position = 'fixed';
    node.style.left = 38 + '%';
    node.style.top = 40 + '%';
    node.style.fontSize = '20px';
    node.style.fontWeight = 700;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.backend = {
    load: load,
    save: save,
    errorHandler: errorHandler
  };
})();
