function Popup($ionicPopup, History) {

  return {
    showPub: function() {
      let pubPopup = $ionicPopup.show({
        title: '',
        templateUrl: 'app/pub/views/popup.html',
        buttons: [{
          text: 'Close',
          type: 'button-default',
        }]
      })
      pubPopup.then(function(result) {
        History.goBack();
      });

      return pubPopup;
    }
  };
}

angular.module('starter.services')
  .service('Popup', Popup);
