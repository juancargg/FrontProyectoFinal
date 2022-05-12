const form = document.getElementById('form')
const btn = document.getElementById('btn')

btn.addEventListener('click', (e) => {
    e.preventDefault()
    sendData(form)

})

async function sendData(form) {
    try {
        const formData = new FormData(form);
        // Crear función para comprobar si las contraseñas coinciden, en el caso de no ser iguales levantar un alert para que las revise y el codigo de abajo no se ejecute
        // if (pass1 !== pass2) {
        //     alert("las contaseñas no coinciden")
        //     return
        // }
        const queryString = new URLSearchParams(formData).toString()
        const response = await fetch('https://listacris.herokuapp.com/api/auth/local/register', {
            method: "POST",
            body: queryString,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (!response.ok) {
            const message = `Error: ${response.status}`;
            const responseText = await response.text();
            const responseJSON = JSON.parse(responseText);
            console.log(JSON.parse(responseText));
            alert("Algo no ha ido bien, resvise los siguientes errores: \n" + handleError(responseJSON));
            throw new Error(message);
        }
        const data = await response.json();

        alert("Te has registrado correctamente");

        doLogin(data)
    } catch (error) {
        console.log(error)
    }
}

function handleError(errorMessage) {
    let result = "";
    for (let i = 0; i < errorMessage.error.details.errors.length; i++) {
        result += `${errorMessage.error.details.errors[i].message} \n`;
    }

    return result;
}

function doLogin(data) {
    localStorage.setItem("token", data.jwt)
    window.location.href = "index.html"
}

