// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Primeiro passo: Pegar as coordenadas do usuário

//Inicializa globalmente a variável que vai armazenar o objeto com as coordenadas do usuário
let userCoords

//Essa é a função chamada pelo 'getCurrentPosition' em caso de sucesso
function showPosition(position)
{
    userCoords = {lat: position.coords.latitude, lng: position.coords.longitude}
}

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

//Chama a função que busca a localização atual
getLocation()

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