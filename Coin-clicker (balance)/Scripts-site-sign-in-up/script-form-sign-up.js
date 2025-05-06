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
            if (data.email && data.id) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            if (!users.find(u => u.id === data.id)) {
                users.push({ email: data.email, id: data.id });
                localStorage.setItem('users', JSON.stringify(users));
            };
           
            };
        });

        this.reset();
    });
});