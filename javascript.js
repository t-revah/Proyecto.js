// Declaración de variables
let cantidadPartidos = 0;
let partidos = [];
let partidosAsistidos = [];

// Definición del objeto Partido
function Partido(torneo, fecha, resultado, asistencia) {
  this.torneo = torneo;
  this.fecha = fecha;
  this.resultado = resultado;
  this.asistencia = asistencia;
}

// Carga de un nuevo partido
function cargarPartido() {
  const torneo = prompt("Ingrese el torneo al que pertenece el partido:");
  const fecha = parseInt(prompt("Ingrese el número de la fecha del partido:"));
  const resultado = prompt("Ingrese el resultado del partido (número-número):");
  const asistencia = prompt("¿Asististe al partido? (Si o No):").toLowerCase();

  const partido = new Partido(torneo, fecha, resultado, asistencia);
  partidos.push(partido);
  cantidadPartidos++;

  if (asistencia === "si") {
    partidosAsistidos.push(partido);
  }
}

// Mostrar datos cargados
function mostrarDatosCargados() {
  let datos = "";
  for (let i = 0; i < cantidadPartidos; i++) {
    const partido = partidos[i];
    datos += `Torneo: ${partido.torneo} - Fecha: ${partido.fecha} - Resultado: ${partido.resultado} - Asistencia: ${partido.asistencia}\n`;
  }
  alert("Datos cargados:\n" + datos);
}

// Mostrar partidos asistidos
function mostrarPartidosAsistidos() {
  let datos = "";
  for (let i = 0; i < partidosAsistidos.length; i++) {
    const partido = partidosAsistidos[i];
    datos += `Fecha: ${partido.fecha} - Resultado: ${partido.resultado}\n`;
  }
  alert("Partidos asistidos:\n" + datos);
}

// Verificación filtro 
function verificarAutorizacion() {
  let asistioPartidos = 0;

  for (let i = 0; i < cantidadPartidos; i++) {
    const partido = partidos[i];
    if (partido.asistencia.toLowerCase() === "si") {
      asistioPartidos++;
    }
  }

  if (asistioPartidos === cantidadPartidos) {
    alert("Estás autorizado para asistir al siguiente partido.");
  } else {
    alert("No estás autorizado para asistir al siguiente partido.");
  }
}
// Cargar los resultados y la asistencia de 3 partidos 
while (cantidadPartidos < 3) {
  cargarPartido();
}

mostrarDatosCargados();
verificarAutorizacion();
mostrarPartidosAsistidos();

