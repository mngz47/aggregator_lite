<?php

if($_POST['aff_link']){

$conn = new mysqli('localhost','produc10_mng','mngzpass636','produc10_productlists');
$sql = 'SELECT id,refs FROM product WHERE CONTAINS(refs,"'.$_POST['aff_link'].'")';
$result = $conn->query($sql);
	     if($result){
		   if($row = $result->fetch_assoc()){
         echo '1';
       }else{
         echo '0';
       }
		   }
}

?>
