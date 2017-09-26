angular.module('starter.services')
  .factory("Strip", function($http, CacheFactory, Api) {

    if (!CacheFactory.get('stripCache')) {

      CacheFactory('stripCache', {
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
      returnStripImage: function(domain, id) {

        return $http.get(`${Api.baseUrl}strips/image/${domain}/${id}`, {
          // cache: CacheFactory.get('stripCache')
        });
      }
    };
  });
