function MapSetSize(){"number"==typeof window.innerWidth?(windowWidth=window.innerWidth,windowHeight=window.innerHeight):document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)?(windowWidth=document.documentElement.clientWidth,windowHeight=document.documentElement.clientHeight):document.body&&(document.body.clientWidth||document.body.clientHeight)&&(windowWidth=document.body.clientWidth,windowHeight=document.body.clientHeight),document.getElementById("map").style.width=windowWidth-20+"px",document.getElementById("map").style.height=windowHeight-20+"px",$(".aside-nearest").css("max-height",windowHeight+"px")}function SearchUserObject(){concatResult(),searchQuery=searchInput.value,window.uriWork="https://api.foursquare.com/v2/venues/search?client_id="+fsqId+"&client_secret="+fsqSecret+"&v=20150717&ll=cordCenter&query=searchQuery&callback=?".replace("searchQuery",searchQuery),ParseAndBuildMap(centerLat,centerLng,searchQuery)}function concatResult(){var e=document.getElementById("sumResult");e.checked?console.log("clear data array "):(window.dataStFull=[],console.log("not cheked, do not clear array with result"))}function Nearest(e){e.sort(CompareObjectsInArray);for(var t=document.getElementById("nearestContainer"),n="<tr><th> Відстань(м.) </th><th> Назва закладу </th><th> Адреса </th></tr>",o=0;o<e.length;o++)n+="<tr><td> "+e[o].distance+" </td><td> "+e[o].name+" </td><td> "+e[o].address+" </td></tr>";$(".aside-nearest, #aside-nearest-close ").show(),t.innerHTML=n}function CompareObjectsInArray(e,t){return e.distance<t.distance?-1:e.distance>t.distance?1:0}function ParseJson(e){for(var t=0;t<e.response.venues.length;t++){var n=e.response.venues[t];dataStFull.push({name:n.name,latlng:[n.location.lat,n.location.lng],distance:n.location.distance,addressFull:n.location.formattedAddress,address:n.location.address,city:n.location.city,id:n.id,catName:n.categories[0].name,catImage:n.categories[0].icon.prefix+"32"+n.categories[0].icon.suffix,shape:"pinTarget"})}return dataStFull}function ParseImage(){var e="https://api.foursquare.com/v2/venues/"+id+"/photos?oauth_token="+fsqToken+"&v=20150724";console.log("start test"),$.getJSON(e,function(e,t){if("success"!==t)return alert("Request Img from Foursquare failed");for(var n=0;n<e.response.photos.items.length;n++)photoA=e.response.photos.items[n],photosArr.push({idObject:id,idImaget:photoA.id,prefix:photoA.prefix,suffix:photoA.suffix,width:photoA.width,height:photoA.height,cropedImg:photoA.prefix+"300x300"+photoA.suffix,fullImg:photoA.prefix+photoA.width+"x"+photoA.height+photoA.suffix}),console.log(photosArr.length);console.log(photosArr.length)})}function ParseAndBuildMap(e,t){var n="https://api.foursquare.com/v2/venues/search?client_id="+fsqId+"&client_secret="+fsqSecret+"&v=20150717&ll=cordCenter&query=searchQuery&callback=?".replace("searchQuery",searchQuery);$.getJSON(n.replace("cordCenter",e+","+t),function(n,o){if("success"!==o)return alert("Request to Foursquare failed");ParseJson(n);var a=new kendo.data.DataSource({data:dataStFull});MapDrawer(e,t,a)})}function MakeMarkers(e){return makedMarkers={type:"marker",dataSource:e,locationField:"latlng",titleField:"name",shape:"green",city:"city",tooltip:{content:function(e){var t=(e.sender.marker,kendo.template("HTML tags are encoded: #: html #")),n={html:"<strong>#= marker.dataItem.city #</strong>"};return t(n)}}},makedMarkers}function MapDrawer(e,t,n){$("#map").kendoMap({center:[parseFloat(e),parseFloat(t)],zoom:14,controls:{navigator:{position:"topRight"},zoom:{position:"topRight"}},layers:[{type:"tile",urlTemplate:"http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png",subdomains:["a","b","c"]},MakeMarkers(n)],markerClick:OnClickMarker})}function SearchAndReplaceData(e){for(var t in window.dataStFull)if(window.dataStFull[t].id===e){window.dataStFull[t].shape="pin",console.log(window.dataStFull[t]);break}}function OnClickMarker(e){var t=e.marker,n=t.dataItem.id;SearchAndReplaceData(n)}function OnClickMap(e){var t=parseFloat(e.location.lat),n=parseFloat(e.location.lng);ParseAndBuildMap(t,n)}function GoogleMapAutocomplite(){var e=document.getElementById("searchTextField"),t=new google.maps.places.Autocomplete(e);google.maps.event.addListener(t,"place_changed",function(){var e=t.getPlace();window.centerLat=e.geometry.location.lat(),window.centerLng=e.geometry.location.lng(),ParseAndBuildMap(centerLat,centerLng)})}function GetCurrentLocation(){function e(e){var t=e.coords;window.centerLat=t.latitude,window.centerLng=t.longitude}if(Modernizr.geolocation){navigator.geolocation.getCurrentPosition(e,t);var t={enableHighAccuracy:!0,timeout:5e3,maximumAge:0}}else console.log("location error")}function Map(){GetCurrentLocation(),ParseAndBuildMap(centerLat,centerLng)}var fsqId="2TVA3RGPADXOJJPZY4VBRWZPJ0GNBLLKLMGEL1VTARBDJ1TV",fsqSecret="FK40OEGZ1ODV1GM1C0SYMB3QYN5LYECMJ0L0JGJWRXAB5WQS",fsqToken="Y5YF5D0YOTAN0LSUOXTWLQJ231HABSAF3ZXJDUEWP45VH1HJ",centerLat="49.233083",centerLng="28.46821699999998",dataStFull=[],photosArr=[],searchQuery="restaurant",searchButton=document.getElementById("goSearch"),goHomeButton=document.getElementById("goHome"),nearest=document.getElementById("nearest"),searchInput=document.getElementById("searchCategories"),uriRecommendation="https://api.foursquare.com/v2/venues/explore?ll="+centerLat+","+centerLng+"&oauth_token="+fsqToken+"&v=20150726";MapSetSize(),window.onresize=function(e){MapSetSize()},searchButton.addEventListener("click",function(){SearchUserObject()},!1),$(searchInput).keyup(function(e){13==e.keyCode&&SearchUserObject()}),goHomeButton.addEventListener("click",function(){GetCurrentLocation()},!1),nearest.addEventListener("click",function(){Nearest(dataStFull)},!1),document.getElementById("aside-control-close").addEventListener("click",function(){$(this).toggleClass("aside-control-close-closed"),$(".aside-control").toggleClass("aside-control-hide")},!1),document.getElementById("aside-nearest-close").addEventListener("click",function(){$(".aside-nearest, #aside-nearest-close ").hide()},!1),$("#searchCategories").kendoAutoComplete({dataTextField:"name",dataSource:{type:"json",transport:{read:"content/cat.json"}},minLength:1,filter:"startswith",placeholder:"Категорія об'єкту (напр. ресторан, бар...)"}),$(document).ready(Map()),google.maps.event.addDomListener(window,"load",GoogleMapAutocomplite);