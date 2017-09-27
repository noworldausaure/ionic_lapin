function PubCtrl($scope, Pub) {

    $scope.loading = true;

    Pub.returnLapinPub().then(function (response) {

        $scope.pub = response.data[0];
        $scope.loading = false;

        let result = document.getElementsByClassName("popup-title");
        angular.element(result).html($scope.pub.name);
    });

    $scope.openPubLink = function () {

        console.log("open");
        window.open($scope.pub.link, '_blank');
    }
}

angular.module("starter.controllers")
    .controller("PubCtrl", PubCtrl);
