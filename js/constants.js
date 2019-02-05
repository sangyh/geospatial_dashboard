var TEST_TYPES = {
    OTHERS: '0',
    SP1: '1',
    SP2: '2'
};

var DISPLAY_NAMES = {
    SP1: 'SPT',
    SP2: 'CPT',
    OTHERS: 'Others'
};

var TILE_LAYERS = [
    {
        name: 'Mapnik',
        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }, {
        name: 'TopoMap',
        url: 'http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }, {
        name: 'Transport',
        url: 'http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey={apikey}',
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        apikey: 'db5ae1f5778a448ca662554581f283c5',
        maxZoom: 22
    },
    {
        name: 'Landscape',
        url: 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}',
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        apikey: 'db5ae1f5778a448ca662554581f283c5',
        maxZoom: 22
    },
    {
        name: 'Gray Scale',
        url: 'http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}',
        maxZoom: 19,
        attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    },
    {
        name: 'Terrain',
        url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}',
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 18,
        ext: 'png'
    },
    {
        name: 'World Imagery', 
        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }, {
        name: 'Dark Matter',
        url: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }, {
        name: 'Streets',
        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        maxZoom: 18,
        minZoom: 1,
        attribution: 'My Attribution',
        detectRetina: false
    }
];

/*var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    brown: 'rgb(165, 42, 42)',
    darkcyan: 'rgb(0,139,139)',
    violet: 'rgb(238,130,238)',
    water: 'rgb(64, 164, 223)'
};*/
var chartColors = {
    CL: 'rgb(255, 99, 132)',    //red
    CH: 'rgb(255, 159, 64)',    //orange
    ML: 'rgb(255, 205, 86)',
    MH: 'rgb(75, 192, 192)',    //green
    SC: 'rgb(54, 162, 235)',    //blue
    SM: 'rgb(153, 102, 255)',
    GM: 'rgb(201, 203, 207)',
    PWR: 'rgb(165, 42, 42)',    //brown
    water: 'rgb(64, 164, 223)',
    none: ' #FFFFFF'
};