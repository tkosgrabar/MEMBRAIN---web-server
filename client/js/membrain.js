var membrainApp = angular.module('membrain', ['ngCookies', 'ngRoute']);

membrainApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: 'js/views/login.html',
                controller: 'LoginCtrl'
            }).when('/sensors', {
                templateUrl: 'js/views/sensors/sensors.html',
                controller: 'SensorsCtrl'
            }).when('/sensors/:sensorId', {
                templateUrl: 'js/views/sensors/editSensors.html',
                controller: 'EditSensorsCtrl'
            }).when('/hub', {
                templateUrl: 'js/views/hub.html',
                controller: 'HubCtrl'
            }).otherwise({
                redirectTo: '/login'
            });
    }]
);
