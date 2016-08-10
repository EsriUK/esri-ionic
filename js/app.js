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
				controller: 'FeatureLayerController as featurelayerCtrl'
			}
		}
	})
		
	.state('app.popuptemplate', {
		url: '/popuptemplate',
		views: {
			'menuContent': {
				templateUrl: 'templates/popuptemplate.html',
				controller: 'PopupTemplateController as popuptemplateCtrl'
			}
		}
	})
		
	.state('app.search', {
		url: '/search',
		views: {
			'menuContent': {
				templateUrl: 'templates/search.html',
				controller: 'SearchController as searchCtrl'
			}
		}
	})
		
	.state('app.geodesicbuffers', {
		url: '/geodesicbuffers',
		views: {
			'menuContent': {
				templateUrl: 'templates/geodesicbuffers.html',
				controller: 'GeodesicBuffersController as geodesicbuffersCtrl'
			}
		}
	})
		
	.state('app.propertybinding', {
		url: '/propertybinding',
		views: {
			'menuContent': {
				templateUrl: 'templates/propertybinding.html',
				controller: 'PropertyBindingController as propertybindingCtrl'
			}
		}
	})
		
	.state('app.registrypattern', {
		url: '/registrypattern',
		views: {
			'menuContent': {
				templateUrl: 'templates/registrypattern.html',
				controller: 'RegistryPatternController as registrypatternCtrl'
			}
		}
	});

	$urlRouterProvider.otherwise('/app/vector');

});
