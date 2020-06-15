<!DOCTYPE html>
<html>
<head>
<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
<title>接收数据</title>
</head>
<body>

<?php
ini_set("display_errors","On");
error_reporting(E_ALL);

//$allData = '{"barcode":"Qos1","price":"30","rate":"6","yuan":"180.00000","laborcost":"5","transport":"10","total":"270.00000"}';
$allData = $_POST['allData'];

echo "收到的数据：" . $allData;

if ( $allData == NULL ){ 
	die('数据为空！');
}
	
echo "获取到的数值：" . $allData . "\r\n";

$arr = json_decode($allData, true);

$barcode = $arr["barcode"];
$price = intval($arr["price"]);
$rate = intval($arr["rate"]);
$yuan = intval($arr["yuan"]);
$laborcost = intval($arr["laborcost"]);
$transport = intval($arr["transport"]);
$total = intval($arr["total"]);

echo "\n\r" . $barcode . $price . $rate . $yuan . $laborcost . $transport . $total . "\n\r";

	
//连接数据库

echo "开始连接数据库===============>>>>>\r\n";

$hostname = "localhost";
$username = "fwx";
$pwd = "279357";
$dbname = "test";
$port = "3306";


$con = mysqli_connect( $hostname, $username, $pwd, $dbname ) or die("链接失败");

mysqli_set_charset($con, 'utf-8');

//判断是否连接到服务器；
if( !$con ){
	echo "Error: Unable to connect to MySQL" . PHP_EOL;
	echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
	echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
	echo "无法连接数据库！";
	exit();
}

echo '======>>>>已经连接成功';
echo "\r\n";

//检查连接的常用写法
if ( mysqli_connect_errno() ){
	printf( "Connect failed: %s\n", mysqli_connect_error() );
	exit;
}

echo "============>>>>>再次检查\r\n";
 
//返回默认数据库的名字;
if( $result = mysqli_query( $con, " SELECT DATABASE() " ) ) {
	$row = mysqli_fetch_row( $result );
	printf( "Defalut database is:  %s \n", $row[0] );
	mysqli_free_result( $result );
}

echo "返回数据库的名字： " . $row[0] . "\r\n" ;

$selectTable = mysqli_select_db( $con, "record_db" );

//返回数据库的名字;
if( $result = mysqli_query( $con, " SELECT DATABASE() " ) ) {
	$row = mysqli_fetch_row( $result );
	printf( "再次检查，Defalut database is: %s.\n", $row[0] );
	mysqli_free_result( $result );
}


//不存在的时候,创建新表；
if( !$selectTable ){
	//创建数据库;
	if ( mysqli_query( $con, "CREATE DATABASE record_db" )){
		echo "数据库已经创建成功！\r\n";
	}else {
		die('创建失败！' );
	}
		
	$selectTable = mysqli_select_db( $con, "record_db" ) or die('创建后，选择出错');

//在数据库中创建表；
	
//并且设置主键为Id
$sql = "CREATE TABLE ProductionRecord(
		Id int NOT NULL AUTO_INCREMENT,
		PRIMARY KEY(Id),
		barcode varchar(15),
		brand varchar(15),
		price varchar(15),
		rate varchar(15),
		yuan varchar(15),
		laborcost varchar(15),
		transport varchar(15),
		total varchar(15)
);
";
		
mysqli_query( $con, $sql ) or die('递交创建ProductionRecord表的命令出错\r\n');
echo "创建表成功\r\n";

}


//筛选数据，重复检查；
$tmp_data_filter = "SELECT barcode FROM ProductionRecord WHERE barcode='$barcode'";
$tmp_filter_result = mysqli_query( $con, $tmp_data_filter );
$row = mysqli_fetch_array($tmp_filter_result, MYSQLI_ASSOC);
//($tmp_filter_result && $row['barcode'] != $barcode) or die("已经存在相同的数据！");

if ( !$tmp_filter_result || $row['barcode'] == $barcode ){
	die("已经存在相同的数据！");
}
	
//添加数据;
$data = "INSERT INTO ProductionRecord ( barcode, price, rate, yuan, laborcost, transport, total )
VALUES( '$barcode', '$price', '$rate', '$yuan', '$laborcost', '$transport', '$total ')";

mysqli_query( $con, $data ) or die("插入出现错误！" . mysqli_error( $con ));
echo "表中添加数据成功。";


//从数据库中选取数据;
$result = mysqli_query( $con, "SELECT * FROM ProductionRecord" ) or die('选取出错');
	
//输出所有结果;
while ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC )  ){
	$sqlData = $row["Id"] . $row["barcode"] . $row["brand"] . $row["price"] . $row["rate"] . $row["yuan"] . $row["laborcost"] . $row["transport"] . $row["total"];
	printf( "取出来的数据：%s\n", $sqlData );
}
	
//文件存在则指向末尾，不存在则创建，创建失败则报错；
$fileName = "php_allData.txt";
$file = fopen( $fileName, "ab" ) or die( "Error to open file." );
$file_write = fwrite($file, $allData);
	
if ( ! $file_write ){
	die('写入失败...');
}
	
//数据全部输入数据库后；
mysqli_close( $con );

fclose($file);
	
$str = "写入成功！";
	
//header( 'Content-Length:' . strlen( $str ) );
echo $str;
	


?>
</body>
</html>