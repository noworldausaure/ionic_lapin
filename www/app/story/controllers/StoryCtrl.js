function StoryCtrl($rootScope, $scope, $stateParams, Story, Strip) {

    const STRIPS_LOAD_BULK_SIZE = 10;

    let domainName = $stateParams.domain;
    let storyId = $stateParams.storyId;

    $rootScope.domain = domainName;
    $scope.storyId = storyId;
    $scope.canLoadMore = true;
    $scope.strips = [];

    let lastStripId = 0;

    Story.returnStory(domainName, storyId)
        .then(function (response) {

            console.log(response.data);
            $scope.story = response.data[0];
        });

    let stripImageLoader = function (strip) {

        strip.loading = true;

        Strip.returnStripImage(domainName, strip.id)
            .then(function (stripImage) {

                strip.loading = false;
                strip.file = stripImage.data[0].file;
            });
    };

    $scope.loadMore = function () {

        Story.returnStripsByStory(domainName, storyId, STRIPS_LOAD_BULK_SIZE, lastStripId)
            .then(function (response) {

                $scope.strips = $scope.strips.concat(response.data);
                $scope.canLoadMore = response.data.length === STRIPS_LOAD_BULK_SIZE;

                response.data.forEach(function (strip) {
                    stripImageLoader(strip);
                });

                lastStripId = parseInt(response.data[response.data.length - 1].id) + 1;

                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
    };

}

angular.module('starter.controllers')
    .controller('StoryCtrl', StoryCtrl);