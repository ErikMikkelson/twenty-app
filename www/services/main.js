angular.module('app.services.main', [])

.service('Users', ['Backend', function(Backend) {

  var storage = {currentUserId: 'nwRvFWIcyj'};
  Backend.get('/user', {userId: storage.currentUserId}, function(data) {
    console.log(data);
    storage.userData = data[0];
  });

  this.deleteAccount = function() {
    Backend.del('/user', {userId: currentUserId}, function(data, status) {
      console.log('Deleted user. Return data: ' + data);
    });
  };

  this.setCurrentUserId = function(userId) {
    storage.currentUserId = userId;
    console.log('new user id is: ' + storage.currentUserId);
  };

  this.currentUserId = function() {
    return storage.currentUserId;
  };

  this.currentUserData = function() {
    return storage.userData;
  };

}])

.service('StateControl', ['$state', '$ionicSideMenuDelegate', '$ionicScrollDelegate', function($state, $ionicSideMenuDelegate,$ionicScrollDelegate) {

  this.toggleMenuByState = function(stateParams, menuReferences) {
    // menuReferences should be an array with [leftSideMenuRef, rightSideMenuRef]
    if(stateParams.menuState) {
      // open the appropriate menu
      if(stateParams.menuState === 'conversations') {
        $ionicSideMenuDelegate.toggleRight();
        
      } else if (stateParams.menuState === 'settings') {
        $ionicSideMenuDelegate.toggleLeft();
      }
    } else {
      if($ionicSideMenuDelegate.isOpenLeft()) {
        $ionicSideMenuDelegate.toggleLeft();  
      }
      if($ionicSideMenuDelegate.isOpenRight()) {
        $ionicSideMenuDelegate.toggleRight(); 
      }
    }
  };

  this.goBackWithState = function(stateName, menuState) {
    return function() {
      console.log("Going back to " + stateName);
      $state.go(stateName, {'menuState' : menuState});
    };
  };

  this.scrollToBottom = function(shouldScroll) {
    var shouldScroll = shouldScroll || false;
    $ionicScrollDelegate.scrollBottom(shouldScroll);
  };

}])
;