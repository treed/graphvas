var sample_data = [100,2,5,27,75,74,84,80,75,70,71,30,32,31,32,25,20,15,5,10,30];

var width = 300;
var height = 150;
var scale = 100;
var view_width = 10;
var view_position = 0;

function getData() {
    return sample_data.slice(view_position, view_position+view_width);
}

function getPosition(num) {
    return height - (num / scale * height);
}

function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

function drawLine(c, x1, y1, x2, y2) {
    c.beginPath();
    c.moveTo(x1,y1);
    c.lineTo(x2,y2);
    c.stroke();
    c.closePath();
}

function renderData(c, data) {
    c.beginPath();
    x = 0;
    step = width / (view_width - 1);
    for (y=0; y < view_width; y++) {
        c.lineTo(x, getPosition(data[view_position+y]));
        x += step;
    }
    c.stroke()
    c.closePath()
}

function draw() {
  var c = getContext();
  if (!c) return;

  c.clearRect(0,0,width, height);
  c.strokeStyle = '#000';
  c.lineWidth = 1;
  c.strokeRect(0,0,300,150);

  c.strokeStyle = '#AAA';

  for (i = 30;i <= 270;i += 30) {
    drawLine(c, 0, i, 299, i);
  }

  c.strokeStyle = '#00F';
  c.lineWidth = 2;
  renderData(c, getData());
}

function getContext() {
  var elem = document.getElementById('myCanvas');
  if (!elem || !elem.getContext) {
    return;
  }
 
  return elem.getContext('2d');
}

window.addEventListener('load', function () {
  draw();
}, false);

function handleScroll(delta, vertical) {
    width_delta = position_delta = 0;
    if (vertical) {
        width_delta = delta;
    } else {
        position_delta = delta;
    }
    
    view_width = clamp(view_width - width_delta, 5, 20);
    view_position = clamp(view_position - position_delta, 0, sample_data.length - view_width);
    draw();
}

function wheel(event){
        var delta = 0;
        var vertical = 0;
        if (!event) /* For IE. */
                event = window.event;
        if (event.wheelDeltaY) { /* IE/Opera. */
                vertical = 1;
                delta = event.wheelDeltaY/120;
                if (window.opera)
                        delta = -delta;
        } else if (event.wheelDeltaX) {
                delta = event.wheelDeltaX/120;
                if (window.opera)
                        delta = -delta;
        } else if (event.detail) { /** Mozilla case. */
                delta = -event.detail/3;
        }
        /** If delta is nonzero, handle it.
         * Basically, delta is now positive if wheel was scrolled up,
         * and negative, if wheel was scrolled down.
         */
        if (delta)
                handleScroll(delta, vertical);
        /** Prevent default actions caused by mouse wheel.
         * That might be ugly, but we handle scrolls somehow
         * anyway, so don't bother here..
         */
        if (event.preventDefault)
                event.preventDefault();
	event.returnValue = false;
}

/** Initialization code. 
 * If you use your own event management code, change it as required.
 */
if (window.addEventListener)
        /** DOMMouseScroll is for mozilla. */
        window.addEventListener('DOMMouseScroll', wheel, false);
/** IE/Opera. */
window.onmousewheel = document.onmousewheel = wheel;
