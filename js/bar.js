function drawBar(data) {//绘制一个柱状图(柱状图数据)
    var barGraph = document.getElementById('bar'); //获取放置图像的位置
    var graphWidth = 700;  // 图像区域的宽度
    var graphHeight = 300; // 图像区域的高度
    barGraph.setAttribute("width", graphWidth);//对svg标签依次设置宽高
    barGraph.setAttribute("height", graphHeight);

    const graphPadding = 20; //xy轴与图像区域的空隙
    const axisx = graphWidth - graphPadding; // x轴的宽度
    const axisy = graphHeight - graphPadding ;  // y轴的高度
    const eachBarWidth = 10; // 一个柱子的宽度
    const barGap = 8;   // 柱子的间隔宽度
    const barColor = ["#27a1ea", "#9cdc82", "#ff9f69", "#d660a8", "#6370de", "#32d3eb", "#d4ec59", "#feb64d", "#b55cbd","#AEF1C5","#F18D62","#E78AE2"];//柱子颜色
    const axisColor = "black";   //轴的颜色

    var dataMax = 0;
    //  拿到柱状图中的最大值Max
    for(let i = 0; i < data.length; i++) {
        for(x in data[i][0].sale){
            if (data[i][0].sale[x]>dataMax) {
                dataMax=data[i][0].sale[x];
            }
        }
    }
    //  根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
    var rate = dataMax / axisy;
    //  绘制横轴及纵轴
    let barHtml = [];//数组存放画图的html代码
    barHtml.push("<line x1=" + graphPadding + " y1=0 x2=" + graphPadding + " y2=" + axisy + " stroke=" + axisColor + " stroke-width='2'/>");//y轴
    barHtml.push("<line x1=" + graphPadding + " y1=" + axisy + " x2=" + axisx + " y2=" + axisy + " stroke=" + axisColor + " stroke-width='2'/>");//x轴
    for(var i = 0; i < data.length; i++) {//遍历数据
        //console.log(data[i][0].sale)
        for(var j = 0; j < data[i][0].sale.length; j++) {
            var num = parseInt(data[i][0].sale[j]);//对每个数据转为数值形式
            //console.log(rate)
           // console.log(dataMax)
            var BarHeight=num/rate;
            //console.log(BarHeight);
            var barBlock = 12 *(eachBarWidth+barGap);//一组data所占的宽度
            var x = graphPadding + (j + 1) * barGap + j * eachBarWidth + i * barBlock;//计算将要绘制柱子的位置
            
            //绘制每一个柱子,计算将要绘制柱子的高度
            barHtml.push("<rect width='" + eachBarWidth + "' height='" + BarHeight + "' x='" + x + "'y='" + (axisy - BarHeight) + " 'fill=" + barColor[i] + " />");
        }
    }
    barGraph.innerHTML = barHtml.join(""); 
}