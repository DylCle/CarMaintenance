const loginButton = document.getElementById('login-button');


loginButton.addEventListener('click', () => {

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

                console.log('Invalid credentials. Please check your username and password.');
            }
            return response.json();
        })
        .then((data) => {
            console.log('test' + data.message);
            localStorage.setItem('username', userName);
            window.location.href = '../home.html';
      
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})
