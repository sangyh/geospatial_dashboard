var SmallMap = (function () {
    var latlng = L.latLng(-37.82, 175.24);
    var me = this;

    var _map = null,
        _cluterLayer = null,
        _filterPop = null,
        _tileLayers = null,
        _addMode = false;

    // ********** Tiles **********

    // Get Tiles from constants
    var getTiles = function () {
        var tileLayers = [];
        for (var index = 0; index < TILE_LAYERS.length; index++) {
            var tileLayer = L.tileLayer(TILE_LAYERS[index].url, TILE_LAYERS[index]);
            tileLayers.push(tileLayer);
        }
        return tileLayers;
    };

    // Add tile layer controls
    var addTileCntrls = function (tiles) {
        var baseMaps = {};
        for (var index = 0; index < tiles.length; index++) {
            baseMaps[tiles[index].options.name] = tiles[index];
        }
        L.control.layers(baseMaps).addTo(_map);
    };

    // Set background Tiles
    var setTileLayer = function (tile) {
        for (var index = 0; index < _tileLayers.length; index++) {
            _map.removeLayer(_tileLayers[index]);
        }
        _map.addLayer(tile);
    };

    // ********** Icons **********
    var LeafIcon = L.Icon.extend({
        options: {
            riseOnHover: true
        }
    });

    var sp1Icon = new LeafIcon({
        iconUrl: './images/sp1_small.png',
        iconSize: [30, 30],
        iconAnchor: [15, 29],
        popupAnchor: [0, -30]
    });

    var sp2Icon = new LeafIcon({
        iconUrl: './images/sp2_small.png',
        iconSize: [30, 30],
        iconAnchor: [15, 29],
        popupAnchor: [0, -30]
    });

    var othersIcon = new LeafIcon({
        iconUrl: './leaflet/images/marker-icon.png',
        iconAnchor: [14, 40],
        popupAnchor: [0, -38]
    });

    var highlightIcon = new LeafIcon({
        iconUrl: './images/highlight.png',
        iconSize: [30, 30],
        iconAnchor: [15, 29],
        popupAnchor: [0, -30]
    });

    var getIcon = function (type) {

        if (type === TEST_TYPES.SP1) {
            return sp1Icon;
        }

        if (type === TEST_TYPES.SP2) {
            return sp2Icon;
        }

        if (type === 'highlight') {
            return highlightIcon;
        }

        return othersIcon;
    };
    // ***************************

    var getData = function () {
        return data;
    };

    // Add markers on map
    var addMarkers = function (data) {
        for (var i = 0; i < data.length; i++) {
            var point = data[i];
            var title = point.name;
            var type = point.type;
            var sptName = data[i].spt_name;
            var Options = {
                title: title,
                spt_name: sptName,
                type: type,
                icon: getIcon(type),
                tags: [type]
            }
            var marker = L.marker(new L.LatLng(point.lat, point.lng), Options);

            marker.bindPopup(title);
            marker.addTo(_map);
        }
    };

    // Initialization of map (Starting Point)
    var init = function (center, zoom, smallMap) {
        _tileLayers = getTiles();

        _map = L.map('map', {
            center: center || latlng,
            zoom: zoom,
            layers: _tileLayers
        });
        addMarkers(getData());
        addTileCntrls(_tileLayers);
        setTileLayer(_tileLayers[0]);
    };

    // Higlight marker and move map to that item
    var highlightMarker = function (sptName) {
        if (_map._layers) {
            _map.eachLayer(function (layer) {
                if (sptName === layer.options.spt_name) {
                    layer.setIcon(highlightIcon);
                    _map.setView(layer.getLatLng(), Math.max(_map.getZoom(), 16));
                }
            }, this);
        }
    };
    // Remove Highlighting marker
    var removeHighlightMarker = function () {
        var icon;
        if (_map._layers) {
            _map.eachLayer(function (layer) {
                if (layer.options.icon) {
                    icon = this.getIcon(layer.options.type);
                    layer.setIcon(icon);
                }
            }, this);
        }
    };

    return {
        init: init,
        highlightMarker: highlightMarker,
        removeHighlightMarker: removeHighlightMarker,
        getIcon: getIcon
    };

})();