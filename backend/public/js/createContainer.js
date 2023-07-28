export function createContainer() {
    let carContainer = document.createElement('div');
    let addCarContainer = document.createElement('div');
    let carInfor = document.createElement('div');
    let addCar = document.createElement('div');
    let img = document.createElement('img');
    let carMake = document.createElement('h3');
    let carYear = document.createElement('h3');

    let addBtn = document.createElement('button');
    let addCarTxt = document.createElement('h2')

    addCarContainer.setAttribute('class', 'car-container');
    addCar.setAttribute('id', 'add-new-car');
    addBtn.setAttribute('id', 'add-car');
    addBtn.textContent = '+';
    addCarTxt.textContent = 'Add Car';


    carContainer.setAttribute('class', 'car-container');
    carInfor.setAttribute('id', 'car-info');


    img.setAttribute('id', 'car-image');
    //img.setAttribute('src', 'https://www.pngmart.com/files/22/Tesla-Model-X-PNG-Photo.png');
    carMake.setAttribute('id', 'car-name');
    carYear.setAttribute('id', 'car-year');

    function updateCar(data) {
        const { CarMake, CarYear, CarModel, CarImage } = data;
      
        console.log('Received data:', data);
      
        const carNameElement = document.getElementById('car-name');
        const carYearElement = document.getElementById('car-year');
        const imgElement = document.getElementById('car-image');
      
        // Update the text and img
        carNameElement.textContent = CarMake + ' ' + CarModel;
        carYearElement.textContent = CarYear;
      
        // Set the CarImage URL as the src attribute of imgElement
        imgElement.setAttribute('src', CarImage);
      }

    fetch('/cardata')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            updateCar(data);
            console.log(data);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });


    addCar.appendChild(addBtn);
    addCar.appendChild(addCarTxt);
    addCarContainer.appendChild(addCar);

    carInfor.appendChild(img);
    carInfor.appendChild(carMake);
    carInfor.appendChild(carYear);

    return new Promise((resolve) => {
        carContainer.appendChild(carInfor);
        document.body.appendChild(carContainer);
        document.body.appendChild(addCarContainer);

        // Resolve the Promise
        resolve();
    });

}
