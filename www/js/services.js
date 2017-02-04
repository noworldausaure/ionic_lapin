angular.module('starter.services', [])
.factory('Home', function(){
  return {
    url: function() {
      return 'http://localhost/API_Lapin/api/';
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
