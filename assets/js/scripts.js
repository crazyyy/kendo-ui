/*
 *
 *
 */

/*
 *  SET VARIABLES
 */

// FSQ auth
var fsqId = '2TVA3RGPADXOJJPZY4VBRWZPJ0GNBLLKLMGEL1VTARBDJ1TV',
  fsqSecret = 'FK40OEGZ1ODV1GM1C0SYMB3QYN5LYECMJ0L0JGJWRXAB5WQS',
  fsqToken = 'Y5YF5D0YOTAN0LSUOXTWLQJ231HABSAF3ZXJDUEWP45VH1HJ';

// defaults
var centerLat = '49.233083', // default lat, lng
  centerLng = '28.46821699999998',
  dataStFull = [],
  photosArr = [],
  searchQuery = 'restaurant'; // default search query

// buttons
var searchButton = document.getElementById('goSearch'); // search buuton
var goHomeButton = document.getElementById('goHome'); // current position
var nearest = document.getElementById('nearest'); //
// inputs
var searchInput = document.getElementById('searchCategories'); // input for category search

// FSQ API URI
var SuriWork = 'https://api.foursquare.com/v2/venues/search?client_id=fsqId&client_secret=fsqSecret&v=20150717&ll=centerLat,centerLng&query=searchQuery&callback=?';
var uriWork = 'https://api.foursquare.com/v2/venues/search?client_id=' + fsqId + '&client_secret=' + fsqSecret + '&v=20150717&ll=cordCenter&query=searchQuery&callback=?';
var uriRecommendation = 'https://api.foursquare.com/v2/venues/explore?ll=centerLat,centerLng&oauth_token=fsqToken&v=20150726';
// var uriImage = 'https://api.foursquare.com/v2/venues/' + idD + '/photos?oauth_token=' + fsqToken + '&v=20150724' !!!

/*
 * Design
 */

// Get user window height and width. Set map size
function MapSetSize() {
  if (typeof(window.innerWidth) == 'number') {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  } else {
    if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
      windowWidth = document.documentElement.clientWidth;
      windowHeight = document.documentElement.clientHeight;
    } else {
      if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
      }
    }
  }
  document.getElementById('map').style.width = windowWidth - 20 + 'px';
  document.getElementById('map').style.height = windowHeight - 20 + 'px';
  // set max height to aside with nearest object
  $('.aside-nearest').css('max-height', windowHeight + 'px');
}
MapSetSize();

// when window resized - change map size and redraw the map
window.onresize = function(event) {
  MapSetSize();
};

/*
 *  Functionality
 */

// when click search - run search function
searchButton.addEventListener('click', function() {
  SearchUserObject();
}, false);

// when press "Enter" at Search Object input - run search function
$(searchInput).keyup(function (e) {
  if (e.keyCode == 13) {
    SearchUserObject()
  }
});

// Search user defined object
function SearchUserObject() {
  concatResult();
  searchQuery = searchInput.value;
  window.uriWork = 'https://api.foursquare.com/v2/venues/search?client_id=' + fsqId + '&client_secret=' + fsqSecret + '&v=20150717&ll=cordCenter&query=searchQuery&callback=?'.replace('searchQuery', searchQuery);
  ParseAndBuildMap(centerLat, centerLng, searchQuery);
}

// On click - center map to current user position
goHomeButton.addEventListener('click', function() {
  GetCurrentLocation();
}, false);

// Display block (aside) with lists of nearest objects
nearest.addEventListener('click', function() {
  Nearest(dataStFull);
}, false);

// Add previos reslt to new search
function concatResult() {
  var checkBut = document.getElementById('sumResult');
  if (checkBut.checked) {
    console.log('clear data array ');
  } else {
    window.dataStFull = [];
    console.log('not cheked, do not clear array with result');
  }
}

// Display block with neares objects
function Nearest(dataStFull) {
  dataStFull.sort(CompareObjectsInArray);
  var nearestContainer = document.getElementById('nearestContainer');
  var html = '<tr><th> Відстань(м.) </th><th> Назва закладу </th><th> Адреса </th></tr>';
  for (var i = 0; i < dataStFull.length; i++) {
    html += ('<tr><td> ' + dataStFull[i].distance + ' </td><td> ' + dataStFull[i].name + ' </td><td> ' + dataStFull[i].address + ' </td></tr>');
  };
  $('.aside-nearest, #aside-nearest-close ').show();
  nearestContainer.innerHTML = html;
}

