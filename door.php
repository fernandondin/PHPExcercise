<?php
    require_once 'Models/Door.php';
    if(isset($_GET['state']) && isset($_GET['changeDate'])){
        $state = $_GET['state'];
        $changeDate = $_GET['changeDate'];
        $door = new Door();
        $door->insert($state,$changeDate);
    }