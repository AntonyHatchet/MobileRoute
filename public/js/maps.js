document.addEventListener("DOMContentLoaded", function() {
//var map=khtml.maplib.Map(document.getElementById("map"));
//var mr = khtml.maplib;
//var p1=new mr.LatLng(55.785381,37.565492);
//var p3=new mr.LatLng(55.791571,37.574075);
//var p2=new mr.LatLng(55.793119,37.616304);
//map.centerAndZoom(new mr.LatLng(55.849154,37.566922),0);
//var zoominger=new khtml.maplib.ui.Zoombar();
//map.addOverlay(zoominger);
//var feature=map.featureCollection.appendChild({type:"LineString",coordinates:[p1,p3,p2]});
//feature.className.baseVal="line";
//
//    var marker = new khtml.maplib.overlay.Marker({
//        position: new khtml.maplib.LatLng(55.0,37.2),
//        map: map,
//        title:"static marker"
//    });

    var map;
    var ajaxRequest;
    var plotlist;
    var plotlayers=[];

    function initmap() {
        // set up the map
        map = new L.Map('map');

        // create the tile layer with correct attribution
        var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        var osm = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 15, attribution: osmAttrib});

        // start the map in South-East England
        map.setView(new L.LatLng(51.3, 0.7),9);
        map.addLayer(osm);
    }
    initmap();

    var myLines = [{
        "type": "LineString",
        "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
    }, {
        "type": "LineString",
        "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
    }];

    var myStyle = {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.65
    };

    L.geoJson(myLines, {
        style: myStyle
    }).addTo(map);
});