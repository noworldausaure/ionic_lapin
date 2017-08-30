function PubCtrl($scope, $ionicPopup, Pub) {

  console.log("Init");
  $scope.$on('$ionicView.beforeEnter', function () {
      console.log("Popup shown");
    });

    $scope.pub = {
      title: "Title",
      link: "",
      file: "",
    };
}

angular.module("starter.controllers")
  .controller("PubCtrl", PubCtrl);
