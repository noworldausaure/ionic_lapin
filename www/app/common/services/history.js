function History($ionicHistory) {
  return {
    goBack: function(count = 1) {
      var historyId = $ionicHistory.currentHistoryId();
      var history = $ionicHistory.viewHistory()
        .histories[historyId];
      var targetViewIndex = history.stack.length - count;
      $ionicHistory.backView(history.stack[targetViewIndex]);
      $ionicHistory.goBack();
    }
  };
}

angular.module('starter.services')
  .service("History", History);
