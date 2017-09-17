function MainCtrl($scope, $ionicPopover) {

  let menuPopover;

  $ionicPopover.fromTemplateUrl('app/partials/common/menu-popover.html', {
    scope: $scope
  }).then(function(popover) {
    menuPopover = popover;
  });

  $scope.showMenu = function($event) {
    menuPopover.show($event);
  };

  $scope.$on('$stateChangeSuccess', function (event, current) {
      // noinspection EqualityComparisonWithCoercionJS
      $scope.showStoryLink = current.url.search('strips') == true
  });
}

angular.module('starter.controllers')
  .controller("MainCtrl", MainCtrl);
