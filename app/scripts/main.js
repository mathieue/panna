var width = 600,
	height = 600;

var r = 6, padding = 4;

// i want a matrix
var data = [];
for (var i = 0; i < 100; i++) {
	for (var j = 0; j < 100; j++) {
		data.push({x: i, y: j});	
	};
	
};

var svg = d3.select("svg")
	.attr("width", width)
	.attr("height", height);

var circle = svg.selectAll("circle")
    .data(data);

var circleEnter = circle.enter().append("circle");
circleEnter.attr("cx", function(d, i) { return d.x * r + r / 2; });
circleEnter.attr("cy", function(d, i) { return d.y * r + r / 2; });
circleEnter.attr("r", r - padding);