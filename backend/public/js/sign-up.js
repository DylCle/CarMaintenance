const signupButton = document.getElementById('signup-button');
const errorPopUp = document.getElementById('error');
const errorText = document.createElement('p');
let loginBox = document.getElementById('login-box');
let signUpBox = document.getElementById('signup-box');
errorText.innerHTML = "";

signupButton.addEventListener('click', () => {
    if (!errorPopUp.classList.contains('hide')) {
        errorPopUp.classList.add('hide');
    }
    const userName = document.getElementById('user-name-signup').value;
    const first_Name = document.getElementById('firstName').value;
    const last_Name = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const confirm_Email = document.getElementById('confirm-email').value;
    const password = document.getElementById('password-signup').value;
    const confirm_Password = document.getElementById('confirm-password-signup').value;

    const formData = {
        userName,
        first_Name,
        last_Name,
        email,
        confirm_Email,
        password,
        confirm_Password,
    };

    const checkFieldExists = (field, value) => {
        return fetch('/check-field', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ field: field, value: value }),
        }).then((response) => response.json());
    };

    checkFieldExists('email', email)
        .then((data) => {
            if (data.exists) {
                errorPopUp.classList.remove('hide');
                errorText.innerHTML = "Email already in use. Please use a different email."
                errorPopUp.appendChild(errorText);
            } else {
                checkFieldExists('userName', userName)
                    .then((data) => {
                        if (data.exists) {
                            errorPopUp.classList.remove('hide');
                            errorText.innerHTML = "Username already in use. Please use a different Username."
                            errorPopUp.appendChild(errorText);
                        } else {
                            fetch('/signup', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(formData),
                            })
                                .then((response) => {
                                    if (!response.ok) {
                                        return response.json().then((data) => {
                                            throw new Error(data.message);
                                        })

                                    }
                                    return response.json();
                                })
                                .then((data) => {
                                    console.log(data.message);
                                    signUpBox.classList.add('hide');
                                    loginBox.classList.remove('hide');
                                })
                                .catch((error) => {
                           
                                        errorPopUp.classList.remove('hide');
                                        errorText.innerHTML = `${error.message}`
                                        errorPopUp.appendChild(errorText);
                                  
                                    console.error('Error:', error.message);
                                });
                        }
                    })
                    .catch((error) => {
                        console.error('Error: 2 ', error);
                    });
            }
        })
        .catch((error) => {
            console.error('Error: 3', error);
        });
});


