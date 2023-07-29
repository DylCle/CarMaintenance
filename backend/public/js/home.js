import {createContainer} from './createContainer.js'


function onLoad() {
    createContainer();


    console.log('onLoad function called');
    let storedUsername = localStorage.getItem('username');
    let storedId = localStorage.getItem('id');
    const welcome = document.getElementById('welcome');
    if (storedUsername) {
        welcome.textContent = `WELCOME, ${storedUsername}`
        console.log('Username from login:', storedUsername);
        console.log('Username from login: ID', storedId);

    } else if (storedUsername === null) {
        window.location.href = '../'
        console.log('Username from login: else', storedUsername);
    }

}

onLoad();
