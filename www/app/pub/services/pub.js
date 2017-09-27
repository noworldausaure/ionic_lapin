function Pub($http, Api) {

    return {
        returnPubByDomain: function (domain) {

            return $http.get(`${Api.baseUrl}pub/domain/${domain}`);
        },
        returnLapinPub: function () {

            return $http.get(`${Api.baseUrl}pub/general`);
        }
    };
}

angular.module('starter.services')
    .factory("Pub", Pub);