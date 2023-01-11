<?php
    require_once 'Models/Thermometer.php';
    if(isset($_GET['temperature']) && isset($_GET['changeDate'])){
        $temperature = $_GET['temperature'];
        $changeDate = $_GET['changeDate'];
        $thermometer = new Thermometer();
        $thermometer->insert($temperature,$changeDate);
    }