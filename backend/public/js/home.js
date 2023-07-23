let storedUsername = localStorage.getItem('username');
const welcome = document.getElementById('welcome');

function onLoad (){
    if (storedUsername) {
        welcome.textContent = `WELCOME, ${storedUsername.charAt(0).toUpperCase() + storedUsername.slice(1)}`
        console.log('Username from login:', storedUsername);
    } else if (storedUsername === null) {
        window.location.href = '../'
        console.log('Username from login: else', storedUsername);
    }
}

onLoad();
