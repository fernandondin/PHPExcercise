<?php
    require_once 'Models/Thermometer.php';
    require_once 'Models/Door.php';
    $dataset = [];
    if(isset($_GET['thermometer']) && isset($_GET['datefrom']) && isset($_GET['dateto'])){
        $dateFrom = $_GET['datefrom'];
        $dateTo = $_GET['dateto'];
        $thermometer = new Thermometer();
        $dataset = $thermometer->get_per_date($dateFrom,$dateTo);
    }
    if(isset($_GET['doorstate']) && isset($_GET['datefrom']) && isset($_GET['dateto'])){
        $dateFrom = $_GET['datefrom'];
        $dateTo = $_GET['dateto'];
        $door = new Door();
        $dataset = $door->get_per_date($dateFrom,$dateTo);
    }
    echo json_encode($dataset);