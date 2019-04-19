var hovered_index = -1; // index of the array we are hovering over in the bar chart

function buildLeftChart() {

    var svg = d3.select('#bar-chart');
    var top_pad = 20; // padding space on top of axis
    var bar_height = 15; // height of each individual bar
    var bar_padding = 0; // vertical space between each bar

    var title_top = 25; // top y value of chart title
    var title_height = 50; // how tall of a space the chart title takes up

    svg.attr('height', title_top + title_height + top_pad + candy_data.length * (bar_height + bar_padding)); // update height of svg depending on number of data items


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




    var x_axis_right = d3.axisTop(x_scale)
        .ticks(5)
        .tickFormat(function(d) {
            return d*100 + "%";
        });



    var x_axis_left = d3.axisTop(x_scale_reverse)
        .ticks(5)
        .tickFormat(function(d) {
            return d*100 + "%";
        })
        .tickSizeOuter(0);




    // the bars!!!!!

    // joy bars
    svg.append('g')
        .attr('id', 'joy-bar-group')
        .selectAll('.joy')
        .data(candy_data)
        .enter()
        .append('rect')
        .attr('class', 'joy bar')
        .attr('x', (hor_pad + half_width))
        .attr('y', function(d,i) {
            return title_height + top_pad + i*(bar_height+bar_padding);
        })
        .attr('width', function(d) {
            var like_percentage = d.like_perc;
            return x_scale(like_percentage);
        })
        .attr('height', bar_height)
        .on('mouseover', function(d, i)
        {
            d3.select(this).classed('hovered', true);
            svg.select("#despair-bar-group")
                .select(".despair:nth-child(" + (i + 1) + ")")
                .classed("hovered", true);
            hovered_index = i;
            updateHovered(d);
        })
        .on("mousemove", function(d)
        {
            updateTooltip(d3.event.pageX, d3.event.pageY, d.name);
        })
        .on('mouseout', function(d, i)
        {
            d3.select(this).classed('hovered', false);
            svg.select("#despair-bar-group")
                .select(".despair:nth-child(" + (i + 1) + ")")
                .classed("hovered", false);
            hovered_index = -1;
            updateHovered();
            tooltip.classed("visible", false);
        })
        .on('click', function(d, i)
        {
            updateSelected(d);
            svg.select("#joy-bar-group")
                .selectAll(".joy")
                .classed("selected", false);
            svg.select("#despair-bar-group")
                .selectAll(".despair")
                .classed("selected", false);
            d3.select(this).classed("selected", true);
            svg.select("#despair-bar-group")
                .select(".despair:nth-child(" + (i + 1) + ")")
                .classed("selected", true);
        });

    // despair bars
    svg.append('g')
        .attr('id', 'despair-bar-group')
        .selectAll('.despair')
        .data(candy_data)
        .enter()
        .append('rect')
        .attr('class', 'despair bar')
        .attr('x', function(d) {
            return (hor_pad + half_width) - x_scale(d.dislike_perc);
        })
        .attr('y', function(d,i) {
            return title_height + top_pad + i*(bar_height+bar_padding);
        })
        .attr('width', function(d) {
            var dislike_percentage = d.dislike_perc;
            return x_scale(dislike_percentage);
        })
        .attr('height', bar_height).on('mouseover', function(d,i) {
            d3.select(this).classed('hovered', true);
            hovered_index = i;
        })
        .on('mouseover', function(d, i)
        {
            d3.select(this).classed('hovered', true);
            svg.select("#joy-bar-group")
                .select(".joy:nth-child(" + (i + 1) + ")")
                .classed("hovered", true);
            hovered_index = i;
            updateHovered(d);
        })
        .on("mousemove", function(d)
        {
            updateTooltip(d3.event.pageX, d3.event.pageY, d.name);
        })
        .on('mouseout', function(d, i)
        {
            d3.select(this).classed('hovered', false);
            svg.select("#joy-bar-group")
                .select(".joy:nth-child(" + (i + 1) + ")")
                .classed("hovered", false);
            hovered_index = -1;
            updateHovered();
            tooltip.classed("visible", false);
        })
        .on('click', function(d, i)
        {
            updateSelected(d);
            svg.select("#joy-bar-group")
                .selectAll(".joy")
                .classed("selected", false);
            svg.select("#despair-bar-group")
                .selectAll(".despair")
                .classed("selected", false);
            d3.select(this).classed("selected", true);
            svg.select("#joy-bar-group")
                .select(".joy:nth-child(" + (i + 1) + ")")
                .classed("selected", true);
        });



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

/**
 * Gets the selected treat on the left chart.
 *
 * @return the selected treat.
 */
function getSelectedTreat()
{
     return d3.select('#bar-chart')
        .select("#joy-bar-group")
        .select(".selected")
        .data()[0];
}

function updateTooltip(x, y, name)
{
    tooltip
        .classed("visible", true)
        .style("left", x + "px")
        .style("top", y + "px")
        .html(name);
}
