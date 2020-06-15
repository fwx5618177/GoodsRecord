//引入外部的Js
document.write("<script type='text/javascript' src='./js/table_basicFunction.js'></script>");

//END 应用函数，耦合功能；

//END.1
//点击”添加条码“,自动检查错误，并且计算结果；
//条码检查--->数字检查---->计算结果----->输出到页面；

	//检测空白--->检测内容；
	//从条码开始;
	//idname="input-1_barCode"
function barcheck(idname){
	
	//检测空白;
	var blankContent = blankCheck( idname );
	//条码格式;
	var typeContent = textSearchType( idname );
	
	if ( blankContent != true || typeContent != true ){
		
		//检测错误，返回false;
		console.log( "条码框出现问题！" );
		return false;
		
	}
	
	//正常结果则不报错；
	return true;
}

	//检测空白--->检测内容；
	//数字输入框;
	//idname1="input-2_priceTag";
	//idname2="input-3_rateTag";
	//idname3="input-4_dollarTag";
	//idname4="input-5_transportFeeTag";
function numCheck(idname1, idname2, idname3, idname4){
	var blankContent = blankCheck ( idname1 );
	var typeContent = textKeepNum( idname1 );
	if ( blankContent !=true || typeContent !=  true ){
		console.log( "数字框1里的内容出现问题！" );
		return false;
	}
	
	blankContent = blankCheck ( idname2 );
	typeContent = textKeepNum( idname2 );
	if ( blankContent !=true || typeContent !=  true ){
		console.log( "数字框里2的内容出现问题！" );
		return false;
	}
	
	blankContent = blankCheck ( idname3 );
	typeContent = textKeepNum( idname3 );
	if ( blankContent !=true || typeContent !=  true ){
		console.log( "数字框3里的内容出现问题！" );
		return false;
	}
	
	blankContent = blankCheck( idname4 );
	typeContent = textKeepNum( idname4 );
	if ( blankContent !=true || typeContent !=  true ){
		console.log( "数字框4里的内容出现问题！" );
		return false;
	}
	
	return true;
}

//点击”添加条码“后，得出的结果；
function Barcode(){
	var data = barcheck ("input-1_barCode");
	if ( data === false ){
		return false;
	}
	
	data = numCheck( "input-2_priceTag", "input-3_rateTag", "input-4_dollarTag", "input-5_transportFeeTag" );
	if( data === false ){
		return false;
	}
	
	var tmpdata = getJsonData();
	document.getElementById( "output-1_singlePrice" ).innerHTML = tmpdata.yuan;
	document.getElementById( "output-2_totalPrice" ).innerHTML = tmpdata.total;

	return true;
}

//END.2
//点击”提交“按钮，在页面生成数据展示；

//点击”提交“：检查内容---->添加标签；
function registerInf(){
	
	//检查内容，并重新计算一次数据；
	var data1 = Barcode();
	if ( data1 != true ){
		return false;
	}
	
	//动态增加标签，并且返回储存所有数据的全局数组；
	var data2 = addJson();
	
	if ( data2 === false ){
		return false;
	}
	
	//转换数组变成字符串，并且提交到后台（未完）;
	//var stringData = transferJSONString( data2 );
	//var stringData = JSON.stringify( data2 );
	
	var status = sendDOC( data2[ data2.length-1 ], "writesql.php" );
	
	console.log( "AJAX的状态：" + status );
	
	return true;
}

//试验select下拉菜单的返回值；
function selectTest( idname ){
	var data = getDBdata(idname);
	
	if ( data == false ){
		return false;
	}
	
	return true;
}
