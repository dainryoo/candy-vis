/* For data processing, use:
 * sortBy (int)
 * ascending (boolean)
 * minAge (int)
 * maxAge (int)
 * genderFilter (boolean arr)
 * countryFilter (boolean arr)
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


window.onload = start; // call start() when document has finished loading
function start() {
    // Build sort controls
    var sort = d3.select('.sort');
    sort.append('select')
        .on('change', function() {
            sortBy = d3.select(this).property('value');
            console.log('Now sorting by: ' + sortOptions[sortBy]);
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
            console.log('Sort is ' + ((ascending) ? ('ascending') : ('descending')));
        });


    // Build filter controls
    var filters;
    // Age filter
    filters = d3.select('#age-filter').append('p')
        .text('Age: ')
        .append('span')
            .text("[" +minAge + ", " + maxAge + "]")

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
                .text("[" +minAge + ", " + maxAge + "]");
            console.log(minAge + ' ~ ' + maxAge);
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
                return ("label-gender-" + i);
            })
        .append('input')
            .attr('type', 'checkbox')
            .attr('checked', true)
            .attr('class', 'checkbox')
            .on('click', function(d, i) {
                genderFilter[i] = d3.select(this).property('checked')
                if (genderFilter[i]) {
                    d3.select("#label-gender-" + i)
                        .style('color', 'black');
                } else {
                    d3.select("#label-gender-" + i)
                        .style('color', '#919191');
                }
                console.log(genderOptions[i] + ': ' + genderFilter[i]);
            });

    // Country filter
    var filters = d3.select('#country-filter');
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
                return ("label-country-" + i);
            })
        .append('input')
            .attr('type', 'checkbox')
            .attr('checked', true)
            .attr('class', 'checkbox')
            .on('click', function(d, i) {
                countryFilter[i] = d3.select(this).property('checked')
                if (countryFilter[i]) {
                    d3.select("#label-country-" + i)
                        .style('color', 'black');
                } else {
                    d3.select("#label-country-" + i)
                        .style('color', '#919191');
                }
                console.log(countryOptions[i] + ': ' + countryFilter[i]);
            });
}