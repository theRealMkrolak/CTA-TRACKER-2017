var $;
var trainLine;
var stopId;
var trainRouteStopName;
$(document).ready(function() {
  $(document).on("pageshow", "#pageTrainSearch", function() {
    $("a[href='#showTrainStops']").click(function(event) {
      trainLine = event.target.id;
    });
  });
});

$(document).ready(function() {
  $(document).on("pagebeforeshow", "#showTrainStops", function() {
    getTrainData();
  });
});

function getTrainData() {


  var endpointUrl = "https://data.cityofchicago.org/resource/8mj8-j3c4.json?";
  var TrainTrue = "=true";
  var dataUrl = endpointUrl + trainLine + TrainTrue;

  var jqxhr = $.get(dataUrl)
    .done(function(data) {

      var arrInspections = data;
      var strHtml = "";
      $.each(arrInspections, function(i, entry) {

        strHtml += "<li id=" + trainLine + "><a href='#showTrainTimes' data-transition='slide' id=" + arrInspections[i].stop_id + " class=" + trainLine + ">" + arrInspections[i].stop_name + "</li>";

      });

      var trainStop = "<ul data-role='listview' data-filter='true' data-input='#form4' id=" + trainLine + " onclick='trainTimes(event)'>" + strHtml + "</ul>";

      $("#trainStops").html(trainStop);

    })
    .always(function() {
      $("#showTrainStops").trigger("create");
    });
}



function trainTimes(event){
      stopId = event.target.id;
      trainRouteStopName = event.target.innerHTML;
}
$(document).ready(function() {
  $(document).on("pagebeforeshow", "#showTrainTimes", function() {
    refresh();
  });
});
    
    function refresh(){
    document.getElementById("trainStop").innerHTML = trainRouteStopName;

    var apiUrl = "php/trainTimes.php?stpid=";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        myFunction(xhttp);
      }
    };
    xhttp.open("GET", apiUrl + stopId, true);
    xhttp.send();


    function myFunction(xml) {
      var xmlDoc = xml.responseXML;
      var routeNodes = xmlDoc.getElementsByTagName("eta");
      var routeHTML = "";
      var routeNodeloop;
      var routeTime = "";

      for (var j = 0; j < routeNodes.length; j++) {
        routeNodeloop = routeNodes[j];
        routeTime =  routeNodeloop.childNodes[10].childNodes[0].nodeValue;
        
        var time = routeTime.slice(9, 14);
        
        var timeString = time;
        var H = +timeString.substr(0, 2);
        var h = (H % 12) || 12;
        var ampm = H < 12 ? "AM" : "PM";
        timeString = h + timeString.substr(2, 3) + ampm;
        
        routeHTML += "<li id=" + trainLine + " style='color:white;'>" + timeString + "</li>";
      }

      var stopsHTML = "<ul data-role='listview'>" + routeHTML + "</ul>";

      document.getElementById("trainTimes").innerHTML = stopsHTML;
      $("#showTrainTimes").trigger("create");
    }
    }

