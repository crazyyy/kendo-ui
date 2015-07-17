/// ***********
//  https://www.mapbox.com/mapbox.js/example/v1.0.0/places-from-foursquare/
/// ***********

// restaurant
// bar

var clientId = '2TVA3RGPADXOJJPZY4VBRWZPJ0GNBLLKLMGEL1VTARBDJ1TV',
  clientSecret = 'FK40OEGZ1ODV1GM1C0SYMB3QYN5LYECMJ0L0JGJWRXAB5WQS',
  centerLat = '49.239700299999996',
  centerLng = '28.4986431',
  cordCenter = centerLat + ',' + centerLng;

var workUri = 'https://api.foursquare.com/v2/venues/search?client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20150717&ll=cordCenter&query=ресторан&callback=?';

  console.log(centerLat);
  console.log(centerLng);
  console.log(parseFloat(centerLat));
  console.log(parseFloat(centerLng));


function KendoMapDraw(cordCenter,dataSorces,centerLat,centerLng) {

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
    click: onClick
  });
} // KendoMapDraw

function onClick(e) {
  var centerLat = parseFloat(e.location.lat),
  centerLng = parseFloat(e.location.lng),
  cordCenter = centerLat+','+centerLng;

  $.getJSON(workUri.replace('cordCenter',cordCenter), function(result, status) {
    var dataStFull = [];
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

    KendoMapDraw(cordCenter,dataSorces,centerLat,centerLng);
  });
}; // onClick


function DrawMarkers() {
  $.getJSON(workUri.replace('cordCenter',cordCenter), function(result, status) {
    var dataStFull = [];
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
    KendoMapDraw(cordCenter,dataSorces,centerLat,centerLng);
  });
};

function GetCurrentPosition() {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };
  navigator.geolocation.getCurrentPosition(success, error, options);
};


$(document).ready(GetCurrentPosition);
$(document).ready(DrawMarkers);

