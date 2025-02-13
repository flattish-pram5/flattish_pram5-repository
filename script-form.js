document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.querySelector('input[type="email"]').value;
        const password = document.querySelector('#password-input').value;

        console.log('Email:', email);
        console.log('Password:', password);

        alert("Дякуємо! Ваші данні прийнято!");

        this.reset();
    });
});