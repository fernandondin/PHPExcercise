<?php
    require_once 'Connection/Connection.php';
    class Door {
        /**
         * We get the data from the database using dateFrom and dateTo
         * @return array
         */
        public function get_per_date($dateFrom,$dateTo){
            $db = new Connection();
            $sql = "SELECT * FROM door WHERE changeDate >= '{$dateFrom}' AND changeDate <= '{$dateTo}' order by changeDate";
            $result = $db->query($sql);
            $data = [];
            if($result->num_rows){
                while($row = $result->fetch_assoc()){
                    $data[] = [
                        'id'=> $row['id'],
                        'state' => $row['state'],
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
        public function insert($state,$changeDate){
            $db = new Connection();
            $sql = "INSERT INTO door (state,changeDate) VALUES ('{$state}','{$changeDate}')";
            $result = $db->query($sql);
            $db->close();
            return $result;
        }
    }