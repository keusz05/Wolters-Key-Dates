<?php

function getKeyDates($data){

    $curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => 'https://zauaedudamedia.blob.core.windows.net/prd/'.$data->country.'_keydates.json',
	  CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
	));
	
	//Initiate cURL
	$resp = curl_exec($curl);
	//Check Response Code eg: 240 / 200 / 400 etc.
	$responseCode = curl_getinfo($curl,CURLINFO_HTTP_CODE);
	
	$response = json_decode($resp);
	
	curl_close($curl);
    
    if($responseCode == 200 || $responseCode == 204){
        return ["status"=>true,"response"=>$response,"request"=>__FUNCTION__];
    }else{
        return ["status"=>false,"response"=>$response->message,"request"=>__FUNCTION__];
    }
}

?>