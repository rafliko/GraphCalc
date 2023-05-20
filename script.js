var canv = document.getElementById("canv");
var ctx = canv.getContext("2d");
var scaleSlider = document.getElementById("scaleSlider");
var fxInput = document.getElementById("fxInput");

var w = canv.width;
var h = canv.height;
var scale = scaleSlider.value;

var fx = fxInput.value;

window.onload = function()
{
    drawGraph(fx);
}

function drawGraph(fx)
{
    //setup, grid
    unitw = w/scale;
    unith = h/scale;
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.font = 250/scale+"px Arial";
    ctx.clearRect(0,0,w,h);
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

    //graph
    ctx.fillStyle = "red";
    ctx.lineWidth = 2;
    for(let x=-(scale/2); x<scale/2; x+=0.001)
    {
        y = eval(fx);
        ctx.fillRect((x+scale/2)*unitw,(-y+scale/2)*unith, 2, 2);
    }
}

scaleSlider.oninput = function()
{
    scale = scaleSlider.value;
    drawGraph(fx);
}

fxInput.oninput = function()
{
    fx = fxInput.value;
    drawGraph(fx);
}