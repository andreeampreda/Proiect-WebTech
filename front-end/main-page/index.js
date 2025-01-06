const loginUrl = '../login-page/login.html';
const signupUrl = '../sign-up/signup.html';

document.getElementById('login-btn').addEventListener('click', () => {
    window.location.href = loginUrl;
});

document.getElementById('signup-btn').addEventListener('click', () => {
    window.location.href = signupUrl;
});
