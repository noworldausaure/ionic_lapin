function MainCtrl($scope, $ionicPopover) {

  var menuPopover;

  $ionicPopover.fromTemplateUrl('app/partials/common/menu-popover.html', {
    scope: $scope
  }).then(function(popover) {
    menuPopover = popover;
  });

  $scope.showMenu = function($event) {
    menuPopover.show($event);
  }
}

angular.module('starter.controllers')
  .controller("MainCtrl", MainCtrl);
