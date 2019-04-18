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
var groupSelection = [true, true, true]; // which group options we currently have selected


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
        });
    sort.append("button")
        .attr("id", "sort-button")
        .text("Sort")
        .on("click", d =>
        {
            if (sortBy === 0)
            {
                sortChart(sortByName(candy_data, ascending));
            }
            else if (sortBy === 1)
            {
                sortChart(sortByLikes(candy_data, ascending));
            }
            else if (sortBy === 2)
            {
                sortChart(sortByDislikes(candy_data, ascending));
            }
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
            // console.log(minAge + ' ~ ' + maxAge);
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
                updateGender();
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
            .attr('checked', true)
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
                // console.log(countryOptions[i] + ': ' + countryFilter[i]);
            });

}

function updateGender() {

    var filtered_data = copy(candy_data);

    for (var i = 0; i < candy_data.length; i++) {
        var new_likes = candy_data[i].likes.filter(
            function(el) {
                return (el.gender == "M" && genderFilter[0]) ||
                    (el.gender == "F" && genderFilter[1]) ||
                    (el.gender == "O" && genderFilter[2]);
            }
        );
        filtered_data[i].likes = new_likes;

        var new_dislikes = candy_data[i].dislikes.filter(
            function(el) {
                return (el.gender == "M" && genderFilter[0]) ||
                    (el.gender == "F" && genderFilter[1]) ||
                    (el.gender == "O" && genderFilter[2]);
            }
        );
        filtered_data[i].dislikes = new_dislikes;
    }

    // update the joy bars
    d3.select('#bar-chart').selectAll('.joy')
        .data(filtered_data)
        .attr('width', function(d) {
            var like_percentage = d.likes.length / response_data.length;
            //var x_scale = d3.scaleLinear().range([0, half_width]).domain([0, 1]);
            return x_scale(like_percentage);
        })
    // update the despair bars
    d3.select('#bar-chart').selectAll('.despair')
        .data(filtered_data)
        .attr('width', function(d) {
            var dislike_percentage = d.dislikes.length / response_data.length;
            return x_scale(dislike_percentage);
        })
        .attr('x', function(d) {
            var dislike_percentage = d.dislikes.length / response_data.length;
            return (hor_pad + half_width) - x_scale(dislike_percentage);
        });

}


// blessing from https://www.codementor.io/avijitgupta/deep-copying-in-js-7x6q8vh5d
function copy(o) {
   var output, v, key;
   output = Array.isArray(o) ? [] : {};
   for (key in o) {
       v = o[key];
       output[key] = (typeof v === "object") ? copy(v) : v;
   }
   return output;
}
