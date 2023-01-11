<?php
    require_once 'Connection/Connection.php';
    class Thermometer {
        /**
         * We get the data from the database using dateFrom and dateTo
         */
        public function get_per_date($dateFrom,$dateTo){
            $db = new Connection();
            $sql = "SELECT * FROM thermometer WHERE changeDate >= '{$dateFrom}' AND changeDate <= '{$dateTo}' order by changeDate";
            $result = $db->query($sql);
            $data = [];
            if($result->num_rows){
                while($row = $result->fetch_assoc()){
                    $data[] = [
                        'id' => $row['id'],
                        'temperature' => $row['temperature'],
                        'changeDate' => $row['changeDate'],
                    ];
                }
            }
            $db->close();
            return $data;
        }
        /**
         * We insert the data into the database
         */
        public function insert($temperature,$changeDate){
            $db = new Connection();
            $sql = "INSERT INTO thermometer (temperature,changeDate) VALUES ('{$temperature}','{$changeDate}')";
            $result = $db->query($sql);
            $db->close();
            return $result;
        }
    }