let signUp = document.getElementById('sign-up');
let login = document.getElementById('login');
let loginBox = document.getElementById('login-box');
let signUpBox = document.getElementById('signup-box');
let exitButtons = document.querySelectorAll('.exit');
let hide = document.querySelector('.hide');

function showLoginBox() {
    signUp.classList.add('hide');
    login.classList.add('hide');
    loginBox.classList.remove('hide');
    history.pushState({ loginBoxVisible: true }, '');
    history.pushState({ signUpBoxVisible: false }, '');
}

function showSignUp() {
    signUp.classList.add('hide');
    login.classList.add('hide');
    signUpBox.classList.remove('hide');
    history.pushState({ signUpBoxVisible: true }, '');
    history.pushState({ loginBoxVisible: false }, '');
}

function exitBox(event) {
    const clickedBox = event.target.parentElement;
    clickedBox.classList.add('hide');
    signUp.classList.remove('hide');
    login.classList.remove('hide');

    history.back();
}


signUp.addEventListener('click', function () {
    showSignUp();
});

login.addEventListener('click', function () {
    showLoginBox();
});

Array.from(exitButtons).forEach(button => {
    button.addEventListener('click', exitBox);
})

window.addEventListener('popstate', function (event) {
    if (event.state) {
        if (event.state.signUpBoxVisible ) {
            signUpBox.classList.add('hide');
            signUp.classList.remove('hide');
            login.classList.remove('hide');
        }  if (event.state.loginBoxVisible) {
            loginBox.classList.add('hide');
            signUp.classList.remove('hide');
            login.classList.remove('hide');
        }
    } else {
        loginBox.classList.add('hide');
        signUpBox.classList.add('hide');
        signUp.classList.remove('hide');
        login.classList.remove('hide');
    }
});