angular.module('app.services.cards', [])

.service('Cards', ['$filter', '$http', 'Users', 'Backend', function($filter, $http, Users, Backend) {

  var getAllCards = function(callback) {
  	var params = {
  		userId: Users.currentUserId()
  	};

  	Backend.get('/userStack', params, function(data, status) {
  		if(callback) callback(data);
  	});
  }

  var acceptUser = function(userId) {
    var params = {
      userId: Users.currentUserId(),
      otherId: userId + ''
    };

    Backend.post('/userStack/approve', params, function(data) {
      console.log('User Accept Post Success');
    });
  }

  var rejectUser = function(userId) {
    var params = {
      userId: Users.currentUserId(),
      otherId: userId
    };

    Backend.post('/userStack/reject', params, function(data) {
      console.log('User Reject Post Success');
    });
  }

  var reset = function() {
    console.log('calling: reset');
    var params = {
      userId: Users.currentUserId
    }

    Backend.post('/userStack/reset', params, function(data) {
      console.log('User Reject Post Success');
    });
  }

  // reset();

	return {
		getAllCards: getAllCards,
    acceptUser: acceptUser,
    rejectUser: rejectUser,
    reset: reset
	}
}]);







