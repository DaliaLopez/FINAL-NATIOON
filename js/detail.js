// 1 -- FUNCION PARA OBTENER EL ID DEL PRODUCTO DESDE LA URL -- 

function obtenerIdDesdeUrl() { // Obtenemos el ID del producto desde los parámetros de la URL
    const parametros = new URLSearchParams(window.location.search); 

    // window.location.search: devuelve todo lo que está después del ?, como: ?id=2
    // new URLSearchParams: crea un objeto que te permite acceder fácilmente a los parámetros
    return parametros.get("id");
    // parametros.get("id"): obtiene el valor del parámetro con clave "id"
    // Un parámetro es una clave y valor en una URL que se usa para pasar datos entre páginas
    // En este caso, se usa para saber qué producto mostrar en detail.html
}

// 2 -- FUNCION PARA OBTENER TODOS LOS PRODUCTOS DE LA API -- 
//  Obtenemos todos los productos desde la API, encuentra el que coincida con el ID y ejecuta un callback con ese producto

function obtenerProductoPorId(id, callback) { // callback, muestra los productos en pantalla
    fetch("https://my-json-server.typicode.com/DaliaLopez/api-nation/products") // Llama a la API remota para obtener los productos
        .then(response => response.json()) // res, me trae la informacion de los productos tal cual me da la API y cuando se consigue los productos, los convierte en un formato json
        // res es una abreviación de respuesta (en inglés: response).
        .then(productos => {
            const producto = productos.find(p => p.id == id);
            // Buscamos el producto cuyo ID coincida con el ID recibido por parámetro

            callback(producto); // Ejecuta la función callback pasándole el producto encontrado
        })
        .catch(error => {
            console.error("Error al obtener los productos:", error); // Si algo sale mal ej, no hay internet, muestra un mensaje de error en la consola
            // catch, me atrapa el error
        });
}

// 3 -- FUNCION PARA MOSTRAR LOS DETALLES DEL PRODUCTO EN EL HTML -- 
// Mostramos los datos del producto recibido en el HTML, dentro de la sección .product

function mostrarDetalleProducto(producto) {
    const seccionProducto = document.querySelector(".product"); // Selecciona el contenedor donde se mostrarán los detalles del producto

    if (!producto) { // Si no encontramos el producto, muestra un mensaje de error
        seccionProducto.innerHTML = "<p> Product not found</p>";
        return;
    }

    // Insertamos en el contenedor el HTML con la información del producto
    seccionProducto.innerHTML = `
        <div class="product-image">
            <img src="${producto.image}" alt="${producto.name}">
        </div>

        <div class="product-info">
            <button class="contact-btn1">
                <a href="../pages/home.html">RETURN TO CATALOG</a>
            </button>

            <h2>${producto.name}</h2>
            <p class="price">$${producto.price}</p>

            <div class="size-options">
                <button>S</button>
                <button>M</button>
                <button>L</button>
                <button>XL</button>
            </div>

            <a href="https://wa.me/+573122818845?text=Hello!%20I%20am%20interested%20in%20your%20products."
            class="contact-btn" target="_blank">CONTACT</a>

            <h3>ABOUT THE PRODUCT</h3>
            <p class="description">${producto.description}</p>
        </div>
    `;
} 
// button class="contact-btn1: es el boton para volver al catalogo
// <a href= Botón para contactar por WhatsApp
// <h3>ABOUT THE PRODUCT</h3>: Sección de descripción del producto 


// 4. -- CUANDO CARGUE LA PAGINA --

document.addEventListener("DOMContentLoaded", () => { 
    // DOMContentLoaded: es un evento que espera a que TODO el HTML esté completamente cargado antes de ejecutar el código dentro
    const id = obtenerIdDesdeUrl();
    // Obtiene el ID del producto desde la URL

    obtenerProductoPorId(id, mostrarDetalleProducto);
    // Llama a la función que obtiene el producto por ID y luego lo muestra en la página
}); 