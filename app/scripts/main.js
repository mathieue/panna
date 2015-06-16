
var data = [];

function display(data) {

		var width = 1600,
			height = 60;

		var barWidth = 1
			, barHeight =height
			, padding = 0;

		var linearScale = d3.scale.linear()
			.domain([d3.min(data), d3.max(data)])
			.range([0, barHeight]);


		var svg = d3.select("svg")
		.attr("width", width)
		.attr("height", height);

		var bar = svg.selectAll("rect")
		    .data(data);

		var barEnter = bar.enter().append("rect");
		barEnter.attr("x", function(d, i) { return i * (barWidth + padding) + padding; });
		barEnter.attr("width", barWidth);
		barEnter.attr("y",  function(d, i) { return barHeight - linearScale(d) });
		barEnter.attr("height", function(d, i) { return barHeight });

}

// 288 points per day
var points = 288 * 5;
d3.json('http://127.0.0.1:4000/la_mine/_design/measures/_view/by_date?limit=' + points +'&descending=true',
	function(err,json) {
		console.log(json['rows']);
		data = json['rows'].map(function(d) {
			console.log(new Date(d.key));
			return d.value.value;
		})

		display(data);

	})