function StoryListCtrl($scope, $stateParams, Story) {

    let domain = $stateParams.domain;
    $scope.domain = domain;
    
    Story.returnStories(domain).then(function (stories) {
        $scope.stories = stories.data;
    });

}

angular.module('starter.controllers')
    .controller('StoryListCtrl', StoryListCtrl);