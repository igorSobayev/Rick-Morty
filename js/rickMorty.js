window.onload = function () {

    // Declaro la url de la API que voy a utilizar a lo largo del codigo
    var url = 'https://rickandmortyapi.com/api/character/';

    // Recojo cuando se escoge la opción de generar personajes aleatorios y le asigno
    // un evento. El evento consiste en generar un número aleatorio, concatenar la cadena
    // a la url y mandarsela a la función que se encarga de traer los datos 'traerDatos(url)'
    // finalmente vuelvo a establecer la url inicial para no crear conflictos. Esto nos permitirá
    // ir añadiendo diferentes opciones en la misma web, esto pasara hasta que no se pulse el 
    // botón 'Reiniciar'
    $("#todos").click(function () {
        let aleatorio = Math.round(Math.random() * 25);
        url += '?page=' + aleatorio;
        traerDatos(url);
        url = 'https://rickandmortyapi.com/api/character/';
    });

    // Añado un evento al buscar por nombre, se lo paso a la función 'controlEventos()' 
    // que se encarga principalmente de crear la cadena de la url y mandarla a la función 
    // encargada de procesar los datos.
    $("#nombre-enviar").click(function () {
        controlEventos('#nombre', '?name=');
    });

    // Idem
    $("#genero-enviar").click(function () {
        controlEventos('input:radio[name=gender]:checked', '?gender=');
    });

    // Idem
    $("#status-enviar").click(function () {
        controlEventos('input:radio[name=status]:checked', '?status=');
    });

    // Reinicio la aplicación llamando a la función reiniciar()
    $("#reiniciar").click(function () {
        reiniciar();
    });

    // Función encargada de hacer la primera consulta y ver cuantas páginas tiene la consulta,
    // esto es necesario porque la API esta limitada a 20 elementos por página, aun teniendo más de 450
    // en total. Recibe como parámetro la url que tiene que utilizar.
    function cargarFotos(url) {

        // Creo el la petición
        const xhr = new XMLHttpRequest();

        // Abró la url y recojo los datos.
        xhr.open('GET', url, true);

        xhr.onload = function () {
            // Compruebo si recibo los datos sin errores
            if (this.status == 200) {
                const fotos = JSON.parse(this.responseText);
                // Guardo el número de páginas que tiene mi consulta
                var paginas = fotos.info.pages;

                // Si mi consulta tiene más de 1 página, osea más de 20 elementos creo
                // un bucle for que se va a ejecutar tantas veces como páginas haya
                // creando una url personalizada para cada página y valor pedido.
                // Esta url se la envio a la función 'traerDatos()' que se encarga de
                // volver a hacer la petición y concatenar los datos.
                if (paginas > 1) {
                    for (i = 1; i <= paginas; i++) {
                        let url_temporal = url;
                        url = url + '&page=' + i;
                        traerDatos(url);
                        url = url_temporal;
                    }
                } else {
                    traerDatos(url);
                }
            }
        }
        // Envio
        xhr.send();
    }

    // Función que se encarga de traer los datos
    function traerDatos(url) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (this.status == 200) {
                var fotos_bucle = JSON.parse(this.responseText);
                // Creo la cadena donde se van a concatenar los valores escogiendo los valores
                // deseados.
                var output = '';

                fotos_bucle.results.forEach(function (foto) {
                    output += `
                    <div class="foto">
                        <div class="contenedor-cabecera">
                            <img src="${foto.image}" class="imagen-front"/>
                            <div class="titulo-foto">
                                <h2>${foto.name}</h2>
                                <p>id: ${foto.id}</p>
                            </div>
                        </div>
                        <div class="contenedor-datos">
            
                            <div class="contenido">
                                <p>estado</p>
                                <p>${foto.status}</p>
                            </div>
                            <div class="contenido">
                                <p>Especie</p>
                                <p>${foto.species}</p>
                            </div>
                            <div class="contenido">
                                <p>género</p>
                                <p>${foto.gender}</p>
                            </div>
                            <div class="contenido">
                                <p>origen</p>
                                <p>${foto.origin.name}</p>
                            </div>
                        </div>
                    </div>
                    `
                });
                // Añado al DOM los valores creados
                document.querySelector('.fotos').innerHTML += output;
            }
        }

        xhr.send();
    }

    // Función encargada de reiniciar el DOM, elimina todo el contenido creado
    function reiniciar() {
        document.querySelector('.fotos').innerHTML = '';
    }

    // Función para controlar los eventos, recibe como parámetros temporal y valor
    // temporal es el nombre del selector, un id en este caso.
    // valor es el nombre a añadir a la url
    function controlEventos(temporal, valor) {
        let elemento_temporal = $(temporal).val().toLowerCase();
        console.log(elemento_temporal);
        url += valor + elemento_temporal;
        cargarFotos(url);
        url = 'https://rickandmortyapi.com/api/character/';
    }

}