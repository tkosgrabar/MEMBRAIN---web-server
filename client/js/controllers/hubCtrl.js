membrainApp.controller('HubCtrl',
    [
        '$scope',
        '$location',
        'HttpService',
        function ($scope, $location, httpService) {
            $scope.init = function() {
                httpService.get('api/hub/status', true,
                    function (data, status, headers, config) {
                        console.log(data.status);
                        $scope.status = data.status;
                        $scope.timestamp = data.timestamp;
                    },
                    function (error, status, headers, config) {
                        if (status == 401) {
                            $location.url('/login');
                        }
                    }
                );
            };
        }
    ]
);