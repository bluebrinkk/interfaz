/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function () {
    $('#rutX').Rut({
        on_error: function () {
            document.getElementById("rutNoVal").value = 1;
            validaEnvio();
        },
        on_success: function () {
            document.getElementById("rutNoVal").value = 0;
            validaEnvio();
        },
        format_on: 'keyup'
    });
});


var validaEnvio = function () {

    var rut = document.getElementById("rutX").value;
    var nombre = document.getElementById("nombreX").value;
    var rutNoVal = +document.getElementById("rutNoVal").value;
    var email = document.getElementById("emailX").value;
    var fono = +document.getElementById("fonoX").value;
    var texto = document.getElementById("texto").value;

    var error = false;
    if (rutNoVal == 1) {
        document.getElementById("danger2").innerHTML = 'El Rut Ingresado es Invalido.';
        error = true;
    } else if (!validar_email(email) && email != '') {
        document.getElementById("danger2").innerHTML = 'El Email Ingresado es Invalido.';
        error = true;
    }

    if (error) {
        document.getElementById("danger2").style.display = '';
        return false;
    } else {
        document.getElementById("danger2").style.display = 'none';
    }

    if (rut != '' && nombre != '' && rutNoVal == 0 && email != '' && fono != '' && texto != '') {
        document.getElementById("btEnv").disabled = '';
    } else {
        document.getElementById("btEnv").disabled = 'disabled';
    }
};

var limpiar = function () {
    document.getElementById("rutX").value = '';
    document.getElementById("nombreX").value = '';
    document.getElementById("rutNoVal").value = '';
    document.getElementById("emailX").value = '';
    document.getElementById("fonoX").value = '';
    document.getElementById("texto").value = '';
    document.getElementById("btEnv").disabled = 'disabled';
    document.getElementById("danger2").style.display = 'none';
    document.getElementById("rutNoVal").value = 0;
};

var enviar = function () {
    $('#msj').modal('show');
    limpiar();
};

var calculaIva = function () {
    var producto = document.getElementById("producto").value.toUpperCase();
    var cantidad = +document.getElementById("cantidad").value;
    var precio = +document.getElementById("precio").value;
    var descuento = +document.getElementById("descuento").value;

    var error = false;
    if (producto == '') {
        document.getElementById("danger").innerHTML = "Ingrese nombre del producto !!";
        error = true;
    } else if (cantidad == '') {
        document.getElementById("danger").innerHTML = "Ingrese cantidad del producto !!";
        error = true;
    } else if (precio == '') {
        document.getElementById("danger").innerHTML = "Ingrese el precio del producto !!";
        error = true;
    } else if (descuento == '') {
        document.getElementById("danger").innerHTML = "Ingrese el descuento del producto !!";
        error = true;
    }

    if (error) {
        document.getElementById("danger").style.display = '';
        return false;
    } else {
        document.getElementById("danger").style.display = 'none';
    }

    ;
    var neto = (cantidad * precio);
    neto = (neto * descuento) / 100;

    var iva = (neto * 0.19);
    var total = (neto + iva);

    document.getElementById("neto").innerHTML = '$ ' + neto;
    document.getElementById("iva").innerHTML = '$ ' + iva;
    document.getElementById("total").innerHTML = '$ ' + total;
};

var convertir = function () {
    var dolar = 678;
    var euro = 770;

    var moneda = +document.getElementById("moneda").value;
    var cantMoneda = +document.getElementById("cantMoneda").value;

    var error = false;
    if (cantMoneda == '') {
        document.getElementById("danger1").innerHTML = "Debe ingresar la cantidad a convertir !!";
        error = true;
    }
    if (error) {
        document.getElementById("danger1").style.display = '';
        return false;
    } else {
        document.getElementById("danger1").style.display = 'none';
    }
    var tipo = '(EUR)';
    if (moneda == 1) {
        moneda = dolar;
        tipo = '(USD)';
    } else {
        moneda = euro;
    }

    document.getElementById("transfMoneda").innerHTML = 'Convirtiendo<br><img src="img/cargando-loading.gif">';

    var total = (cantMoneda * moneda);
    setTimeout(function () {
        document.getElementById("transfMoneda").innerHTML = ' Valores observados al día 8/11/2018 <b>' + tipo + ' ' + moneda + '</b><br>Resultado conversión a pesos chilenos: <b>$ ' + total + '</b>';
    }, 3000);
};