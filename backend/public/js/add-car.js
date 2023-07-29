let storedUsername = localStorage.getItem('username');
let btn = document.getElementById('button');

btn.addEventListener('click', () => {
    const carMake = document.getElementById('car-make').value;
    const carModel = document.getElementById('car-model').value;
    const carYear = document.getElementById('car-year').value;


    const formData = {
        CarMake: carMake,
        CarModel: carModel,
        CarYear: carYear,
        userId: localStorage.getItem('id'),
    };

    fetch('/add-car', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        // Handle the successful response here
        console.log(data); // or do something else with the data
    })
    .catch((error) => {
        // Handle any errors that occurred during the fetch request
        console.error('Error:', error);
    });
});
