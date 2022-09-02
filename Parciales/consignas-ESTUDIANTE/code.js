/* --------------------------- NO TOCAR DESDE ACÁ --------------------------- */
let datosPersona = {
  nombre: "",
  edad: 0,
  ciudad: "",
  interesPorJs: "",
};

const listado = [{
    imgUrl: "https://huguidugui.files.wordpress.com/2015/03/html1.png",
    lenguajes: "HTML y CSS",
    bimestre: "1er bimestre",
  },
  {
    imgUrl: "https://jherax.files.wordpress.com/2018/08/javascript_logo.png",
    lenguajes: "Javascript",
    bimestre: "2do bimestre",
  },
  {
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png",
    lenguajes: "React JS",
    bimestre: "3er bimestre",
  },
];

const profileBtn = document.querySelector("#completar-perfil");
const materiasBtn = document.querySelector("#obtener-materias");
const verMasBtn = document.querySelector("#ver-mas");
const cambiarTema = document.querySelector('#cambiar-tema');



profileBtn.addEventListener("click", renderizarDatosUsuario);
materiasBtn.addEventListener("click", recorrerListadoYRenderizarTarjetas);
cambiarTema.addEventListener("click", alternarColorTema);
/* --------------------------- NO TOCAR HASTA ACÁ --------------------------- */

function obtenerDatosDelUsuario() {
  /* --------------- PUNTO 1: Escribe tu codigo a partir de aqui --------------- */
    let nombre = prompt("Ingrese su nombre:");
    datosPersona.nombre = nombre;
    
    let anoNacimiento = parseInt(prompt("Ingrese su año de nacimiento:"));
    anoNacimiento = 2022 - anoNacimiento;
    datosPersona.edad = anoNacimiento;

    let Ciudad = prompt("Ingrese su Ciudad");
    datosPersona.ciudad = Ciudad
    
    let interesPorJs = confirm("Te interessa Javascript");
    if(interesPorJs){
      datosPersona.interesPorJs = "Si" ;
    }else{
      datosPersona.interesPorJs = "No" ;
    }
}

const divDatos = document.querySelectorAll("div");

function renderizarDatosUsuario() {
  /* ------------------- NO TOCAR NI ELIMINAR ESTA FUNCION. ------------------- */
  obtenerDatosDelUsuario();
  /* --------------- PUNTO 2: Escribe tu codigo a partir de aqui --------------- */
divDatos.forEach(datos => {
  if(datos.classList.contains("card-header")){
    datos.innerHTML = "";
    datos.innerHTML += 
    `
    <h3>Nombre: <span id="nombre">${datosPersona.nombre}</span></h3>
    <h3>Edad: <span id="edad">${datosPersona.edad }</span></h3>
    <h3>Ciudad: <span id="ciudad"></span>${datosPersona.ciudad }</h3>
    <h3>Interes en Javascript: <span id="javascript">${datosPersona.interesPorJs }</span></h3> 
    `
  }
})  
}

const divMateria = document.getElementById("fila");
function recorrerListadoYRenderizarTarjetas() {
  /* ------------------ PUNTO 3: Escribe tu codigo desde aqui ------------------ */
      divMateria.innerHTML="";
      listado.forEach(listado => {  
        const section = document.createElement("section")
        divMateria.appendChild(section);
        section.classList.add("caja")
        
        const imaganes = document.createElement("img");
        section.appendChild(imaganes);
        imaganes.setAttribute("src", listado.imgUrl)
        imaganes.setAttribute("alt", listado.lenguajes)

        const lenguajes = document.createElement("p");
        section.appendChild(lenguajes);
        lenguajes.innerHTML = "Lenguajes: " +  listado.lenguajes;
        lenguajes.classList.add("lenguajes");

        const bimestre = document.createElement("p");
        bimestre.innerHTML = "Bimestre: " + listado.bimestre
        section.appendChild(bimestre);
        bimestre.classList.add("bimestre")    

      })
    }



const divSitio = document.getElementById("sitio");
function alternarColorTema() {
  /* --------------------- PUNTO 4: Escribe tu codigo aqui --------------------- */
  divSitio.classList.toggle("dark");
}



/* --------------------- PUNTO 5: Escribe tu codigo aqui --------------------- */

const pOscuro = document.getElementById("sobre-mi")

document.onkeydown = function(e) {
  if(e.key === "f"){
    pOscuro.classList.remove("oculto")
  }
}