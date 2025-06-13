// -- 1. CATALOGO --

// Estas funciones se encargan de mostrar los productos sin importar si son favoritos o no

// -- CREAMOS EL CONSTRUCTOR DE PRODUCTOS --
// Esta es una función que sirve de molde para crear objetos

function Producto(id, name, price, image, category, description) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.image = image;
  this.category = category;
  this.description = description;
}

// -- CREAMOS UNA TARJETA HTML DE PRODUCTO --
// Creamos una funcion que genera dinámicamente el código HTML que representa un producto INDIVIDUAL en la página

function crearTarjetaProducto(producto) { //  Esta función recibe un objeto llamado 'producto' que contiene la información del constructor
  const tarjeta = document.createElement("div"); // Se crea un <div> que representará la casilla del producto

  tarjeta.className = "product"; // Se le asigna una clase del CSS al <div> para que tenga estilo

  // Se le agrega contenido HTML al <div>
  tarjeta.innerHTML = ` 
    <a href="../pages/detail.html?id=${producto.id}"> 
      <img src="${producto.image}" alt="${producto.name}">
      <div class="product-title-container">
        <h3>${producto.name}</h3>
        <button class="favorite-btn" data-id="${producto.id}">
          <i class="${esFavorito(producto.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
      </div>
      <p class="price">$${producto.price}</p>
    </a>
  `;

  // <a href="../pages/detail.html?id=${producto.id}">  enlace que lleva a la página de detalle del producto, pasando el id como parámetro en la URL
  // IMG SRC = Imagen del producto con su URL
  // DIV CLASS = Contenedor para el nombre del producto y el botón de favorito, lo obtenemos del CSS
  // DATA-ID, sirve para identificar si el producto esta agregado a favorito o no....
  // BUTTON CLASS = Botón para marcar como favorito
  // Operador ternario (condición ? valorSiTrue : valorSiFalse), Si el producto es favorito (esFavorito devuelve true), mostramos el ícono sólido
  // CLASS= PRICE, busca el estilo css de precio y coloca el valor del precio
  
  const boton = tarjeta.querySelector(".favorite-btn"); // Seleccionamos el botón de favorito que acabamos de crear dentro de la tarjeta
  boton.addEventListener("click", (e) => { 
    e.preventDefault(); // Evitamos que el usuario no sea llevado a la página de detalle al marcar como favorito
    agregarOEliminarFavoritos(producto); // Llamamos a la función agregarOEliminarFavoritos que agrega o quita el producto de la lista de favoritos
  });

  return tarjeta; // Devolvemos el elemento HTML (la tarjeta completa) para que pueda ser agregada al DOM
}

// -- MOSTRAMOS EL CATALOGO COMPLETO O FILTRADO --
// Su propósito es mostrar en la página web una lista de productos, uno por uno, usando la función MOSTRARCATALOGO

function mostrarCatalogo(productos) { // Recibe un array de objetos 'productos'

  const contenedor = document.querySelector(".products"); // Seleccionamos el contenedor HTML donde se van a mostrar los productos
  contenedor.innerHTML = ""; // En caso de que tengamos una busqueda por el filtro evita que se duplique los productos

  productos.forEach(item => { // forEach, Recorre cada objeto 'item' dentro del array 'productos' // item, trae los datos desde el arreglo
    const producto = new Producto( // usa esos datos para crear un nuevo objeto con la forma del constructor que funciona como molde
      item.id, item.name, item.price, item.image, item.category, item.description
    );
    const tarjeta = crearTarjetaProducto(producto); // Cogemos todos los datos de ese producto y llamamos a la función que genera el HTML (tarjeta)
    contenedor.appendChild(tarjeta);  // Agregamos esa tarjeta al contenedor en el DOM (página web)
  });

  actualizarCorazones(); // Esto es útil si ya hay productos guardados como favoritos y queremos que el corazón se vea lleno
}

// -- CARGAMOS PRODUCTOS DE LA API --
// Esta función se encarga de ir a buscar los productos a internet y traerlos

