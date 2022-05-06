const urlParams = new
    URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function getProductos() {
    try {
        const response = await fetch(`https://listacris.herokuapp.com/api/productos?filters[$and][0][categoria]=` + id);
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
    '<div class="encabezado"></div>'
    const lista = document.getElementById("lista")
    for (const productos of dataJSON) {
        const a = document.createElement("a")
        const p = document.createElement("p")
        const img = document.createElement("img")
        const div = document.createElement("div")
        a.href = `seccion.html?id=${id}`
        // a.classList.add("column")
        img.classList.add("img-categorias")
        div.classList.add("lista")
        p.textContent = productos.nombre
        img.src = productos.attributes.img_producto
        console.log(productos)
        img.alt = productos.attributes.nombre
        // price.textContent = `${}`
        a.appendChild(p)
        a.appendChild(img)
        div.appendChild(a)
        lista.appendChild(div)
    }
}
getProductos()








