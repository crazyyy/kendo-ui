

var apiUrl = 'content/vn-locations.json';

function loadMarkers() {
  $.getJSON(apiUrl, function(data) {
    var i = 0,
      dataName = [],
      dataLtLg = [],
      dataFull = [];
    for( i=0; i<data.length; i++ ){
      dataName.push(data[i].name),
      dataLtLg.push(data[i].latlng),
      dataFull.push( '{' + 'latlng: ' + data[i].latlng + ',' + 'name: ' + data[i].name + '}' );
    };

    console.log(dataFull);

    $('#map').kendoMap({
      center: [49.21596533483571, 28.40863362665015],
      zoom: 14,
      layers: [{
        type: 'tile',
        urlTemplate: 'http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png',
        subdomains: ['a', 'b', 'c'],
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>.' + 'Tiles courtesy of <a href="http://www.opencyclemap.org/">Andy Allan</a>'
      },
      {
        type: 'marker',
        dataSource: {
          data: [{
            latlng: dataFull,
            name : dataFull
          }]
        },
        locationField: 'latlng',
        titleField: 'name'
      }]
    });
  });
};

$(document).ready(loadMarkers);
