// Declaración de variables
let cantidadPartidos = 0;
let partidos = [];
let partidosAsistidos = [];
let contadorPartidosConsecutivos = 0;

// Definición del objeto Partido
function Partido(torneo, fecha, resultado, asistencia) {
  this.torneo = torneo;
  this.fecha = fecha;
  this.resultado = resultado;
  this.asistencia = asistencia;
}

// Agregar un nuevo partido
function agregarPartido(event) {
  event.preventDefault();

  const torneoInput = document.getElementById("torneo");
  const fechaInput = document.getElementById("fecha");
  const resultadoInput = document.getElementById("resultado");
  const asistenciaInput = document.getElementById("asistencia");

  const torneo = torneoInput.value;
  const fecha = parseInt(fechaInput.value);
  const resultado = resultadoInput.value;
  const asistencia = asistenciaInput.value.toLowerCase();

  const partido = new Partido(torneo, fecha, resultado, asistencia);
  partidos.push(partido);
  cantidadPartidos++;

  if (asistencia === "si") {
    partidosAsistidos.push(partido);
    contadorPartidosConsecutivos++;
    if (contadorPartidosConsecutivos > 3) {
      partidosAsistidos.shift();
    }
  } else {
    contadorPartidosConsecutivos = 0;
  }

  mostrarDatosCargados();
  verificarAutorizacion();
  mostrarPartidosAsistidos();

  torneoInput.value = "";
  fechaInput.value = "";
  resultadoInput.value = "";
  asistenciaInput.value = "";
}

// Mostrar datos cargados
function mostrarDatosCargados() {
  let datos = "";
  for (let i = 0; i < cantidadPartidos; i++) {
    const partido = partidos[i];
    datos += `<p>Torneo: ${partido.torneo} - Fecha: ${partido.fecha} - Resultado: ${partido.resultado} - Asistencia: ${partido.asistencia}</p>`;
  }

  const datosCargados = document.getElementById("datosCargados");
  datosCargados.innerHTML = "<h2>Datos cargados:</h2>" + datos;
}

// Mostrar partidos asistidos
function mostrarPartidosAsistidos() {
  let datos = "";
  for (let i = 0; i < partidosAsistidos.length; i++) {
    const partido = partidosAsistidos[i];
    datos += `<p>Fecha: ${partido.fecha} - Resultado: ${partido.resultado}</p>`;
  }

  const partidosAsistidosElement = document.getElementById("partidosAsistidos");
  partidosAsistidosElement.innerHTML = "<h2>Partidos asistidos:</h2>" + datos;
}

// Verificación filtro 
function verificarAutorizacion() {
  const autorizacionElement = document.getElementById("autorizacion");
  if (contadorPartidosConsecutivos >= 3) {
    autorizacionElement.innerHTML = "<h2>Estás autorizado para asistir al siguiente partido.</h2>";
  } else {
    autorizacionElement.innerHTML = "<h2>No estás autorizado para asistir al siguiente partido.</h2>";
  }
}
