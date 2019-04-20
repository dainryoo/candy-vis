// This file sets up the html 'skeleton'

// This file has the start() function, which is called onload
window.onload = start; // call start() when document has finished loading

/* For data processing, use:
 * sortBy (int)
 * ascending (boolean)
 * minAge (int)
 * maxAge (int)
 * genderFilter (boolean arr)
 * countryFilter (boolean arr)
 * groupSelection (boolean arr)
 */

var sortOptions = ['Alphabetical',
                    '% Joy',
                    '% Despair'];
var sortBy = 0; // index of what we are currently sorting bar chart by
var ascending = true;

var dataMinAge = 0; // minimum possible age
var dataMaxAge = 100; // maximum possible age
var minAge = 0; // selected min age
var maxAge = 100; // selected max age
var editingMin = false;

var genderOptions = ['Male', 'Female', 'Other'];
var genderFilter = [true, true, true]; // which gender options we currently have selected

var countryOptions = ['USA', 'Canada', 'Other'];
var countryFilter = [true, true, true]; // which country options we currently have selected

var groupOptions = ['Candy', 'Chocolate', 'Other'];
var groupSelection = [false, false, false]; // which group options we currently have selected


var x_scale, x_scale_reverse; // x-scales for left chart
var hor_pad, width, half_width;

function start() {
    hor_pad = 14; // horizontal padding for left chart
    width = 660; // total width of bar chart area
    half_width = (width - (hor_pad*2))/2; // width of each half of the bar char
    // x-scale for right half (0-100)
    x_scale = d3.scaleLinear()
        .range([0, half_width])
        .domain([0, 1]); // 0% to 100%

    // x-scale for left half (100-0)
    x_scale_reverse = d3.scaleLinear()
        .range([half_width, 0])
        .domain([0, 1]);

    // Build sort controls
    var sort = d3.select('.sort');
    sort.append('select')
        .on('change', function()
        {
            sortBy = +d3.select(this).property('value');
            updateDataset(sorting(filtered_data));
        })
        .selectAll('option')
        .data(sortOptions)
        .enter()
        .append('option')
            .attr('value', function(d, i) { return i;})
            .text(function(d) { return d; });
    // ascending/descending selector
    sort.append('span').append('button')
        .text(function() {
            return (ascending) ? ('↑') : ('↓');
        })
        .on('click', function() {
            ascending = !ascending;
            d3.select(this).text((ascending) ? ('↑') : ('↓'));
            updateDataset(sorting(filtered_data));
        });

    // Build filter controls
    var filters;
    // Age filter
    filters = d3.select('#age-filter').append('p')
        .text('Age: ')
        .append('span')
            .text('[' +minAge + ', ' + maxAge + ']')

    filters = d3.select('#age-filter')
        .append('svg')
            .attr('width', '70%')
            .attr('height', '35px')
        .append('g')
            .attr('transform', 'translate(15, 10)')
    var slider = d3.sliderBottom()
        .min(dataMinAge)
        .max(dataMaxAge)
        .step(1)
        .ticks(10)
        .width(300)
        .default([minAge, maxAge])
        .fill('#2196f3')
        .on('onchange', function(val) {
            minAge = val[0];
            maxAge = val[1];
            d3.select('#age-filter').select('span')
                .text('[' +minAge + ', ' + maxAge + ']');
            //console.log(minAge + ' ~ ' + maxAge);
            filterData();
        });
    filters.call(slider);
    filters.select('.axis')
        .attr('transform', 'translate(0,5)');
    filters.selectAll('text')
        .attr('y', '12');

    // Gender filter
    filters = d3.select('#gender-filter');
    filters.append('p')
        .text('Gender: ')
    .selectAll('label')
        .data(genderOptions)
        .enter()
        .append('label')
            .text(function(d, i) {
                return genderOptions[i];
            })
            .attr('id', function(d, i) {
                return ('label-gender-' + i);
            })
        .append('input')
            .attr('type', 'checkbox')
            .attr('checked', true)
            .attr('class', 'checkbox')
            .on('click', function(d, i) {
                genderFilter[i] = d3.select(this).property('checked')
                if (genderFilter[i]) {
                    d3.select('#label-gender-' + i)
                        .style('color', 'black');
                } else {
                    d3.select('#label-gender-' + i)
                        .style('color', '#919191');
                }
                // console.log(genderOptions[i] + ': ' + genderFilter[i]);
                filterData();
            });

    // Country filter
    filters = d3.select('#country-filter');
    filters.append('p')
        .text('Country: ')
    .selectAll('label')
        .data(countryOptions)
        .enter()
        .append('label')
            .text(function(d, i) {
                return countryOptions[i];
            })
            .attr('id', function(d, i) {
                return ('label-country-' + i);
            })
        .append('input')
            .attr('type', 'checkbox')
            .attr('checked', true)
            .attr('class', 'checkbox')
            .on('click', function(d, i) {
                countryFilter[i] = d3.select(this).property('checked')
                if (countryFilter[i]) {
                    d3.select('#label-country-' + i)
                        .style('color', 'black');
                } else {
                    d3.select('#label-country-' + i)
                        .style('color', '#919191');
                }
                // console.log(countryOptions[i] + ': ' + countryFilter[i]);
                filterData();
            });

    // Group selection
    filters = d3.select('#group-selection');
    filters.append('p')
        .text('Type: ')
    .selectAll('label')
        .data(groupOptions)
        .enter()
        .append('label')
            .text(function(d, i) {
                return groupOptions[i];
            })
            .attr('id', function(d, i) {
                return ('label-group-' + i);
            })
        .append('input')
            .attr('type', 'checkbox')
            .attr('class', 'checkbox')
            .on('click', function(d, i) {
                groupSelection[i] = d3.select(this).property('checked')
                if (groupSelection[i]) {
                    d3.select('#label-group-' + i)
                        .style('color', 'black');
                } else {
                    d3.select('#label-group-' + i)
                        .style('color', '#919191');
                }
                // console.log(groupOptions[i] + ': ' + groupSelection[i]);
                filterData();
            });

}

