function drawLine(data) {
    var lineGraph=document.getElementById('line');
    //定义好折线图绘制区域的高度，宽度，轴的高度，宽度
    var graphWidth = 700;  // 折线区域的宽度
    var graphHeight = 300; // 折线区域的高度
    const graphPadding = 20; //xy轴与图像区域的空隙
    const axisx = graphWidth - graphPadding; // x轴的宽度
    const axisy = graphHeight - graphPadding ;  // y轴的高度

    lineGraph.setAttribute("width", graphWidth);//对canvsa标签依次设置宽高
    lineGraph.setAttribute("height", graphHeight);
    const r=5;//定义好每一个数据点的直径，颜色，线的颜色，宽度 
    // const nodeColor="#572BEF";
    const nodeColor = ["#27a1ea", "#9cdc82", "#ff9f69", "#d660a8", "#6370de", "#32d3eb", "#d4ec59", "#feb64d", "#b55cbd","#AEF1C5","#F18D62","#E78AE2"];//柱子颜色
    const lineColor= ["#F03434", "#F08517", "#F6ED44", "#34E63B", "#23F4A6", "#4AC6EC", "#D441E1"];//线颜色
    const lineWidth=2;
    const nodeGap=40;//定义好每两个数据点之间的横向间隔距离

    //拿到折线图中的最大值Max
    var dataMax=0;
    for(let i = 0; i < data.length; i++) {
        for(x in data[i][0].sale){
            if (data[i][0].sale[x]>dataMax) {
                dataMax=data[i][0].sale[x];
            }
        }
    }
    var rate = dataMax / axisy;//根据Max和你用来绘制折线图图像区域的高度，进行一个数据和像素的折算比例
    var ctx = lineGraph.getContext('2d');//绘制横轴及纵轴
    ctx.strokeStyle="#000";
    ctx.lineWidth=lineWidth;
    ctx.beginPath();
    ctx.moveTo(graphPadding,0);
    ctx.lineTo(graphPadding,axisy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(graphPadding,axisy);
    ctx.lineTo(axisx,axisy);
    ctx.stroke();
    
    for(var i = 0; i < data.length; i++) {//遍历数据
        for(var j = 0; j < data[i][0].sale.length; j++) {
            var num = parseInt(data[i][0].sale[j]);//对每个数据转为数值形式
           //记录下当前数据点的数据用于下一个点时绘制连线
            nodey= axisy-num/rate+5;//数据点纵坐标
            nodex= graphPadding + (j + 1) * nodeGap + j * 2*r+r;//数据点的x坐标
            //绘制数据点
            ctx.fillStyle = nodeColor[j];
            ctx.beginPath();
            ctx.arc(nodex,nodey,r,0,Math.PI*2,true); 
            ctx.fill();
            if (j!=0) {//不是第一个
                ctx.lineWidth=2;
                ctx.strokeStyle=lineColor[i];
                ctx.beginPath();
                ctx.moveTo(nodex,nodey);
                ctx.lineTo(prenodex,prenodey);// 绘制这个数据点和上一个数据点的连线
                ctx.stroke();
            }
            prenodex=nodex;
            prenodey=nodey;
        }
    }
}
    