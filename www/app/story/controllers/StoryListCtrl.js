function StoryListCtrl($scope, $stateParams, Story) {

    const STRIP_LOAD_BULK_SIZE = 20;

    let domain = $stateParams.domain;

    $scope.domain = domain;
    $scope.stories = [];
    $scope.canLoadMore = true;

    let offset = 0;


    $scope.loadMore = function () {

        Story.returnStories(domain, STRIP_LOAD_BULK_SIZE, offset)
            .then(function (response) {

                $scope.stories = $scope.stories.concat(response.data);
                $scope.canLoadMore = response.data.length === STRIP_LOAD_BULK_SIZE;

                offset += response.data.length;

                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
    };
}

angular.module('starter.controllers')
    .controller('StoryListCtrl', StoryListCtrl);