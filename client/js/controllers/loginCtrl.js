membrainApp.controller('LoginCtrl',
    [
        '$scope',
        '$location',
        '$cookies',
        'HttpService',
        function ($scope, $location, $cookies, httpService) {

            $scope.incorrectCredentials = false;

            $scope.onLogin = function() {
                var body = {
                    username : $scope.username,
                    password : $scope.password
                };

                httpService.post('authenticate', body, true,
                    function(data, status, headers, config) {
                        $scope.incorrectCredentials = false;
                        $cookies['token'] = data;
                        $location.url('/sensors');
                    },
                    function(error, status, headers, config) {
                        delete $cookies['token'];
                        $scope.incorrectCredentials = true;
                    }
                );
            }

        }
    ]
);