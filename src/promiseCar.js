window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const output = document.getElementById('output'),
    select = document.getElementById('cars');

  const getCarData = (url, car) => {

    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', url);
      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          const response = JSON.parse(request.responseText);
          const selectedCar = response.cars.filter(item => item.brand === car);

          if (selectedCar.length > 0) {
            resolve(selectedCar);
          } else {
            reject('Selected car not found');
          }
        } else {
          reject(request.statusText);
        }
      });
      request.send();
    });
  };

  const outputCar = (data) => {
    const carInfoBlock = document.querySelector('.car-info');
    if (carInfoBlock) {
      carInfoBlock.remove();
    }
    if (typeof data === 'object') {
      output.insertAdjacentHTML('beforebegin', `<div class='car-info'>
                          <h4>Selected car</h4>
                          <span>Brand: ${data[0].brand}</span><br>
                          <span>Model: ${data[0].model}</span><br>
                          <span>Price: ${data[0].price}</span><br>
                          </div>`);
    } else {
      output.insertAdjacentHTML('beforebegin', `<div class='car-info'>
                          <h4>Message error:</h4>
                          <span>${data}</span>
                          </div>`);
    }
  };

  select.addEventListener('change', () => {
    if (select.value !== 'no') {
      getCarData('cars.json', select.value)
        .then(outputCar)
        .catch(error => {
          console.warn('Message error: ', error);
          outputCar(error);
        });
    }
  });
});