/**
 * Gets a version of the candy list sorted in alphabetical order.
 *
 * @param candies    the list to sort.
 * @param ascending  whether or not to sort in ascending order.
 * @return the sorted list
 */
function sortByName(candies, ascending)
{
    return candies.slice(0).sort((c1, c2) =>
    {
        if (c1.name > c2.name)
        {
            return 1 * (ascending ? 1 : -1);
        }
        else if (c1.name < c2.name)
        {
            return -1 * (ascending ? 1 : -1);
        }
        return 0;
    });
}

/**
 * Gets a version of the candy listed sorted by like percentage.
 *
 * @param candies    the list to sort.
 * @param ascending  whether or not to sort in ascending order.
 * @return the sorted list
 */
function sortByLikes(candies, ascending)
{
    return candies.slice(0).sort((c1, c2) =>
    {
        if (c1.like_perc > c2.like_perc)
        {
            return 1 * (ascending ? 1 : -1);
        }
        else if (c1.like_perc < c2.like_perc)
        {
            return -1 * (ascending ? 1 : -1);
        }
        return 0;
    });
}

/**
 * Gets a version of the candy listed sorted by dislike percentage.
 *
 * @param candies    the list to sort.
 * @param ascending  whether or not to sort in ascending order.
 * @return the sorted list
 */
function sortByDislikes(candies, ascending)
{
    return candies.slice(0).sort((c1, c2) =>
    {
        if (c1.dislike_perc > c2.dislike_perc)
        {
            return 1 * (ascending ? 1 : -1);
        }
        else if (c1.dislike_perc < c2.dislike_perc)
        {
            return -1 * (ascending ? 1 : -1);
        }
        return 0;
    });
}

/**
 * Updates chart with new data set.
 *
 * @param candies  the updated data set.
 */
function updateDataset(candies)
{
    var anim_duration = 500;
    var svg = d3.select('#bar-chart');
    // Shrink everything first.
    var despair_group = svg.select("#despair-bar-group");
    var selected = despair_group.select(".selected").data()[0];
    despair_group.selectAll(".despair")
        .classed("selected", false)
        .transition()
        .duration(anim_duration)
        .attr("x", () => hor_pad + half_width)
        .attr("width", 0);
    var joy_group = svg.select("#joy-bar-group");
    joy_group.selectAll(".joy")
        .classed("selected", false)
        .transition()
        .duration(anim_duration)
        .attr("width", 0);
    // Re-appear sorted
    despair_group.selectAll(".despair")
        .data(candies)
        .classed("selected", d => (selected === undefined) ? false : d.name === selected.name)
        .transition()
        .duration(anim_duration)
        // .delay(anim_duration)
        .attr("x", d => hor_pad + half_width - x_scale(d.dislike_perc))
        .attr("width", d => x_scale(d.dislike_perc));
    joy_group.selectAll(".joy")
        .data(candies)
        .classed("selected", d => (selected === undefined) ? false : d.name === selected.name)
        .transition()
        // .delay(anim_duration)
        .duration(anim_duration)
        .attr("width", d => x_scale(d.like_perc));
}
