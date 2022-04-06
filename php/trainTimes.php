<?php
    header("Access-Control-Allow-Origin: *");


    header("Content-Type: application/xml");

     $stpid = $_REQUEST["stpid"];

    $direction = 'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=KEY2_GOES_HERE&stpid='. $stpid;

    $file = file_get_contents($direction);

    echo $file;
?>
