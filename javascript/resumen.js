
const storedData = localStorage.getItem('datos');
if (storedData) {
    const datos = JSON.parse(storedData);
    
    // ELEMENTOS HTML
    const imgCarnet = document.getElementById('imgCarnet');
    const nombreApellidoCarnet = document.getElementById('nombre-apellidoCarnet');
    const edadCarnet = document.getElementById('edadCarnet');
    const localidadCarnet = document.getElementById('localidadCarnet');
    
    // SETEAR CAMPOS
    imgCarnet.src = datos[4]; // Datos[4] contiene la URL de la imagen
    nombreApellidoCarnet.innerText = datos[0] + ' ' + datos[1]; // Datos[0] contiene el nombre y Datos[1] contiene el apellido
    edadCarnet.innerText = datos[2]; // Datos[2] contiene la edad
    localidadCarnet.innerText = datos[3]; // Datos[3] contiene la localidad

    if (datos[2] >= 5 && datos[2] < 7) {
        document.querySelector('.rama p').textContent = 'Castor';
        document.getElementById('contenedor-castor').classList.add('contenedor-insignias-castor-activo')
      } else if(datos[2] >= 7 && datos[2] < 11){
        document.querySelector('.rama p').textContent = 'Lobato';
        document.getElementById('contenedor-lobeznos').classList.add('contenedor-insignias-lobeznos-activo')
      } else if( datos[2] >= 11 && datos[2] < 14){
        document.querySelector('.rama p').textContent = 'Unidad';
        document.getElementById('contenedor-unidad').classList.add('contenedor-insignias-Unidad-activo')
      }else if( datos[2] >= 14 && datos[2] < 17){
        document.querySelector('.rama p').textContent = 'Caminante';
        document.getElementById('contenedor-caminante').classList.add('contenedor-insignias-Caminante-activo')
      }else if( datos[2] >= 17 && datos[2] < 21){
        document.querySelector('.rama p').textContent = 'Rover';
        document.getElementById('contenedor-rovers').classList.add('contenedor-insignias-Rovers-activo')
      }

  }
