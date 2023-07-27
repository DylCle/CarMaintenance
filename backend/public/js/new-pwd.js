
const btn = document.getElementById('send-btn');
let storedUsername = localStorage.getItem('resetPwd');
console.log('stored' + storedUsername);

const url = window.location.href;
const segments = url.split('/');
const beforeLastSlash = segments[segments.length - 3];
const beforeThirdSlash = segments[2];
console.log('Value before last slash:', beforeLastSlash);
console.log('Value before third slash:', beforeThirdSlash);

btn.addEventListener('click', () => {
    const password = document.getElementById('password').value;
    const confirm_Password = document.getElementById('confirm-password').value;

    const formData = {
        password,
        confirm_Password,
        storedUsername,
    }


    fetch(`/id/${beforeLastSlash}/${storedUsername}`, {
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
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
