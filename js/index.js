
// -- ARREGLO DE LAS INTEGRANTES --

const equipo = [ // Cramos un arreglo de objetos, donde cada objeto representa a una integrante del equipo
    {
        nombre: "Ma. Alejandra Emperador", // posición 0, index = 0
        descripcion: "Es una diseñadora que se especializa en producción, optimizando tiempos de entrega, calidad del producto y distribución. Su enfoque asegura que cada prenda refleje estilo y autenticidad, cumpliendo con altos estándares.",
        imagen: "../FINAL-NATIOON/img/index/Alejandra.png",
        tipo: "DESIGNER"
    },
    {
        nombre: "Dalia López", // posición 1, index = 1
        descripcion: "Es una diseñadora enfocada en analizar tendencias del estilo urbano. Busca reflejar esa esencia en cada prenda con creatividad y autenticidad.",
        imagen: "../FINAL-NATIOON/img/index/Dalia.png",
        tipo: "DESIGNER"
    }
];

// -- CONTENEDOR PRINCIPAL DEL HTML --

// Buscamos en el DOM el id="team-container", aqui se va colocar la informacion de ambas integrantes
const teamContainer = document.getElementById("team-container"); 


// -- RECORREMOS CADA INTEGRANTE DEL EQUIPO -- 

// Aqui se recorre el arreglo de equipo por medio de forEach que nos permite ejecutar una función 
// para cada elemento del array, una sola vez y en orden

// INTEGRANTE, es un objeto que representa a una persona del equipo
// INDEX, representa la posición de ese integrante dentro del array
// function (integrante, index), es la función que se ejecuta para cada elemento

equipo.forEach(function (integrante, index) { 
    
    // -- CREAMOS UN CONTENEDOR PRINCIPAL --

    // Este contenedor tendrá la IMAGEN y el TEXTO del integrante. 

    const contenedorIntegrante = document.createElement("div");
    
    // Necesito que los contenedores estén organizados en zig-zag para el diseño visual
    // Alternamos las clases CSS dependiendo si el índice es par o impar

    if (index % 2 === 0) { 
        contenedorIntegrante.className = "about-containerdesigner1"; // Clase para posiciones pares (0, 2, 4...)
    } else {
        contenedorIntegrante.className = "about-containerdesigner2"; // Clase para posiciones impares (1, 3, 5...)
    }

    // -- CREAMOS EL CONTENEDOR DE LAS IMAGEN --

    // También alternamos las clases CSS para este contenedor según la posición
    // para que siga el efecto zig-zag visual de la página

    const contenedorDeImagen = document.createElement("div"); // Creamos un div para contener la imagen
    
    if (index % 2 === 0) {
    contenedorDeImagen.className = "about-imagedesigner1"; // Clase para posiciones pares (0, 2, 4...)
    } else {
    contenedorDeImagen.className = "about-imagedesigner2"; // Clase para posiciones pares (0, 2, 4...)
    }

    // -- UBICAMOS EL SRC DE LA IMAGEN --

    const imagen = document.createElement("img");

    imagen.src = integrante.imagen; // Asignamos la ruta a la imagen desde el objeto integrante
    imagen.alt = integrante.nombre; // Texto para identificar de que integrante es la imagen

    contenedorDeImagen.appendChild(imagen); // Insertamos la imagen dentro del contenedor de imagenes


    // -- CREAMOS EL CONTENEDOR DE LOS TEXTOS --

    const contenedorDeTexto = document.createElement("div"); // Creamos un div para contener el texto (nombre, descripción, tipo)
    if (index % 2 === 0) {
    contenedorDeTexto.className = "about-imagedesigner1"; // Clase para posiciones pares (0, 2, 4...)
    } else {
    contenedorDeTexto.className = "about-imagedesigner2"; // Clase para posiciones pares (0, 2, 4...)
    } 
   
    const nombre = document.createElement("h2"); //Creamos un título <h2> con el nombre de cada integrante
    nombre.textContent = integrante.nombre;

    const descripcion = document.createElement("p"); // Añadimos un párrafo <p> con la descripción de cada integrante
    descripcion.textContent = integrante.descripcion;

    const tipo = document.createElement("p"); // Mostramos el tipo de integrante en este caso DESIGNER
    tipo.className = "designer-text";
    tipo.innerHTML = `${integrante.tipo} <span class="stars2">&#x2738; &#x2738; &#x2738; &#x2738; &#x2738;</span>`;
    // Insertamos dentro del HTML las estrellas representadas con el código unicode &#x2738

    // -- AGREGAMOS NOMBRE, DESCRIPCION Y TIPO AL CONTENEDOR DE TEXTO --
    contenedorDeTexto.appendChild(nombre);
    contenedorDeTexto.appendChild(descripcion);
    contenedorDeTexto.appendChild(tipo);

    // -- METEMOS EN EL CONTENEDOR DE INTEGRANTE IMAGENES Y TEXTOS --
    contenedorIntegrante.appendChild(contenedorDeImagen);
    contenedorIntegrante.appendChild(contenedorDeTexto);

    // -- LO AGREGAMOS AL CONTENEDOR PRINCIPAL DEL HTML --
    teamContainer.appendChild(contenedorIntegrante);
});


