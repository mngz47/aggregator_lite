<?php

if($_POST['aff_link']){

$conn = new mysqli('d6rii63wp64rsfb5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com','muce70z5ukkwpv5d','bqvn5jp04wlmxu64','zyo1oodysira7ro5');
	
$sql = 'SELECT id FROM product WHERE CONTAINS(refs,"'.$_POST['aff_link'].'")';
$result = $conn->query($sql);
	     if($result){
		   if($row = $result->fetch_assoc()){
         echo $row['id'];
       }else{
         echo '-1';
       }
		   }
}

?>
