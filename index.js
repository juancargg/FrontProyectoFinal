async function getCategorias() {
    try {
        const response = await fetch(`https://listacris.herokuapp.com/api/categorias`);
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
        img.classList.add("img-categorias")

        p.textContent = categorias.nombre
        img.src = categorias.attributes.imagen
        img.alt = categorias.attributes.nombre
        // price.textContent = `${}`

        a.appendChild(p)
        a.appendChild(img)
        div.appendChild(a)
        lista.appendChild(div)
    }
}


getCategorias()

async function addNewProduct() {
    try {
        let form = document.getElementById("newProductForm");
        const formData = new FormData(form)

        const formJSON = Object.fromEntries(formData.entries());
        const strapiRequest = { data: { ...formJSON } };
        const bodyRequest = JSON.stringify(strapiRequest, null, 2);


        const response = await fetch('https://listacris.herokuapp.com/api/productos', {
            method: "POST",
            body: bodyRequest,
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const message = `Error: ${response.status}`;
            alert(message);
            throw new Error(message);
        }

        const dataResponse = await response.json();

        resetProduct(dataResponse)

    } catch (error) {
        console.log(error)
    }
}

function resetProduct(response) {
    const nombre = response.data.attributes.nombre;
    alert(`El producto ${nombre} se ha añadido correctamente`);
    document.getElementById("newProductForm").reset();
}








// function openForm() {
//     document.getElementById("myForm")
//         .style.display = "block";
// }

// function closeForm() {
//     document.getElementById("myForm")
//         .style.display = "none";
// }

// openForm()
// document.getElementById("añadir").addEventListener("click", BtnAñadir);
// function BtnAñadir() {
//     window.open("#")
// }