// -- JS DEL CARRUSEL---

// --- DEFINIMOS LAS VARIABLES DEL CARRUSEL ---
let grupoActual = 0; // grupoActual: indica en que grupo de imagenes estamos (empieza en el primero)

const pistaCarrusel = document.querySelector(".carousel-track");
// pistaCarrusel: es la tira que se mueve horizontalmente para mostrar cada grupo, se selecciona del HTML

const gruposCarrusel = document.querySelectorAll(".carousel-group");
// gruposCarrusel: contiene todos los grupos de imagenes del carrusel, se selecciona del HTML

const totalDeGrupos = gruposCarrusel.length;
// totalDeGrupos: nos dice cuántos grupos hay en total

// -- FUNCION PARA MOVER EL CARRUSEL--

function moverCarrusel(direccion) {
    grupoActual = grupoActual + direccion;
    //grupoActual: Lo que hace es sumar o restar 1 (dependiendo del valor de direccion) a la variable grupoActual, 
    // que representa en qué grupo del carrusel estamos actualmente

    // direccion = 1  mueve el carrusel **hacia la izquierda** visualmente (avanza a la derecha del contenido)
    // direccion = -1 mueve el carrusel **hacia la derecha** visualmente (retrocede a la izquierda del contenido)

    if (grupoActual < 0) {
        grupoActual = totalDeGrupos - 1; 
        // Si intentamos retroceder más allá del primer grupo (grupoActual < 0), volvemos al último grupo
        // IZQUIERDA
    }
    if (grupoActual >= totalDeGrupos) {
        grupoActual = 0;
        // Si intentamos avanzar más allá del último grupo, volvemos al primero
        // DERECHA
    }

    actualizarCarrusel(); // Movemos visualmente el carrusel al grupo actual
}

// -- FUNCION PARA ACTUALIZAR LA VISTA--

function actualizarCarrusel() {
    const nuevaPosicion = -grupoActual * 100 + "%"; // Se usa el menos porque queremos mover el carrusel hacia la izquierda

    // nuevaPosicion = 0: se ve el primer grupo, no se mueve esta en 0%
    // nuevaPosicion = 1: se mueve el segundo grupo, se desplaza -100%
    // nuevaPosicion = 2: se muestra el tercero, se desplaza -200%


    pistaCarrusel.style.transform = `translateX(${nuevaPosicion})`; 
    // Movemos el track horizontalmente para mostrar el grupo correspondiente
    // style.transform: Aplica un desplazamiento horizontal al carrusel

    pistaCarrusel.style.transition = "transform 0.5s ease-in-out";
    // Agregamos una transición suave para el efecto de deslizamiento
    // style.transition: Hace que el desplazamiento se vea animado y suave.
}

// -- RESUMEN DEL CARRUSEL --

// moverCarrusel(direccion): 
// 1. Cambia el índice actual del carrusel
// 2. Controla que el carrusel sea circular
// 3. Llama a actualizarCarrusel():Una vez que grupoActual tiene el nuevo valor correcto, 
// se llama a actualizarCarrusel() para mover visualmente el carrusel a ese grupo.

// actualizarCarrusel() 
// 1. Calcula cuántos "pasos" hay que mover el carrusel
// 2. Mueve el carrusel con animación: