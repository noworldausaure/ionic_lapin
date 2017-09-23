function StripCtrl($rootScope, $scope, $stateParams, $controller, Strip) {

    let self = this;

    $controller('StripSwiperCtrl', {
        child: self,
        $scope: $scope,
        domainName: $stateParams.domain,
        initialStripId: $stateParams.id
    });

    $rootScope.domain = $stateParams.domain;

    this.getStrips = function (domainName, number, offset) {

        return Strip.returnNthStrips(domainName, number, offset)
            .then(function (response) {

                return response.data;
            });
    };

    this.init();
}

angular.module('starter.controllers')
    .controller('StripCtrl', StripCtrl);
