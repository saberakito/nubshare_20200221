<?php error_reporting(E_ALL & ~E_NOTICE);
header("Access-Control-Allow-Origin: *");
	// ************************************* [[[  ฟังก์ชั่นสร้างรูปเล็ก แบบ NEW PATH ]]] *********************************** //
	// การใช้งาน   tn_make_jpg_newpath("พาธและชื่อไฟล์รูปใหญ่","พาธและชื่อไฟล์รูปเล็กที่ต้องการ","ความกว้างไม่เกิน","ความยาวไม่เกิน","คุณภาพ");
	// เช่น tn_make_jpg("/photo/wall/pic01_768.jpg","/photo/pic01.jpg","150","150","80");
	// จะได้ ไฟล์รูปเล็ก ชื่อ pic01.jpg กว้างยาวไม่เกิน 150 คุณภาพ 80%
	// =================== Basic File ===================== //
	$ROOT = "../../";
	$ROOT_PATH = "../..";	// ไฟล์นี้อยู่ในโฟลเดอร์ลึกแค่ไหน
	if ( $LOAD_MODE == "include" ) { $ROOT = ""; }
	else{ 
		$LOAD_PASA_ONLY = 0; include($ROOT."inc/head.php");
		include($ROOT."api_nubshare/function.php");	
		include($ROOT."api_nubshare/server.php");
		include("config.php");	
	}
	// ================================================= //
	
	function getExtension($str) {
		$i = strrpos($str,".");
		if (!$i) { return ""; } 
		$l = strlen($str) - $i;
		$ext = substr($str,$i+1,$l);
		return $ext;
	}
	$ROOT = "../../../"; 
	if($_GET["ac"]=="add"){
		include("../../../../"."api_nubshare/function.php");	
		include("../../../../"."api_nubshare/server.php");
		include("config.php");	
		if (!is_dir($ROOT.$_POST['pathFile'])) {
			mkdir($ROOT.$_POST['pathFile'], 0777 ,true);    
		}
		if (!is_dir($ROOT.$_POST['pathTn'])) {
			mkdir($ROOT.$_POST['pathTn'], 0777 ,true);     
		}
		if (!is_dir($ROOT.$_POST['pathEx'])) {
			mkdir($ROOT.$_POST['pathEx'], 0777 ,true);     
		}
		if (!is_dir($ROOT.$_POST['pathMini'])) {
			mkdir($ROOT.$_POST['pathMini'], 0777 ,true);     
		}
		$objArray = [];
		
		for($i=0;$i<count($_FILES["files"]["name"]);$i++){
			if(isset($_GET["image_id"])&&$_FILES["files"]["name"][$i] != ""){
				$id = $_GET["image_id"];
				$sql_getimage = "SELECT * FROM plugin_uploadphotonumber WHERE pupn_id ='".$id."'";
				//echo $sql_getimage;
				$table_getimage = $Conn->query($sql_getimage);
				$data_getimage = mysqli_fetch_array($table_getimage);
				$sql = " DELETE FROM plugin_uploadphotonumber WHERE ( pupn_unixtime_image = '".$_GET["unique_id"]."') ";
				
				if ($Conn->query($sql))  { 
					/* if($_POST['pathFile']!=""&&$_POST['pathFile']!=null){
						unlink($ROOT_PATH.$_POST["pathFile"].$data_getimage["pupn_image_filename"].".".$data_getimage["pupn_image_type"]);
					}
					if($_POST['pathTn']!=""&&$_POST['pathTn']!=null){
						unlink($ROOT_PATH.$_POST["pathTn"].$data_getimage["pupn_image_filename"].".".$data_getimage["pupn_image_type"]);
					}
					if($_POST['pathEx']!=""&&$_POST['pathEx']!=null){
						unlink($ROOT_PATH.$_POST["pathEx"].$data_getimage["pupn_image_filename"].".".$data_getimage["pupn_image_type"]);
					}
					if($_POST['pathMini']!=""&&$_POST['pathMini']!=null){
						unlink($ROOT_PATH.$_POST["pathMini"].$data_getimage["pupn_image_filename"].".".$data_getimage["pupn_image_type"]);
					} */
				}  
			}
			if($_FILES["files"]["name"][$i] != ""){
				$images = $_FILES["files"]["tmp_name"][$i];
				$filename = stripslashes($_FILES['files']['name'][$i]);
				$extension = strtolower(getExtension($filename));
				
				// convert jpeg to jpg
				if($extension=="jpeg"){
					$extension = "jpg";	
				}
				
				$new_images = "Thumbnails_".$_FILES["files"]["name"][$i];
				$name_picture = $m['id'].'_'.date("Y-m-d_H-i-s").'_'.$i;
				$name_image = $name_picture.'.'.$extension;
				$name_image_jpg = $m['id'].'_'.date("Y-m-d_H-i-s").'_'.$i.'.'.$extension;
				copy($_FILES["files"]["tmp_name"][$i],$ROOT.$_POST['pathFile'].$name_image);
				
				if($_POST['pathTn']!=""&&$_POST['pathTn']!=null){
					if($_POST['typeTn']=="resize"){
						make_tn_newpath($ROOT.$_POST['pathFile'].$name_image,$ROOT.$_POST['pathTn'].$name_image_jpg,$_POST["resizeW"],$_POST["resizeH"],"95");	
					}else{
						make_tn_size($ROOT.$_POST['pathFile'].$name_image,$ROOT.$_POST['pathTn'].$name_image_jpg,$_POST["resizeW"],$_POST["resizeH"],"mid","mid","95");	
					}
					
				}
				
				if($_POST['pathEx']!=""&&$_POST['pathEx']!=null){
					if($_POST['typeEx']=="resize"){
						make_tn_newpath($ROOT.$_POST['pathFile'].$name_image,$ROOT.$_POST['pathEx'].$name_image_jpg,$_POST["exPhotoSizeW"],$_POST["exPhotoSizeH"],"95");
					}else{
						make_tn_size($ROOT.$_POST['pathFile'].$name_image,$ROOT.$_POST['pathEx'].$name_image_jpg,$_POST["exPhotoSizeW"],$_POST["exPhotoSizeH"],"mid","mid","95");
					}
					
				}
				
				if($_POST['pathMini']!=""&&$_POST['pathMini']!=null){
					if($_POST['typeMini']=="resize"){
						make_tn_newpath($ROOT.$_POST['pathFile'].$name_image,$ROOT.$_POST['pathMini'].$name_image_jpg,$_POST["miniW"],$_POST["miniH"],"95");
					}else{
						make_tn_size($ROOT.$_POST['pathFile'].$name_image,$ROOT.$_POST['pathMini'].$name_image_jpg,$_POST["miniW"],$_POST["miniH"],"mid","mid","95");
					}
					
				}
				
				
				$objArray["filename"] 	= $name_image;
				if($_GET["show"]=="mini"){
					$objArray["url_image"] 	= $DM.$_POST['pathMini'].$name_image_jpg;
				}else{
					$objArray["url_image"] 	= $DM.$_POST['pathEx'].$name_image_jpg;
				}
				
				
				$objArray["pathName"] = "";
				if($_POST['pathFile']!=""){
					$objArray["pathName"]	= $_POST['pathFile'].$name_image;
					$objArray["path_file"]=$_POST['pathFile'];
				}
				
				$objArray["pathTn"] = "";
				if($_POST['pathTn']!=""){
					$objArray["pathTn"]		= $_POST['pathTn'].$name_image_jpg;
					$objArray["path_tn"]=$_POST['pathTn'];
				}
				
				$objArray["pathEx"] = "";
				if($_POST['pathEx']!=""){
					$objArray["pathEx"]		= $_POST['pathEx'].$name_image_jpg;
					$objArray["path_ex"]=$_POST['pathEx'];
				}
				
				$objArray["pathMini"] = "";
				if($_POST['pathMini']!=""){
					$objArray["pathMini"]	= $_POST['pathMini'].$name_image_jpg;
					$objArray["path_mini"]=$_POST['pathMini'];
				}
				
				if($_GET["show"]=="mini"){
					$objArray["url_image"] 	= $DM.$_POST['pathMini'].$name_image_jpg;
				}elseif($_GET["show"]=="ex"){
					$objArray["url_image"] 	= $DM.$_POST['pathEx'].$name_image_jpg;
				}elseif($_GET["show"]=="file"){
					$objArray["url_image"] 	= $DM.$_POST['pathFile'].$name_image_jpg;
				}elseif($_GET["show"]=="tn"){
					$objArray["url_image"] 	= $DM.$_POST['pathTn'].$name_image_jpg;
				}
				
				$objArray["type_image"] = $extension;
				
				// START multi upload
				$dataImageToDB["pupn_unixtime_image"]	= $_GET["unique_id"];
				$dataImageToDB["pupn_image_filename"] 	= $name_picture;
				$dataImageToDB["pupn_image_type"] 		= $extension;
				$dataImageToDB["pupn_order"] 			= $i;
				
				
				$result = DB( 0, "insert", $TB_UPLOAD, $dataImageToDB, "" );
				$objArray["image_id"]	= $result[2];
				// END multi upload
				
				$objArray["no_id"] 			= $i;
				echo json_encode($objArray);
				exit;
			}
		}
		echo '{"status":"error"}';
	}else if($_GET["ac"]=="getImage"){
		include("../../../../"."api_nubshare/function.php");	
		include("../../../../"."api_nubshare/server.php");
		$sql_image = "select * from ".$TB_UPLOAD." where pupn_unixtime_image = '".$_POST["unique_id"]."' order by pupn_order asc";
		
		$table_image = $Conn->query($sql_image) or die ("0.65 no connect!");
		$num_rows_image = $table_image->num_rows;
		if ( $num_rows_image > 0 )
		{
			$photo_array = array();
			while ( $data_image = mysqli_fetch_array($table_image))
			{
				$url_photo_url 		= "http://dmbox.xyz/nubshare/upload/file/".$_POST["pathMini"].$data_image["pupn_image_filename"].".".$data_image["pupn_image_type"];
				$url_photo_files 	= $_POST["pathFile"].$data_image["pupn_image_filename"].".".$data_image["pupn_image_type"];
				$url_photo_tn 		= $_POST["pathTn"].$data_image["pupn_image_filename"].".".$data_image["pupn_image_type"];
				$url_photo_mini 	= $_POST["pathMini"].$data_image["pupn_image_filename"].".".$data_image["pupn_image_type"];
				$url_photo_ex 		= $_POST["pathEx"].$data_image["pupn_image_filename"].".".$data_image["pupn_image_type"];
				
				$data_image['url_photo_url'] 	= $url_photo_url;
				$data_image['pathFile'] 	= $_POST["pathFile"];
				$data_image['url_photo_files'] 	= $url_photo_files;
				$data_image['url_photo_tn'] 	= $url_photo_tn;
				$data_image['url_photo_mini'] 	= $url_photo_mini;
				$data_image['url_photo_ex'] 	= $url_photo_ex;
				array_push($photo_array,$data_image);
			}
			echo json_encode($photo_array);
		}
	}else if($_POST['ac']=='deleteImage'){
		/* $ROOT = "../../../";
		if(unlink($ROOT.$_POST["path_file"].$_POST["image_name"])){
			if($_POST["path_tn"]!=""){
				unlink($ROOT.$_POST["path_tn"].$_POST["image_name"]);
			}
			if($_POST["path_ex"]!=""){
				unlink($ROOT.$_POST["path_ex"].$_POST["image_name"]);
			}
			if($_POST["path_mini"]!=""){
				unlink($ROOT.$_POST["path_mini"].$_POST["image_name"]);
			}
		} */
		$ROOT = "../../../../";
		include($ROOT."api_nubshare/server.php");
		$data_name = substr($_POST["image_name"],0,strlen($_POST["image_name"])-5);
		
		$sql_updateField = "	update ".$_POST["table_name"]." 
								SET ".$_POST["field_name"]." =''
								WHERE ".$_POST["field_name"]." LIKE '%".$data_name."%'";
								//print_r($Conn);
								echo $sql_updateField;
		if ($Conn->query($sql_updateField))  { echo 1; } else { echo 0; }
		
	}else if($_POST["ac"]=="deleteImageOnly"){
		$ROOT = "../../../";
		//echo $ROOT.$_POST["path_file"].$_POST["image_name"];
		if(unlink($ROOT.$_POST["path_file"].$_POST["image_name"])){
			if($_POST["path_tn"]!=""){
				unlink($ROOT.$_POST["path_tn"].$_POST["image_name"]);
			}
			if($_POST["path_ex"]!=""){
				unlink($ROOT.$_POST["path_ex"].$_POST["image_name"]);
			}
			if($_POST["path_mini"]!=""){
				unlink($ROOT.$_POST["path_mini"].$_POST["image_name"]);
			}
			echo 1;
		}else{
			echo 0;
		}
	}
mysqli_close($Conn);
exit;