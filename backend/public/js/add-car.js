let storedUsername = localStorage.getItem('username');
let btn = document.getElementById('button');


btn.addEventListener('click', async () => {
    const carMake = document.getElementById('car-make').value;
    const carModel = document.getElementById('car-model').value;
    const carYear = document.getElementById('car-year').value;
    const carImageInput = document.getElementById('car-image-upload');
    const carImage = carImageInput.files[0];
    const userId = localStorage.getItem('id');
    
    const formData = new FormData(); 
    formData.append('carMake', carMake);
    formData.append('carModel', carModel);
    formData.append('carYear', carYear);
    formData.append('carImage', carImage);
    formData.append('userId', userId);


    console.log(carMake, carModel, carYear, carImage, localStorage.getItem('id'));
    for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
    
    try {
        const response = await fetch('/add-car', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const data = await response.text();
          console.log(data); 
        } 
      } catch (error) {
        console.error('Error:', error);
      }

      window.location.href = '../home.html'
});
