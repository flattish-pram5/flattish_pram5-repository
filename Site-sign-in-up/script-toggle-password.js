const togglePassword = () => {
    const passwordInput = document.getElementById("password-input");
    const eyeIcon = document.getElementById("eye-icon");

    if (passwordInput.type === "text") {
        passwordInput.type = "password";
        eyeIcon.src = "eye-open.png";
    } else {
        passwordInput.type = "text";
        eyeIcon.src = "eye-closed.png";
    }
};
