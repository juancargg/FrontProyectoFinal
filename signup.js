const form = document.getElementById('form')
const btn = document.getElementById('btn')

btn.addEventListener('click', (e) => {
    e.preventDefault()
    sendData(form)

})

async function sendData(form) {
    try {
        const formData = new FormData(form)
        const queryString = new URLSearchParams(formData).toString()
        const response = await fetch('http://localhost:5432/api/auth/local/register', {
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
        console.log(error)
    }
}
function doLogin(data) {
    localStorage.setItem("token", data.jwt)
    window.location.href = "index.html"
}

