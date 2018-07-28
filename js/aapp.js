var regionList=['华东','华北','华南'];
var productList=['手机','笔记本'];
var regionB=document.getElementById('region-radio-wrapper');
var procuctB=document.getElementById('product-radio-wrapper');
generateBox(regionB, regionList)//生成CheckBox
generateBox(procuctB, productList)//生成CheckBox

function all(obj,a){//点击全选框时，选上所有item
	if(obj.checked==true){
	for (var i = 0; i < a.length; i++) {
		a[i].checked=true;//每一个input都选上
	}}else{
		for (var i = 0; i < a.length; i++) {
			a[i].checked=false;//每一个input不选
		}
	}
}
function single(obj,a){//点击单选框时判断是否选上全选框
	var c=0;//统计当前被选数
	for (var i = 1; i < a.length; i++) {//全选框不算
		if(a[i].checked){
			c++;}
	}
	if (c==0) {
		obj.checked=true;
	}
	else if(c==a.length-1){
		a[0].checked=true;
	}else{
		a[0].checked=false;
	}
}
function generateBox( box, list ) {//生成一组CheckBox
    str='<input type="checkbox" name="all" value="checkbox">全选';//生成全选checkbox的html，给一个自定义属性表示为全选checkbox，比如checkbox-type="all"
    for (var i = 0; i < list.length; i++) {//遍历参数对象 生成各个子选项checkbox的html，给一个自定义属性表示为子选项
    	str+='<input type="checkbox" name="item" value="'+list[i]+'">'+list[i];//便于后续获得筛选条件,value设为list[i]
    }
    box.innerHTML+=str;//生成好的html加到容器中
    var a=box.getElementsByTagName('input');//获取该组CheckBox中的所有input
    for (var i = 0; i < a.length; i++) {//对每一个input
    	a[i].onclick = function(){//对每一个checkbox定义点击事件
    		if(this.type=='checkbox'){
    			if(this.name=='all'){//全选框
    				all(this,a);
    			}else{//单选框
    				single(this,a);
    			}
    		}
    	}
	}
}

var regionB=document.getElementById('region-radio-wrapper');
var productB=document.getElementById('product-radio-wrapper');
var t=document.getElementById('table-wrapper');
regionB.onchange= function() {//regionB的change事件
    createTable(getCondition());//渲染新的表格(根据checkbox选项获取数据)
}
productB.onchange= function() {//productB的change事件
   createTable(getCondition());//渲染新的表格(根据checkbox选项获取数据)
}
var t=document.getElementById('table-wrapper');
t.onmouseover = function(e) {
	var target = e.target;//点击在某个td上
	var parent = target.parentNode;//tr
	var arr = [];
	var newData = [];
	// if(!Number(parent.childNodes[5].innerText)) return; //如果是表头则不处理
 	for(let i = 0; i < 2; i++) {
 		arr.push(parent.childNodes[i].innerText);//地区，商品，作为索引
 	}
 	if (Number(parent.childNodes[1].innerText)) {
 		for(let i = 0; i < sourceData.length; i++) {
 			if(arr[0].indexOf(sourceData[i].product) !== -1 && arr[1].indexOf(sourceData[i].sale[0]) !== -1) {
 				newData.push(sourceData[i]);
 			}
 			if(arr[0].indexOf(sourceData[i].region) !== -1 && arr[1].indexOf(sourceData[i].sale[0]) !== -1) {
 				newData.push(sourceData[i]);
 			}
 		}
 	}else{
		for(let i = 0; i < sourceData.length; i++) {
			if(arr.indexOf(sourceData[i].region) !== -1 && arr.indexOf(sourceData[i].product) !== -1) {
				newData.push(sourceData[i]);
			}
		}
	}
	var ne = [];
	ne.push(newData);
	drawBar(ne);
	drawLine(ne);
}



