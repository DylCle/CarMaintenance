const sendBtn = document.getElementById('send-btn');

function disableLink() {
    emailLink.removeAttribute('href');
    emailLink.style.pointerEvents = 'none';
}

sendBtn.addEventListener('click', function () {
    const timer = 10000; 
   
    const email = document.getElementById('email').value;
    const data = { userName: 'your_user_name', email: email };  

    fetch('/send-reset-pwd-email', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json()) 
    .then((data) => {
        const { userName } = data;
        console.log(userName);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

