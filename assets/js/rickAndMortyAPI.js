//URL APU
const API = "https://rickandmortyapi.com/api/character";
let $datosPersonajes = document.getElementById("datosPersonajes");

//GET Obtenemos
//PUT editamos
//Post enviamos
//Delete eliminamos
//Al usar get, fetch es una forma mas optima para leer los datos obtenidos
const getData = (url) => {
    //en then ejecutamos lo que debe pasar si obtiene datos correctamente
    //con response.json() le decimos que lo que sea que obtuvo será manejado en 
    //fotmato json
    return fetch(url)
    .then( (response) => response.json() )
    .then( (json)  => { //colocamos json como el nombre de variable en el cual se guarda la respuesta
        llenarDatos(json.results), paginacion(json.info), console.log(json.results, json.info);
    }) //es mala practica usar más de 3 then, ya que las promesas o call backs se vuelven del infierno
    .catch ((error) => {
        console.log("Error: ", error);
    })
};

//Dibujar cards de personajes
const llenarDatos = (data) => {
    let html = "";
    data.forEach((pj) => { //es buena practica tener pj entre parentesis
        html += '<div class="col col-3 mt-2">'; //por estandar se recomienda usar comilla simple al dibujar html en js
        html += '<div class="card" style="width: 17rem;">';
        html += `<img src="${pj.image}" class="card-img-top" alt="${pj.name}">`;
        html += '<div class="card-body">';
        html += `<h5 class="card-title">${pj.name}</h5>`;
        html += `<p class="lead card-text"><b>Ficha tecnica</b></p>`;
        html += `<p class="lead card-text">Estado: ${pj.status}</p>`;
        html += `<p class="lead card-text">Especie: ${pj.species}</p>`;
        html += `<p class="lead card-text">Ubicación: ${pj["origin"].name}</p>`;
        html += '</div>';
        html += '</div>';
        html += '</div>';
    });
    $datosPersonajes.innerHTML = html;
};

//Paginación
const paginacion = (data) => {
    let prevDisable = "";
    let nextDisable = "";

    //data.prev == null ? prevDisable = "disabled" : prevDisable = "";
    //data.next == null ? nextDisable = "disabled" : nextDisable = "";

    let html = `
    <li class="page-item ${data.prev == null ? prevDisable = "disabled" : prevDisable = ""}">
        <a class="page-link" href="#" onclick="getData('${data.prev}')">
            Previous
        </a>
    </li>
    <li class="page-item ${data.next == null ? nextDisable = "disabled" : nextDisable = ""}">
        <a class="page-link" href="#" onclick="getData('${data.next}')">
            Next
        </a>
    </li>`;

    document.getElementById("paginacion").innerHTML = html;
};


//Ejecutamos
getData(API);