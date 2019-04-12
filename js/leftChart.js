function buildLeftChart(data) {

    var svg = d3.select('#bar-chart');

    var top_pad = 20; // padding space on top of axis
    var hor_pad = 14; // horizontal padding for left chart
    var width = 500; // total width of bar chart area
    var half_width = (width - (hor_pad*2))/2; // width of each half of the bar chart

    // x-scale for right half (0-100)
    var x_scale = d3.scaleLinear()
        .range([0, half_width])
        .domain([0, 1]); // 0% to 100%

    var x_axis_right = d3.axisTop(x_scale)
        .ticks(5)
        .tickFormat(function(d) {
            return d*100 + "%";
        });

    // x-scale for left half (100-0)
    var x_scale_reverse = d3.scaleLinear()
        .range([half_width, 0])
        .domain([0, 1]);

    var x_axis_left = d3.axisTop(x_scale_reverse)
        .ticks(5)
        .tickFormat(function(d) {
            return d*100 + "%";
        })
        .tickSizeOuter(0);

    svg.append('g')
        .attr('id', 'x-axis-right')
        .call(x_axis_right)
        .attr('transform', 'translate(' + (hor_pad + half_width) + ', ' + top_pad + ')');

    svg.append('g')
        .attr('id', 'x-axis-left')
        .call(x_axis_left)
        .attr('transform', 'translate(' + hor_pad + ', ' + top_pad + ')');

    // "y-axis" down the center
    svg.append('line')
        .attr('id', 'y-axis')
        .attr('x1', width/2.0)
        .attr('y1', top_pad)
        .attr('x2', width/2.0)
        .attr('y2', 400)
        .attr('stroke', 'black');

    //console.log(data);


}