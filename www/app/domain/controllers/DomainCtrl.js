function DomainCtrl($scope, $rootScope, $http, $stateParams, Domain, Strip, Story) {
  var domain = $stateParams.domain;
  $scope.loading = true;
  $scope.domain = domain;

  //GET INFO domain
  Domain.returnInfo($http, domain)
    .then(function(info) {
      $scope.info = info.data[0];
    });

  // GET STRIPS
  Strip.returnAllStrips($http, domain)
    .then(function(strips) {
      $scope.strips = strips.data;
      $scope.loading = false;
      $scope.strips.forEach(function(strip) {
        strip.domain = $scope.domain;
        stripImageLoader(strip);
      });
    });

  var stripImageLoader = function(strip) {
    strip.loading = true;
    Strip.returnStripImage($http, domain, strip.id)
      .then(function(stripImage) {
        strip.file = stripImage.data[0].file;
        strip.loading = false;
      });
  };

  // GET STORIES
  Story.returnStories($http, domain)
    .then(function(stories) {
      $scope.stories = stories.data;
    });

  // SHOW STORY FUNCTION
  $scope.showStory = function(storyId) {
    $scope.loading = true;
    $rootScope.idStories = storyId;
    if ($rootScope.idStories == 0) {
      Strip.returnAllStrips($http, domain)
        .then(function(strips) {
          $scope.loading = false;
          $scope.strips = strips.data;
        });
    } else {
      Strip.returnStripsByStories($http, domain, $rootScope.idStories)
        .then(function(strips) {
          $scope.loading = false;
          $scope.strips = strips.data;
        });
    }
  }
}

angular.module('starter.controllers')
  .controller('DomainCtrl', DomainCtrl);