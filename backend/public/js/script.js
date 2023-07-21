let signUp = document.getElementById('sign-up');
let login = document.getElementById('login');
let loginBox = document.getElementById('login-box');
let signUpBox = document.getElementById('signup-box');
let exitButton = document.getElementById('exit');


function showLoginBox(){
    signUp.classList.add('hide');
    login.classList.add('hide');
    loginBox.classList.remove('hide');
}

function showSignUp(){
    signUp.classList.add('hide');
    login.classList.add('hide');
    signUpBox.classList.remove('hide');
}

signUp.addEventListener('click', function () {
    showSignUp();
})

login.addEventListener('click', function () {
    showLoginBox();
})

exitButton.addEventListener('click', function() {
    signUp.classList.remove('hide');
    login.classList.remove('hide');
    loginBox.classList.add('hide');
})