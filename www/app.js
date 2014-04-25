angular.module('twenty', [
  'ionic',
  'ui.router',
  'app.services',
  'app.main',
  'app.messages.details',
  'app.messages.list',
  'app.settings',
  'app.login'
])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('main', {
      url: '/',
      views: {
        'left@': {
          templateUrl: 'settings/settings.html',
          controller: 'SettingsCtrl'
        },
        'right@': {
          templateUrl: 'messages/list/list.html',
          controller:'MessagesListCtrl'
        },
        'main@': {
          templateUrl: 'main/main.html',
          controller: 'MainIndexCtrl'
        }
      }
    })
    .state('conversation', {
      url: '/messages/:conversationId',
      views: {
        'right@': {
          templateUrl: 'messages/details/details.html',
          controller: 'MessagesDetailsCtrl'
        }
      }
    })
    .state('login', {
      url: '/login',
      views: {
        'main@': {
          templateUrl: 'login/login.html',
          controller: 'LoginCtrl'
        }
      }
    })
  });

	
