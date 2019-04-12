function buildLeftChart(data) {

    var svg = d3.select('#bar-chart');
    var top_pad = 20; // padding space on top of axis
    var hor_pad = 14; // horizontal padding for left chart
    var width = 660; // total width of bar chart area
    var half_width = (width - (hor_pad*2))/2; // width of each half of the bar chart
    var bar_height = 10; // height of each individual bar
    var bar_padding = 2; // vertical space between each bar

    var title_top = 25; // top y value of chart title
    var title_height = 50; // how tall of a space the chart title takes up

    svg.attr('height', top_pad + data.length * (bar_height + bar_padding)); // update height of svg depending on number of data items


    // title underlines
    svg.append('g').attr('id', 'bar-chart-title');

    svg.select('#bar-chart-title')
        .append('line')
        .attr('id', 'despair-underline')
        .attr('x1', 239)
        .attr('y1', title_top+2)
        .attr('x2', 294)
        .attr('y2', title_top+2);
    svg.select('#bar-chart-title')
        .append('line')
        .attr('id', 'joy-underline')
        .attr('x1', 329)
        .attr('y1', title_top+2)
        .attr('x2', 353)
        .attr('y2', title_top+2);

    // title
    svg.select('#bar-chart-title')
        .append('text')
        .text('Reactions of Despair and')
        .attr('text-anchor', 'end')
        .attr('transform', 'translate(' + (half_width + hor_pad -4) + ' , ' + title_top +  ')');

    svg.select('#bar-chart-title')
        .append('text')
        .text('Joy to Different Candies')
        .attr('text-anchor', 'start')
        .attr('transform', 'translate(' +  (half_width + hor_pad) + ' , ' + title_top +  ')');


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


    // the bars!

    // joy bars
    svg.append('g')
        .attr('id', 'joy-bar-group')
        .selectAll('.joy-bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'joy-bar')
        .attr('x', (hor_pad + half_width))
        .attr('y', function(d,i) {
            return title_height + top_pad + i*(bar_height+bar_padding);
        })
        .attr('width', function(d) {
            return x_scale(d.like_perc);
        })
        .attr('height', bar_height);

    svg.append('g')
        .attr('id', 'despair-bar-group')
        .selectAll('.despair-bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'despair-bar')
        .attr('x', function(d) {
            return (hor_pad + half_width) - x_scale(d.dislike_perc);
        })
        .attr('y', function(d,i) {
            return title_height + top_pad + i*(bar_height+bar_padding);
        })
        .attr('width', function(d) {
            return x_scale(d.dislike_perc);
        })
        .attr('height', bar_height);


    // add right x-axis
    svg.append('g')
        .attr('class', 'x-axis right')
        .call(x_axis_right)
        .attr('transform', 'translate(' + (hor_pad + half_width) + ', ' + (top_pad  + title_height) + ')');

    // add left right-axis
    svg.append('g')
        .attr('class', 'x-axis left')
        .call(x_axis_left)
        .attr('transform', 'translate(' + hor_pad + ', ' + (top_pad  + title_height) + ')');



}