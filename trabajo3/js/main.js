/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function () {
    initMap();
    $('.modal').modal();
});
var marker;
var coords = {};

//Busca mi ubicación
initMap = function ()
{
    navigator.geolocation.getCurrentPosition(
            function (position) {
                coords = {
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                };
                //Establece coordenadas al cargar el mapa
                $('#coords').html(coords.lat + ',' + coords.lng);
                $('#coordsLat').val(coords.lat);
                $('#coordsLng').val(coords.lng);
            }, function (error) {
        console.log(error);
    });
};

//Animación del puntero
function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}
//Marca posicion y dibuja maps
function cargarPosicion() {
    var map = new google.maps.Map(document.getElementById('map'),
            {
                zoom: 13,
                center: new google.maps.LatLng(coords.lat, coords.lng)
            });

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(coords.lat, coords.lng)
    });

    //Establece coordenadas al cargar el mapa
    $('#coords').html(coords.lat + ',' + coords.lng);
    $('#coordsLat').val(coords.lat);
    $('#coordsLng').val(coords.lng);

    //Lanza animación al hacer clic en el punto del mapa
    marker.addListener('click', toggleBounce);

    //Establece nueva posición al mover el punto del mapa
    marker.addListener('dragend', function ()
    {
        $('#coords').html(this.getPosition().lat() + "," + this.getPosition().lng());
        $('#coordsLat').val(this.getPosition().lat());
        $('#coordsLng').val(this.getPosition().lng());
        //Si la ubicacion cambia se actualiza la busqueda
        initPlaces();
    });
    $('#myUbic').show('fast');
}

function closePosicion() {
    $('#myUbic').hide('fast');
}


var map;
function initPla() {

}
function initPlaces() {
    var busqueda = $('#busqueda').val();

    if (busqueda == '') {
        M.toast({html: 'Debe ingresar valores a la busqueda', classes: 'alertTo'});
        return false;
    }
    $('.progress').show();
    $('#cardResult').show('fast');
//Limpia busqueda
    $('#resultados').html('');

    //Establece las coordenadas de busqueda
    var lat = Number($('#coordsLat').val());
    var lng = Number($('#coordsLng').val());
    var pyrmont = {lat: lat, lng: lng};



    map = new google.maps.Map(document.getElementById('map2'), {
        center: pyrmont,
        zoom: 13
    });

    var request = {
        location: pyrmont,
        radius: '5',
        query: busqueda
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        $('#numResult').html(results.length);
        var e = 0;
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
            e++;
        }
        if (e != 0) {
            $('#resultMapa').show('fast');
        }
    } else {
        $('#numResult').html(0);
        $('#resultMapa').hide('fast');
        $('#resultados').append('<tr><td colspan="2">No se han encontrado resultados</td></tr>');
    }
    $('.progress').hide();
}

function createMarker(place) {
    var id = place.id;
    var placeLoc = place.name;
    var vicinity = place.formatted_address;
    var lats = place.geometry.location;

    $('.tooltipped').tooltip();

    var html = '<tr>';
    html += '<td><strong id="name_' + id + '">' + placeLoc + '</strong><br><font style="font-size: 12px;" id="add_' + id + '">' + vicinity + '</font></td>';
    html += '<td><a class="orange-text tooltipped" data-position="left" data-tooltip="Ver Ubicación" href="javascript:openMap(\'' + lats + '\',\'' + id + '\')"><i class="fa fa-map-o"><i></a></td>';
    html += '</tr>';
    $('#resultados').append(html);

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                ' ' + place.formatted_address + '</div>');
        infowindow.open(map, this);
    });
}

function openMap(location, id) {
    $('#modal1').modal('open');

    var name = $('#name_' + id).html();
    var formatted_address = $('#add_' + id).html();
    $('#nameDet').html('<strong>' + name + '</strong><br><font style="font-size: 12px;">' + formatted_address + '</font>');
    cargarPosicionDetalle(location, id);
}

function cargarPosicionDetalle(location, id) {

    var locat = location.replace('(', '').replace(')', '');
    locat = locat.split(',');
    var lat = locat[0];
    var lng = locat[1];

    var map = new google.maps.Map(document.getElementById('mapaDet'),
            {
                zoom: 17,
                center: new google.maps.LatLng(lat, lng)
            });

    var marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(lat, lng)
    });

    var name = $('#name_' + id).html();
    var formatted_address = $('#add_' + id).html();

    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function () {
        //toggleBounce();
        infowindow.setContent('<div><strong>' + name + '</strong><br>' +
                ' ' + formatted_address + '</div>');
        infowindow.open(map, this);
    });
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