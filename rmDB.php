
<?php

//打开错误提示;
ini_set("display_errors","On");
error_reporting(E_ALL);

//获取传来的数据；
$allData = $_POST['allData'];

if ( $allData == NULL ){ 
	die('false');
}

//对数据进行解析；
$arr = json_decode($allData, true);
$barcode = $arr["barcode"];

//连接数据库；
$hostname = "localhost";
$username = "fwx";
$pwd = "279357";
$dbname = "test";
$port = "3306";

$con = mysqli_connect( $hostname, $username, $pwd, $dbname ) or die("false");

mysqli_set_charset($con, 'utf-8');

//检查连接的常用写法
if ( mysqli_connect_errno() ){
	printf( "Connect failed: %s\n", mysqli_connect_error() );
	exit;
}

//选择数据库；
$selectTable = mysqli_select_db( $con, "record_db" );

//删除数据；
mysqli_query( $con, "DELETE FROM ProductionRecord WHERE barcode = '$barcode' " ) or die("false");

echo "true";


?>