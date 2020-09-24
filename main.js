var canvas = document.getElementById('canvas');
console.log(canvas);
var context = canvas.getContext('2d');


canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

window.onresize = function () {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}

var enabled = false;
var lastPoint = {
    x: undefined,
    y: undefined,
}
context.fillStyle = 'black';
function drawCircle(x, y) {
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2);
    context.fill();
};

canvas.onmousedown = function (event) {
    enabled = !enabled;
    var x = event.clientX;
    var y = event.clientY;
    drawCircle(x, y);
    lastPoint.x = x;
    lastPoint.y = y;
}


canvas.onmousemove = function (event) {
    if (enabled) {
        var x = event.clientX;
        var y = event.clientY;
        drawCircle(x, y);
        context.lineWidth = 10;
        context.beginPath();
        context.moveTo(x,y);
        context.lineTo(lastPoint.x, lastPoint.y);
        context.closePath();
        context.stroke();
        lastPoint.x = x;
        lastPoint.y = y;       
    }



}

canvas.onmouseup = function () {
    enabled = !enabled;
}