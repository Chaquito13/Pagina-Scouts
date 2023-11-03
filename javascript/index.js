/*PASSI PEREZ, Gian Franco; QUAGLIARDI, Martina*/

/*FUNCIONALIDAD DEL HEADER*/ 

var header = document.getElementById('header');

window.addEventListener('scroll' , () => {

    var scroll = window.scrollY

    if (scroll>10) 
    {
        header.style.backgroundColor = 'rgb(53, 92, 151)'
    }

    else 
    {
        header.style.backgroundColor = 'transparent'
    }
})

/* CARGAR AVATAR */

/* SETEAR UNA VARIABLE PARA EL AVATAR DEFAULT QUE NOS SERVIRA PARA CANCELAR LA SUBIDA DE LA FOTO Y VOLVER A VER ESTE AVATAR DEFAULT */
const defaultAvatar = './img/avatardefault.png'
/* OBTENER EL INPUT FILE, EN ESTE CASO SE IDENTIFICA POR EL ID FOTO */
const file = document.getElementById('foto');
/* OBTENER LA ETIQUETA IMG QUE TIENE POR DEFECTO UN AVATAR */
const img = document.getElementById('img-registro')
/* SE INICIA UN EVENTO "CAMBIO" */
file.addEventListener('change', e =>{

    if (e.target.files[0] /* SI EL EVENTO DA VERDADERO ES PORQUE TIENE POR LO MENOS UN ELEMENTO COMIENZA EL IF: */) {
            /* SE CREA UNA VARIABLE DE UN NUEVO FILEREADER QUE SIRVE PARA LEER ARCHIVOS DESDE EL LADO DEL USUARIO, VA A PROCESAR EL OBJETO FILES[0] */
            const reader = new FileReader()
            /* EL FILEREADER VA A RESPONDER CON UNA FUNCION ONLOAD */
            reader.onload = function (e) {
                /* EL EVENTO VA A CAMBIAR EL SRC DE LA IMAGEN Y LLEGA EN EL EVENTO RESULT */
                img.src = e.target.result;
            }
            /* EL READER VA A LEER EL ARCHIVO Y CONVERTIRLO A DATA URL */
            reader.readAsDataURL(e.target.files[0])
            }
        else{
            /* SI EL EVENTO DA FALSE SE DEVUELVE COMO SRC DE LA IMAGEN EL AVATAR DEFAULT */
            img.src = defaultAvatar;
        }
}  )

//VALIDACION DE FORMULARIO

// OBTENEMOS EL FORMULARIO
const formulario = document.getElementById('formulario')
// OBTENEMOS LOS INPUTS
const input = document.querySelectorAll('#formulario input')
//ESCRIBIMOS LAS EXPRESIONES REGULARES PARA VALIDACIÓN DE CIERTOS CAMPOS
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos 
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

//se crea el objeto para cambiar segun se completen los inputs el false a true, si no se completa se mantiene false
let campos ={
    nombre: false,
    apellido: false,
    email: false
}

// se definen los valores que queremos validar dentro del switch.
//${campo} toma todos los campos que tengamos por el nombre
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        if (campo == 'nombre') {
            campos.nombre = true;
        }
        if (campo == 'apellido') {
            campos.apellido = true;
        }
        if (campo == 'email') {
            campos.email = true;
        }

        // Si está bien
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        const icono = document.querySelector(`.grupo__${campo} i`);
        icono.classList.remove('fa-circle-xmark');
        document.getElementById('formulario__input-error-activo').classList.remove('formulario__input-error-activo');

    } else {
        // Si está mal
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        const icono = document.querySelector(`.grupo__${campo} i`);
        icono.className = 'fa-times-circle';
        document.getElementById('formulario__input-error').classList.add('formulario__input-error-activo');
    }
}

//EVENTO QUE REALIZA LA VALIDACIÓN
const validarForm = (e) => {
    //identiifca segun el nombre de los inputs
    switch(e.target.name){
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre')
            
        break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido')
        break;
        case "email":
            validarCampo(expresiones.correo, e.target, 'email')
            
        break;
        
    }
}

