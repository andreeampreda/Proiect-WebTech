// document.querySelector("form").addEventListener("submit", async (event) => {
//     event.preventDefault(); // Previne trimiterea clasică a formularului

//     const username = document.querySelector('input[placeholder="Username"]').value;
//     const password = document.querySelector('input[placeholder="Password"]').value;

//     const response = await fetch("http://localhost:5500/users/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//     });

//     if (response.ok) {
//         const message = await response.text();
//         alert(message); // Afișează SUCCES sau INCORRECT PASSWORD
//     } else {
//         alert("Login failed!");
//     }
// });
