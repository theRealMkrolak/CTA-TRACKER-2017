$(document).ready(function(){
 $(document).on("pageshow","#pageMap",function(){
	drawMap();
});
});


function drawMap(data) {

  var map = new google.maps.Map(document.getElementById('divMap'), {
    zoom: 11,
    center: {lat: 41.8369, lng: -87.6847}
  });
  var transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);
}

