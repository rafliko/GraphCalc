var canv = document.getElementById("canv");
var ctx = canv.getContext("2d");

var fxSpan = document.getElementById("fxSpan");

var w = canv.width;
var h = canv.height;
var scale = 10;
var fx = new Array();
var fxColor = new Array();

var a = 1;
var b = 1;

window.onload = function()
{
    fx[0] = "sin(x)";
    fxColor[0] = "red";
    updateGraph();
}

function setupGraph()
{
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
}

function drawGraph()
{
    for(let i=0; i<fx.length; i++)
    {
        try 
        {
            ctx.fillStyle = fxColor[i];
            for(let x=-(scale/2); x<scale/2; x+=0.0001*scale)
            {
                with(Math) y = eval(fx[i]);
                ctx.fillRect((x+scale/2)*unitw,(-y+scale/2)*unith, 2, 2);
            }
        }
        catch
        {
            continue;
        }
    }
}

function updateGraph()
{
    setupGraph();
    drawGraph();
}

function scaleChange(val)
{
    scale = val;
    updateGraph();
}

function fxChange(index, val)
{
    fx[index] = val;
    updateGraph();
}

function varChange(index, val)
{
    eval(index+"="+val);
    updateGraph();
}

function addFx()
{
    fx.push("sin(x)");
    fxColor.push("rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")");

    newFxLabel = document.createElement("label");
    newFxLabel.innerHTML = "Function "+(fx.length-1)+": ";
    fxSpan.appendChild(newFxLabel);

    newFxInput = document.createElement("input");
    newFxInput.setAttribute("type","text");
    newFxInput.setAttribute("oninput","fxChange("+(fx.length-1)+",this.value)");
    newFxInput.setAttribute("value","sin(x)");
    newFxInput.setAttribute("style","color:"+fxColor[fx.length-1]+";");
    fxSpan.appendChild(newFxInput);

    newFxBr = document.createElement("br");
    fxSpan.appendChild(newFxBr);

    updateGraph();
}

function remFx()
{
    if(fx.length>1)
    {
        fx.pop();
        fxColor.pop();
        fxSpan.removeChild(fxSpan.lastChild);
        fxSpan.removeChild(fxSpan.lastChild);
        fxSpan.removeChild(fxSpan.lastChild);
    }

    updateGraph();
}