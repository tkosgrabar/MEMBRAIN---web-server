membrainApp.controller('EditSensorsCtrl',
    [
        '$scope',
        '$location',
        '$routeParams',
        'HttpService',
        function ($scope, $location, $routeParams, httpService) {

            $scope.sensor = {};

            $scope.init = function () {
                var sensorId = $routeParams.sensorId;
                if (!sensorId) {
                    $scope.noSensor = true;
                };

                httpService.get('api/sensors/' + sensorId, true,
                    function (data, status, headers, config) {
                        console.log(data);
                        $scope.sensor = data;
                    },
                    function (error, status, headers, config) {
                        if (status == 401) {
                            $location.url('/login');
                        } else {
                            $scope.noSensor = true;
                        };
                    }
                );
            };

        }
    ]
);