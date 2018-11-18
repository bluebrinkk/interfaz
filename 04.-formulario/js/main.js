$(function () {
    $('#rut').Rut({
        on_error: function () {
            //document.getElementById("rutNoVal").value = 1;
            //validaEnvio();
            $('#rut').addClass('error');
            $('#rut').removeClass('input');
        },
        on_success: function () {
//            document.getElementById("rutNoVal").value = 0;
//            validaEnvio();();
            $('#rut').addClass('input');
            $('#rut').removeClass('error');
        },
        format_on: 'keyup'
    });
});

//function enabledSubmit(response) {
//    document.getElemenstByName('enviar')[0].disabled = false;
//
//}

function revisar(elemento) {
    if (elemento.value == '') {
        elemento.className = 'error';
    } else {
        elemento.className = 'input';
    }
}


function envia() {
    var error = 0;
    var vacios = 0;
    $("input:text").each(function () {
        if ($(this).hasClass('error')) {
            error++;
        }
        if ($(this).val()=='') {
            vacios++;
        }
    });
    if (error != 0) {
        alert('Debe ingresar campos correctos');
        return false;
    }
    if (vacios != 0) {
        alert('Debe ingresar todos los campos');
        return false;
    }
    alert('El formulario ha sido enviado');
    
}

function revisarcomp(elemento) {
    if (document.getElementById("pass").value != document.getElementById("pass2")) {
        datosCorrectos = false;
        error = "\n las contraseñas no son iguales";
    }

}


function revisaNumero(elemento) {
    if (elemento.value !== '') {
        var data = elemento.value;
        if (isNaN(data)) {
            elemento.className = 'error';
        } else {
            elemento.className = 'input';
        }
    }
}

function revisaLongitud(elemento, min) {
    if (elemento.value !== '') {
        var data = elemento.value;
        if (data.length < min) {
            elemento.className = 'error';
        } else {
            elemento.className = 'input';
        }
    }
}

function revisarEmail(elemento) {
    if (elemento.value !== '') {
        var data = elemento.value;
        var exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!exp.test(data)) {
            elemento.className = 'error';
        } else {
            elemento.className = 'input';
        }
    }
}





function validar() {
    var datosCorrectos = true;
    var error = "";

    if (document.getElementById("nombre").value == "") {
        datosCorrectos = false;
        error = "\n El Nombre Esta Vacio";
    }

    if (document.getElementById("telefono").value == "") {
        datosCorrectos = false;
        error = "\n Debes Poner Un Telefono";
    }

    // if(document.getElementById("pass").value==""){
    //     datosCorrectos=false;
    //     error="\n Debes escribir una clave";
    // }

    // if(document.getElementById("pass1").value==""){
    //     datosCorrectos=false;
    //     error="\n Debes repetir la clave";
    // }

    if (isNaN(document.getElementById("telefono").value)) {
        datosCorrectos = false;
        error = "\n El Telefono Solo Debe Tener Numeros";
    }

    var exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!exp.test(document.getElementById("email").value)) {
        datosCorrectos = false;
        error = "\n Email Invalido";
    }

    if (document.getElementById("mensaje").value.length < 30) {
        datosCorrectos = false;
        error = "\n El Mensaje Debe Ser Mayor A 30 Caracteres";
    }

    if (!datosCorrectos) {
        alert('Hay Errores En El formulario' + error);
    }
    if (pass == pass1) {
        datosCorrectos = false;
        error = "\n Email Invalido";
    }

    return datosCorrectos;

}

src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCgNpLbUyopRYiZJQV_DLL2FzjGAh8uwlQ"

function findMe() {
    var output = document.getElementById('map');
    // Verificar si soporta geolocalizacion
    if (navigator.geolocation) {
        output.innerHTML = "<p>Tu navegador soporta Geolocalizacion</p>";
    } else {
        output.innerHTML = "<p>Tu navegador no soporta Geolocalizacion</p>";
    }
    //Obtenemos latitud y longitud
    function localizacion(posicion) {
        var latitude = posicion.coords.latitude;
        var longitude = posicion.coords.longitude;

        output.innerHTML = "<p>Latitud: " + latitude + " <br>Longitud:" + longitude + "</p>";

        var imgURL = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&size=600x300&markers=color:red%7C" + latitude + "," + longitude + "&key=AIzaSyCgNpLbUyopRYiZJQV_DLL2FzjGAh8uwlQ";
        output.innerHTML = "<img src='" + imgURL + "'>";

    }
    function error() {
        output.innerHTML = "<p>No se pudo obtener tu ubicación</p>";
    }
    navigator.geolocation.getCurrentPosition(localizacion, error);
}
				