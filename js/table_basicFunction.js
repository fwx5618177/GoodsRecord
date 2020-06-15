//0.声明的全局变量表；
allData=[];


//1.获取id,class等属性；

//1.1 id
function getId(idname){
	var getdata = document.getElementById(idname);
	
	return getdata;
}


//1.2 class
function getClassName ( idname ) {
	var getdata = document.getElementsByClassName(idname);
	
	return getdata;
}

//2.通过改className的方式更改输入框的颜色；

//2.1 red border
function error_input ( idname ) {
	var data = getId(idname);
	
	//判断线框是否为绿色；有，删除className;
	if ( data.classList.contains("success_data") ) {
		//console.log("green checked");
		data.classList.remove ("success_data");
	}
	//更改为red，并聚焦；
	data.classList.add("error_data");
	//console.log("color checked!");
	data.focus();
	
	return true;
}

//2.2 green border
function success_input(idname){
	var data=getId(idname);
	
	//判断是否为红色；有，则删除红色className；
	if( data.classList.contains("error_data") ){
		data.classList.remove("error_data");
	}	
	//更改为green,不需要聚焦；
	data.classList.add("success_data");
	
	return true;
}

//2.3.检测输入框是否为空白；
function blankCheck(idname){
	var data=getId(idname);
	if(data.value.length > 0 ){
		success_input(idname);
		return true;
	}
	//console.log("test");
	error_input(idname);
	return false;
}

//4.正则判断输入的内容；

//4.1 判断条码是否正确；
function textSearchType(idname){
	var data=getId(idname).value;
	//正则匹配字符；
	var num=data.match(/[0-9]/g);
	var lowcase=data.match(/[a-z]/g);
	var upcase=data.match(/[A-Z]/g);
	//判断输入的字符各类型个数；
	//条码应该保证至少有一个大写、一个小写、一个数字；
	if(num != null && lowcase != null && upcase != null){
		success_input(idname);
		return true;
	}
	
	error_input(idname);
	return false;
}

//4.2判断输入的是否为数字;
function textKeepNum(idname){
	var data=getId(idname).value;
	
	//避免首位是小数点；
	var strFirst = data.substr(0, 1);
	var strLast = data.substr(data.length-1, 1);
	
	//避免二进制开头；
	var strTwice = data.substr(0,2);
	if ( strFirst == "0" && strTwice != "0." ){
		error_input(idname);
		return false;
	}
	
	if (data >=0 && data != null && data.length > 0 && data.length <= 8 && strFirst != "." && strLast != "." ){
		success_input(idname);
		//console.log(" eror textkeep test...." + data);
		return true;
	}
	
	error_input(idname);
	//console.log(" eror textkeep test");
	return false;
}

//5.计算结果；

//5.1 计算汇率；
function calculateRate(idname1,idname2){
	//获得两个数据；
	var num1=getId(idname1).value;
	var num2=getId(idname2).value;
	
	if(num1 >=0 && num1 != null && num2 >=0 && num2 != null){
		var result=num1 * num2;
		result = result.toFixed(5);
		return result;
	}
	return false;
}

//5.2 计算总和；
function totalNum(idname1,idname2,idname3,idname4){
	var num1=getId(idname1).value;
	var num2=getId(idname2).value;
	var num3=getId(idname3).value;
	var num4=getId(idname4).value;
	
	if( num1 >=0 && num1 != null && 
	    num2 >=0 && num2 != null && 
		num3 >=0 && num3 != null && 
		num4 >=0 && num4 != null){
		var total=( Number(num1) + Number(num2) + Number(num3) ) * num4;
		total = total.toFixed(5);
		return total;
	}
	return false;
}

//6.动态增删标签；

//6.1获取数据；
function getJsonData(){
	var Jsondata={};
	var data_barcode=getId("input-1_barCode").value;
	Jsondata.barcode=data_barcode;
	
	var data_brand=getId("cargoNum").value;
	Jsondata.brand=data_brand;
	
	var data_price=getId("input-2_priceTag").value;
	Jsondata.price=data_price;
	
	var data_rate=getId("input-3_rateTag").value;
	Jsondata.rate=data_rate;
	
	var data_yuan=calculateRate("input-2_priceTag","input-3_rateTag");
	Jsondata.yuan=data_yuan;

	var data_laborcost=getId("input-4_dollarTag").value;
	Jsondata.laborcost=data_laborcost;
	
	var data_transport=getId("input-5_transportFeeTag").value;
	Jsondata.transport=data_transport;
	
	var data_total=totalNum("input-2_priceTag","input-4_dollarTag","input-5_transportFeeTag","input-3_rateTag");
	Jsondata.total=data_total;
	
	
	for(i in Jsondata){
		var data=Jsondata[i];
		if(data === null || typeof data === undefined || data === false){
			return false;
		}
	}
	return Jsondata;
}

//6.2.0 添加前的检测，检查数组里已经有的内容；
function requireDataExist (idname){
	var data = document.getElementById( idname ).value;
	//如果数组为空，则直接跳过检测；
	if ( allData.length < 1 || allData.length == "undefined"  ){
		return true;
	}
	
	//遍历数组；
	for( i = 0; i < allData.length; i++ ){
		var tmp_data = allData[i].barcode;
		console.log( "tmp_data:" + tmp_data );
		console.log( "data:" + data );
		//判断是否存在相同名字；
		if( data == tmp_data ){
			error_input( idname );
			return false;
		}
	}
	
	return true;
}

