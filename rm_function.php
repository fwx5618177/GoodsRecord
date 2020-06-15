<?
//1.基础函数库;

//1.连接数据库；
function connectSql( $hostname, $username, $pwd, $dbname, $port){
	//连接数据库；
	// $hostname = "localhost";
	// $username = "fwx";
	// $pwd = "279357";
	// $dbname = "test";
	// $port = "3306";
	$con = mysqli_connect( $hostname, $username, $pwd, $dbname ) or die("链接失败");
	
	mysqli_set_charset($con, 'utf-8');
	//判断是否连接到服务器；
	if( !$con ){
		echo "Error: Unable to connect to MySQL" . PHP_EOL;
		echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
		echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
		echo "无法连接数据库！";
		return false;
	}
	
	//检查连接的常用写法
	if ( mysqli_connect_errno() ){
		printf( "Connect failed: %s\n", mysqli_connect_error() );
		return false;
	}
	
	return true;
}

//2.返回数据库的名字；

function rtDBName( $defaultName ){
	//返回默认数据库的名字;
	if( $result = mysqli_query( $con, " SELECT DATABASE() " ) ) {
		$row = mysqli_fetch_row( $result );
		printf( "Defalut database is:  %s \n", $row[0] );
		mysqli_free_result( $result );
	}
	
	$selectTable = mysqli_select_db( $con, "record_db" );

	//返回数据库的名字;
	if( $result = mysqli_query( $con, " SELECT DATABASE() " ) ) {
		$row = mysqli_fetch_row( $result );
		printf( "再次检查，Defalut database is: %s.\n", $row[0] );
		mysqli_free_result( $result );
	}

	
}


function rmSqlData(){

ini_set("display_errors","On");
error_reporting(E_ALL);

$allData = $_POST['allData'];

if ( $allData == NULL ){ 
	die('数据为空！');
}

//转换字符串为对象数组;
$arr = json_decode($allData, true);


	
	
}



?>