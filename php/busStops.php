<?php
    header("Access-Control-Allow-Origin: *");


    header("Content-Type: application/xml");

   $routeDir = $_REQUEST["routeDir"];
   $routeNum = $_REQUEST["routeNum"];

    $direction = 'http://www.ctabustracker.com/bustime/api/v1/getstops?key=KEY_GOES_HERE&rt='. $routeNum . '&dir='. $routeDir;

    $file = file_get_contents($direction);

    echo $file;
?>
