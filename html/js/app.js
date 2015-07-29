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








  $scope.markers = new kendo.data.DataSource({
    transport: {
      read: {
        url: "../content/dataviz/map/store-locations.json",
        dataType: "json"
      }
    }
  });

})
