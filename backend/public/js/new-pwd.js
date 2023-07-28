
const btn = document.getElementById('send-btn');
let storedUsername = localStorage.getItem('resetPwd');
const url = window.location.href;
const segments = url.split('/');
const urlId = segments[segments.length - 3];

btn.addEventListener('click', () => {
    const password = document.getElementById('password').value;
    const confirm_Password = document.getElementById('confirm-password').value;
    const formData = {
        password,
        confirm_Password,
        storedUsername,
    }

    fetch(`/id/${urlId}/${storedUsername}`, {
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
            console.log(data);
            fetch('/', {
                method: 'GET',
            })
                .then(() => {
                    console.log('Redirecting to the home page');
                    window.location.href = '/';
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
