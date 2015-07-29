    angular.module("KendoDemos", [ "kendo.directives" ])
        .controller("MyCtrl", function($scope){
            $scope.onPanEnd = function(e) {
                kendoConsole.log(kendo.format("event :: panEnd ({0})", e.center));
            };

            $scope.markers = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "../content/dataviz/map/store-locations.json",
                        dataType: "json"
                    }
                }
            });
        })