// Obtener el campo de entrada de fecha de nacimiento
const fechaNacInput = document.getElementById('fechanac');

// Agregar un evento para calcular la edad cuando cambia la fecha de nacimiento
fechaNacInput.addEventListener('change', calcularEdad);

var edadEnAnios = 0
function calcularEdad() {
    // Obtener la fecha de nacimiento
    const fechaNac = new Date(fechaNacInput.value);

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Calcular la diferencia en años
    const edadEnMilisegundos = fechaActual - fechaNac;
    edadEnAnios = new Date(edadEnMilisegundos).getUTCFullYear() - 1970;
}


//POR CADA INPUT SE VA A EJECUTAR UN CODIGO
input.forEach((input) => {
    //CADA VEZ QUE SE SUELTAN LAS TECLAS SE EJECTURA EL CÓDIGO (GRACIAS AL KEYUP) PARA VERIFICAR EN TIEMPO REAL LA VALIDACION
    input.addEventListener('keyup', validarForm);
    input.addEventListener('blur', validarForm);
});
selectLocalidad = document.getElementById('localidad');
var datos= new Array();
function cargarray(){
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var edad = edadEnAnios; 
    // Obtiene el índice de la opción seleccionada
    var indiceSeleccionado = selectLocalidad.selectedIndex;
    // Obtiene el texto de la opción seleccionada
    var textoSeleccionado = selectLocalidad.options[indiceSeleccionado].text;
    var localidad = textoSeleccionado;
    var foto = img.src;
    console.log(nombre);
    //var usuario ={nombre:nombre, apellido:apellido, email:email, edad:edad, /*foto:foto*/, localidad:localidad}
    datos.push(nombre, apellido, edad, localidad, foto);
    console.log(datos)

    //UTILIZAR JSON NOS PERMITE ALMACENAR INTERNAMENTE LOS DATOS DEL ARRAY PARA LUEGO "PASEARLO" Y ACCEDER A EL DESDE OTRA PAGINA
    localStorage.setItem('datos', JSON.stringify(datos));
}
var selectElement = 0;


formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const fechaNac = document.getElementById('fechanac').value;
    selectElement = document.getElementById('localidad');
    if (file.value !== "" && campos.nombre && campos.email && campos.apellido && fechaNac.value !== "" && selectElement.selectedIndex > 0) {
        //LLAMAR LA FUNCION PARA CARGAR EL ARRAY
        cargarray()
        //ABRIR PESTAÑA NUEVA
        window.location.replace("./resumen.html");
        document.getElementById('formulario__mensaje-activo').classList.remove('formulario__mensaje-activo');
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});

// OBTENER BOTON CANCELAR
const btnCancelar = document.getElementById('btnCancelar');

btnCancelar.addEventListener('click', () => {
    // OBTENER INPUTS
    const inputs = document.querySelectorAll('#formulario input');

    // REESTABLECER EL VALOR DE LOS INPUTS A VACIO
    inputs.forEach(input => {
        input.value = '';
    });

    // REESTABLECER IMAGEN A DEFAULT
    img.src = defaultAvatar;

    // REESTABLECER VALORES DE LOS CAMPOS
    campos.nombre = false;
    campos.apellido = false;
    campos.email = false;

    // ELIMINAR COLORES
    const grupos = document.querySelectorAll('.formulario__grupo');
    grupos.forEach(grupo => {
        grupo.classList.remove('formulario__grupo-correcto');
        grupo.classList.remove('formulario__grupo-incorrecto');
    });

    // ELIMINAR ICONOS
    const iconos = document.querySelectorAll('.grupo__icono i');
    iconos.forEach(icono => {
        icono.classList.remove('fa-check-circle'); // Cambiar esto a la clase de icono correcto
        icono.classList.remove('fa-times-circle'); // Cambiar esto a la clase de icono incorrecto
    });

    document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
});



