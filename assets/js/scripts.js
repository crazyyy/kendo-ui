var fsqId = '2TVA3RGPADXOJJPZY4VBRWZPJ0GNBLLKLMGEL1VTARBDJ1TV',
  fsqSecret = 'FK40OEGZ1ODV1GM1C0SYMB3QYN5LYECMJ0L0JGJWRXAB5WQS',
  fsqToken = 'Y5YF5D0YOTAN0LSUOXTWLQJ231HABSAF3ZXJDUEWP45VH1HJ',
  centerLat = '49.233083',
  centerLng = '28.46821699999998',
  dataStFull = [],
  photosArr = [],
  searchQuery = 'restaurant';

var searchButton = document.getElementById('goSearch');
var goHomeButton = document.getElementById('goHome');
var searchInput = document.getElementById('searchCategories');
var nearest = document.getElementById('nearest');

function ParseJson(result) {
  for (var i = 0; i < result.response.venues.length; i++) {
    var venue = result.response.venues[i];

    dataStFull.push({
      name : venue.name,
      latlng : [venue.location.lat, venue.location.lng],
      distance : venue.location.distance,
      address : venue.location.formattedAddress,
      city : venue.location.city,
      id : venue.id,
      catName : venue.categories[0].name,
      catImage : venue.categories[0].icon.prefix + '32' + venue.categories[0].icon.suffix,
      shape : 'pinTarget'

      // shape : 'pin'
    });
  }

  DataImageAdd(dataStFull);

  return dataStFull;
}


function DataImageAdd(dataStFull) {
  for (var ii = 0; ii < dataStFull.length; ii++) {
    var idD = dataStFull[ii].id;
    var workImageUrl = 'https://api.foursquare.com/v2/venues/' + idD + '/photos?oauth_token=' + fsqToken + '&v=20150724';
      // console.log('DataID: ' + dataStFull[ii].id);
      console.log(ii);
      console.log('y ' + ii + '' + idD);

      $.getJSON(workImageUrl, function(result, status, idD, ii) {
        console.log('x ');
        console.log(idD);
        if (status !== 'success') return alert('Request Img from Foursquare failed');
        var photosItems = result.response.photos.items;
        if (photosItems.length > 10) {
          photosItems.length = 10;
        }

        for (var i = 0; i < photosItems.length; i++ ) {
          photoA = photosItems[i];
          photosArr.push({
            idData : idD.toString(),
            idImaget : photoA.id,
            prefix : photoA.prefix,
            suffix : photoA.suffix,
            width : photoA.width,
            height : photoA.height,
            cropedImg : photoA.prefix + '300x300' + photoA.suffix,
            fullImg : photoA.prefix + photoA.width + 'x' + photoA.height + photoA.suffix
          });

        // dataStFull.push(photosArr)

      }
      console.log(photosArr);


    }); // getJSON



  }
}




function ParseImage() {

  var workImageUrl = 'https://api.foursquare.com/v2/venues/' + id + '/photos?oauth_token=' + fsqToken + '&v=20150724';

  console.log('start test');
  $.getJSON(workImageUrl, function(result, status) {
    if (status !== 'success') return alert('Request Img from Foursquare failed');
    for (var i = 0; i < result.response.photos.items.length; i++ ) {
      photoA = result.response.photos.items[i];
      photosArr.push({
        idObject : id,
        idImaget : photoA.id,
        prefix : photoA.prefix,
        suffix : photoA.suffix,
        width : photoA.width,
        height : photoA.height,
        cropedImg : photoA.prefix + '300x300' + photoA.suffix,
        fullImg : photoA.prefix + photoA.width + 'x' + photoA.height + photoA.suffix
      });

      console.log(photosArr.length);

    }
    console.log(photosArr.length);
  });

}



// create started API URI from current user location (or default location) and parse
function ParseAndBuildMap(centerLat, centerLng) {
  var workUri = 'https://api.foursquare.com/v2/venues/search?client_id=' + fsqId + '&client_secret=' + fsqSecret + '&v=20150717&ll=cordCenter&query=searchQuery&callback=?'.replace('searchQuery',searchQuery);
  $.getJSON(workUri.replace('cordCenter',(centerLat + ',' + centerLng)), function(result, status) {
    if (status !== 'success') return alert('Request to Foursquare failed');
    ParseJson(result);
    var dataSorces = new kendo.data.DataSource({
      data: dataStFull
    });
    // console.log(dataSorces);
    MapDrawer(centerLat,centerLng,dataSorces);
  });
} // ParseAndBuildMap



function MakeMarkers (dataSorces) {
  makedMarkers = {
    type: 'marker',
    dataSource: dataSorces,
    locationField: 'latlng',
    titleField: 'name',
    shape : 'green',
    city : 'city',
    // tooltip: {
    //   template: "Lon:#= location.lng #, Lat:#= name #"
    // }
    tooltip: {
      content: function(e) {
        var marker = e.sender.marker;
        var template = kendo.template("HTML tags are encoded: #: html #");
        var data = { html: "<strong>#= marker.dataItem.city #</strong>" };
        // return marker.dataItem.city;
        return template(data);
      }
    }
  };
  return makedMarkers;
}



function MapDrawer(centerLat,centerLng,dataSorces) {
  $("#map").kendoMap({
    center: [parseFloat(centerLat),parseFloat(centerLng)],
    zoom: 14,
    layers: [{
      type: 'tile',
      urlTemplate: 'http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png',
      subdomains: ['a', 'b', 'c'],
      attribution: '&cop;y <a href="http://osm.org/copyright">OpenStreetMap contributors</a>.' + 'Tiles courtesy of <a href="http://www.opencyclemap.org/">Andy Allan</a>'
    },
    MakeMarkers(dataSorces)
    ],
    markerClick: OnClickMarker
    // click: OnClickMap,
  });
  // console.log(MakeMarkers(dataSorces));
} // MapDrawer

function SearchAndReplaceData (markerId) {
  for (var i in window.dataStFull) {
   if (window.dataStFull[i].id === markerId) {
    window.dataStFull[i].shape = 'pin';
    console.log(window.dataStFull[i]);
      break;
    }
  }
}

function OnClickMarker(e){
  var marker = e.marker,
  markerId = marker.dataItem.id;

SearchAndReplaceData(markerId);

  // console.log(marker.dataItem.name);
  // marker.dataItem.set("shape", "pin");
  // marker.dataItem.set("name", "pin");
  // console.log(marker);

}

function OnClickMap(e) {
  var centerLat = parseFloat(e.location.lat),
  centerLng = parseFloat(e.location.lng);
  ParseAndBuildMap(centerLat,centerLng);
} // OnClickMap

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
  placeholder: "Категорія об'єкту (напр. ресторан, бар...)"
});

function GoogleMapAutocomplite() {
  var input = document.getElementById('searchTextField');
  var autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    var place = autocomplete.getPlace();
    window.centerLat = place.geometry.location.lat();
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
    }
  } else {
    console.log('location error');
  }
} // GetCurrentLocation

function concatResult() {
  var checkBut = document.getElementById('sumResult');
  if (checkBut.checked ) {
    window.dataStFull = [];
    console.log('clear data array ');
  } else {
    console.log('not cheked, do not clear array with result');
  }
}

function CompareObjectsInArray(a,b) {
  if ( a.distance < b.distance ) {
    return -1;
  } else if ( a.distance > b.distance ) {
    return 1;
  } else {
    return 0
  }
}

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

google.maps.event.addDomListener(window, 'load', GoogleMapAutocomplite);

$(document).ready(GetCurrentLocation);
// $(document).ready(DataImageAdd(dataStFull));
;