// hide main search widget
document.getElementById('aside-control-close').addEventListener('click', function() {
  $(this).toggleClass('aside-control-close-closed');
  $('.aside-control').toggleClass('aside-control-hide');
}, false);

// close nearest widget
document.getElementById('aside-nearest-close').addEventListener('click', function() {
  $('.aside-nearest, #aside-nearest-close ').hide();
}, false);

// Sort object by distance
function CompareObjectsInArray(a, b) {
  if (a.distance < b.distance) {
    return -1;
  } else if (a.distance > b.distance) {
    return 1;
  } else {
    return 0
  }
}


/*
 *
 *
 */




// function DataImageAdd(dataStFull) {
//   for (var ii = 0; ii < dataStFull.length; ii++) {
//     var idD = dataStFull[ii].id;
//     var uriImage = 'https://api.foursquare.com/v2/venues/' + idD + '/photos?oauth_token=' + fsqToken + '&v=20150724';
//     $.getJSON(uriImage, function(result, status, idD, ii) {

//       if (status !== 'success') return alert('Request Img from Foursquare failed');
//       var photosItems = result.response.photos.items;
//       if (photosItems.length > 10) {
//         photosItems.length = 10;
//       }

//       for (var i = 0; i < photosItems.length; i++) {
//         photoA = photosItems[i];
//         photosArr.push({
//           idData: idD.toString(),
//           idImaget: photoA.id,
//           prefix: photoA.prefix,
//           suffix: photoA.suffix,
//           width: photoA.width,
//           height: photoA.height,
//           cropedImg: photoA.prefix + '300x300' + photoA.suffix,
//           fullImg: photoA.prefix + photoA.width + 'x' + photoA.height + photoA.suffix
//         });

//         // dataStFull.push(photosArr)

//       }
//       console.log(photosArr);


//     }); // getJSON

//   }
// }




function ParseImage() {

  var uriImage = 'https://api.foursquare.com/v2/venues/' + id + '/photos?oauth_token=' + fsqToken + '&v=20150724';

  console.log('start test');
  $.getJSON(uriImage, function(result, status) {
    if (status !== 'success') return alert('Request Img from Foursquare failed');
    for (var i = 0; i < result.response.photos.items.length; i++) {
      photoA = result.response.photos.items[i];
      photosArr.push({
        idObject: id,
        idImaget: photoA.id,
        prefix: photoA.prefix,
        suffix: photoA.suffix,
        width: photoA.width,
        height: photoA.height,
        cropedImg: photoA.prefix + '300x300' + photoA.suffix,
        fullImg: photoA.prefix + photoA.width + 'x' + photoA.height + photoA.suffix
      });

      console.log(photosArr.length);

    }
    console.log(photosArr.length);
  });

}



function MakeMarkers(dataSorces) {
  makedMarkers = {
    type: 'marker',
    dataSource: dataSorces,
    locationField: 'latlng',
    titleField: 'name',
    shape: 'green',
    city: 'city',
    // tooltip: {
    //   template: "Lon:#= location.lng #, Lat:#= name #"
    // }
    tooltip: {
      content: function(e) {
        var marker = e.sender.marker;
        var template = kendo.template("HTML tags are encoded: #: html #");
        var data = {
          html: "<strong>#= marker.dataItem.city #</strong>"
        };
        // return marker.dataItem.city;
        return template(data);
      }
    }
  };
  return makedMarkers;
}

function MapDrawer(centerLat, centerLng, dataSorces) {
  $("#map").kendoMap({
    center: [parseFloat(centerLat), parseFloat(centerLng)],
    zoom: 14,
    controls: {
      navigator: {
        position: "topRight"
      },
      zoom: {
        position: "topRight"
      }
    },
    layers: [{
        type: 'tile',
        urlTemplate: 'http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png',
        subdomains: ['a', 'b', 'c']
      },
      MakeMarkers(dataSorces)
    ],
    markerClick: OnClickMarker
      // click: OnClickMap,
  });
  // console.log(MakeMarkers(dataSorces));
} // MapDrawer