function filterData() {

    filtered_data = unfilteredGroupedData(candy_data);

    for (var i = 0; i < filtered_data.length; i++) {
        var new_likes = filtered_data[i].likes.filter(
            function(el) {
                return ((el.gender == "M" && genderFilter[0]) ||
                    (el.gender == "F" && genderFilter[1]) ||
                    (el.gender == "O" && genderFilter[2]))
                    &&
                    ((el.country == "U" && countryFilter[0]) ||
                    (el.country == "C" && countryFilter[1]) ||
                    (el.country == "O" && countryFilter[2]))
                    &&
                    (el.age >= minAge && el.age <= maxAge);
            }
        );
        filtered_data[i].likes = new_likes;

        var new_dislikes = filtered_data[i].dislikes.filter(
            function(el) {
                return ((el.gender == "M" && genderFilter[0]) ||
                    (el.gender == "F" && genderFilter[1]) ||
                    (el.gender == "O" && genderFilter[2]))
                    &&
                    ((el.country == "U" && countryFilter[0]) ||
                    (el.country == "C" && countryFilter[1]) ||
                    (el.country == "O" && countryFilter[2]))
                    &&
                    (el.age >= minAge && el.age <= maxAge);
            }
        );
        filtered_data[i].dislikes = new_dislikes;

        var new_neutral = filtered_data[i].neutral.filter(
            function(el) {
                return ((el.gender == "M" && genderFilter[0]) ||
                    (el.gender == "F" && genderFilter[1]) ||
                    (el.gender == "O" && genderFilter[2]))
                    &&
                    ((el.country == "U" && countryFilter[0]) ||
                    (el.country == "C" && countryFilter[1]) ||
                    (el.country == "O" && countryFilter[2]))
                    &&
                    (el.age >= minAge && el.age <= maxAge);
            }
        );
        filtered_data[i].neutral = new_neutral;

        filtered_data[i].update();
    }


    filtered_data = sorting(filtered_data);
    updateDataset(filtered_data);

    var selected = getSelectedTreat();
    if (selected !== undefined)
    {
        updateChart(selected, true);
    }
}

/**
 * Sorting the dataset based on the selected option.
 *
 * @param dataset  the dataset to sort.
 * @return the sorted dataset.
 */
function sorting(dataset)
{
    if (sortBy === 0)
    {
        return sortByName(dataset, ascending);
    }
    else if (sortBy === 1)
    {
        return sortByLikes(dataset, ascending);
    }
    else if (sortBy === 2)
    {
        return sortByDislikes(dataset, ascending);
    }
}
