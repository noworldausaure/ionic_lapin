angular.module("starter.services")
  .factory("Story", function($http, CacheFactory, Api) {

    var storyCache;

    if (!CacheFactory.get('storyCache')) {

      stripCache = CacheFactory('storyCache', {
        maxAge: 60 * 60 * 1000,
        deleteOnExpire: 'aggressive',
        storageMode: 'localStorage'
      });

    }

    return {
      returnStories: function(domain) {
        return $http.get(`${Api.baseUrl}stories/${domain}`, {
          cache: CacheFactory.get('storyCache')
        })
      },
      returnStripsByStories: function(domain, id) {
        return stripCache.get(`${Api.baseUrl}strips/stories/${domain}/${id}`, {
          cache: CacheFactory.get('storyCache')
        });
      }
    }
  });
