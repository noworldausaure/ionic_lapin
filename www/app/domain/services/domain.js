angular.module('starter.services')
  .factory("Domain", function($http, CacheFactory, Api) {

    var domainCache;

    if (!CacheFactory.get('domainCache')) {

      domainCache = CacheFactory('domainCache', {
        maxAge: 24 * 60 * 60 * 1000,
        deleteOnExpire: 'aggressive',
        storageMode: 'localStorage'
      });

    }

    return {
      returnDomain: function() {
        return $http.get(`${Api.baseUrl}infoGeneral`, {
          cache: domainCache
        });
      },
      returnInfo: function(domain) {
        return $http.get(`${Api.baseUrl}info/${domain}`, {
          cache: domainCache
        });
      }
    };
  });
