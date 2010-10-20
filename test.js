var graph;

window.addEventListener('load', function () {
  graph = new Graph('myCanvas');
  graph.draw();
}, false);

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
                graph.handleScroll(delta, vertical);
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
