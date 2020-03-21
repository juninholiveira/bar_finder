// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Primeiro passo: Pegar as coordenadas do usuário

//Inicializa globalmente a variável que vai armazenar o objeto com as coordenadas do usuário
let userCoords

//Chama a função que busca a localização atual
getLocation()


function getLocation()
{
    //Verifica se a geolocalização é suportada
    if(navigator.geolocation)
    {
        //Se der certo, executa o método 'getCurrentPosition', que chama a função 'showPosition'
        navigator.geolocation.getCurrentPosition(showPosition, showError)
    }
    else
    {
        //Senão, exibi uma mensagem de erro
        alert("Geolocalização não suportada.")
    }
}

//Essa é a função chamada pelo 'getCurrentPosition' em caso de sucesso
function showPosition(position)
{
    userCoords = {lat: position.coords.latitude, lng: position.coords.longitude}
}

//Função que trata dos erros caso o 'getCurrentPosition' retorne um erro
function showError(error) 
{
    switch(error.code) 
    {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
    }
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Função que inicializa o mapa
function initMap()
{
    //Opções de zoom e coordanadas pegas pela geolocalização e o estilo de mapa em JSON
    let options = 
    {
        zoom: 15,
        center: userCoords,
        styles: [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "featureType": "administrative",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "administrative.neighborhood",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#121212"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1b1b1b"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#494949"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8a8a8a"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#838383"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#676767"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#4e4e4e"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#2b7279"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3d3d3d"
                }
              ]
            }
          ]
    }

    //Cria o mapa e passa as opções
    map = new google.maps.Map(document.getElementById('map'), options)

    //Salvo nessa variável um objeto com a posição do usuário, para ficar mais fácil passar para o resquest em seguida
    let center = new google.maps.LatLng(userCoords.lat, userCoords.lng)

    //Aqui eu defino os detalhes do que eu vou procurar
    let request = {location: center, radius: 10000, types: ['bar', 'restaurant']}

    //Cria a variável que vai guardar os dados da InfoWindow de cada marcador
    infoWindow = new google.maps.InfoWindow()

    //Crio um serviço de Places e faço a busca, chamando o método callback
    let service = new google.maps.places.PlacesService(map)
    service.nearbySearch(request, nearbyCallback)

    function nearbyCallback(results, status)
    {
        if(status == google.maps.places.PlacesServiceStatus.OK)
        {
            for (let i = 0; i < results.length; i++)
            {
                addMarker(results[i])
            }
        }
    }

    //Método que adiciona um marcador no mapa para o lugar recebido como parametro
    function addMarker(place)
    {
        //Adiciona o marcador
        let marker = new google.maps.Marker({map: map, position: place.geometry.location})

        let placeRequest = {placeId: place.id, fields: ['name', 'formatted_address', 'place_id', 'geometry']}
        service.getDetails(placeRequest, callback2)
        function callback2 (detailedPlace, status)
        {
            if (status == google.maps.places.PlacesServiceStatus.OK) 
            {
                console.log(detailedPlace);
            }
        }

        //Adiciona um Listener de click no marcador e define o conteúdo do infoWindow
        google.maps.event.addListener
        (
            marker,
            'click',
            function() 
            {
                infoWindow.setContent
                (
                    //place.name
                    `<h1>${place.name}</h1>
                    <br><p>${detailedPlace.formatted_address}</p>
                    `
                )
                infoWindow.open(map, this)
            }
        )

    }
}