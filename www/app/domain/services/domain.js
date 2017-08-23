angular.module('starter.services')
  .factory("Domain", function(Api) {
    return {
      returnDomain: function($http) {
        return $http.get(`${Api.baseUrl}infoGeneral`, {
          cache: true
        });
      },
      returnInfo: function($http, domain) {
        return $http.get(`${Api.baseUrl}info/${domain}`, {
          cache: true
        });
      }
    };
  });