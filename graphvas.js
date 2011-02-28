// Utility Functions
function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

// Class for holding the data
function GraphData() {
    this.data = [100,2,5,27,75,74,84,80,75,70,71,30,32,31,32,25,20,15,5,10,30,25,20,23,22,18,20,27,30,35,40,42,45,60,62,63,70,75,73,71,68,61,62,65,70,73,71,69,76,80,83,87,91,95,89,80,75,71,65];
    this.position = 5;
}

GraphData.prototype.getData = function (start, width) {
    return this.data.slice(start, start+width);
}

GraphData.prototype.length = function () {
    return this.data.length;
}

// Class for managing the graph
function Graph(id) {
    this.element = document.getElementById(id);
    this.c = this.element.getContext('2d');
    this.scale = 100;
    this.width = this.element.width;
    this.height = this.element.height;
    this.view_width = 10;
    this.grid_spacing = this.height / 5;
    this.data = new GraphData();
}

Graph.prototype.draw = function () {
    this.c.clearRect(0,0,this.width,this.height);
    this.drawBox();
    this.drawData();
}

Graph.prototype.drawBox = function () {
    this.c.save();

    this.c.strokeStyle = '#000';
    this.c.lineWidth = 1;
    this.c.strokeRect(0,0,this.width,this.height);

    this.c.strokeStyle = '#AAA';

    for (i = 0; i <= this.height - this.grid_spacing;i += this.grid_spacing) {
        this.c.beginPath();
        this.c.moveTo(0, i);
        this.c.lineTo(this.width - 1, i);
        this.c.stroke();
        this.c.closePath();
    }

    this.c.restore();
}

Graph.prototype.drawData = function () {
    this.c.save();

    this.c.strokeStyle = "#00F";
    this.c.lineWidth = 2;

    this.c.beginPath();
    x = 0;
    step = this.width / (this.view_width - 1);
    data = this.data.getData(this.data.position, this.view_width);
    for (y=0; y < this.view_width; y++) {
        this.c.lineTo(x, this.scaleDataPoint(data[y]));
        x += step;
    }
    this.c.stroke()
    this.c.closePath()

    this.c.restore();
}

Graph.prototype.handleScroll = function (delta, vertical) {
    width_delta = position_delta = 0;
    if (vertical) {
        width_delta = delta;
    } else {
        position_delta = delta;
    }
    
    this.view_width = clamp(this.view_width - width_delta, 10, 30);
    this.data.position = clamp(this.data.position - position_delta, 0, this.data.length() - this.view_width);
    this.draw();
}

Graph.prototype.scaleDataPoint = function (datum) {
    return this.height - (datum / this.scale * this.height);
}