function obtenerProductos(callback) { // callback, muestra los productos en pantalla
  fetch("https://my-json-server.typicode.com/DaliaLopez/api-nation/products") // Fetch, busca los productos en la API
    .then(res => res.json()) // res, me trae la informacion de los productos tal cual me da la API y cuando se consigue los productos, los convierte en un formato json
    // res es una abreviación de respuesta (en inglés: response).
    .then(callback) // Llamamos a la función (callback), y le entrega la lista de productos.
    .catch(error => console.error("Error cargando productos:", error)); // Si algo sale mal ej, no hay internet, muestra un mensaje de error en la consola
    // catch, me atrapa el error
}


// -- 2. FAVORITOS--

// -- OBTENEMOS EL USUARIO LOGUEADO Y LA CLAVE PERSONALIZADA PARA FAVORITOS --
const usuarioLogueado = JSON.parse(localStorage.getItem("logueado"));
//localStorage.getItem("logueado"), busca en el almacenamiento local el usuario que inicio sesion
// JSON.parse,  convierte ese texto (string) en un objeto de JavaScript

const claveFavoritos = `favoritos_${usuarioLogueado?.email}`;
// Creamos una clave como "favoritos_maria@gmail.com" (personalizada por el correo)
// Así, cada usuario tiene su propia lista de favoritos diferenciada por su email
// ?. Devuelve undefined sin romper el código, evita errores si usuarioLogueado es null o undefined


// -- OBTENEMOS LOS FAVORITOS DEL LOCALSTORAGE--
function obtenerFavoritos() {
  return JSON.parse(localStorage.getItem(claveFavoritos)) || [];
} 
// Buscamos en el localStorage los favoritos del usuario actual
// JSON.parse convertimos los favoritos en un array de objetos
// Si no hay nada guardado, devuelve [] un arreglo vacío

// -- GUARDAMOS LOS FAVORITOS EN EL LOCALSTORAGE --
function guardarFavoritos(favoritos) {
  localStorage.setItem(claveFavoritos, JSON.stringify(favoritos));
} 

// Guardamos los favoritos del usuario en el localStorage con la clave personalizada de favoritos
// JSON.stringify, convertimos el arreglo de productos a texto 

// -- VERIFICAMO SI EL PRODUCTO ES FAVORITO -- 
function esFavorito(idProducto) {
  return obtenerFavoritos().some(p => p.id === idProducto);
}
// p: es un producto dentro del array favoritos
// p.id: es el id de ese producto favorito
// idProducto: es el ID del producto actual

// Verificamos si el producto con ese id ya está en la lista de favoritos 
// .some(...) devuelve true si al menos uno coincide, sino devuelve false y lo utilizamos para saber si existe el producto 

// -- AGREGAR O QUITAR FAVORITO --

function agregarOEliminarFavoritos(producto) {
  let favoritos = obtenerFavoritos(); // Obtenemos la lista actual de los favoritos
  const yaAgregado = favoritos.some(p => p.id === producto.id); // Verificamos si ya esta en favoritos

  if (yaAgregado) { 
    favoritos = favoritos.filter(p => p.id !== producto.id); // Si el producto ya está en favoritos, lo quita
  } else {
    favoritos.push(producto); // Si el producto no esta: lo agrega
  }

  guardarFavoritos(favoritos); // Actualizamos la lista
  mostrarFavoritos(); // Volvemos a mostrar los favoritos actualizados
  actualizarCorazones(); // Cambia el ícono del corazón en el DOM
}

// -- MOSTRAR LOS FAVORITOS EN LA SECCION DE FAVORITOS --

function mostrarFavoritos() {
  const contenedor = document.querySelector(".products-favorites"); // Seleccionamos el contenedor HTML donde se van a mostrar los productos favoritos
  contenedor.innerHTML = ""; // Limpiamos ese contenedor, por si ya tenía productos antes (evitamos duplicados)

  const favoritos = obtenerFavoritos().reverse();
  // Obtenemos el array de productos favoritos desde localStorage con la clave personalizada
  // .reverse() deja los mas recientes aparezcan primero

  favoritos.forEach(producto => { // Recorremos el array de favoritos y por cada producto
    const tarjeta = crearTarjetaProducto(producto); // Creamos su tarjeta HTML usando la función que genera el diseño visual del producto
    contenedor.appendChild(tarjeta); // Agregamos esa tarjeta al contenedor en el DOM (aparece en la página)
  });
}


// -- CAMBIAMOS LOS ICONOS DEL CORAZON SI ES FAVORITO --