//6.2.1 添加tag；
function addJson(){
	//查重处理；
	var tmp_data = requireDataExist( "input-1_barCode" );
	if ( tmp_data === false ){
		return false;
	}
	
	//获取现有的数据；
	var data=getJsonData();
	
	if(data === false){
		//alert("array error!");
		return false;
	}
	
	
	//全局变量,储存数据；
	allData.push(data);
	
	//检测allData的属性；
	console.log("allData:"+allData);
	
	//检测allData的内容；
	var tmp1 = JSON.stringify( allData );
	var tmp2 = JSON.stringify( allData[ allData.length-1 ] );
	console.log( "目前已知的所有内容: " + tmp1 );
	console.log( "新添加的数组内容： " + tmp2 );
	
	//添加元素；
	var flag=0;
	var parent=document.getElementsByClassName("currentRegister")[0];
	var datatr=document.createElement("tr");
	datatr.className="newtable";
	parent.appendChild(datatr);
	var datatd=document.createElement("td");
	datatr.appendChild(datatd);
	if (flag===0){
		var img=document.createElement("img");
		img.src="./Image.png";
		img.className="img";
		img.setAttribute("onclick","rmTag(this)");
		datatd.appendChild(img);
		
		flag=1;
	}
	//遍历数组，然后取值；
	for(i in data){	
		var datatd1=document.createElement("td");
		datatr.appendChild(datatd1);
		
		var p=document.createElement("p");
		p.className="showcontext";
		datatd1.appendChild(p);
		p.innerHTML=data[i];
		flag++;
	}
	
	return allData;
}

//6.3 删除Tag；
function rmTag( item ) {
	//img --> td
	var parent = item.parentNode;
	
	//alert(parent.nodeName);
	//td ---> tr
	var grandf = parent.parentNode;
	var grandf_tmp = grandf;
	//alert(grandf.nodeName);
	//tr ---> table
	var thriago = grandf.parentNode;
	
	
	//删除数组里的json数据；
	
	//获取索引号;
	var index = 0;
	while( ( grandf = grandf.previousSibling ) != null && grandf.nodeName === "TR" ) {
		//console.log( "nodeName:   " + grandf.nodeName );
		++index; 
	}
	
	console.log( "索引号：" + index );
	//检查此位置的内容；
	
	//即将删除的内容；
	//从数组中抽出这组数据，然后转变成字符串；
	console.log( "即将删除的内容：  " + JSON.stringify( allData[index] ) );
	
	//删除保存的内容;
	//数组从0开始,而while循环里的index会从0开始，因此不需要减1；
	
	var status = sendDOC( allData[ index ], "rmDB.php" );
	
	console.log( "AJAX的状态：" + status );
	
	allData.splice(index, 1);
	
	//检查删除后的内容；
	var tmp1 = JSON.stringify( allData );
	console.log( "删除后的剩余内容：" + tmp1 );
	
	var tmp2 = JSON.stringify( allData[index] );
	console.log( "检测删除后原位置的内容是否变化：" + tmp2 );
	
	thriago.removeChild( grandf_tmp );
	
	return true;
}

//7.数据移交给后台

//7.1 储存数据的数组转换为JSON字符串；
function transferJSONString ( arrayName ) {
	var data = JSON.stringify ( arrayName );
	
	return data;
}

//7.2 AJAX 实现与服务器得交互，向后端传数据，而本身并不影响网页内容；

//7.2.1 加载AJAX，并且递交数据；
function sendDOC( data, url ){
	var xmlhttp;
	if( window.XMLHttpRequest ){
		//IE7+
		xmlhttp = new XMLHttpRequest();
	}else {
		//IE5,IE6
		xmlhttp = new ActiveXObject( "Microsoft.XMLHTTP" );
	}
	
	//发送数据；
	xmlhttp.open( "POST", url, true );
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send( "allData=" + JSON.stringify( data ) );
	
	//发送后，返回数据；
	xmlhttp.onreadystatechange = function() {
		if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ){
			//alert( "传送成功！" );
			var data = xmlhttp.responseText;
			if( data == false ){
				alert("执行失败！");
				return false;
			}
				
		}
	}
	
	return true;
}

//7.2.1.2 加载ajax，出现在下拉框中；
function sendDaGetSelect( data, url ){
	var xmlhttp;
	if( window.XMLHttpRequest ){
		//IE7+
		xmlhttp = new XMLHttpRequest();
	}else {
		//IE5,IE6
		xmlhttp = new ActiveXObject( "Microsoft.XMLHTTP" );
	}
	
	//发送数据；
	xmlhttp.open( "POST", url, true );
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send( "Data=" + data );
	
	//发送后，返回数据；
	xmlhttp.onreadystatechange = function() {
		if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ){
			//alert( "传送成功！" );
			var data = xmlhttp.responseText;
			if( data == false ){
				alert("执行失败！");
				return false;
			}
			
			document.getElementById( "similarPattern" ).innerHTML = data;
			
		}
	}
	
	return true;
}


//7.2.2 从数据库中返回数据；
function getDBdata( idname ){
	var data = document.getElementById( idname ).value; //"input-1_barCode"
	
	if ( data == null ){
		return false;
	}
	
	var status = sendDaGetSelect( data, "selectBack.php" );
	
	console.log( "AJAX的状态：" + status );
	
	if( status == false ){
		return false;
	}
	
	return true;
}