const btnLogin = document.getElementById("btnLogin");
const form = document.getElementById("form");

function checkUserValid() {
    sendData(form);
};

btnLogin.addEventListener('click', checkUserValid);



async function sendData(form) {
    try {
        const formData = new FormData(form)
        const queryString = new URLSearchParams(formData).toString()
        const response = await fetch('https://listacris.herokuapp.com/api/auth/local', {
            method: "POST",
            body: queryString,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
        }
        const data = await response.json();

        doLogin(data)
    } catch (error) {
        alert("Credenciales incorrectas, inténtelo de nuevo." );
    }
}

function doLogin(data) {
    localStorage.setItem("token", data.jwt)
    window.location.href = "index.html"
}