// -- CAPTURAMOS CON UN SELECTOR EL FORMULARIO DE REGISTRO --
const registroForm = document.querySelector('.signup-form');

// -- FUNCION QUE SE EJECUTA CUANDO EL FORMULARIO SE ENVIA --

function registrarUsuario (e) { 
    e.preventDefault(); // Evita que se recargue la página

    // -- OBTENEMOS LOS VALORES INGRESADOR POR EL USUARIO --
    const nameValor = document.getElementById('name').value; // Busca el input con id="name" y guarda su valor en la variable 'name'
    const lastnameValor = document.getElementById('lastname').value; 
    const emailValor = document.getElementById('email').value; 
    const passwordValor = document.getElementById('password').value;

    // -- VALIDAMOS QUE NINGUN CAMPO ESTE VACIO --
    if (!nameValor || !lastnameValor || !emailValor || !passwordValor) {
        alert('All fields are required.'); // Todos los campos son obligatorios
        return; // return, detiene la ejecución del resto del código.
    }

    // -- OBTENEMOS LOS USUARIOS ALMACENADOS EN LOCALSTORAGE Y LOS CONVERTIMOS A OBJETOS --
    // Si no hay usuarios, se usa un arreglo vacío
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // localStorage.getItem('usuarios') devuelve un string en formato JSON con los usuarios guardados
    // JSON.parse convierte ese string en un array de objetos

    // -- CONFIRMAMO SI EL EMAIL YA ESTA REGISTRADO --
    const existeUsuario = usuarios.find(user => user.email === emailValor);
    if (existeUsuario) {
        alert('This email is already registered.'); // Este correo ya está registrado
        registroForm.reset(); // se limpian todos los inputs del formulario como si el usuario no hubiera escrito nada
        return;
    }
    // .find() busca dentro del array de usuarios un objeto cuyo campo "email" coincida con el ingresado.
    // Si lo encuentra, lo guarda en 'existeUsuario'.

    // -- SI EL USUARIO NO EXISTE-- Creamos un nuevo objeto usuario con los datos ingresados
    const nuevoUsuario = {
        name: nameValor,
        lastname: lastnameValor,
        email: emailValor,
        password: passwordValor
    };

    // -- AGREGAMOS ESTE USUARIO AL ARRAY DE USUARIOS EXISTENTES --
    usuarios.push(nuevoUsuario); // push, agrega el nuevo usuario al final del array

    // -- GUARDAMOS EL ARRAY ACTUALIZADO EN LOCALSTORAGE -- 
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    // JSON.stringify convierte el array de objetos en texto para que pueda ser guardado en localStorage
    // setItem: Es un método que guarda información en el navegador del usuario en forma de clave-valor
    // 'clave': es el nombre con el que quieres guardar el dato
    // 'valor': es el contenido que estás guardando (debe ser una cadena de texto)

    // -- INFORMAMOS AL USUARIO QUE YA FUE CREADO Y LO REDIRIGIMOS AL LOGIN -- 
    alert('User created successfully, you will be redirected to log in...'); // Usuario creado con Exito, se redirige a login

    // -- REDIRIGIMOS AL USUARIO A LA PAGINA DE LOGIN -- 
    window.location.href = '../pages/login.html'; // Redirige a la página de login
}; 

// Escuchar el evento 'submit' del formulario y ejecutar la función registrarUsuario
registroForm.addEventListener('submit', registrarUsuario)