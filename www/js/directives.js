angular.module('starter.directives', [])

.directive('stripThumbnail', function() {
  return {
    scope: {
      strip: '='
    },
    restrict: 'E',
    templateUrl: 'templates/_strip-thumbnail.html'
  }
})

.directive('stripView', function() {
  return {
    scope: {
      strip: '='
    },
    restrict: 'E',
    templateUrl: 'templates/_strip-view.html',
  }
})

.directive('comment', function () {
    return {
        restrict: 'E',
        compile: function (tElement, attrs) {
            tElement.remove();
        }
    };
});
