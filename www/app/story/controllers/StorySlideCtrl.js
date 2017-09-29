function StorySlideCtrl($controller, $rootScope, $scope, $stateParams, Story) {

    let self = this;

    $rootScope.domain = $stateParams.domain;

    $controller('StripSwiperCtrl', {
        child: self,
        $scope: $scope,
        domainName: $stateParams.domain,
        initialStripId: $stateParams.stripId
    });

    Story.returnStory($stateParams.domain, $stateParams.storyId)
        .then(function (response) {

            $scope.story = response.data[0];
        });

    this.getStrips = function (domainName, number, offset) {

        return Story.returnStripsByStory(domainName, $stateParams.storyId, number, offset)
            .then(function (response) {

                return response.data;
            });
    };

    this.init();
}

angular.module('starter.controllers')
    .controller('StorySlideCtrl', StorySlideCtrl);
