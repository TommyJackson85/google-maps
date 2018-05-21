//const axios = require('axios');

console.log("hello world!");
const locationForm = document.getElementById('location-form');
locationForm.addEventListener('submit', geocode);
let lat;
let lng;
let map;
var initialize = function(Lat, Lng) {
    //var center = new google.maps.LatLng(‎33.5204, 151.1226);
 /*   var center = new google.maps.LatLng(‎Lat, Lng);
    map = new google.maps.Map(document.getElementById('map'), {
      center: center, //{lat:33.5204, lng:151.1226},
      zoom: 13
    }); */

  var options = {
    center: {lat:Lat, lng:Lng},
    zoom: 13
  };

  map = new google.maps.Map(document.getElementById('map'), options); 

    var request = {
      location: options.center,
      radius: 8047,
      types: ['cafe']
    };
    console.log(request.location);

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status){
  if(status == google.maps.places.PlacesServiceStatus.OK){
    for(var i = 0; i < results.length; i++){
      createMarker(results[i]);
      console.log(results[i]);
          /*if(props.iconImage){
      marker.setIcon(props.iconImage)*/
    }
  }
}

function createMarker(place) {
  const iconImage = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  var infowindow = new google.maps.InfoWindow();
  var placeLoc = place.geometry.location;
 // console.log(placeLoc);
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, 'click', function(){
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

//google.maps.event.addDomListener(map, 'load', initialize);


function geocode(e){
  e.preventDefault();
  var location = document.getElementById('location-input').value;

  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address:location,
      key:'AIzaSyBPUql23u1EAJpikg4FOedC_jUEm-Xqcuo'
    }
  })
  .then(function(response){
    
    //log full response
    let formattedAddress = response.data.results[0].formatted_address;

   console.log(response.data.results);
    /*let formattedAddressOutput = `
      <ul class="list-group">
        <li class="list-group-item">${formattedAddress}</li>
      </ul> 
    `;*/
    let addressComponents = response.data.results[0].address_components;
   
    let addressComponentsOutput = '<ul class="list-group">';
    
    //output to app
    for(var i = 0; i < addressComponents.length; i++){
       console.log(addressComponents[i].types[0]);
      addressComponentsOutput += `
        <li class="list-group-item"><strong>${addressComponents[i].types[0]}:
        </strong>: ${addressComponents[i].long_name}</li>
      `;
    }
    addressComponentsOutput += '</ul>';
    console.log(lat);

    lat = response.data.results[0].geometry.location.lat;
      console.log(lat);
    lng = response.data.results[0].geometry.location.lng;
    var geomatryOutput = `
      <ul class="list-group">
        <li class="list-group-item"><strong>Latitude:</strong>${lat}</li>
        <li class="list-group-item"><strong>Longitude:</strong>${lng}</li>
      </ul> 
    `;
    document.getElementById('formatted-address').innerHTML = addressComponentsOutput;
    document.getElementById('geomatry').innerHTML = geomatryOutput;
     //initMap(lat,lng)
     initialize(lat, lng)
  })
  .catch(function(error){
    //formattd address
    console.log(error);
  });
}




/*var initMap = function(Lat,Lng){

  var options = {
      center: {lat:Lat, lng:Lng},
      zoom: 8
  };

  var map = new google.maps.Map(document.getElementById('map'), options); 

  google.maps.event.addListener(map, 'click', function(event){
    addMarker({coords:event.latLng});
  });

  const iconImage = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  
  const markers = [
    {
      coords:{lat:51.8969, lng:-6.4863},
      content:'<h1>Cork City</h1>'
    },
    {
      coords:{lat:53.3501, lng:-6.2662},
      content:'<h1>Dublin City</h1>'
    },
    {
      coords:{lat:53.2710, lng:-9.0627},
      content:'<h1>Galway City</h1>'
    },
  ];

  for(var i = 0; i < markers.length; i++){
    addMarker(markers[i])
  };

  function addMarker(props){
    var marker = new google.maps.Marker({
      position:props.coords,
      map:map,
    });
    console.log(props.coords);
    if(props.iconImage){
      marker.setIcon(props.iconImage)
    };
    if(props.content){
      var infoWindow = new google.maps.InfoWindow({
        content:props.content
      });
    } 
  }
}

//initMap(lat,lng)

*/
///https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBPUql23u1EAJpikg4FOedC_jUEm-Xqcuo


 /* markers.addListener('click', function(){

  }*/
  /*
   function initMap() {        // Create a map object and specify the DOM element for display.
        
        google.maps.event.addListener(map,'click', function(event){
          addMarker({coords:event.latLng});
        });

        var marker = new google.maps.Marker({
            position:{lat:42.4668,lng:-70.9495},
            map: map
        });
        var inforWindow = new google.maps.InfoWindow({
            content: '<h1>HelllOOO</h1>'
        });

        marker.addListener('click', function(){
          InfoWindow.open(map, marker);

        });
    }
*/
