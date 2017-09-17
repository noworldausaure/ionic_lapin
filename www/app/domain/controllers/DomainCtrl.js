function DomainCtrl($scope, $rootScope, $stateParams, Domain, Strip,) {

  const INITIAL_STRIPS_COUNT = 20;

  var domain = $stateParams.domain;
  $scope.loading = true;
  $scope.domain = domain;

  //GET INFO domain
  Domain.returnInfo(domain)
    .then(function(info) {

      $scope.info = info.data[0];
    });

  // Populate initial strips
  Strip.returnNthStrips(domain, INITIAL_STRIPS_COUNT, 0)
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
    Strip.returnStripImage(domain, strip.id)
      .then(function(stripImage) {

        strip.file = stripImage.data[0].file;
        strip.loading = false;
      });
  };
}

angular.module('starter.controllers')
  .controller('DomainCtrl', DomainCtrl);
