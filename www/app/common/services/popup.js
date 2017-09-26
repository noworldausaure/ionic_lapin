function Popup($state, $ionicPopup) {

  return {
    showPub: function() {
      let pubPopup = $ionicPopup.show({
        title: 'Chargement en cours',
        templateUrl: 'app/pub/views/popup.html',
        buttons: [{
          text: 'Fermer',
          type: 'button-default'
        }]
      });

      pubPopup.then(function() {
          $state.go('^');
      });

      return pubPopup;
    }
  };
}

angular.module('starter.services')
  .service('Popup', Popup);
