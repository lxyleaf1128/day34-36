function check(obj) {//获得一组checkbox中选中的选项
	checked=[];
	var items=obj.getElementsByTagName('input');
	for (var i = 1; i < items.length; i++) {
		if (items[i].checked) {
			checked.push(items[i].value);//获取checkbox后面的文本用于后续筛选
		}
	}
	return checked;
}
function getCondition() {//根据select选项获取数据
	var or=check(regionB);
	var op=check(productB);//获取选项数组
	var result=[];
	for (var i = 0; i < or.length; i++) {//外层遍历地区
		var filterResult1=sourceData.filter(function(item,index,array){return(item.region===or[i])});//筛选出满足其中一个地区的所有种类商品的信息
		for (var j = 0; j < op.length; j++) {//内层遍历商品种类
		var filterResult2=filterResult1.filter(function(item,index,array){return(item.product===op[j]);});
		result.push(filterResult2);//累加的形式不断向结果中加数据，前面的数据才不会被覆盖
		}
	}  
   return result;//返回数据，两层才可以取到sale数组
}