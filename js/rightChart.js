var r_width = 350;
var r_height = 350;

// Margins
var r_left_margin = 70;
var r_right_margin = 35;
var r_top_margin = 100;
var r_bot_margin = 50;
var text_horz_margin = r_width / 3.5;
var text_vert_margin = 45;
var text_betw_margin = 5;

var r_anim_duration = 400;

var rx_scale;
var ry_scale;


/**
 * Update the chart with the treat being hovered.
 *
 * @param treat  the treat being hovered. null if nothing hovered.
 */
function updateHovered(treat)
{
    updateChart(treat, false);
}

/**
 * Update the chart with the treat being selected.
 *
 * @param treat  the treat being selected. null if nothing selected.
 */
function updateSelected(treat)
{
    updateChart(treat, true)
}

/**
 * Builds the right bar chart.
 */
function buildRightChart()
{
    // Get counts for given treats combined.
    var data = [{label: "Liked"}, {label: "Neutral"}, {label: "Disliked"}];

    // SVG
    var svg = d3.select("#right-chart");
    // Scales
    rx_scale = d3.scaleLinear()
        .range([r_left_margin, r_width - r_right_margin])
        .domain([0, 100]);
    ry_scale = d3.scaleBand()
        .range([r_top_margin, r_height - r_bot_margin])
        .domain(data.map(row => row.label))
        .padding(0.25);

    // Create axes
    svg.append("g")
        .attr("transform", "translate(0, " + (r_height - r_bot_margin) + ")")
        .call(d3.axisBottom(rx_scale)
            .ticks(5)
            .tickValues([20, 40, 60, 80])
            .tickFormat(d => d + "%")
            .tickSizeOuter(0)
        )
        .attr("class", "right-tick");
    svg.append("g")
        .attr("transform", "translate(" + r_left_margin + ", 0)")
        .call(d3.axisLeft(ry_scale)
            .tickSizeOuter(0))
        .attr("class", "right-tick");

    // Create labels
    var group = svg.append("g").attr("id", "labels-group");
    var selected_group = group.append("g").attr("id", "selected-label-group");
    selected_group.append("text")
        .attr("class", "label")
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "hanging")
        .attr("x", text_horz_margin)
        .attr("y", r_top_margin - text_vert_margin + text_betw_margin)
        .text("Selected:");
    selected_group.append("text")
        .attr("class", "label candy-name")
        .attr("id", "selected-text")
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "hanging")
        .attr("x", text_horz_margin + 3)
        .attr("y", r_top_margin - text_vert_margin + text_betw_margin);
    var hovered_group = group.append("g").attr("id", "hovered-label-group");
    hovered_group.append("text")
        .attr("class", "label")
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "ideographic")
        .attr("x", text_horz_margin)
        .attr("y", r_top_margin - text_vert_margin - text_betw_margin)
        .text("Hovered:");
    hovered_group.append("text")
        .attr("class", "label candy-name")
        .attr("id", "hovered-text")
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "ideographic")
        .attr("x", text_horz_margin + 3)
        .attr("y", r_top_margin - text_vert_margin - text_betw_margin);

    // Create bar groups
    group = svg.append("g").attr("id", "bars-group");
    var rows = [
        {label: "Liked", class: "joy"},
        {label: "Neutral", class: "neutral"},
        {label: "Disliked", class: "despair"}
    ];
    var hovered_group = group.append("g").attr("id", "hovered-group");
    createBars(hovered_group, rows, false);
    var selected_group = group.append("g").attr("id", "selected-group");
    createBars(selected_group, rows, true);
}

/**
 * Initializes the bars in the bar graph.
 *
 * @param group     the group to append these new elements to.
 * @param rows      the labels and classes for each row.
 * @param selected  whether or not this is for a selected row (false if hover).
 */
function createBars(group, rows, selected)
{
    var new_group = group.selectAll(".bar-group")
        .data(rows)
        .enter()
        .append("g")
        .attr("class", "bar-group");
    new_group.append("rect")
        .attr("class", d => d.class + (selected ? "-selected" : ""))
        .attr("x", s => rx_scale(0) + 1)
        .attr("y", d => ry_scale(d.label) + (selected ? ry_scale.bandwidth() / 2 + 1 : 0))
        .attr("height", ry_scale.bandwidth() / 2);
    new_group.append("text")
        .attr("class", "label")
        .attr("y", d => ry_scale(d.label) + (ry_scale.bandwidth() * (selected ? 3 : 1) / 4))
        .attr("x", d => rx_scale(0))
        .attr("alignment-baseline", "middle");
}

/**
 * Updates the chart with new data.
 *
 * @param treat     the treat whose value to update the chart with.
 * @param selected  whether to update the selected bars (false for hovers).
 */
function updateChart(treat, selected)
{
    var class_pre = selected ? "selected" : "hovered";
    var svg = d3.select("#right-chart");
    var group = svg.select("#bars-group").select("#" + class_pre + "-group");
    var data = { Liked: null, Neutral: null, Disliked: null };
    var text = "";
    if (treat !== undefined)
    {
        data["Liked"] = treat.like_perc * 100;
        data["Neutral"] = treat.neutral_perc * 100;
        data["Disliked"] = treat.dislike_perc * 100;
        text = treat.name;
    }
    // Animate bars
    var g = group.selectAll(".bar-group");
    var anim = g.transition().duration(d => r_anim_duration);
    anim.select("rect").attr("width", d => data[d.label] === null ? 0 : rx_scale(data[d.label]) - r_left_margin - 1);
    anim.select("text")
        .attr("x", d => data[d.label] === null ? rx_scale(0) : rx_scale(data[d.label]) + 3)
        .text(d => data[d.label] === null ? "" : Math.round(data[d.label]) + "%");
    // Update labels
    svg.select("#" + class_pre + "-label-group").select("#" + class_pre + "-text").text(text);
}
