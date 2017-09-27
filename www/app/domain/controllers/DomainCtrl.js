function DomainCtrl($rootScope, $scope, $stateParams, Domain, Strip) {

    const STRIPS_LOAD_BULK_SIZE = 10;

    let domainName = $stateParams.domain;
    let offset = 0;

    $scope.loading = true;
    $rootScope.domain = domainName;
    $scope.canLoadMore = true;
    $scope.strips = [];

    //GET INFO domain
    Domain.returnInfo(domainName)
        .then(function (response) {

            $scope.info = response.data[0];
            $scope.loading = false;
        });

    let stripImageLoader = function (strip) {

        strip.loading = true;

        Strip.returnStripImage(domainName, strip.id)
            .then(function (stripImage) {

                strip.file = stripImage.data[0].file;
                strip.loading = false;
            });
    };

    $scope.loadMore = function () {

        Strip.returnNthStrips(domainName, STRIPS_LOAD_BULK_SIZE, offset)
            .then(function (response) {

                $scope.strips.push.apply($scope.strips, response.data);
                $scope.canLoadMore = response.data.length === STRIPS_LOAD_BULK_SIZE;

                $scope.strips.forEach(function (strip) {

                    stripImageLoader(strip);
                });

                offset += $scope.strips.length;

                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
    };
}

angular.module('starter.controllers')
    .controller('DomainCtrl', DomainCtrl);
