<?php


function httpGet($url){
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $url,
    CURLOPT_FOLLOWLOCATION => 1,
    CURLOPT_USERAGENT => 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1'
));
return curl_exec($curl);
curl_close($curl);
}

if($_POST['URL']){
	echo httpGet($_POST['URL']);
}

?>