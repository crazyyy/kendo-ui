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
  searchQuery = 'restaurant';

var searchButton = document.getElementById('goSearch');
var goHomeButton = document.getElementById('goHome');
var searchInput = document.getElementById('searchCategories');
var nearest = document.getElementById('nearest');

function ParseAndBuildMap(centerLat,centerLng) {
  var workUri = 'https://api.foursquare.com/v2/venues/search?client_id=' + fsqId + '&client_secret=' + fsqSecret + '&v=20150717&ll=cordCenter&query=searchQuery&callback=?'.replace('searchQuery',searchQuery);
  $.getJSON(workUri.replace('cordCenter',(centerLat + ',' + centerLng)), function(result, status) {
    if (status !== 'success') return alert('Request to Foursquare failed');
    for (var i = 0; i < result.response.venues.length; i++) {
      var venue = result.response.venues[i];
        dataStFull.push({
          name : venue.name,
          latlng : [venue.location.lat, venue.location.lng],
          distance : venue.location.distance,
          address : venue.location.formattedAddress
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

$("#searchCategories").kendoAutoComplete({
  dataTextField: "name",
  dataSource: {
    type: "json",
    transport: {
      read: "content/cat.json"
    }
  },
  minLength: 1,
  filter: "startswith",
  placeholder: "Категорія об'єкту"
});

function GoogleMapAutocomplite() {
  var input = document.getElementById('searchTextField');
  var autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    var place = autocomplete.getPlace();
    window.centerLat = place.geometry.location.lat(),
    window.centerLng = place.geometry.location.lng();

    ParseAndBuildMap(centerLat,centerLng);
  });
} // GoogleMapAutocomplite

function GetCurrentLocation() {
  searchInput.value = '';
  searchInput.innerHTML = '';
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

function concatResult() {
  var checkBut = document.getElementById('sumResult');
  if (checkBut.checked ) {
    window.dataStFull = []
    console.log('clear data array ');
  } else {
    console.log('not cheked, do not clear array with result');
  }
};

searchButton.addEventListener('click', function() {
  concatResult();
  searchQuery = searchInput.value;
  window.workUri = 'https://api.foursquare.com/v2/venues/search?client_id=' + fsqId + '&client_secret=' + fsqSecret + '&v=20150717&ll=cordCenter&query=searchQuery&callback=?'.replace('searchQuery',searchQuery);
  ParseAndBuildMap(centerLat,centerLng,searchQuery);
}, false);

goHomeButton.addEventListener('click', function() {
  GetCurrentLocation();
}, false);


nearest.addEventListener('click', function() {
  Nearest(dataStFull);
}, false);

function CompareObjectsInArray(a,b) {
  if ( a.distance < b.distance ) {
    return -1;
  } else if ( a.distance > b.distance ) {
    return 1;
  } else {
    return 0
  };
};

function Nearest(dataStFull) {
  dataStFull.sort(CompareObjectsInArray);
  var nearestContainer = document.getElementById('nearestContainer');
  var html = '<tr>
    <th>Відстань (м.)</th>
    <th>Назва закладу</th>
    <th>Адреса</th>
  </tr>';
  for ( var i = 0 ; i < dataStFull.length ; i++ ) {
    console.log(dataStFull[i].name);
    console.log();
    html  += ('<tr>
      <td>'+ dataStFull[i].distance + '</td>
      <td>'+ dataStFull[i].name + '</td>
      <td>'+ dataStFull[i].address + '</td>
    </tr>');
  };
  nearestContainer.innerHTML = html;
}


