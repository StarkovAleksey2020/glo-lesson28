window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // get screen elements
  const output = document.getElementById('output'),
    select = document.getElementById('cars');

  const outputCar = (data) => {
    const carInfoBlock = document.querySelector('.car-info');
    if (carInfoBlock) {
      carInfoBlock.remove();
    }
    if (data.length > 0) {
      output.insertAdjacentHTML('beforebegin', `<div class='car-info'>
                          <h4>Selected car</h4>
                          <span>Brand: ${data[0].brand}</span><br>
                          <span>Model: ${data[0].model}</span><br>
                          <span>Price: ${data[0].price}</span><br>
                          </div>`);
    } else {
      output.insertAdjacentHTML('beforebegin', `<div class='car-info'>
                          <span>No info</span>
                          </div>`);
    }
  };

  select.addEventListener('change', async () => {
    if (select.value !== 'no') {
      try {
        const url = 'cars.json';
        const requestHeader = new Headers();
        const requestInit = {
          method: 'GET',
          headers: requestHeader,
          mode: 'cors'
        };
        const requestCar = new Request(url, requestInit);
        const response = await fetch(requestCar);
        if (!response.ok) {
          throw new Error(`Status: ${response.statusText}. Code: ${response.status}.`);
        }
        const carsArray = await response.json();
        const selectedCar = carsArray.cars.filter(item => item.brand === select.value);
        outputCar(selectedCar);
      } catch (error) {
        console.error(error);
      }
    }
  });


});