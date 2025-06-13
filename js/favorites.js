
const contenedor = document.querySelector(".favorites-container"); // Selecciona con .querySelector la clase del contener de favorites

// Obtiene la información del usuario logueado desde el localStorage
const usuarioLogueado = JSON.parse(localStorage.getItem("logueado")); // localStorage.getItem("logueado") devuelve un string (texto)
// .parse lo convierte en un array de objetos
// Si no hay usuario logueado, el resultado será null

const claveFavoritos = `favoritos_${usuarioLogueado?.email}`; 
// Creamos una clave personalizada para cada usuario con el email y la capturamos en la constante claveFavoritos


// Esta función que obtiene la lista de productos favoritos del usuario desde el localStorage
function obtenerFavoritos() {
    return JSON.parse(localStorage.getItem(claveFavoritos)) || [];
} 
// Usa la clave personalizada de arriba (claveFavoritos) para obtener el array de favoritos guardado en el localStorage
// Y, si no hay favoritos guardados aún, devuelve un array vacío con || []

// Esta función guarda una lista de productos en localStorage con setItem
function guardarFavoritos(favoritos) {
    localStorage.setItem(claveFavoritos, JSON.stringify(favoritos));
} // Convierte el array de objetos favoritos en un string usando JSON.stringify

// Esta función verifica si un producto ya está en la lista de favoritos.
// .some, lo usamos para comprobar si algún producto del array tiene el mismo id
// Devuelve true si el producto ya está en favoritos, false si no
function esFavorito(idProducto) {
    return obtenerFavoritos().some(p => p.id === idProducto);
}
//p, cada producto del catalogo
//p.id id de cada producto del catalogo
//idProducto, id de un producto del catalogo

// Esta función agrega o elimina un producto a favoritos
function agregarOEliminarFavoritos(producto) {
    let favoritos = obtenerFavoritos(); // Con obtenerFavoritos(), obtenemos la lista actual de favoritos
    const yaAgregado = favoritos.some(p => p.id === producto.id); // Con .some(), verificamos si el producto ya existe

    if (yaAgregado) {
        // Con .filter, eliminamos el producto del array
        favoritos = favoritos.filter(p => p.id !== producto.id);
    } else {
        favoritos.push(producto); // Agrega el producto al final del array con .push
    }

    // Guarda la nueva lista y la actualizamos
    guardarFavoritos(favoritos);
    mostrarFavoritos();
}

// Esta función se encarga de mostrar los favoritos en pantalla
function mostrarFavoritos() {
    if (!contenedor) return; // Si no existe el contenedor, no sigue ejecutando el codigo

    const email = usuarioLogueado?.email; 
    // Verificamos si hay un usuario logueado usando ?, es como preguntar: este email está logueado?

    if (!email) { // Si no hay un usuario logueado, muestra un mensaje que debe iniciar sesión.
        contenedor.innerHTML = `
            <div class="no-favorites-message">
                <p>You must be logged in to see your favorites.</p>
                <a href="../pages/login.html" class="browse-button">Login</a>
            </div>`;
        return;
    }

    // Obtenemos el nombre del usuario (si existe), si no, muestra "User" por defecto
    const nombreUsuario = usuarioLogueado?.nombreCompleto || "User";
    // Obtenemos la lista de favoritos del usuario y los invierte con reverse, 
    // para que el primer producto que se muestre sea el ultimo que se agregó
    const favoritos = obtenerFavoritos().reverse(); 

    contenedor.innerHTML = ""; // Limpiamos el contenedor antes de agregar los productos favoritos para evitar duplicados

    if (favoritos.length === 0) { // Si no hay favoritos, mostramos un mensaje indicando que no hay productos aún
        contenedor.innerHTML = `
            <div class="no-favorites-message" id="no-favorites">
                <i class="far fa-heart"></i>
                <p>You have no products yet</p>
                <a href="../pages/home.html" class="browse-button">Browse catalog</a>
            </div>
        `;
        return;
    }

    favoritos.forEach(producto => { // Con .forEach(), recorremos el array de productos favoritos
        // Crea un nuevo div para representar el producto
        const div = document.createElement("div"); // Por cada producto, crea un div con su información y lo agrega al DOM
        div.classList.add("product"); // Le agrega una clase CSS llamada "product"

        div.innerHTML = `
            <a href="../pages/detail.html?id=${producto.id}">
            <img src="${producto.image}" alt="${producto.name}">
            </a>
            <div class="product-title-container">
                <h3>${producto.name}</h3>
                <button class="favorite-btn" data-id="${producto.id}">
                    <i class="${esFavorito(producto.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                </button>
            </div>
            <p>$${producto.price}</p>
            
        `;
        // Definimos el contenido HTML del producto por medio de .innerHTML
        // Mostramos la imagen, el nombre, el precio y un botón con ícono de corazón
        // Si el producto está en favoritos, el corazón está relleno, si no, está vacío

        contenedor.appendChild(div); // Agregamos el div del producto al contenedor en el DOM
    });

    agregarListenersFavoritos(); // Después de mostrar todos los productos, activamos los botones de favoritos
}

// Esta función busca todos los botones de "favorito" (corazones) en la página
function agregarListenersFavoritos() {
    const botones = document.querySelectorAll(".favorite-btn"); // Usamos querySelectorAll para seleccionarlos la clase

    botones.forEach(boton => { //Con forEach recorremos todos los botones del HTML
        boton.addEventListener("click", () => { // Ponemos el addEventListener para que cuando le undan al icono, se elimine o se agregue
            // Obtenemos el ID del producto desde el atributo data-id del botón
            const id = parseInt(boton.getAttribute("data-id")); 
            // parseInt nos ayuda a convertir el string que se obtiene del atributo data-id a numero

            const favoritos = obtenerFavoritos();
            // Obtenemos la lista (array de objetos) actual de productos favoritos del usuario desde localStorage

            const producto = favoritos.find(p => p.id === id);
            // Buscamos dentro de ese array de favoritos un producto que tenga el mismo ID que el que se acaba de hacer clic
            // Con .find(), nos devuelve el primer elemento que cumpla la condición, si no encuentra da undefined
            // Comparamos el ID de cada producto (p.id) con el ID del botón que fue presionado id

            if (producto) { // Si el producto se encuentra, se llama a la función que lo agrega o lo elimina por medio de un if
                agregarOEliminarFavoritos(producto);
            }
        });
    });
}

// Este evento que se ejecuta cuando todo el HTML ha sido cargado totalmente
// Llamamos a la función mostrarFavoritos() para mostrar los favoritos al momento de que se carga la página
document.addEventListener("DOMContentLoaded", mostrarFavoritos);