function actualizarCorazones() { // Seleccionamos TODOS los botones que tienen la clase .favorite-btn (los corazones)
  document.querySelectorAll(".favorite-btn").forEach(boton => { // Recorremos cada botón con la clase .favorite-btn
    const id = parseInt(boton.getAttribute("data-id")); 
    // getAttribute, obtenemos el id del producto pero esto llega como un string
    // parseInt, conviertimos "4" el string en 4 un numero

    const icono = boton.querySelector("i"); // Dentro del botón, selecciona el ícono <i> que es el corazón visual
    icono.className = esFavorito(id) ? "fa-solid fa-heart" : "fa-regular fa-heart"; 
    // Cambia la clase del ícono dependiendo si ese producto es favorito o no
  });
}

// -- 3. FILTRADO POR CATEGORIA --
// Esta función se encarga de mostrar solo los productos que pertenecen a una categoría específica

function filtrarPorCategoria(texto, productos) {
  const filtro = texto.toLowerCase(); // toLowerCase: Convertimos el texto ingresado por el usuario a minusculas
  const categoriasValidas = ["t-shirt", "jean", "jacket", "headwear"]; // Lista de categorias validas que queremos permitir en la busqueda

  if (categoriasValidas.includes(filtro)) { // .includes: revisa si el texto que se ingreso en filtro esta dentro de las categorias validas 
  
    const filtrados = productos.filter(p => p.category.toLowerCase() === filtro);
    // Revisamos todos los productos, si la categoría de un producto es igual a lo que escribió el usuario
    // se agrega a la nueva lista filtrados
    // .filter: sirve para crear una lista que cumple con la condicion
    // p.category: es la categoria de cada producto

    mostrarCatalogo(filtrados); // Mostramos en pantalla los productos que cumplen con ese filtro

  } else if (texto === "") { // Si el usuario no escribió nada, mostramos todos los productos sin filtro
    mostrarCatalogo(productos);
  }
}

// -- 4. CUANDO CARGA LA PAGINA -- 

document.addEventListener("DOMContentLoaded", () => { 
  // Es un evento que espera a que TODO el HTML esté completamente cargado antes de ejecutar el código dentro
 
  if (!usuarioLogueado) { // Verificamos si el usuario esta logueado, si no lo esta, lo redirigimos a la página de login
    window.location.href = "../pages/login.html";
    return; // detiene la ejecución del resto del codigo
  }

  let todosLosProductos = []; // Creamos una variable vacía para guardar todos los productos que vamos a obtener de la API

  obtenerProductos((productos) => { // Es una funcion que hace un fetch() para traer los productos desde una API
    // productos: es el array con todos los productos
    todosLosProductos = productos; // Guardamos los productos en todosLosProductos para usarlos mas adelante
    mostrarCatalogo(productos); // Mostramos los productos en pantalla
    mostrarFavoritos(); // Marcamos con corazón los productos que son favoritos
  });

  const input = document.getElementById("buscador"); // Obtenemos el campo de búsqueda donde el usuario puede escribir para filtrar productos
  // input, es un elemento de HTML que permite al usuario ingresar datos en una página web

  input.addEventListener("input", () => { // Cada vez que el usuario escribe en el buscador, se ejecuta esta función
    const texto = input.value.trim(); //input.value, obtenemos lo que el usuario escribió dentro del campo <input>
    // .trim, quita los espacios en blanco al principio y al final del texto
    filtrarPorCategoria(texto, todosLosProductos); // Llamamos a la función que filtra los productos según el texto ingresado
  });

  const profileLink = document.getElementById("profile-link"); 
  //Buscamos en el documento HTML el elemento que tiene el atributo id="profile-link"
  // (el enlace del ícono de "Profile" en la barra superior) y lo guardamos en una variable llamada profileLink

  if (profileLink) { // Verificamos si profileLink realmente existe en el DOM
    profileLink.addEventListener("click", function (e) { // Agregamos un escuchador de eventos con el click
      e.preventDefault(); // Evita que siga el enlace si no hay usuario

      if (usuarioLogueado) { // Verificamos si hay un usuario actualmente logueado
        window.location.href = "../pages/user.html"; // Redirigimos al usuario a la página de perfil
      } else { // Si no hay un usuario logueado 
        alert("You must be logged in to access your profile."); // Lanzamos una aleta y lo redirigimos al login
        window.location.href = "../pages/login.html";
      }
    });
  }
  
});
