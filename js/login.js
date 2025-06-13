//-- CAPTURAMOS CON UN SELECTOR EL FORMULARIO DE LOGIN --
const loginForm = document.querySelector('.signin-form')

// -- DEFINIMOS LA FUNCION QUE SE EJECUTA CUANDO EL USUARIO INTENTA INICIAR SESION--
function ingresarUsuario(e) {
    
    e.preventDefault() // Evita que se recargue la página

    // -- SE OBTIENE LOS VALORES QUE YA SE INGRESARON EN EL CAMPO EMAIL Y CONTRASEÑA -- 
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    // -- OBTENEMOS UNA LISTA DE USUARIOS REGISTRADOS DESDE EL LOCALSTORAGE --
    // Si no hay usuarios, se usa un array vacío como valor por defecto
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

    // localStorage.getItem('usuarios') devuelve un string en formato JSON con los usuarios guardados
    // JSON.parse convierte ese string en un array de objetos

    // -- BUSCAMOS SI EXISTE UN USUARIO REGISTRADO CON EL EMAIL INGRESADO --
    const existeUsuario = usuarios.find((usuario) => usuario.email === email)
    // .find() busca dentro del array de usuarios un objeto cuyo campo "email" coincida con el ingresado
    // Si lo encuentra, lo guarda en existeUsuario

    // -- SI NO SE ENCUENTRA AL USUARIO, LO REDIRIGE A LA PAGINA DE ERROR -- 
    if (!existeUsuario) {
        // Redirecciona a una página de error 
        window.location.href = '../pages/error.html'
        return  // return, detiene la ejecución del resto del código
    }

    // -- SI EL EMAIL EXISTE PERO LA CONTRASEÑA NO COINCIDE, MOSTRAMOS UNA ALERTA --
    if (existeUsuario.password !== password) {
        alert('The password is incorrect.') // La contraseña es incorrecta
        loginForm.reset() // se limpian todos los inputs del formulario como si el usuario no hubiera escrito nada
        return // return, detiene la ejecución del resto del código
    }

    //-- SI EL USUARIO Y LA CONTRASEÑA SON CORRECTOS GUARDAMOS LA INFORMACIÓN DEL USUARIO LOGUEADO --
    // Creamos un objeto llamado 'usuarioLogueado' que contiene los datos que queremos guardar del usuario que inicio sesion
    const usuarioLogueado = {
        // Guardamos el nombre completo concatenando el nombre y apellido del usuario
        nombreCompleto: existeUsuario.name + ' ' + existeUsuario.lastname,
        // Guardamos el email del usuario
        email: existeUsuario.email
    }


    // -- GUARDAMOS EL USUARIO LOGUEADO EN LOCALSTORAGE PARA PODER ACCEDER A SU INFORMACION EN OTRAS PAGINAS -- 
    localStorage.setItem('logueado', JSON.stringify(usuarioLogueado))
    // Usamos JSON.stringify para convertir el objeto a una cadena de texto antes de guardarlo
    // setItem: Es un método que guarda información en el navegador del usuario en forma de clave-valor
    // 'clave': es el nombre con el que quieres guardar el dato
    // 'valor': es el contenido que estás guardando (debe ser una cadena de texto)

    // -- REDIRIGIMOS AL USUARIO AL HOME -- 
    window.location.href = '../pages/home.html'
}

// Se agrega un 'event listener' al formulario para que, cuando se envíe, se ejecute la función ingresarUsuario
loginForm.addEventListener('submit', ingresarUsuario)