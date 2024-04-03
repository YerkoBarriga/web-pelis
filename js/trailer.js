//Obtenemos la DATA
const url = "movies.json";


// Función para mostrar el modal Trailer
function mostrarModal() {
    // Deshabilitar el desplazamiento del body
    document.body.classList.add('no-scroll'); 
    var modal = document.getElementById("modal");
    // Mostrar el modal
    modal.style.display = "block"; 
    document.getElementById("youtube-player").src = "https://www.youtube.com/embed/Y5nq2APYURE"; // Cambiar la fuente del reproductor de YouTube
}

// Función para cerrar el modal
function cerrarModal() {
    document.body.classList.remove('no-scroll'); // Habilitar el desplazamiento del body
    document.getElementById("youtube-player").src = ""; // Detener la reproducción del video
    var modal = document.getElementById("modal");
    modal.style.display = "none"; // Ocultar el modal
}

//Función para filtrar las categorías de los trabajos
function verCategoria(cat){
    const items = document.getElementsByClassName("item");
    for(let i=0; i < items.length;i++){
        items[i].style.display = "none";
    }
    if (cat ==="item") {
        console.log("entro todos");
        fetch(url)
        .then(response =>{
            if(!response.ok){
                throw new Error('Error al cargar los datos del servidor');  
            }
            return response.json();
        })
        .then(data =>{
            console.log("entro al data");


            const peliculasContainer = document.querySelector('.galeria');

                // Limpiar contenedor de películas
            peliculasContainer.innerHTML = "";
            // el metodo sort nos devuelve otro array
            // metodo localesCompare para comparar de orden alfabetica-> devulve un numero -1,0,1
            /**
            -1: Si la cadena de referencia va antes que la cadena dada.
            0: Si las dos cadenas son iguales.
            1: Si la cadena de referencia va después de la cadena dada
        
             */
            const listar = data.sort((a,b) => a.Title.localeCompare(b.Title));       
            listar.forEach(element => {
                console.log("entro el foreach");
                const divPelis = document.createElement('div');
                divPelis.classList.add('item');
                console.log(element.Title);
                divPelis.innerHTML=`
    
                <img src="${element.Poster}" alt="${element.Title}">
                <div class="info">
                        <h3>Titulo</h3>
                        <span>${element.Title}</span>
                        <div class="btns">
                            <button class="vTrailer">Ver Trailer</button>
                            <button class="cTiket">Comprar Entrada</button>
                        </div>
                </div>
                `;
                peliculasContainer.appendChild(divPelis);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        })

    }
// Mostrar las 10 películas con el mejor rating
    if (cat === "topMejores") {
        console.log("entro a mejores");
        fetch(url)
        .then(response =>{
            if(!response.ok){
                throw new Error('Error al cargar los datos del servidor');  
            }
            return response.json();
        })
        .then(data =>{
            console.log("entro al data");


            const peliculasContainer = document.querySelector('.galeria');

                // Limpiar contenedor de películas
            peliculasContainer.innerHTML = "";
            // el metodo sort nos devuelve otro array
            const listar = data.sort((a,b) => parseFloat(b.imdbRating)  - parseFloat(a.imdbRating));
            // el metodo slice nos devuelve otro array
            const top3 = listar.slice(0,3);
            top3.forEach(element => {
                console.log("entro el foreach");
                const divPelis = document.createElement('div');
                divPelis.classList.add('item','topMejores');
                console.log(element.Title);
                divPelis.innerHTML=`
    
                <img src="${element.Poster}" alt="${element.Title}">
                <div class="info">
                        <h3>Titulo</h3>
                        <span>${element.Title}</span>
                        <div class="btns">
                            <button class="vTrailer">Ver Trailer</button>
                            <button class="cTiket">Comprar Entrada</button>
                        </div>
                </div>
                `;
                peliculasContainer.appendChild(divPelis);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        })
    }
    // Mostrar xfecha lanzamiento
    if (cat ==="fechaLanzamiento") {
        console.log("entro fecha lanzamiuento");
        fetch(url)
        .then(response =>{
            if(!response.ok){
                throw new Error('Error al cargar los datos del servidor');  
            }
            return response.json();
        })
        .then(data =>{
            console.log("entro al data");
            const peliculasContainer = document.querySelector('.galeria');
            // se utiliza el Objeto Date
            const listar = data.sort((a,b) => new Date(b.Released)  - new Date(a.Released));
            console.log(listar);
            listar.forEach(element => {
                console.log("entro el foreach");
                const divPelis = document.createElement('div');
                divPelis.classList.add('item','fechaLanzamiento');
                console.log(element.Title);
                divPelis.innerHTML=`
    
                <img src="${element.Poster}" alt="${element.Title}">
                <div class="info">
                        <h3>Titulo</h3>
                        <span>${element.Title}</span>
                        <div class="btns">
                            <button class="vTrailer">Ver Trailer</button>
                            <button class="cTiket">Comprar Entrada</button>
                        </div>
                </div>
                `;
                peliculasContainer.appendChild(divPelis);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        })

    }
    const itemCat = document.getElementsByClassName(cat);
    for(let i = 0; i<itemCat.length;i++){
        itemCat[i].style.display = "block";
    }

    const links = document.querySelectorAll(".peliculas nav a");
   for (let i = 0; i < links.length; i++) {
        links[i].className= "";
    }
    const itemSeleccionado = document.getElementById(cat);
    itemSeleccionado.className = "borde";
} 

verCategoria("item");















// Función asíncrona para buscar películas en el JSON
async function buscarPeliculas(termino) {
    
    // Hacer una solicitud para obtener el JSON de películas
    const response = await fetch('movies.json');
    // Convertir la respuesta a formato JSON
    const data = await response.json();
    
    
    // Filtrar películas que coincidan con el término de búsqueda en cualquier campo
    const peliculas = data.filter(item => {
        // Convertir todos los valores de las propiedades a minúsculas para una comparación insensible a mayúsculas
        const lowerCaseTermino = termino.toLowerCase();
        // Iterar sobre todas las propiedades del objeto y comprobar si alguna contiene el término de búsqueda
        for (let key in item) {
            if (typeof item[key] === 'string' && item[key].toLowerCase().includes(lowerCaseTermino)) {
                return true; // Si se encuentra una coincidencia, devolver verdadero y agregar la película al resultado
            }
        }
        return false; // Si no se encuentra ninguna coincidencia, devolver falso y excluir la película del resultado
    });
    
   
    return peliculas;
}

// Capturar el campo de búsqueda y la lista de resultados del HTML
const inputBusqueda = document.getElementById('inputBusqueda');
const listaResultados = document.getElementById('listaSugerencias');

// Escuchar el evento de entrada en el campo de búsqueda
inputBusqueda.addEventListener('input', async () => {
    // Obtener el término de búsqueda ingresado por el usuario
    const termino = inputBusqueda.value;
    
    // Llamar a la función buscarPeliculas con el término de búsqueda
    try {
        const peliculasContainer = document.querySelector('.galeria');
        const peliculas = await buscarPeliculas(termino);
        console.log(peliculas);
        // Limpiar la lista de resultados antes de mostrar los nuevos
        peliculasContainer.innerHTML = '';

        // Mostrar los resultados en la lista
        peliculas.forEach(element => {
            const divPelis = document.createElement('div');
            divPelis.classList.add('item');
            divPelis.innerHTML=`
                <img src="${element.Poster}" alt="${element.Title}">
                <div class="info">
                        <h3>Titulo</h3>
                        <span>${element.Title}</span>
                        <div class="btns">
                            <button class="vTrailer">Ver Trailer</button>
                            <button class="cTiket">Comprar Entrada</button>
                        </div>
                </div>
                `;
                peliculasContainer.appendChild(divPelis)
        });
    } catch (error) {
        console.error('Error al buscar películas:', error);
    }
});
