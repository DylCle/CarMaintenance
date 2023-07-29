const loginButton = document.getElementById('login-button');
const errorPopUp = document.getElementById('error');
const errorText = document.createElement('p');

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
    if (userName === "" || userName === null) {
        errorPopUp.classList.remove('hide');
        errorText.innerHTML = "Username field is empty"
        errorPopUp.appendChild(errorText);
        return;
    }

    if (password === "" || password === null) {
        errorPopUp.classList.remove('hide');
        errorText.innerHTML = "Password field is empty"
        errorPopUp.appendChild(errorText);
        return;
    }

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
        .then((response) => {
            if (response.status === 401) {
                errorPopUp.classList.remove('hide');
                errorText.innerHTML = "Invalid credentials. Please check your username and password."
                errorPopUp.appendChild(errorText);
                return;
            }

            if (!response.ok) {
                console.log('An error occurred.');
                return;
            }

            return response.json();
        })
        .then((data) => {
            if (data) {
                const { message, userName, id } = data;
                let userID = id;
                localStorage.setItem('id', userID);
                console.log(userID)
                localStorage.setItem('username', userName);
                console.log('Stored in localStorage:', localStorage.getItem('username'));
                window.location.href = '../home.html';
            }

        })
        .catch((error) => {
            console.error('Error:', error);
        });
})
