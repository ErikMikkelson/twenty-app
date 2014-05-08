angular.module('app.cards', [])

  // This filter reverses the order of cards array for ng-repeat so that they display in the correct order
.filter('reverse', function() {
  return function(items) {
    if (items) {
      return items.slice().reverse();
    }
  };
})

/** Ensures that card swiping won't scroll the screen */
.directive('noScroll', function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

/**  This is the controller for the full deck.  */
.controller('CardsCtrl', ['$scope', '$ionicSwipeCardDelegate', 'Cards', 'LocalStorage', function($scope, $ionicSwipeCardDelegate, Cards, LocalStorage) {

  $scope.$on('$destroy', function() {
    Cards.cardsInScope = $scope.cards;
  });

  if(Cards.cardsInScope) {
    $scope.cards = Cards.cardsInScope;
    Cards.cardsInScope = [];
  } else {
    $scope.cards = Cards.cardStack.splice(0,2);
  }

  $scope.cardSwiped = function(index) {
    $scope.removeCard();  
    $scope.addCard();
  };

  $scope.removeCard = function() {
    $scope.cards.shift();
    // LocalStorage.writeScopeCardsToLocal($scope.cards);
    Cards.cardsInScope = $scope.cards.length;
  };

  $scope.addCard = function() {
    if (Cards.cardStack.length > 0) {
      $scope.cards.push(Cards.cardStack.shift());
      // LocalStorage.writeScopeCardsToLocal($scope.cards);
      // Cards.cardsInScope = $scope.cards.length;
      LocalStorage.writeCardsToLocal(Cards.cardStack);
      if (Cards.cardStack.length === 5) {
        setTimeout(function() {
          // 3 sec timeout gives server time to process card approve/reject before loading new cards
          Cards.reloadStack();
        }, 3000);
      }
    }
  };

  $scope.sendOpinion = function(userId, string) {
    if(string === 'right') {
      Cards.acceptUser(userId);
    } else if (string === 'left') {
      Cards.rejectUser(userId);
    }
  };

  $scope.rejectCard = function() {
    var scopeCard = $scope.$$childHead.$$nextSibling.$$childHead.$$nextSibling.$$nextSibling.swipeCard;
    scopeCard.swipe('left');
  };

  $scope.approveCard = function() {
    var scopeCard = $scope.$$childHead.$$nextSibling.$$childHead.$$nextSibling.$$nextSibling.swipeCard;
    scopeCard.swipe('right');
  };


  $scope.deckIsEmpty = function() {
    // Very last card isn't getting populated -- this works.
    if($scope.cards.length <= 1) {
      return true;
    } else {
      return false;
    }
  };

}])

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {

});











