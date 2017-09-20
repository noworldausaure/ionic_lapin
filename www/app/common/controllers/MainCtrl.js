function MainCtrl($scope, $stateParams, $ionicPopover) {

    let menuPopover;

    $ionicPopover.fromTemplateUrl('app/partials/common/menu-popover.html', {
        scope: $scope
    }).then(function (popover) {
        menuPopover = popover;
    });

    $scope.showMenu = function ($event) {
        menuPopover.show($event);
    };

    $scope.$on('$stateChangeSuccess', function (event, current) {
        $scope.showStoriesLink = $stateParams.domain !== undefined
    });
}

angular.module('starter.controllers')
    .controller("MainCtrl", MainCtrl);
