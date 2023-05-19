var canv = document.getElementById("canv");
var ctx = canv.getContext("2d");
var scaleSlider = document.getElementById("scaleSlider");

var w = canv.width;
var h = canv.height;
var scale = scaleSlider.value;

window.onload = function()
{
    drawGraph();
}

function drawGraph()
{
    unitw = w/scale;
    unith = h/scale;
    ctx.clearRect(0,0,w,h);
    ctx.font = 250/scale+"px Arial";
    for(let i=0; i<scale; i++)
    {
        ctx.fillText(scale/2-i, scale/2*unitw+5, i*unith-5);
        ctx.fillText(i-scale/2, i*unitw+5, scale/2*unith-5);
        ctx.beginPath();
        if(i==scale/2) ctx.lineWidth = 4;
        else ctx.lineWidth = 1;
        ctx.moveTo(unitw*i, 0);
        ctx.lineTo(unitw*i, h);
        ctx.moveTo(0, unith*i);
        ctx.lineTo(w, unith*i);
        ctx.stroke();
    }
}

scaleSlider.oninput = function()
{
    scale = scaleSlider.value;
    drawGraph();
}