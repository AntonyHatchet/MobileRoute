$(function() {
var map=khtml.maplib.Map(document.getElementById("map"));
map.centerAndZoom(new khtml.maplib.LatLng(0.0,51.2),5);
var zoominger=new khtml.maplib.ui.Zoombar();
map.addOverlay(zoominger);
var feature=map.featureCollection.appendChild({type:"LineString",coordinates:[[0,0],[51,0],[100.2,16.5]]});
feature.className.baseVal="line";


});