document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.querySelector('input[type="email"]').value;
        const passwordInput = document.querySelector('#password-input');

        if (!passwordInput) {
            console.error('Password input not found');
            return;
        }

        const password = passwordInput.value;

        fetch('http://localhost:3000/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.email && data.id) {
                localStorage.setItem('currentUser', JSON.stringify({
                    id: data.id,
                    email: data.email
                }));
                console.log(data);
                window.location.href = 'Coin-clicker.html';
            } 
        });
        this.reset();
    });
});