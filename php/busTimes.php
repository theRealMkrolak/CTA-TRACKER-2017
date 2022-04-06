<?php
    header("Access-Control-Allow-Origin: *");


    header("Content-Type: application/xml");

    $stopId = $_REQUEST["stopId"];
    $routeDir = $_REQUEST["routeDir"];
    $routeNum = $_REQUEST["routeNum"];


    $direction = 'http://www.ctabustracker.com/bustime/api/v1/getpredictions?key=KEY_GOES_HERE&rt='. $routeNum. '&dir='. $routeDir. '&stpid='. $stopId;

    $file = file_get_contents($direction);

    echo $file;
?>
