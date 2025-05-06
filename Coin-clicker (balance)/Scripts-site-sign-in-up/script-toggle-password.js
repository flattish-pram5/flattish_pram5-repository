const togglePassword = () => {
    const passwordInput = document.getElementById("password-input");
    const eyeIcon = document.getElementById("eye-icon");

    if (passwordInput.type === "text") {
        passwordInput.type = "password";
        eyeIcon.src = "Images-site-sign-in-up/eye-open.png";
    } else {
        passwordInput.type = "text";
        eyeIcon.src = "Images-site-sign-in-up/eye-closed.png";
    }
};
