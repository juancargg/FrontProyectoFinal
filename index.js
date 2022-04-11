async function getCategorias() {
    try {
        const response = await fetch(`http://localhost:1337/api/categorias`);
        if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
        } const serie = await response.json();
        printData(serie.data);
    } catch (error) {
        console.log(error)
    }
}

function printData(dataJSON) {
    const lista = document.getElementById("lista")
    for (const categorias of dataJSON) {
        const a = document.createElement("a")
        const p = document.createElement("p")
        const img = document.createElement("img")
        const div = document.createElement("div")

        a.href = `seccion.html?id=${categorias.id}`

        // a.classList.add("column")
        // img.classList.add("img-crypto")

        p.textContent = categorias.symbol
        img.src = categorias.img
        price.textContent = `${} `

        a.appendChild(p)
        a.appendChild(img)
        div.appendChild(a)
        lista.appendChild(div)
    }
}


getCategorias()