/// ***********
//  https://www.mapbox.com/mapbox.js/example/v1.0.0/places-from-foursquare/
/// ***********

// restaurant
// bar

var fsqId = '2TVA3RGPADXOJJPZY4VBRWZPJ0GNBLLKLMGEL1VTARBDJ1TV',
  fsqSecret = 'FK40OEGZ1ODV1GM1C0SYMB3QYN5LYECMJ0L0JGJWRXAB5WQS',
  centerLat = '49.233083',
  centerLng = '28.46821699999998',
  dataStFull = [],
  searchQuery = 'ресторан';



function ParseAndBuildMap(centerLat,centerLng) {
  var workUri = 'https://api.foursquare.com/v2/venues/search?client_id=' + fsqId + '&client_secret=' + fsqSecret + '&v=20150717&ll=cordCenter&query=searchQuery&callback=?'.replace('searchQuery',searchQuery);
  console.log(workUri);
  $.getJSON(workUri.replace('cordCenter',(centerLat + ',' + centerLng)), function(result, status) {

    if (status !== 'success') return alert('Request to Foursquare failed');
    for (var i = 0; i < result.response.venues.length; i++) {
      var venue = result.response.venues[i];
        dataStFull.push({
          name : venue.name,
          latlng : [venue.location.lat, venue.location.lng],
        });
    };

    var dataSorces = new kendo.data.DataSource({
      data: dataStFull
    });
    MapDrawer(centerLat,centerLng,dataSorces);
  });
} // ParseAndBuildMap

function MapDrawer(centerLat,centerLng,dataSorces) {
  $("#map").kendoMap({
    center: [parseFloat(centerLat),parseFloat(centerLng)],
    zoom: 14,
    layers: [{
      type: 'tile',
      urlTemplate: 'http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png',
      subdomains: ['a', 'b', 'c'],
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>.' + 'Tiles courtesy of <a href="http://www.opencyclemap.org/">Andy Allan</a>',
    },
    {
      type: "marker",
      dataSource: dataSorces,
      locationField: "latlng",
      titleField: 'name'
    }],
    click: OnClickMap
  });
} // MapDrawer

function OnClickMap(e) {
  var centerLat = parseFloat(e.location.lat),
  centerLng = parseFloat(e.location.lng);
  ParseAndBuildMap(centerLat,centerLng);
}; // OnClickMap

function GoogleMapAutocomplite() {
  var input = document.getElementById('searchTextField');
  var autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    var place = autocomplete.getPlace();
    var centerLat = place.geometry.location.lat(),
    centerLng = place.geometry.location.lng();

    ParseAndBuildMap(centerLat,centerLng);
  });
} // GoogleMapAutocomplite

function GetCurrentLocation() {
  ParseAndBuildMap(centerLat,centerLng);
  if (Modernizr.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    function success(pos) {
      var crd = pos.coords;

      var centerLat = crd.latitude,
      centerLng = crd.longitude;
      ParseAndBuildMap(centerLat,centerLng);
    };
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };
  } else {
    console.log('location error');
  }
}; // GetCurrentLocation

google.maps.event.addDomListener(window, 'load', GoogleMapAutocomplite);

$(document).ready(GetCurrentLocation);


var searchButton = document.getElementById('clicker');

searchButton.addEventListener('click', function() {
  var searchQuery = document.getElementById('searchCategories').value;
  console.log('--------');
  console.log(searchQuery);
  ParseAndBuildMap(centerLat,centerLng,searchQuery);
}, false);








