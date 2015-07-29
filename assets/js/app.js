var KendoMap = angular.module('KendoMapModule', ['kendo.directives']);

KendoMap.controller('KendoMapCtrl', function($scope, $window){

  // set map height - 100%, working with resize
  var w = angular.element($window);
  $scope.getHeight = function() {
    return w.height();
  };
  $scope.$watch($scope.getHeight, function(newValue, oldValue) {
    $scope.windowHeight = newValue;
    $scope.style = function() {
      return {
        height: newValue + 'px'
      };
    };
  });
  w.bind('resize', function () {
    $scope.$apply();
  });


  // try to get current location





// $scope.markers = new kendo.data.DataSource({

//     transport: {

//         read: function (options) {

//             return $http.get('https://api.foursquare.com/v2/venues/explore?ll=49.233083,28.46821699999998&oauth_token=Y5YF5D0YOTAN0LSUOXTWLQJ231HABSAF3ZXJDUEWP45VH1HJ&v=20150726')
//                 .success(function (data) {

//                     options.success(data);
//                     alert('sdadas')

//                 })
//                 .error(function () {
//                     return;
//                 });

//             console.log("mmm");
//         }

//     }

// });


  $scope.markers = new kendo.data.DataSource({
    // transport: {
    //   read: {
    //     url: "content/store-locations.json",
    //     dataType: "json"
    //   }
    // }

transport: {
      read: function (options) {

          $http.get('https://api.foursquare.com/v2/venues/explore?ll=49.233083,28.46821699999998&oauth_token=Y5YF5D0YOTAN0LSUOXTWLQJ231HABSAF3ZXJDUEWP45VH1HJ&v=20150726').success(function (data) {

            var venues = data.response.venues;

console.log("ssss");
console.log(venues);

            // angular.forEach(venues, function(d) {
            //       $scope.companiesGridOptions.dataSource.add(d);
            //   });

          });
      }
  }


  });

})





