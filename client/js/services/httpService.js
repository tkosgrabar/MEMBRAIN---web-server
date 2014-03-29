membrainApp.factory('HttpService',
    [
        '$http',
        '$cookies',
        function ($http, $cookies) {

            var baseUrl = "http://127.0.0.1:8080/";

            var GET = "GET";
            var POST = "POST";
            var PUT = "PUT";
            var DELETE = "DELETE";

            var makeRequest = function (method, url, body, useAuthHeader, onSuccess, onError) {

                var authorizationHeader = {};

                if(useAuthHeader == true) {
                    var token = $cookies['token'];
                    if(token) {
                        authorizationHeader = {
                            "Authorization": "MEMBRAIN " + token
                        };
                    }
                };

                var options = {
                    url:     baseUrl + url,
                    method:  method,
                    headers: authorizationHeader,
                    data:    body
                };

                $http(options)
                    .success(function (data, status, headers, config) {
                        if (onSuccess != undefined) {
                            onSuccess.call(this, data, status, headers, config);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        if (onError != undefined) {
                            onError.call(this, data, status, headers, config);
                        }
                    });
            };

            var get = function (url, useAuthHeader, onSuccess, onError) {
                makeRequest(GET, url, null, useAuthHeader, onSuccess, onError);
            };
            var post = function (url, body, useAuthHeader, onSuccess, onError) {
                makeRequest(POST, url, body, useAuthHeader, onSuccess, onError);
            };
            var put = function (url, body, useAuthHeader, onSuccess, onError) {
                makeRequest(PUT, url, body, useAuthHeader, onSuccess, onError);
            };
            var del = function (url, onSuccess, useAuthHeader, onError) {
                makeRequest(DELETE, url, null, useAuthHeader, onSuccess, onError);
            };

            return {
                get:    get,
                post:   post,
                put:    put,
                del:    del
            }
        }
    ]);