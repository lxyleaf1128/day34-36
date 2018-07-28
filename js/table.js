function createTable(data) {
    var str='<table><tr><th>商品</th><th>地区</th>';
    for (var i = 1; i <= 12; i++) {
    	str+='<th>'+i+'月'+'</th>';
    }
    str+='</tr>';//输出表头：商品、地区、1月、2月、…… 12月
    var or=check(regionB);
	var op=check(productB);//数组
	var number_r=or.length;
	var number_p=op.length;//获得checkbox选中数量
	
	for (var s = 0; s < data.length; s++) {//生成每行不合并的表格
	    str+='<tr><td>';
	    str+=data[s][0].product;
	    str+='</td><td>';
	    str+=data[s][0].region;
	    str+='</td>';
    	for (var j = 0; j < 12; j++)  {//遍历数据,输出每一行的表格HTML内容
    		str+='<td>'+data[s][0].sale[j]+'</td>';//j表示月份
    	} 
    	str+='</tr>';
	}//含表头
	
	//根据不同情况对表格html进行各种字符串操作
	if (number_p==1&&number_r>1) {//商品一个地区多个
	    var tr=str.split('</tr>');
	    tr.pop();
	    tr[0]=tr[0]+'</tr>';//表头不处理
		for (var i = 1; i < tr.length;i++ ) {//原先的每一行
			var a=tr[i].indexOf('</td>');
			var f=tr[i].slice(0,a);//取</td>之前的，需要修改
			var l=tr[i].slice(a);//取</td>之后一段	
			if(i==1){
				f=f.replace(f,'<tr><td rowspan="'+number_r+'">'+f.slice(8));//修改第一个标签
				tr[i]=f+l+'</tr>';}
			else{
				f=f.replace(f,'<tr>');//删除第一个td
				l=l.slice(5);//去除</td>
				tr[i]=f+l+'</tr>';}
		}
		var str=tr.join();
	}


	if (number_p>1&&number_r==1) {//商品多个地区一个
		var strh='<table><tr><th>地区</th><th>商品</th>';
		for (var i = 1; i <= 12; i++) {
			strh+='<th>'+i+'月'+'</th>';
		}
		strh+='</tr>';//输出表头：地区、商品、1月、2月、…… 12月
		var tr=str.split('</tr>');
		tr.pop();//获取右边不含</tr>的数组
		tr.shift();//去除表头那一行
		for (var i = 0; i < tr.length; i++) {//对所有的商品地区交换位置
			var a=tr[i].indexOf('<td>');//获得第一个
			var b=tr[i].indexOf('</td>');
			var text1=tr[i].slice(a+4,b);//取第一列内容
			var last1=tr[i].slice(b+5);//取</td>之后一段
			var c=last1.indexOf('<td>');
			var d=last1.indexOf('</td>');
			var text2=last1.slice(c+4,d);//取第二列内容
			var last2=last1.slice(d);//取</td>之后一段
			var f=tr[i].slice(0,b)
			if(i==0){
				f=f.replace(f,'<tr><td rowspan="'+number_p+'">'+text2);//修改第一个标签
				tr[i]=f+'</td><td>'+text1+last2+'</tr>';
			}else{
				f=f.replace(f,'<tr>');//删除第一个td
				tr[i]=f+'<td>'+text1+last2+'</tr>';
			}
		str=strh+tr.join();
		}
	}

	if (number_p>1&&number_r>1) {//多地区多商品
	    var tr=str.split('</tr>');
	    tr.pop();
	    tr[0]=tr[0]+'</tr>';
	    var p1=[tr[1]];
	    var p2=[];
	    var a=tr[1].indexOf('<td>');//获得第一个
	    var b=tr[1].indexOf('</td>');
	    var text1=tr[1].slice(a+4,b);//取第一列内容
		for (var i = 2; i < tr.length;i++) {//原先的每一行
			var a=tr[i].indexOf('<td>');//获得第一个
			var b=tr[i].indexOf('</td>');
			var text2=tr[i].slice(a+4,b);//取i行的第一列内容
			if(text2==text1){p1.push(tr[i]);//对相同的商品进行归类
			}else{p2.push(tr[i]);}
		}
			
		for (var i = 0; i < p1.length;i++ ) {//原先的每一行
			var a=p1[i].indexOf('</td>');
			var f=p1[i].slice(0,a);//取</td>之前的，需要修改
			var l=p1[i].slice(a);//取</td>之后一段	
			if(i==0){
				f=f.replace(f,'<tr><td rowspan="'+number_r+'">'+f.slice(8));//修改第一个标签
				p1[i]=f+l+'</tr>';}
			else{
				f=f.replace(f,'<tr>');//删除第一个td
				l=l.slice(5);//去除</td>
				p1[i]=f+l+'</tr>';}
		}
		var str1=p1.join();
		for (var i = 0; i < p2.length;i++ ) {//原先的每一行
			var a=p2[i].indexOf('</td>');
			var f=p2[i].slice(0,a);//取</td>之前的，需要修改
			var l=p2[i].slice(a);//取</td>之后一段	
			if(i==0){
				f=f.replace(f,'<tr><td rowspan="'+number_r+'">'+f.slice(8));//修改第一个标签
				p2[i]=f+l+'</tr>';}
			else{
				f=f.replace(f,'<tr>');//删除第一个td
				l=l.slice(5);//去除</td>
				p2[i]=f+l+'</tr>';}
		}
		var str2=p2.join();
		var str=tr[0]+str1+str2;
	}	
	
    str+='</table>';
    str=str.replace(/,/g,'');
    t.innerHTML=str;//把生成的HTML内容赋给table-wrapper
}