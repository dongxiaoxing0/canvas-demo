var canvas = document.getElementById('canvas');

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

window.onresize = function () {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}
var context = canvas.getContext('2d');
context.lineWidth = 5;

var enabled = false;
var eraserEnabled = false;
var lastPoint = {
    x: undefined,
    y: undefined,
}
if (document.body.ontouchstart === undefined) {
    canvas.onmousedown = function (event) {
        enabled = !enabled;
        var x = event.clientX;
        var y = event.clientY;
        if (eraserEnabled) {
            context.clearRect(x-10,y-10,20,20);
        }else{
            drawCircle(x, y);
        }
        lastPoint.x = x;
        lastPoint.y = y;
    }
    
    
    canvas.onmousemove = function (event) {
        if (enabled) {
            var x = event.clientX;
            var y = event.clientY;
            if (eraserEnabled) {
                context.clearRect(x-10,y-10,20,20);
            }else{
                drawCircle(x, y);
                context.beginPath();
                context.moveTo(x,y);
                context.lineTo(lastPoint.x, lastPoint.y);
                context.closePath();
                context.stroke();
                lastPoint.x = x;
                lastPoint.y = y;
            }
        }
    }
    canvas.onmouseup = function () {
        enabled = !enabled;
    }
}else{
        canvas.ontouchstart = function (event) {
            event.preventDefault()
            enabled = !enabled;
            var x = event.touches[0].clientX;
            var y = event.touches[0].clientY;
            if (eraserEnabled) {
                context.clearRect(x-10,y-10,20,20);
            }else{
                drawCircle(x, y);
            }
            lastPoint.x = x;
            lastPoint.y = y;
        }
        
        
        canvas.ontouchmove = function (event) {
            event.preventDefault()
            if (enabled) {
                var x = event.touches[0].clientX;
                var y = event.touches[0].clientY;
                if (eraserEnabled) {
                    context.clearRect(x-10,y-10,20,20);
                }else{
                    context.beginPath();
                    context.moveTo(x,y);
                    context.lineTo(lastPoint.x, lastPoint.y);
                    context.closePath();
                    context.stroke();
                    lastPoint.x = x;
                    lastPoint.y = y;
                }
            }
        }
        canvas.ontouchend = function () {
            enabled = !enabled;    
    }
}


function drawCircle(x, y) {
    context.beginPath();
    context.arc(x, y, (context.lineWidth)/2, 0, Math.PI * 2);
    context.fill();
};

pen.onclick = function () {
    eraserEnabled = false;
    pen.classList.add('active');
    eraser.classList.remove('active');
}

eraser.onclick = function () {
    eraserEnabled = true;
    eraser.classList.add('active');
    pen.classList.remove('active');
}

save.onclick = function () {
    var url = canvas.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.download = '我的作品';
    a.href = url
    a.target = '_blank'
    a.click();
}

clear.onclick = function () {
    context.clearRect(0,0,canvas.width,canvas.height);
}

black.onclick = function () {
    context.strokeStyle = 'black'
    context.fillStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
}

red.onclick = function () {
    context.strokeStyle = 'red';
    context.fillStyle = 'red'
    red.classList.add('active');
    blue.classList.remove('active');
    green.classList.remove('active');
    black.classList.remove('active');
}
blue.onclick = function () {
    context.strokeStyle = 'blue';
    context.fillStyle = 'blue';
    blue.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');
    black.classList.remove('active');
}
green.onclick = function () {
    context.strokeStyle = 'green';
    context.fillStyle = 'green'
    green.classList.add('active');
    blue.classList.remove('active');
    red.classList.remove('active');
    black.classList.remove('active');
}

thin.onclick = function () {
    context.lineWidth = 5;
    thin.classList.add('active')
    thick.classList.remove('active')
}
thick.onclick = function () {
    context.lineWidth = 10;
    thick.classList.add('active')
    thin.classList.remove('active')
}