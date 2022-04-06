<?php
    header("Access-Control-Allow-Origin: *");


    header("Content-Type: application/xml");

    $routeNum = $_REQUEST["routeNum"];

    $direction = 'http://www.ctabustracker.com/bustime/api/v1/getdirections?key=KEY_GOES_HERE&rt=' . $routeNum;

    $file = file_get_contents($direction);

    echo $file;
?>