function SearchAndReplaceData(markerId) {
  for (var i in window.dataStFull) {
    if (window.dataStFull[i].id === markerId) {
      window.dataStFull[i].shape = 'pin';
      console.log(window.dataStFull[i]);
      break;
    }
  }
}

function OnClickMarker(e) {
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
  ParseAndBuildMap(centerLat, centerLng);
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
  var autocommit = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocommit, 'place_changed', function() {
    var place = autocommit.getPlace();
    window.centerLat = place.geometry.location.lat();
    window.centerLng = place.geometry.location.lng();

    ParseAndBuildMap(centerLat, centerLng);
  });
} // GoogleMapAutocomplite





/*
 *  Dark Side
*/

// Get current user location
function GetCurrentLocation() {
  // chek deafault user coordinates
  if (Modernizr.geolocation) {
    navigator.geolocation.getCurrentPosition(success, options);
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    function success(pos) {
      var crd = pos.coords;
      // transfer current user coordinates to default
      window.centerLat = crd.latitude;
      window.centerLng = crd.longitude;
    }
  } else {
    console.log('location error');
  }
} // GetCurrentLocation

// Create working url
function CreateURI(centerLat, centerLng) {
  var uri = [];
  var ulr;
  // Check is the first load (#map clear)
  if ($('#map').hasClass('k-map') == false) {
    url = uriRecommendation.replace('centerLat', centerLat).replace('centerLng', centerLng).replace('fsqToken', fsqToken);
    uri.push({
      url: url,
      id: 'recomendation'
    })
  } else {
    url = SuriWork.replace('fsqId', fsqId).replace('fsqSecret', fsqSecret).replace('centerLat', centerLat).replace('centerLng', centerLng).replace('searchQuery', searchQuery);
    uri.push({
      url: url,
      id: 'default'
    })
  }

  // draw map. if in previos step we defined user coord - use it, else - used default center coordinates
  ParseAndBuildMap(uri, centerLat, centerLng);
}

// create started API URI from current user location (or default location) and parse
function ParseAndBuildMap(uri, centerLat, centerLng) {
  url = uri[0].url;
  statusId = uri[0].id;

  $.getJSON(url, function(result, status) {
    if (status !== 'success') return alert('Request to Foursquare failed');
    ParseJson(result, status, statusId);
    var dataSorces = new kendo.data.DataSource({
      data: dataStFull
    });
    MapDrawer(centerLat, centerLng, dataSorces);
  });
} // ParseAndBuildMap

function ParseJson(result, status) {

  if ( statusId == 'default' ) {
    for (var i = 0; i < result.response.venues.length; i++) {
      var venue = result.response.venues[i];
      dataStFull.push({
        name: venue.name,
        latlng: [venue.location.lat, venue.location.lng],
        distance: venue.location.distance,
        addressFull: venue.location.formattedAddress,
        address: venue.location.address,
        city: venue.location.city,
        id: venue.id,
        catName: venue.categories[0].name,
        catImage: venue.categories[0].icon.prefix + '32' + venue.categories[0].icon.suffix,
        shape: 'pinTarget'
        // shape : 'pin'
      });
    }
  } else if ( statusId == 'recomendation') {
    var tempItems = result.response.groups[0].items;
    for (var i = 0; i < tempItems.length; i++) {
      var venue = tempItems[i].venue;
      dataStFull.push({
        name: venue.name,
        latlng: [venue.location.lat, venue.location.lng],
        distance: venue.location.distance,
        addressFull: venue.location.formattedAddress,
        address: venue.location.address,
        city: venue.location.city,
        id: venue.id,
        catName: venue.categories[0].name,
        catImage: venue.categories[0].icon.prefix + '32' + venue.categories[0].icon.suffix,
        shape: 'pin'
        // shape : 'pin'
      });
    }
  } else {
    console.log('ERROR with URL');
  }

  console.log(dataStFull);

  return dataStFull;
}




function Map() {

  // try to define user coordinates
  GetCurrentLocation();
  // create api url
  CreateURI(centerLat, centerLng);




}

function SearchOnMap(centerLat, centerLng, searchQuery) {
  // create api url
  CreateURI(centerLat, centerLng, searchQuery);

}


$(document).ready(Map());
// $(document).ready(GetCurrentLocation);
// $(document).ready(DataImageAdd(dataStFull));



google.maps.event.addDomListener(window, 'load', GoogleMapAutocomplite);
