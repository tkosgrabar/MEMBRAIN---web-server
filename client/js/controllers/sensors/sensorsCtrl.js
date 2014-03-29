membrainApp.controller('SensorsCtrl',
    [
        '$scope',
        '$location',
        'HttpService',
        function ($scope, $location, httpService) {

            $scope.init = function () {
                httpService.get('api/sensors', true,
                    function (data, status, headers, config) {
                        console.log(data);
                        $scope.sensors = data;
                    },
                    function (error, status, headers, config) {
                        if (status == 401) {
                            $location.url('/login');
                        }
                    }
                );
            };

            $scope.onUpdate = function (sensor) {
                $location.url('/sensors/' + sensor.id);
            };

            $scope.onMeasurements = function (sensor) {
                $location.url('/measurements/' + sensor.id);
            };
        }
    ]
);