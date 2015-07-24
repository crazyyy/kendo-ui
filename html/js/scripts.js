function ParseJson(e){for(var t=0;t<e.response.venues.length;t++){var o=e.response.venues[t];dataStFull.push({name:o.name,latlng:[o.location.lat,o.location.lng],distance:o.location.distance,address:o.location.formattedAddress,city:o.location.city,id:o.id,catName:o.categories[0].name,catImage:o.categories[0].icon.prefix+"32"+o.categories[0].icon.suffix,shape:"pinTarget"})}return DataImageAdd(dataStFull),dataStFull}function DataImageAdd(e){console.log("test");for(var t=0;t<e.length;t++){var o="https://api.foursquare.com/v2/venues/"+e[t].id+"/photos?oauth_token="+fsqToken+"&v=20150724";$.getJSON(o,function(e,t,o){if("success"!==t)return alert("Request Img from Foursquare failed");var a=e.response.photos.items;a.length>10&&(a.length=10);for(var r=0;r<a.length;r++)photoA=a[r],console.log(photoA.id.length),photosArr.push({idImaget:photoA.id,prefix:photoA.prefix,suffix:photoA.suffix,width:photoA.width,height:photoA.height,cropedImg:photoA.prefix+"300x300"+photoA.suffix,fullImg:photoA.prefix+photoA.width+"x"+photoA.height+photoA.suffix})})}}function ParseImage(){var e="https://api.foursquare.com/v2/venues/"+id+"/photos?oauth_token="+fsqToken+"&v=20150724";console.log("start test"),$.getJSON(e,function(e,t){if("success"!==t)return alert("Request Img from Foursquare failed");for(var o=0;o<e.response.photos.items.length;o++)photoA=e.response.photos.items[o],photosArr.push({idObject:id,idImaget:photoA.id,prefix:photoA.prefix,suffix:photoA.suffix,width:photoA.width,height:photoA.height,cropedImg:photoA.prefix+"300x300"+photoA.suffix,fullImg:photoA.prefix+photoA.width+"x"+photoA.height+photoA.suffix}),console.log(photosArr.length);console.log(photosArr.length)})}function ParseAndBuildMap(e,t){var o="https://api.foursquare.com/v2/venues/search?client_id="+fsqId+"&client_secret="+fsqSecret+"&v=20150717&ll=cordCenter&query=searchQuery&callback=?".replace("searchQuery",searchQuery);$.getJSON(o.replace("cordCenter",e+","+t),function(o,a){if("success"!==a)return alert("Request to Foursquare failed");ParseJson(o);var r=new kendo.data.DataSource({data:dataStFull});MapDrawer(e,t,r)})}function MakeMarkers(e){return makedMarkers={type:"marker",dataSource:e,locationField:"latlng",titleField:"name",shape:"green",city:"city",tooltip:{content:function(e){var t=(e.sender.marker,kendo.template("HTML tags are encoded: #: html #")),o={html:"<strong>#= marker.dataItem.city #</strong>"};return t(o)}}},makedMarkers}function MapDrawer(e,t,o){$("#map").kendoMap({center:[parseFloat(e),parseFloat(t)],zoom:14,layers:[{type:"tile",urlTemplate:"http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png",subdomains:["a","b","c"],attribution:'&cop;y <a href="http://osm.org/copyright">OpenStreetMap contributors</a>.Tiles courtesy of <a href="http://www.opencyclemap.org/">Andy Allan</a>'},MakeMarkers(o)],markerClick:OnClickMarker})}function SearchAndReplaceData(e){for(var t in window.dataStFull)if(window.dataStFull[t].id===e){window.dataStFull[t].shape="pin",console.log(window.dataStFull[t]);break}}function OnClickMarker(e){var t=e.marker,o=t.dataItem.id;SearchAndReplaceData(o)}function OnClickMap(e){var t=parseFloat(e.location.lat),o=parseFloat(e.location.lng);ParseAndBuildMap(t,o)}function GoogleMapAutocomplite(){var e=document.getElementById("searchTextField"),t=new google.maps.places.Autocomplete(e);google.maps.event.addListener(t,"place_changed",function(){var e=t.getPlace();window.centerLat=e.geometry.location.lat(),window.centerLng=e.geometry.location.lng(),ParseAndBuildMap(centerLat,centerLng)})}function GetCurrentLocation(){function e(e){var t=e.coords,o=t.latitude,a=t.longitude;ParseAndBuildMap(o,a)}function t(e){console.warn("ERROR("+e.code+"): "+e.message)}if(searchInput.value="",searchInput.innerHTML="",ParseAndBuildMap(centerLat,centerLng),Modernizr.geolocation){navigator.geolocation.getCurrentPosition(e,t,o);var o={enableHighAccuracy:!0,timeout:5e3,maximumAge:0}}else console.log("location error")}function concatResult(){var e=document.getElementById("sumResult");e.checked?(window.dataStFull=[],console.log("clear data array ")):console.log("not cheked, do not clear array with result")}function CompareObjectsInArray(e,t){return e.distance<t.distance?-1:e.distance>t.distance?1:0}function Nearest(e){e.sort(CompareObjectsInArray);for(var t=document.getElementById("nearestContainer"),o="<tr>\n    <th>Відстань (м.)</th>\n    <th>Назва закладу</th>\n    <th>Адреса</th>\n  </tr>",a=0;a<e.length;a++)console.log(e[a].name),console.log(),o+="<tr>\n      <td>"+e[a].distance+"</td>\n      <td>"+e[a].name+"</td>\n      <td>"+e[a].address+"</td>\n    </tr>";t.innerHTML=o}var fsqId="2TVA3RGPADXOJJPZY4VBRWZPJ0GNBLLKLMGEL1VTARBDJ1TV",fsqSecret="FK40OEGZ1ODV1GM1C0SYMB3QYN5LYECMJ0L0JGJWRXAB5WQS",fsqToken="Y5YF5D0YOTAN0LSUOXTWLQJ231HABSAF3ZXJDUEWP45VH1HJ",centerLat="49.233083",centerLng="28.46821699999998",dataStFull=[],photosArr=[],searchQuery="restaurant",searchButton=document.getElementById("goSearch"),goHomeButton=document.getElementById("goHome"),searchInput=document.getElementById("searchCategories"),nearest=document.getElementById("nearest");$("#searchCategories").kendoAutoComplete({dataTextField:"name",dataSource:{type:"json",transport:{read:"content/cat.json"}},minLength:1,filter:"startswith",placeholder:"Категорія об'єкту (напр. ресторан, бар...)"}),searchButton.addEventListener("click",function(){concatResult(),searchQuery=searchInput.value,window.workUri="https://api.foursquare.com/v2/venues/search?client_id="+fsqId+"&client_secret="+fsqSecret+"&v=20150717&ll=cordCenter&query=searchQuery&callback=?".replace("searchQuery",searchQuery),ParseAndBuildMap(centerLat,centerLng,searchQuery)},!1),goHomeButton.addEventListener("click",function(){GetCurrentLocation()},!1),nearest.addEventListener("click",function(){Nearest(dataStFull)},!1),google.maps.event.addDomListener(window,"load",GoogleMapAutocomplite),$(document).ready(GetCurrentLocation);