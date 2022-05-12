const urlParams = new
    URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function getProductos() {
    try {
        // http://localhost:5432/api/productos?filters[categoria]=7&populate=*
        // `https://listacris.herokuapp.com/api/productos?filters[$and][0][categoria]=` + id
        const response = await fetch(`https://listacris.herokuapp.com/api/productos?filters[categoria]=${id}&populate=*`);
        if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
        } const serie = await response.json();

        printData(serie.data);
    } catch (error) {
        console.log(error)
    }
}

let productoSeleccionado;
function printData(dataJSON) {
    '<div class="encabezado"></div>'
    const lista = document.getElementById("lista")
    for (const productos of dataJSON) {
        const a = document.createElement("a")
        const p = document.createElement("p")
        const img = document.createElement("img")
        const div = document.createElement("div")
        div.onclick = function () {
            productoSeleccionado = productos;
            populateModalProduct(event)
        };
        div.setAttribute("data-target", "#openModalProduct")
        div.setAttribute("data-toggle", "modal")
        div.setAttribute("data-id", productos.id)

        a.href = `seccion.html?id=${id}`
        // a.classList.add("column")
        img.classList.add("img-categorias")
        p.textContent = productos.nombre
        
        if (productos.attributes.img_producto == "") {
            img.src= "./imgPredet.JPG"
        }else {
            img.src = productos.attributes.img_producto
        }
        console.log(productos)
        img.alt = productos.attributes.nombre
        // price.textContent = `${}`
        a.appendChild(p)
        a.appendChild(img)
        div.appendChild(a)
        lista.appendChild(div)
    }

}

function populateModalProduct(event) {
    event.preventDefault();

    console.log(productoSeleccionado)
    document.getElementById("titleProduct").innerHTML = productoSeleccionado.attributes.nombre;
    document.getElementById("img-product").src = productoSeleccionado.attributes.img_producto;
    const datosProductos = document.getElementById("datosProducto")
    datosProductos.innerHTML = ""
    // document.getElementById("precio").innerHTML = productoSeleccionado.attributes.precio;
    // document.getElementById("tienda").innerHTML = productoSeleccionado.attributes.tienda;
    for (const precioSuper of productoSeleccionado.attributes.precios.data) {

        const tienda = document.createElement("p")
        console.log(precioSuper)

        tienda.innerHTML = "<b>" + precioSuper.attributes.super + "</b>  - Precio: " + precioSuper.attributes.precio + " €"


        datosProductos.appendChild(tienda)
    }
};



getProductos()








