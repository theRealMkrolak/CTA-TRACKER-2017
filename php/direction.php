<?php
    header("Access-Control-Allow-Origin: *");


    header("Content-Type: application/xml");

    // get the xml from the bustracker site




    $direction = 'http://www.ctabustracker.com/bustime/api/v1/getdirections?key=KEY_GOES_HERE&rt=4';

    $file = file_get_contents($direction);

    echo $file;
?>
