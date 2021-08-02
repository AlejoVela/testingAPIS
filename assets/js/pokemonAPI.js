//URL APU
const API = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
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
        pokeData(json.results), paginacion(json), console.log(json.results, json.info);
    }) //es mala practica usar más de 3 then, ya que las promesas o call backs se vuelven del infierno
    .catch ((error) => {
        console.log("Error: ", error);
    })
};

const pokeData =  (data) => {
    let html = "";
    document.getElementById("datosPersonajes").innerHTML = "";
    data.forEach( (pj) => {
        const URL = pj.url;
        return fetch(URL)
        .then( (response) => response.json() )
        .then( (json) => {
            llenarDatos(json, html);
        })
        .catch( (error) => {
            console.log("Error: " + error);
        })
    });
};
    
//Dibujar cards de personajes
const llenarDatos = (data, html) => {
    console.log(data);
    html = "";
        html += `<div class="col col-3 mt-2">
        <div class="card" style="width: 17rem;">
        <img src="${data.sprites.other.dream_world.front_default}" class="card-img-top" alt="${data.name}"         
        style="height: 12rem;";>
        <div class="card-body">
        <h5 class="card-title">${data.name}</h5>        
        <p class="lead card-text">Peso: ${financial(data.weight*0.1)} kg</p>
        <p class="lead card-text">Altura: ${financial(data.height*0.1)} m</p>
        </div>
        </div>
        </div>`;
    $datosPersonajes.innerHTML += html;
};

//Paginación
const paginacion = (data) => {
    let prevDisable = "";
    let nextDisable = "";

    //data.prev == null ? prevDisable = "disabled" : prevDisable = "";
    //data.next == null ? nextDisable = "disabled" : nextDisable = "";

    let html = `
    <li class="page-item ${data.previous == null ? prevDisable = "disabled" : prevDisable = ""}">
        <a class="page-link" href="#" onclick="getData('${data.previous}')">
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

function financial(x) {
    return Number.parseFloat(x).toFixed(2);
}


document.getElementById("titleAPI").innerHTML="PokeAPI por @AlejoVela";
//Ejecutamos
getData(API);