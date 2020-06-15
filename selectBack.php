<?

//打开错误提示;
ini_set("display_errors","On");
error_reporting(E_ALL);
header("Content-type: application/x-www-form-urlencoded");

//获取传来的数据；
$allData = $_POST['Data'];

if ( $allData == NULL ){ 
	die('false');
}

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

//查询结果；
$tmp = "SELECT * FROM ProductionRecord WHERE barcode LIKE '$allData%'";

$result = mysqli_query( $con, $tmp ) or die("false");
;

while( $rows = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ){
	echo "<option>" . $rows['barcode'] . "</option>";
}


?>