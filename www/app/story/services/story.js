angular.module("starter.services")
  .factory("Story", function(Api) {
    return {
      returnStories: function($http, domain) {
        return $http.get(`${Api.baseUrl}stories/${domain}`, {
          cache: true
        });
      }
    }
  });
