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
    let radius = 8000

    //Aqui eu defino os detalhes do que eu vou procurar
    let request = {location: center, radius: radius, types: ['bar', 'restaurant']}
    let request2 = {location: center, radius: radius, query: 'restaurante'}
    let request3 = {location: center, radius: radius, query: 'bar'}
    let request4 = {location: center, radius: radius, query: 'lanchonete'}
    let request5 = {location: center, radius: radius, query: 'fast-food'}
    let request6 = {location: center, radius: radius, query: 'churrasco'}
    let request7 = {location: center, radius: radius, query: 'hamburguer'}
    let request8 = {location: center, radius: radius, query: 'pizza'}

    //Cria a variável que vai guardar os dados da InfoWindow de cada marcador.
    //Ela é criada aqui fora da função de criar o marcador, para evitar de uma ficar aberta ao clicar em outra
    infoWindow = new google.maps.InfoWindow()

    //Crio um serviço de Places e faço a busca, chamando o método callback
    let service = new google.maps.places.PlacesService(map)
    service.nearbySearch(request, callback)
    service.textSearch(request2, callback)
    service.textSearch(request3, callback)
    service.textSearch(request4, callback)
    service.textSearch(request5, callback)
    service.textSearch(request6, callback)
    service.textSearch(request7, callback)
    service.textSearch(request8, callback)

    //Função chamada para adicionar um marcador com os resultados recebidos
    function callback(results, status)
    {
        if(status == google.maps.places.PlacesServiceStatus.OK)
        {
                addMarkers(results)
        }
    }

    //Método que adiciona um marcador no mapa em cada lugar recebido como parâmetro
    function addMarkers(places)
    {
        places.forEach
        (
            place => 
            {
                let marker = new google.maps.Marker({position: place.geometry.location, map: map, title: place.name})

                // Add click listener to each marker
                google.maps.event.addListener
                (
                    marker,
                    'click', () => 
                    {
                        let request = {placeId: place.place_id, fields: ['name', 'formatted_address', 'geometry', 'rating', 'website']}
        
                        /* Only fetch the details of a place when the user clicks on a marker.
                        * If we fetch the details for all place results as soon as we get
                        * the search response, we will hit API rate limits. */
                        service.getDetails
                        (
                            request,
                            (placeResult, status) => 
                            {
                                showDetails(placeResult, marker, status)
                            }
                        )
                    }
                )
            }
        )
    }

    // Builds an InfoWindow to display details above the marker
    function showDetails(placeResult, marker, status)
    {
        if (status == google.maps.places.PlacesServiceStatus.OK) 
        {
            //let rating = "None";
            if(placeResult.rating == undefined)
            {
                placeResult.rating = "Desconhecida"
            }
            if (placeResult.rating) rating = placeResult.rating;
            infoWindow.setContent
            (
                `<h1>${placeResult.name}</h1>
                <br><p>${placeResult.formatted_address}</p>
                <br><h2>Avaliação: ${placeResult.rating}</h2>`
            );
            infoWindow.open(marker.map, marker);
        }
        else
        {
            console.log('showDetails failed: ' + status);
        }
    }
}