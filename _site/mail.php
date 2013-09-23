<?php

	$name = $_POST["name"];
	$email = $_POST["email"];
	$message = $_POST["message"];

	$recipient = "me@christianselig.com";
	$subject = "Message From Website";
	$body = "[From: " . $name . "]\r\n\r\n" . $message;
	$headers = "From: " . $email;

	$success = mail($recipient, $subject, $body, $headers);
	
	echo $success;
	
?>