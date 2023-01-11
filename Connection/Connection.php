<?php
    class Connection extends Mysqli{
        /**
         * Connection constructor.
         */
        function __construct(){
            parent::__construct('127.0.0.1', 'root', 'root', 'SOFTEL',3306);
            $this->set_charset("utf8");
            $this->connect_error ==NULL ? 'DB Conectado' : die('Error en la conexion');
        }
    }
?>