<?php
try {
	 $ch = curl_init("http://www.example.com/");
	$ch = curl_init("http://cdn.innovid.com/iroll/vast/1hk265");
	$ch = curl_init("http://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/6062/iab_vast_samples/skippable&ciu_szs=300x250,728x90&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]");
	// $ch = curl_init("http://player.ooyala.com/player/cc/0zYzlybTr1Jy_eL5tSz2UUZIVa0Za7BF/en.vtt?seg=0");
	/////////////////////////////$fp = fopen("example_homepage.txt", "w");

	/////////////////////////////curl_setopt($ch, CURLOPT_FILE, $fp);
	// curl_setopt($ch, CURLOPT_HEADER, 0);


	// curl_setopt($ch,CURLOPT_RETURNTRANSFER,0);
	//curl_setopt($ch, CURLOPT_VERBOSE, 1);
	//curl_setopt($ch, CURLOPT_HEADER, 1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 15);
	// curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1);


	$response = curl_exec($ch);
	if( $response === false){
		echo 'Curl error: ' . curl_error($ch);	
	}else{
		// Then, after your curl_exec call:
		$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
		$header = substr($response, 0, $header_size);
		$body = substr($response, $header_size);

		echo $response;

		// $oXML = new SimpleXMLElement($response);

		// foreach($oXML->entry as $oEntry){
		// 	$XML .= $oEntry->title . "\n";
		// }



		// echo "{\"header-size\": \"".$header_size."\", \"header\": \"".$header."\", \"body\": \"".$XML."\"}";
	}

	curl_close($ch);
	/////////////////////////////fclose($fp);
	echo "<br>done";
} catch (Exception $e) {
	echo 'ERROR:>> ',  $e->getMessage(), "\n";
	curl_close($ch);
}



?>