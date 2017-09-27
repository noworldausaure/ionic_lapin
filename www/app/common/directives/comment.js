function Comment() {
  return {
    restrict: 'E',
    compile: function(tElement, attrs) {
      tElement.remove();
    }
  };
}

angular.module('starter.directives')
  .directive('comment', Comment);