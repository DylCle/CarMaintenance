const loginButton = document.getElementById('login-button');

errorText.innerHTML = "";

loginButton.addEventListener('click', () => {
    if (!errorPopUp.classList.contains('hide')) {
        errorPopUp.classList.add('hide');
    }

    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const formData = {
        userName,
        password,
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
        .then((response) => {
            if (!response.ok) {
                errorPopUp.classList.remove('hide');
                errorText.innerHTML = "Invalid credentials. Please check your username and password.."
                errorPopUp.appendChild(errorText);
                console.log('Invalid credentials. Please check your username and password.');
            }
            return response.json();
        })
        .then((data) => {
            console.log('test' + data.message);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})
