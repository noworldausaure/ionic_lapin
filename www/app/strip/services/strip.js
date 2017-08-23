angular.module('starter.services')
  .factory("Strip", function(Api) {
    return {
      returnNthStrips: function($http, domain, number, offset) {
        offset = typeof offset !== 'undefined' ? offset : 0;
        return $http.get(`${Api.baseUrl}strips/${domain}/${number}/${offset}`, {
          cache: true
        });
      },
      returnAllStrips: function($http, domain) {
        return $http.get(`${Api.baseUrl}strips/${domain}`, {
          cache: true
        });
      },
      returnStripsByStories: function($http, domain, id) {
        return $http.get(`${Api.baseUrl}strips/stories/${domain}/${id}`, {
          cache: true
        });
      },
      returnStripImage: function($http, domain, id) {
        return $http.get(`${Api.baseUrl}strips/image/${domain}/${id}`, {
          cache: true
        });
      }
    };
  });