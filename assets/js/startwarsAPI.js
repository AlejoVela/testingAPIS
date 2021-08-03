const API = "https://swapi.dev/api/people/";


const getData = (url) => {
    document.getElementById("titleAPI").innerHTML = "Starwars API by @AlejoVela";
    return fetch(url)
        .then((response) => response.json())
        .then((json) => {
            llenarDatos(json.results), pagination(json)
        })
        .catch((error) => {
            console.log("Error: " + error);
        })
};

const llenarDatos = (data) => {
    let html = "";
    let imageWars = "https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg";

    data.forEach(character => {
        html += `
        <div class="card col-3">
            <div class="card-header">
                <img src="${imageWars}" class="card-img-top" alt="startwars image">
            </div>
            <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
                <p class="card-text">Peso: ${character.mass} kg</p>
                <p class="card-text">Peso: ${character.height/100} m</p>
                <p class="card-text">Año nacimiento: ${character.birth_year}</p>
            </div>
        </div>
        
        `;
    });
    document.getElementById("datosPersonajes").innerHTML = html;
};

const pagination = (data) => {
    let prevDisable = "";
    let nextDisable = "";

    let html = `
        <li class="page-item ${data.previous == null ? prevDisable = "disabled" : prevDisable = "" }">
            <a href="#" class="page-link"  onclick=getData('${data.previous}')>
                Previous
            </a>
        </li>
        <li class="page-item ${data.next == null ? nextDisable = "disabled" : nextDisable = "" }">
            <a href="#" class="page-link" onclick=getData('${data.next}')>
            Next
            </a>
        </li>
    `;
    document.getElementById("paginacion").innerHTML = html;
};


getData(API);