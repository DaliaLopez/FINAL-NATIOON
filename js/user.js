
document.addEventListener('DOMContentLoaded', () => { // Esperamos a que el contenido del documento HTML esté completamente cargado
    
    // Obtenemos las referencias a los elementos del perfil donde se mostrará la información del usuario
    const nombre = document.getElementById('profile-nombre');
    const apellido = document.getElementById('profile-apellido');
    const email = document.getElementById('profile-email');
    const inputConfirmarPassword = document.getElementById('password'); // <input> donde el usuario confirma la nueva contraseña ingresada
    const confirmPasswordInput = document.getElementById('confirm-password'); // Confirma la contraseña nueva
    const botonActualizar = document.querySelector('.update-btn'); // Botón que el usuario presiona para guardar (actualizar) la nueva contraseña
    const enlaceCerrarSesion = document.querySelector('.signout a');

    // -- 2. OBTENEMOS EL USUARIO LOGUEADO --
    const usuarioLogueado = JSON.parse(localStorage.getItem('logueado'));

    //localStorage.getItem("logueado"), busca en el almacenamiento local el usuario que inicio sesion
    // JSON.parse,  convierte ese texto (string) en un objeto de JavaScript

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    // Recuperamos de localStorage todos los usuarios registrados 
    // JSON.parse,  convierte ese texto (string) en un objeto de JavaScript
    // Si no hay nada, usa un array vacío

    if (!usuarioLogueado) { // Si no hay usuario logueado, lo redirigimos a la página de login
        window.location.href = '../pages/login.html';
        return; // detiene la ejecución del resto del codigo
    }

    // -- 3. BUSCAMOS SI EXISTE UN USUARIO REGISTRADO CON EL EMAIL INGRESADO --
    const usuarioCompleto = usuarios.find(u => u.email === usuarioLogueado.email);
    // .find() busca dentro del array de usuarios un objeto cuyo campo "email" coincida con el ingresado
    // Si lo encuentra, lo guardamos en usuarioCompleto, ejemplo guardamos { name: "Juan", email: "juan@gmail.com", password: "1234" }

    if (!usuarioCompleto) { // Si no encontramos el usuario (por algún error), muestramos una alerta
        alert('User not found.');
        return; // detiene la ejecución del resto del codigo
    }

    // -- 4. MOSTRAR DATOS EN EL PERFIL --
    // Rellenamos el perfil con los datos del usuario

    nombre.textContent = usuarioCompleto.name;
    apellido.textContent = usuarioCompleto.lastname;
    email.textContent = usuarioCompleto.email;

    // -- 5. ACTUALIZAMOS LA CONTRASEÑA --

    botonActualizar.addEventListener('click', (e) => { // Agregamos un evento al botonActualizar para cambiar la contraseña
        e.preventDefault(); // Evitamos que el formulario se recargue

        const nuevaPassword = inputConfirmarPassword.value.trim();
        // .value: Obtenemos el texto que el usuario escribió en el input
        // .trim: Elimina cualquier espacio en blanco al principio
        const confirmPassword = confirmPasswordInput.value.trim();

        if (!nuevaPassword || !confirmPassword) { // Verificamos que ambos campos estén completos sino lanzamos una alerta
            alert('Please fill both password fields.');
            return; // detiene la ejecución del resto del codigo
        }

        if (nuevaPassword !== confirmPassword) { // Verificamos que ambas contraseñas coincidan, sino lanzamos una alerta
            alert('Passwords do not match.');
            return; // detiene la ejecución del resto del codigo
        }

        // -- ACTUALIZAMOS LA CONTRASEÑA DEL USUARIO --
        const indice = usuarios.findIndex(u => u.email === usuarioLogueado.email);
        // Buscamos al usuario actual en la lista y actualizamos su contraseña
        // usuarios: es un array que contiene todos los usuarios registrados, obtenido desde localStorage
        //findIndex(...): busca dentro del array usuarios el índice (la posición) del usuario cuyo email coincide con el del usuario logueado
        // usuarioLogueado.email: es el email del usuario que está actualmente logueado

        usuarios[indice].password = nuevaPassword;
        // usuarios[indice]: sabemos en qué posición está el usuario y accedemos a ella
        // cambiamos la propiedad .password a la nueva contraseña que el usuario ingreso nuevaPassword
        // Resultado:El array usuarios ya tiene la contraseña actualizada para ese usuario

        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        // Ahora que modificamos el array usuarios, debemos volver a guardar ese array actualizado en localStorage
        // JSON.stringify(usuarios): convierte el array a una cadena de texto, porque localStorage solo puede guardar strings
        // setItem('usuarios', ...): sobrescribe la información anterior con la nueva

        alert('Password updated successfully.'); // Muestra alerta de exito de la contraseña cambiada
        
        // Estas dos líneas vacían los inputs donde el usuario escribio la nueva contraseña y su confirmacion
        // Evita que los valores se queden visibles en pantalla
        inputConfirmarPassword.value = ''; 
        confirmPasswordInput.value = '';
    });

    // -- 6. CERRAMOS SESION SIN BORRAR FAVORITOS --
    enlaceCerrarSesion.addEventListener('click', (e) => { // Agregamos evento al enlace de "Sign Out"
        e.preventDefault(); // Evitamos que el formulario se envie automaticamente y se recargue la página

        // Eliminamos solo el usuario logueado (no borramos los favoritos ni otros datos)
        localStorage.removeItem('logueado');

        // Redirigimos a la página principal
        window.location.href = '../index.html';
    });
});
