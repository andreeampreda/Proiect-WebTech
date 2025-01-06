const loginUrl = '../login-page/login.html';

document.getElementById('login-btn').addEventListener('click', () => {
    window.location.href = loginUrl;
});

const form=document.getElementById('form');
const firstName=document.getElementById('firstName');
const lastName=document.getElementById('lastName');
const username=document.getElementById('username');
const password=document.getElementById('password');
const rePassword=document.getElementById('re-password');

form.addEventListener('submit', async(ev) => {
    ev.preventDefault();

    if(password.value!==rePassword.value)
        alert('Passwords do not match!');

    if(password.value.length<8)
        alert('Password must be at least 8 characters long!');

    const userData={
        firstName:firstName.value,
        lastName:lastName.value, 
        username:username.value, 
        password:password.value,
        role: 'author'
    };

    try {
        const port = 8080;
        const response = await fetch(`http://localhost:${port}/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if(response.ok){
            const message=await response.text();
            console.log("e bun");
        }else{
            alert('Sign up failed!');
            console.error('Error:', error);
        }
    }catch(error){
        alert('Sign up failed!');
    }

});
