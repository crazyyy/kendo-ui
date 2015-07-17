/// ***********
//  https://www.mapbox.com/mapbox.js/example/v1.0.0/places-from-foursquare/
/// ***********

var api2Url = 'content/vn.json';

var testURI = 'https://api.foursquare.com/v2/venues/search?ll=49.22,28.44&oauth_token=Y5YF5D0YOTAN0LSUOXTWLQJ231HABSAF3ZXJDUEWP45VH1HJ&v=20150717&query=coffee';

function BlowMarkers() {
  $.getJSON(testURI, function(result, status) {
    var dataStFull = [];

    if (status !== 'success') return alert('Request to Foursquare failed');

    for (var i = 0; i < result.response.venues.length; i++) {
      var venue = result.response.venues[i];

      dataStFull.push({
        name : venue.name,
        latlng : [venue.location.lat, venue.location.lng],
      });

    };

    var dl = new kendo.data.DataSource({
      data: dataStFull
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
      }]
    });
  });
};

















$(document).ready(BlowMarkers);
