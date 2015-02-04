/**
 * Created by anton_gorshenin on 04.02.2015.
 */
$( document ).ready(function(){

$(".glyphicon-menu-down").click(function(){
    if ($("#coords").css("bottom") == "0px"){
        $("#coords").animate({ bottom: "-5.2vw" }, 800);
    }
    else
        if($("#coords").css("bottom") != 0){
            $("#coords").animate({ bottom: "0px" }, 800);
        }
});

});