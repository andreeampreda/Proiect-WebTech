const signupUrl = '../sign-up/signup.html';
const homePageUrl = '../home-page/home.html';

document.getElementById('signup-btn').addEventListener('click', () => {
    window.location.href = signupUrl;
});

const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const userData = {
        username: username.value,
        password: password.value
    };

    try {
        const port = 8080;
        const response = await fetch(`http://localhost:${port}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const message = await response.text();
            alert('Login successful!'); 
            console.log('MOM WE MADE IT');
            window.location.href = homePageUrl;
        } else {
            alert('Login failed!');
        }
    } catch (error) {
        alert('Login failed!');
    }
});
