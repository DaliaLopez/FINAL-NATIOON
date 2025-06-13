console.log("Error: Usuario no encontrado");

setTimeout(() => { // setTimeout: ejecutamos un bloque de código después de un cierto tiempo (en milisegundos)
    window.location.href = '../SIGN IN/signin.html'; // Redirigimos al usuario a que vuelva a ingresar
}, 10000); // 10000 representa 10.000 milisegundos, es decir, 10 segundos