export function createContainer() {
    let carContainer = document.createElement('div');
    let addCarContainer = document.createElement('div');
    let addCar = document.createElement('div');
    let img = document.createElement('img');
    let carMake = document.createElement('h3');
    let carYear = document.createElement('h3');

    let addBtn = document.createElement('button');
    let addCarTxt = document.createElement('h2')

    addCarContainer.addEventListener('click', () => {
        window.location.href = '../add-car.html'
    })

    addCarContainer.setAttribute('id', 'add-new-car');
    addCar.setAttribute('id', 'add-new-car');
    addBtn.setAttribute('id', 'add-car');
    addBtn.textContent = '+';
    addCarTxt.textContent = 'Add Car';


    carContainer.setAttribute('class', 'car-container');



    img.setAttribute('id', 'car-image');
    carMake.setAttribute('id', 'car-name');
    carYear.setAttribute('id', 'car-year');

    function updateCar(data) {
        
        const { CarMake, CarYear, CarModel, CarImage } = data;

        const carContainer = document.createElement('div');
        const carNameElement = document.createElement('h3');
        const carYearElement = document.createElement('h3');
        const imgElement = document.createElement('img');
        const carInfor = document.createElement('div');

        carContainer.setAttribute('class', 'car-container');
        carInfor.setAttribute('class', 'car-info');
        carNameElement.setAttribute('class', 'car-name');
        carYearElement.setAttribute('class', 'car-year');
        imgElement.setAttribute('class', 'car-image');
        carNameElement.textContent = CarMake + ' ' + CarModel;
        carYearElement.textContent = CarYear;
        //TO GET THE IMAGE, USE DATA PARAM
        imgElement.setAttribute('src', data.CarImage);

        carInfor.appendChild(imgElement);
        carInfor.appendChild(carNameElement);
        carInfor.appendChild(carYearElement);

        carContainer.appendChild(carInfor);
        document.body.appendChild(carContainer);
    }

    fetch('/cardata')
        .then((response) => {
            if (!response.ok) {
                carContainer.classList.add('hide');
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if (data.error && data.error === 'No data found for the user') {
                const imageUrl = URL.createObjectURL(data);
                document.getElementById('car-image').src = imageUrl;
            } else {
                data.forEach(car => {
                    updateCar(car);
                });

                console.log(data);
            }
            

        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });

        addCarContainer.appendChild(addBtn);
        addCarContainer.appendChild(addCarTxt);
document.body.appendChild(addCarContainer);
}
