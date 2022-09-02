/* ---- SEGURIDAD: Si no se encuentra en localStorage info del usuario 👇 --- */
// creamos una funcion y la hicimo AUTOEJECUTABLE👇
(function comprobacion() {
  // no lo deja acceder a la página, redirigiendo al login inmediatamente.
  const jwt = localStorage.getItem('jwt');

  if (!jwt) {
    // usamos el replace para no guardar en el historial la url anterior
    location.replace('./');
  }

})()

/* ------------------------------------ ☝ ----------------------------------- */


/* ----- comienzan las funcionalidades una vez que carga el documento 👇 ---- */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = this.document.querySelector('#closeApp');
  const nombreUsuario = this.document.querySelector('.user-info p');
  const contenedorTareasPendientes = this.document.querySelector('.tareas-pendientes');
  
  const contenedorTareasTerminadas = this.document.querySelector('.tareas-terminadas');
  const formCrearTarea = this.document.querySelector('form.nueva-tarea')
  const inputTarea = this.document.querySelector('input#nuevaTarea')

  const ENDPOINTBASE = 'https://ctd-fe2-todo.herokuapp.com/v1';
  const JWT = this.localStorage.getItem('jwt');


  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {

    const confirmacion = confirm('¿Seguro desea cerrar sesión?');

    // si lo confirmó, cerramos la sesion
    if (confirmacion) {
      //  limpiamos el storage
      localStorage.clear();
      // lo llevamos a la pantalla de login
      location.replace('./');
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {

    const url = `${ENDPOINTBASE}/users/getMe`;

    const configuraciones = {
      method: 'GET',
      headers: {
        authorization: JWT
      }
    }

    // lanzamos la consulta para saber los datos del usuario👇
    fetch(url, configuraciones)
      .then(respueta => respueta.json())
      .then(data => {

        // reemplazamos el texto del nodo parrafo correspondiente
        nombreUsuario.textContent = data.firstName
    })
  };
  obtenerNombreUsuario()


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {



    const configuraciones = {
      method: 'GET',
      headers: {
        authorization: JWT
      }
    }

    // lanzamos la consulta para saber las tareas del usuario👇
    fetch(`${ENDPOINTBASE}/tasks`, configuraciones)
      .then(respueta => respueta.json())
      .then(data => {
        // llamo a la funcion que pinta las tareas en pantalla
        renderizarTareas(data);
      })

  };

  consultarTareas();


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    
    event.preventDefault();
    console.log("creando tareas");

    const payload = {
      description :inputTarea.value,
      completed : false
    }
    
    const configuraciones = {
      method: 'POST',
      headers: {
        authorization: JWT,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    } 

    fetch(`${ENDPOINTBASE}/tasks`, configuraciones)
      .then(respueta => respueta.json())
      .then(data => {
        // llamo a la funcion que pinta las tareas en pantalla
        consultarTareas();
  })
});


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  

  function renderizarTareas(listado) {

    contenedorTareasPendientes.innerHTML = "";
    contenedorTareasTerminadas.innerHTML = "";

    // filtramos las terminadas
    const listadoTareasTerminadas = listado.filter( item => item.completed)
    const listadoTareasPendientes = listado.filter( item => !item.completed)

    listadoTareasPendientes.forEach( tarea => {
      // por cada tarea inyectamos un nodo li
      contenedorTareasPendientes.innerHTML += `
      <li class="tarea" data-aos="fade-down">
        <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
        <div class="descripcion">
          <p class="nombre">${tarea.description}</p>
          <p class="timestamp">${tarea.createdAt}</p>
        </div>
      </li>
      `
    })
    
    listadoTareasTerminadas.forEach( tarea => {
      // por cada tarea inyectamos un nodo li
      contenedorTareasTerminadas.innerHTML += `
      <li class="tarea" data-aos="fade-up">
        <div class="hecha">
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <div class="descripcion">
          <p class="nombre">${tarea.description}</p>
          <div class="cambios-estados">
            <button class="change completa" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
            <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </div>
      </li>
      `
    })


    const botonesChange = this.document.querySelectorAll('.change')
    const botonesDelete = this.document.querySelectorAll('.borrar')

    botonesChange.forEach(boton => {
      boton.addEventListener("click", function(e) {
        e.preventDefault();
        botonesCambioEstado(e.target)
      })
  })

    botonesDelete.forEach(boton =>{
      boton.addEventListener("click", function(e) {
        e.preventDefault();
        botonBorrarTarea(e.target)
      })
    })
};

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */

function botonesCambioEstado(nodo) {

    console.log(nodo);
    const completada = nodo.classList.contains("completa")
    const cambio = {
      completed: !completada
    }

    const settings = {
      method:"PUT",
      headers: {
        authorization: JWT,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cambio)
  }

    fetch(`${ENDPOINTBASE}/tasks/${nodo.id}`,settings)
    .then(response => response.json())
    .then(data => consultarTareas());

  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea(nodo) {

    const settings = {
      method: "DELETE",
      headers:{
        authorization: JWT,
        'Content-Type': 'application/json',
      }
    }

    fetch(`${ENDPOINTBASE}/tasks/${nodo.id}`,settings)
    .then(response => response.json())
    .then(data => consultarTareas());

  };

});

let nombre = "Pedro";

function mostrarTareas(nombre) {
  if (nombre !== undefined) {
    nombre = "tu Nombre es " + nombre;
    
  }
}
mostrarTareas("juan");

console.log(nombre);