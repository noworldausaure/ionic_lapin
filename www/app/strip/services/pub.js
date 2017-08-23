angular.module('starter.services')
  .factory("Pub", function(Api) {
    return {
      returnPubByDomain: function($http, domain) {
        return $http.get(`${Api.baseUrl}pub/domain/${domain}`, {
          cache: true
        });
      },
      returnLapinPub: function($http) {
        return $http.get(`${Api.baseUrl}pub/general`, {
          cache: true
        });
      }
    };
  });