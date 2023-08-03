// Declaración de variables y carga de datos desde localStorage
let cantidadPartidos = 0;
let partidos = [];
let partidosAsistidos = [];
let contadorPartidosConsecutivos = 0;

// Función para obtener los datos del archivo "partidos.json" y mostrarlos en la sección "Datos cargados"
function cargarDatosDesdeJSON() {
    fetch('./partidos.json')
        .then(response => response.json())
        .then(data => {
            partidos = data;
            cantidadPartidos = partidos.length;
            mostrarDatosCargados();
            mostrarPartidosAsistidos();
            verificarAutorizacion();
        })
        .catch(error => {
            console.error('Error al obtener los datos del archivo JSON:', error);
        });
}

cargarDatosDesdeJSON();

// Función para obtener los últimos 3 partidos consecutivos a los que asistió
function obtenerUltimosPartidosAsistidos() {
    let ultimosPartidosAsistidos = [];
    let contador = 0;

    for (let i = partidos.length - 1; i >= 0; i--) {
        const partido = partidos[i];
        if (partido.asistencia.toLowerCase() === "si") {
            ultimosPartidosAsistidos.unshift(partido);
            contador++;
            if (contador === 3) {
                break;
            }
        } else {
            contador = 0;
            ultimosPartidosAsistidos = [];
        }
    }

    return ultimosPartidosAsistidos;
}

// Mostrar partidos asistidos
function mostrarPartidosAsistidos() {
    const ultimosPartidosAsistidos = obtenerUltimosPartidosAsistidos();
    let datos = "";
    for (let i = 0; i < ultimosPartidosAsistidos.length; i++) {
        const partido = ultimosPartidosAsistidos[i];
        datos += `<p>Fecha: ${partido.fecha} - Resultado: ${partido.resultado}</p>`;
    }

    const partidosAsistidosElement = document.getElementById("partidosAsistidos");
    partidosAsistidosElement.innerHTML = "<h2>Partidos asistidos:</h2>" + datos;
}

// Verificación filtro 
function verificarAutorizacion() {
    const autorizacionElement = document.getElementById("autorizacion");
    const ultimosPartidosAsistidos = obtenerUltimosPartidosAsistidos();
    const ultimosTresCargados = partidos.slice(-3);

    const autorizado = ultimosPartidosAsistidos.length === 3 &&
        ultimosPartidosAsistidos.every(partido => partido.asistencia.toLowerCase() === "si") &&
        JSON.stringify(ultimosPartidosAsistidos) === JSON.stringify(ultimosTresCargados);

    if (autorizado) {
        autorizacionElement.innerHTML = "<h2>Estás autorizado para asistir al siguiente partido.</h2>";
    } else {
        autorizacionElement.innerHTML = "<h2>No estás autorizado para asistir al siguiente partido.</h2>";
    }
}

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
    } else {
        contadorPartidosConsecutivos = 0;
        partidosAsistidos = [];
    }

    // Guardar los datos en localStorage
    localStorage.setItem('partidos', JSON.stringify(partidos));
    localStorage.setItem('partidosAsistidos', JSON.stringify(partidosAsistidos));
    localStorage.setItem('contadorPartidosConsecutivos', contadorPartidosConsecutivos);

    mostrarDatosCargados();
    mostrarTodosLosPartidos();
    verificarAutorizacion();

    torneoInput.value = "";
    fechaInput.value = "";
    resultadoInput.value = "";
    asistenciaInput.value = "";
}

// Mostrar datos cargados
function mostrarDatosCargados() {
    let datos = "";
    for (let i = 0; i < partidos.length; i++) {
        const partido = partidos[i];
        datos += `<p>Torneo: ${partido.torneo} - Fecha: ${partido.fecha} - Resultado: ${partido.resultado} - Asistencia: ${partido.asistencia}</p>`;
    }

    const datosCargados = document.getElementById("datosCargados");
    datosCargados.innerHTML = "<h2>Datos cargados:</h2>" + datos;
}

// Mostrar todos los partidos
function mostrarTodosLosPartidos() {
    let datos = "";
    for (let i = 0; i < partidos.length; i++) {
        const partido = partidos[i];
        datos += `<p>Torneo: ${partido.torneo} - Fecha: ${partido.fecha} - Resultado: ${partido.resultado} - Asistencia: ${partido.asistencia}</p>`;
    }

    const todosLosPartidosElement = document.getElementById("todosLosPartidos");
    todosLosPartidosElement.innerHTML = "<h2>Todos los partidos:</h2>" + datos;
}

restaurarContador();
mostrarTodosLosPartidos();
verificarAutorizacion();
