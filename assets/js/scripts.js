

var apiUrl = 'content/vn-locations.json';

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

    console.log(dl);

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



    // $('#map').kendoMap({
    //   center: [49.22623440491784,28.446919692124307],
    //   zoom: 14,
    //   layers: [{
    //     type: 'tile',
    //     urlTemplate: 'http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png',
    //     subdomains: ['a', 'b', 'c'],
    //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>.' + 'Tiles courtesy of <a href="http://www.opencyclemap.org/">Andy Allan</a>'
    //   },
    //   {
    //     type: 'marker',
    //     dataSource: {
    //       data: [{
    //         latlng: [[49.22623440491784,28.446919692124307], [49.219627001532366,28.42785904275598]] ,
    //         name : ['Ashanti', 'Иль-де-Франс / ILe de France'],
    //       }]
    //     },
    //     locationField: 'latlng',
    //     titleField: 'name'
    //   }]
    // });
  });
};

$(document).ready(loadMarkers);
