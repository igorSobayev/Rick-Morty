window.onload = function () {

    var url = 'https://rickandmortyapi.com/api/character/';

    $("#todos").click(function () {
        let aleatorio = Math.round(Math.random() * 25);
        url += '?page=' + aleatorio;
        traerDatos(url);
        url = 'https://rickandmortyapi.com/api/character/';
    });

    $("#nombre-enviar").click(function () {
        controlEventos('#nombre', '?name=');
    });

    $("#genero-enviar").click(function () {
        controlEventos('input:radio[name=gender]:checked', '?gender=');
    });

    $("#status-enviar").click(function () {
        controlEventos('input:radio[name=status]:checked', '?status=');
    });

    $("#reiniciar").click(function () {
        reiniciar();
    });

    function cargarFotos(url) {

        const xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (this.status == 200) {
                const fotos = JSON.parse(this.responseText);
                var paginas = fotos.info.pages;

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

        xhr.send();
    }

    function traerDatos(url) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (this.status == 200) {
                var fotos_bucle = JSON.parse(this.responseText);

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

                document.querySelector('.fotos').innerHTML += output;
            }
        }

        xhr.send();
    }

    function reiniciar() {
        document.querySelector('.fotos').innerHTML = '';
    }

    function controlEventos(temporal, valor) {
        let elemento_temporal = $(temporal).val();
        url += valor + elemento_temporal;
        cargarFotos(url);
        url = 'https://rickandmortyapi.com/api/character/';
    }

}