angular.module('starter.services')
  .factory("Strip", function($http, CacheFactory, Api) {

    var stripCache;

    if (!CacheFactory.get('stripCache')) {

      stripCache = CacheFactory('stripCache', {
        maxAge: 60 * 60 * 1000,
        deleteOnExpire: 'aggressive',
        storageMode: 'localStorage'
      });

    }

    return {
      returnNthStrips: function(domain, number, offset) {
        offset = typeof offset !== 'undefined' ? offset : 0;

        return $http.get(`${Api.baseUrl}strips/${domain}/${number}/${offset}`, {
          cache: CacheFactory.get("stripCache")
        });
      },
      returnAllStrips: function(domain) {
        return $http.get(`${Api.baseUrl}strips/${domain}`, {
          cache: CacheFactory.get('stripCache')
        });
      },
      returnStripImage: function(domain, id) {
        return $http.get(`${Api.baseUrl}strips/image/${domain}/${id}`, {
          cache: CacheFactory.get('stripCache')
        });
      }
    };
  });
