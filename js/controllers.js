angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  
})

.controller('VectorController', function(esriLoader) {

	console.log('vector tiles');

	var self = this;
	esriLoader.require([
		'esri/Map',
		'esri/layers/VectorTileLayer'
	], function(
		Map, VectorTileLayer
	) {
		self.map = new Map();
		var tileLyr = new VectorTileLayer({
			url: '//www.arcgis.com/sharing/rest/content/items/f96366254a564adda1dc468b447ed956/resources/styles/root.json'
		});
		self.map.add(tileLyr);
	});

})

.controller('SceneController', function(esriLoader) {

	var self = this;
	self.viewLoaded = true;
	// load esri modules
	esriLoader.require([
		'esri/Map',
		'esri/layers/TileLayer'
	], function(
		Map, TileLayer
	) {
		// put this layer on the controller scope so that the checkbox can be used directly with ng-model
		self.transportationLyr = new TileLayer({
			url: '//server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer',
			id: 'streets',
			visible: false
		});
		var housingLyr = new TileLayer({
			url: '//tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer',
			id: 'ny-housing',
			opacity: 0.9
		});
		// layers may be added to the map in the map's constructor
		self.map = new Map({
			basemap: 'oceans',
			layers: [housingLyr]
		});
		// or they may be added to the map using map.add()
		self.map.add(self.transportationLyr);
		self.onViewLoaded = function(view) {
			// add the layer toggle control to the view's UI top right corner
			view.ui.add('layerToggle', 'top-right');
			self.viewLoaded = true;
			// The map handles the layers' data, while the view
			// and layer views take care of renderering the layers.
			view.on('layerview-create', function(evt) {
				if (evt.layer.id === 'ny-housing') {
					// Explore the properties of the population layer's layer view here.
					console.log('LayerView for male population created!', evt.layerView);
				}
				if (evt.layer.id === 'streets') {
					// Explore the properties of the transportation layer's layer view here.
					console.log('LayerView for streets created!', evt.layerView);
				}
			});
			// Once the housing layer has loaded,
			// the view will animate to it's initial extent.
			housingLyr.then(function() {
				view.goTo(housingLyr.fullExtent);
			});
		};
		self.changeMap = function() {
			// test to show that changing the map property works for the same view
			self.map = new Map({
				basemap: 'gray'
			});
		};
	});

})

.controller('FeatureLayerController', function(esriLoader) {

	var self = this;
	// load esri modules
	esriLoader.require([
		'esri/Map',
		'esri/layers/FeatureLayer'
	], function(Map, FeatureLayer) {
		// create the map
		self.map = new Map({
			basemap: 'hybrid'
		});
		// and add a feature layer
		var featureLayer = new FeatureLayer({
			url: '//services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0'
		});
		self.map.add(featureLayer);
		self.onViewCreated = function(view) {
			self.mapView = view;
		};

	});

})

.controller('GeodesicBuffersController', function(esriLoader) {

	var self = this;
	// load esri modules
	esriLoader.require([
		'esri/Map',
		'esri/layers/GraphicsLayer',
		'esri/Graphic',
		'esri/geometry/geometryEngine',
		'esri/geometry/Point',
		'esri/renderers/SimpleRenderer',
		'esri/symbols/SimpleMarkerSymbol',
		'esri/symbols/SimpleFillSymbol'
	], function(
		Map, GraphicsLayer, Graphic,
		geometryEngine, Point,
		SimpleRenderer, SimpleMarkerSymbol, SimpleFillSymbol
	) {
		self.map = new Map({
			basemap: 'satellite'
		});
		// add two graphics layers to map: one for points, another for buffers
		var polySym = new SimpleFillSymbol({
			color: [255, 255, 255, 0.5],
			outline: {
				color: [0, 0, 0, 0.5],
				width: 2
			}
		});
		var pointSym = new SimpleMarkerSymbol({
			color: [255, 0, 0],
			outline: {
				color: [255, 255, 255],
				width: 1
			},
			size: 7
		});
		var bufferLayer = new GraphicsLayer({
			renderer: new SimpleRenderer({
				symbol: polySym
			})
		});
		var pointLayer = new GraphicsLayer({
			renderer: new SimpleRenderer({
				symbol: pointSym
			})
		});
		self.map.addMany([bufferLayer, pointLayer]);
		// Generate points every 10 degrees along Prime Meridian. Add to layer.
		// Buffer each point by 560km using GeometryEngine. Add buffers to map.
		for (var lat = -80; lat <= 80; lat += 10) {
			var point = new Point({
				longitude: 0,
				latitude: lat
			});
			pointLayer.add(new Graphic({
				geometry: point
			}));
			var buffer = geometryEngine.geodesicBuffer(point, 560, 'kilometers');
			bufferLayer.add(new Graphic({
				geometry: buffer
			}));
		}
	});

});