/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function soloNumeros(e) {
    var key = window.Event ? e.which : e.keyCode;
    return (key >= 48 && key <= 57);
}

function validar_email( email ) 
{
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

function NumGuion(e) {
    // extranjero = document.getElementById('inp_ext');
    //if(extranjero.checked!=true){
    evt = e ? e : event;
    tcl = (window.Event) ? evt.which : evt.keyCode;
    // alert("key="+tcl);
    if ((tcl < 48 || tcl > 57) && (tcl != 8 && tcl != 9 && tcl != 0 && tcl != 46 && tcl != 107 && tcl != 75) && tcl != 45)
    {
        return false;
    }
    return true;
    /* }
     else {
     
     return true;
     }*/
}

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46-32";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}


function soloEmail(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = ".-_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function alfanumericoSpace(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " 1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function Valida_Rut(Objeto)
{
    var tmpstr = "";
    var intlargo = Objeto.value
    if (intlargo.length > 0)
    {
        crut = Objeto.value
        largo = crut.length;
        if (largo < 2)
        {
            alert('rut inválido')
            Objeto.focus()
            return false;
        }
        for (i = 0; i < crut.length; i++)
            if (crut.charAt(i) != ' ' && crut.charAt(i) != '.' && crut.charAt(i) != '-')
            {
                tmpstr = tmpstr + crut.charAt(i);
            }
        rut = tmpstr;
        crut = tmpstr;
        largo = crut.length;

        if (largo > 2)
            rut = crut.substring(0, largo - 1);
        else
            rut = crut.charAt(0);

        dv = crut.charAt(largo - 1);

        if (rut == null || dv == null)
            return 0;

        var dvr = '0';
        suma = 0;
        mul = 2;

        for (i = rut.length - 1; i >= 0; i--)
        {
            suma = suma + rut.charAt(i) * mul;
            if (mul == 7)
                mul = 2;
            else
                mul++;
        }

        res = suma % 11;
        if (res == 1)
            dvr = 'k';
        else if (res == 0)
            dvr = '0';
        else
        {
            dvi = 11 - res;
            dvr = dvi + "";
        }

        if (dvr != dv.toLowerCase())
        {
            alert('El Rut Ingreso es Invalido')
            Objeto.focus()
            return false;
        }
        alert('El Rut Ingresado es Correcto!')
        Objeto.focus();
        return true;
    }
}