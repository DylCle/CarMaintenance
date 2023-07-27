
const btn = document.getElementById('send-btn');
let currentUrl = window.location.href;

let storedUsername = localStorage.getItem('resetPwd');
console.log(storedUsername);
btn.addEventListener('click', () => {
    console.log(window.location.href);
    if(currentUrl !== window.location.href){
        alert('erro');
        return;
    }
    const newPwd = document.getElementById('password').value;
    const confirmPwd = document.getElementById('confirm-password').value;
    console.log(newPwd)
});
