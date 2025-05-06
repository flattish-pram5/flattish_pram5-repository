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
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);

            let users = JSON.parse(localStorage.getItem('users')) || [];
            if (!users.find(u => u.email === data.email)) {
                users.push({ email: data.email, id: data.id });
                localStorage.setItem('users', JSON.stringify(users));
            }

            const user = users.find(u => u.email === data.email);
            console.log(user);

            if (user) {
                console.log(user);
                fetch('http://localhost:3000/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: user.id, email: user.email })
                })
                .then(res => res.json())
                .then(resp => {
                    console.log(resp);
                    window.location.href = 'Coin-clicker.html';
                })
            }
        })
        this.reset();
    });
});