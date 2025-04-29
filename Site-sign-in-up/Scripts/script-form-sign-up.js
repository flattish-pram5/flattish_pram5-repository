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

        fetch('http://localhost:3000/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
        });

        this.reset();
    });
});