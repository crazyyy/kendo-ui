

var apiUrl = 'content/vn-locations.json';
var api2Url = 'content/vn.json';

function loadMarkers() {

  $.getJSON(apiUrl, function(data) {
    var i = 0,
    dataFull = [];
    for( i=0; i<data.length; i++ ){
      dataFull.push({
        name : data[i].name,
        latlng : data[i].latlng,
      });
    };

    var dl = new kendo.data.DataSource({
      data: dataFull
    });

    $("#map").kendoMap({
        center: [49.22623440491784,28.446919692124307],
        zoom: 14,
      layers: [{
        type: 'tile',
        urlTemplate: 'http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png',
        subdomains: ['a', 'b', 'c'],
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>.' + 'Tiles courtesy of <a href="http://www.opencyclemap.org/">Andy Allan</a>',
        },
        {
          type: "marker",
          dataSource: dl,
          locationField: "latlng",
          titleField: 'name'
        }

        ]
    });

  });

};

/// ***********
//  https://www.mapbox.com/mapbox.js/example/v1.0.0/places-from-foursquare/
/// ***********


var testURI = 'https://api.foursquare.com/v2/venues/search?ll=49.22,28.44&oauth_token=Y5YF5D0YOTAN0LSUOXTWLQJ231HABSAF3ZXJDUEWP45VH1HJ&v=20150717&query=sushi'


// Create a Foursquare developer account: https://developer.foursquare.com/
// NOTE: CHANGE THESE VALUES TO YOUR OWN:
// Otherwise they can be cycled or deactivated with zero notice.
var CLIENT_ID = 'L4UK14EMS0MCEZOVVUYX2UO5ULFHJN3EHOFVQFSW0Z1MSFSR';
var CLIENT_SECRET = 'YKJB0JRFDPPSGTHALFOEP5O1NDDATHKQ2IZ5RO2GOX452SFA';

// https://developer.foursquare.com/start/search
var API_ENDPOINT = 'https://api.foursquare.com/v2/venues/search' +
  '?client_id=CLIENT_ID' +
  '&client_secret=CLIENT_SECRET' +
  '&v=20130815' +
  '&ll=LATLON' +
  '&query=coffee' +
  '&callback=?';



// Use jQuery to make an AJAX request to Foursquare to load markers data.
$.getJSON(testURI, function(result, status) {
  dataStFull = [];
  if (status !== 'success') return alert('Request to Foursquare failed');

  // Transform each venue result into a marker on the map.
  for (var i = 0; i < result.response.venues.length; i++) {
    var venue = result.response.venues[i];
      dataStFull.push({
        name : venue.name,
        latlng : [venue.location.lat, venue.location.lng],
      });

  console.log(dataStFull);

      // var latlng = latLng(venue.location.lat, venue.location.lng);


      // var marker = L.marker(latlng, {
      //     icon: L.mapbox.marker.icon({
      //       'marker-color': '#BE9A6B',
      //       'marker-symbol': 'cafe',
      //       'marker-size': 'large'
      //     })
      //   })
      // .bindPopup('<strong><a href="https://foursquare.com/v/' + venue.id + '">' +
      //   venue.name + '</a></strong>')
      //   .addTo(foursquarePlaces);
    }


});





















$(document).ready(loadMarkers);
