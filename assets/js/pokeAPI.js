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
        return fetch(json.results[0]["url"] + "")
        .then( (response) => response.json() )
        .then( (json1) => {
            llenarDatos(json.results), paginacion([json.count, json.previous, json.next]), console.log(json.results);
        } )
        
    }) //es mala practica usar más de 3 then, ya que las promesas o call backs se vuelven del infierno
    .catch ((error) => {
        console.log("Error: ", error);
    })
};

//Dibujar cards de personajes
const llenarDatos = (data) => {
        /**
        return fetch(json.results[0]["url"] + "")
        .then( (response) => response.json() )
        .then( (json1) => {
            llenarDatos(json.results, json1.sprites), paginacion([json.count, json.previous, json.next]), console.log(json.results);
        } )
     */
    //pj.url
    let html = "";


    data.forEach((pj) => { 
        let image = 
        fetch(pj.url)
        .then( (response) => response.json() )
        .then( (json1) => {
            console.log(json1.sprites.back_default);
            image = json1.sprites.back_default;
        } );
        html += `
        <div class="col col-3 mt-2">
            <div class="card" style="width: 17rem;">
                <img src="${image}" class="card-img-top" alt="${pj.name}">
                <div class="card-body">
                    <h5 class="card-title">${pj.name}</h5>
                </div>
            </div>
        </div>`;
    });
    $datosPersonajes.innerHTML = html;
};

//Paginación
const paginacion = (data) => {
    let prevDisable = "";
    let nextDisable = "";

    let html = `
    <li class="page-item ${data[1] == null ? prevDisable = "disabled" : prevDisable = ""}">
        <a class="page-link" href="#" onclick="getData('${data[1]}')">
            Previous
        </a>
    </li>
    <li class="page-item ${data[2] == null ? nextDisable = "disabled" : nextDisable = ""}">
        <a class="page-link" href="#" onclick="getData('${data[2]}')">
            Next
        </a>
    </li>`;

    document.getElementById("paginacion").innerHTML = html;
};


//Ejecutamos
getData(API);