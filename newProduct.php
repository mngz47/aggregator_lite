<?php

  function newProductImage($conn,$newId,$url){
        $sql = 'INSERT INTO product_image (id,product_id,url) VALUES (0,'.$newId.',"'.$url.'")';
       $result = $conn->query($sql); 
    echo '<br>new-image-insert : '.($result?'success':'failure');
   }
  
  function newProductReview($conn,$newId,$text){
        $sql = 'INSERT INTO review (id,product_id,text,date_added) VALUES (0,'.$newId.','.$text.',"'.date('d-m-Y H:i').'")';
       $result = $conn->query($sql); 
    echo '<br>new-image-insert : '.($result?'success':'failure');
   }
  
  if(
  $_POST['url'] &&
  $_POST['heading'] &&
   $_POST['price'] &&
   $_POST['brand'] &&
   $_POST['category'] &&
   $_POST['images'] &&
   $_POST['description']  &&
   $_POST['comments'] 
  ){
 
	
$conn = new mysqli('d6rii63wp64rsfb5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com','muce70z5ukkwpv5d','bqvn5jp04wlmxu64','zyo1oodysira7ro5');
	  
$sql = 'SELECT COUNT(id) AS size,id FROM product';
$result3 = $conn->query($sql);
$row3 = $result3->fetch_assoc();
$newId = $row3['size'];       
            
$sql = 'SELECT COUNT(id) AS size FROM product WHERE title="'.$title.'"';
$result3 = $conn->query($sql);
$row3 = $result3->fetch_assoc();

if($row3['size']==0){
    
    //  (id,title,quantity,brand,gender,health_table,price,date_added,company_id,discount)
    //  (parameters,refs,specification,category,category_type)
    //  (measurement,shipment_cost)
   
	$description = str_replace(";;","",$_POST['description']);
	
$sql = 'INSERT INTO product (id,title,specification,quantity,brand,gender,health_table,price,date_added,company_id,discount,parameters,category,refs,shipment_cost,draft)'.
' VALUES ('.$newId.',"'.$_POST['heading'].'","'.$description.'",4,"'.$_POST['brand'].'",-1,-1,'.$_POST['price'].',"'.($_POST['date_added']?$_POST['date_added']:date('d-m-Y H:i')).'",'.($_POST['plug']?0:0).',0,"","'.
$_POST['category'].'","'.(strpos($_POST['url'],'aliexpress')!=-1?'Shop On AliExpress':'Source').'>'.$_POST['url'].'|",200,0);';
$result3 = $conn->query(str_replace("'","",$sql));   

if($result3){ 
    
	
	$conn = new mysqli('d6rii63wp64rsfb5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com','muce70z5ukkwpv5d','bqvn5jp04wlmxu64','zyo1oodysira7ro5');

    
	$ii = explode(';;',$_POST['images']);
	for($a=0;$a<count($ii);$a++){
		newProductImage($conn,$newId,$ii[$a]);
	}
	
	$cc = explode(';;',$_POST['comments']);
	for($a=0;$a<count($cc);$a++){
		newProductReview($conn,$newId,$cc[$a]);
	}
	

	/*
	
	$sql = 'INSERT INTO feeling (id,product_id,love,angry,happy) VALUES (0,'.$newId.',0,0,0)';
    $result3 = $conn->query($sql);   
	
	track new data items _ requires seperate database
	use main database
	get rid of some old tables
    if($result3){
	    
$conn = new mysqli('localhost','produc10_mng','mngzpass636','produc10_aggregation');
	    
$sql = 'UPDATE pool_ SET product_id='.$newId.' WHERE id='.$row['id'];
$result3 = $conn->query($sql);
 echo '('.($result3?'success':'failure').','.$newId.')</br>';  
 
        }
	*/
	
        }else{
            echo mysqli_error($conn);
            echo '<br>--'.$sql;
        }    
    
	
	} 
}else{
	echo 
  '<br>URL >> '.$_POST['url']  .';;'.
  '<br>HEADING >> '.$_POST['heading']  .';;'.
   '<br>PRICE >> '.$_POST['price']  .';;'.
   '<br>BRAND >> '.$_POST['brand']  .';;'.
   '<br>CATEGORY >> '.$_POST['category']  .';;'.
   '<br>IMAGES >> '.$_POST['images']  .';;'.
   '<br>DESCRIPTION >> '.$_POST['description']  .';;'.
   '<br>COMMENTS >> '.$_POST['comments']; 
		
  }

?>
