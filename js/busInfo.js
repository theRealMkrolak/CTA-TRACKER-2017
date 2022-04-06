var $;
var stopId;
var routeDir;
var routeStopName;
var routeNum;
var stopName = "No Buses at this time";


$(document).ready(function() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      myFunction(xhttp);
    }
  };
  xhttp.open("GET", "getroutes.xml", true);
  xhttp.send();

  function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var route = xmlDoc.getElementsByTagName("route");
    var loopNode;
    var strHtml = "";

    for (var i = 0; i < route.length; i++) {
      loopNode = route[i];
      strHtml += "<li id='routeNums'><a href='#showBusDirection' data-transition='slide' id=" + loopNode.childNodes[1].childNodes[0].nodeValue + " style='height: 60px;' class='busRoutes'>" + loopNode.childNodes[1].childNodes[0].nodeValue + " " + loopNode.childNodes[3].childNodes[0].nodeValue + "</a></li>";
    }
    var routesHTML = "<ul data-role='listview' data-filter='true' data-input='#form1'>" + strHtml + "</ul>";
    document.getElementById("demo").innerHTML = routesHTML;
  }
});


$(document).ready(function() {
  $(document).on("pagebeforeshow", "#pageBusSearch", function() {
    $("a[href='#showBusDirection']").click(function(event) {
      routeStopName = event.target.innerHTML;
      routeNum = event.target.id;
    });
  });
});
$(document).ready(function() {
  $(document).on("pagebeforeshow", "#showBusDirection", function() {

    document.getElementById("busDirId").innerHTML = routeStopName;

    var apiUrl = "php/busDirection.php?routeNum=";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        myFunction(xhttp);
      }
    };
    xhttp.open("GET", apiUrl + routeNum, true);
    xhttp.send();


    function myFunction(xml) {
      var xmlDoc = xml.responseXML;
      var routeNodes = xmlDoc.getElementsByTagName("dir");
      var routesHTML1 = "";
      var routesHTML2 = "";

      routesHTML1 += "<a href='#showBusStops' id='pg5btn2' data-theme='b' class='ui-btn'  onclick='busStops(event)'>" + routeNodes[0].childNodes[0].nodeValue + "</a>";
      routesHTML2 += "<a href='#showBusStops' id='pg5btn3' data-theme='b' class='ui-btn'  onclick='busStops(event)'>" + routeNodes[1].childNodes[0].nodeValue + "</a>";

      document.getElementById("direction1").innerHTML = routesHTML1;
      document.getElementById("direction2").innerHTML = routesHTML2;
    }
  });
});

function busStops(event) {
  routeDir = event.target.innerHTML;
}
$(document).ready(function() {
  $(document).on("pageshow", "#showBusStops", function() {
    var apiUrl = "php/busStops.php?routeDir=";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        myFunction(xhttp);
      }
    };
    xhttp.open("GET", apiUrl + routeDir + "&routeNum=" + routeNum, true);
    xhttp.send();

    function myFunction(xml) {
      var xmlDoc = xml.responseXML;
      var routeNodes = xmlDoc.getElementsByTagName("stop");
      var routesHTML = "";
      var routeNodeloop;

      for (var j = 0; j < routeNodes.length; j++) {
        routeNodeloop = routeNodes[j];
        routesHTML += "<li id='busRoutes'><a href='#showBusTimes' data-transition='slide' id=" + routeNodeloop.childNodes[1].childNodes[0].nodeValue + " onclick='busTimes(event)' class='busRoutes'>" + routeNodeloop.childNodes[3].childNodes[0].nodeValue + "</a></li>";
      }

      var stopsHTML = "<ul data-role='listview' data-filter='true' data-input='#form2'>" + routesHTML + "</ul>";

      document.getElementById("busStop").innerHTML = stopsHTML;
      $("#showBusStops").trigger("create");
    }
  });
});

function busTimes(event){
      stopId = event.target.id;
      stopName = event.target.innerHTML;
}
$(document).ready(function() {
  $(document).on("pageshow", "#showBusTimes", function() {
  refreshBus();
  });
});
  
function refreshBus(){
    document.getElementById("busTimeId").innerHTML = routeStopName + "<br>" + stopName;

    var apiUrl = "php/busTimes.php?stopId=";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        myFunction(xhttp);
      }
    };

    xhttp.open("GET", apiUrl + stopId + "&routeDir=" + routeDir + "&routeNum=" + routeNum, true);
    xhttp.send();

    function myFunction(xml) {
      document.getElementById("busTimes").innerHTML = "There Are No Buses At This Time";
      stopName = "No Buses at this time";
      var xmlDoc = xml.responseXML;
      var routeNodes = xmlDoc.getElementsByTagName("prd");
      var routesHTML = "";
      var routeNodeloop;
      


      for (var j = 0; j < routeNodes.length; j++) {
        routeNodeloop = routeNodes[j];
        var routeTime = routeNodeloop.childNodes[19].childNodes[0].nodeValue;
        var time = routeTime.slice(9, 17);

        var timeString = time;
        var H = +timeString.substr(0, 2);
        var h = (H % 12) || 12;
        var ampm = H < 12 ? "AM" : "PM";
        timeString = h + timeString.substr(2, 3) + ampm;
        
        routesHTML += "<li data-theme='b'>" + timeString + "</li>";
      }
      var stopsHTML = "<ul data-role='listview'>" + routesHTML + "</ul>";
      document.getElementById("busTimeId").innerHTML = "Route " + routeStopName + "<br>" + routeNodes[1].childNodes[5].childNodes[0].nodeValue;
      document.getElementById("busTimes").innerHTML = stopsHTML;
      $("#showBusTimes").trigger("create");
  }
}