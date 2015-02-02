document.addEventListener("DOMContentLoaded", function() {
    var map;
    var cords = [[51.508, -0.11],[52.508, -0.11],[53.508, -1.11],[43.508, -1.11]];
    var point;

    function initmap() {
        // set up the map
        map = new L.Map('map');

        // create the tile layer with correct attribution
        var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        var osm = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 15, attribution: osmAttrib});
        var polyline = L.polyline(cords,{
            color: 'red',
            weight: 8
        });
        // start coords
        map.setView(cords[0], 12);
        //add map tile
        map.addLayer(osm);
        //add polyline
        polyline.addTo(map);
    }
    initmap();

    function circle(point){
        L.circle(point, 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(map);
    }
    function pointAdd(points){
        for (var i=0; i<points.length; i++ ){
            point = points[i];
            circle(point);
        }
    }
    console.log(pointAdd(cords));

});