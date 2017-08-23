function StripThumbnail() {
  return {
    scope: {
      strip: '='
    },
    restrict: 'E',
    templateUrl: 'app/domain/views/_strip-thumbnail.html'
  }
}

angular.module('starter.directives')
  .directive('stripThumbnail', StripThumbnail);