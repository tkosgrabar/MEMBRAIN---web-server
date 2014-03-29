membrainApp.directive('ngMembrainMenu', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/views/menu.html',
        controller: ['$scope', '$location', function ($scope, $location) {
            $scope.menuItems = {
                sensors: {
                    name    : 'Sensors',
                    url     : '/sensors'
                },
                hub: {
                    name    : 'Hub',
                    url     : '/hub'
                }
            };

            $scope.onItemSelected = function(url) {
                $location.url(url);
            };

        }]
    }
});
