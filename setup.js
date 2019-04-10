/* For data processing, use:
 * sortBy (int)
 * ascending (boolean)
 * minAge (int)
 * maxAge (int)
 * genderFilter (boolean arr)
 * countryFilter (boolean arr)
 */


var sortOptions = ['Alphabetical',
                    'Most % Joy',
                    'Most % Despair'];
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
    sort.append('p')
            .text('Sort by:')
        .append('span')
        .append('select')
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
    sort.select('span').append('button')
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
    filters = d3.select('#age-filter')
        .append('svg')
        .append('g');
    var slider = d3.sliderBottom()
        .min(dataMinAge)
        .max(dataMaxAge)
        .step(1)
        .width(300)
        .ticks(5)
        .default([minAge, maxAge])
        .fill('#2196f3')
        .on('onchange', function(val) {
            minAge = val[0];
            maxAge = val[1];
            console.log(minAge + " ~ " + maxAge);
        });
    filters.call(slider);


    // Gender filter
    filters = d3.select('#gender-filter');
    filters.append('p')
        .text('Filter by gender:')
    filters.selectAll('label')
        .data(genderOptions)
        .enter()
        .append('label')
            .text(function(d, i) {
                return genderOptions[i];
            })
        .append('input')
            .attr('type', 'checkbox')
            .attr('checked', true)
            .on('click', function(d, i) {
                genderFilter[i] = d3.select(this).property('checked')
                console.log(genderOptions[i] + ': ' + genderFilter[i]);
            });

    // Country filter
    var filters = d3.select('#country-filter');
    filters.append('p')
        .text('Filter by country:')
    filters.selectAll('label')
        .data(countryOptions)
        .enter()
        .append('label')
            .text(function(d, i) {
                return countryOptions[i];
            })
        .append('input')
            .attr('type', 'checkbox')
            .attr('checked', true)
            .on('click', function(d, i) {
                countryFilter[i] = d3.select(this).property('checked')
                console.log(countryOptions[i] + ': ' + countryFilter[i]);
            });
}