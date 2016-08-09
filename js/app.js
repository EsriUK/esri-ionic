angular.module('starter', ['ionic', 'starter.controllers', 'esri.map'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
   if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})

	.state('app.vector', {
		url: '/vector',
		views: {
			'menuContent': {
				templateUrl: 'templates/vector.html',
				controller: 'VectorController as vectorCtrl'
			}
		}
	})

	.state('app.sceneview', {
		url: '/sceneview',
		views: {
			'menuContent': {
				templateUrl: 'templates/sceneview.html',
				controller: 'SceneController as sceneCtrl'
			}
		}
	})

	.state('app.featurelayer', {
		url: '/featurelayer',
		views: {
			'menuContent': {
				templateUrl: 'templates/featurelayer.html',
				controller: 'FeatureLayerController as featuerelayerCtrl'
			}
		}
	});

	$urlRouterProvider.otherwise('/app/vector');

});
