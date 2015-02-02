$(function() {
var map=khtml.maplib.Map(document.getElementById("map"));
var mr = khtml.maplib;
var p1=new mr.LatLng(55.785381,37.565492);
var p3=new mr.LatLng(55.791571,37.574075);
var p2=new mr.LatLng(55.793119,37.616304);
map.centerAndZoom(new mr.LatLng(55.849154,37.566922),0);
var zoominger=new khtml.maplib.ui.Zoombar();
map.addOverlay(zoominger);
var feature=map.featureCollection.appendChild({type:"LineString",coordinates:[p1,p3,p2]});
feature.className.baseVal="line";

    var marker = new khtml.maplib.overlay.Marker({
        position: new khtml.maplib.LatLng(55.0,37.2),
        map: map,
        title:"static marker"
    });
});