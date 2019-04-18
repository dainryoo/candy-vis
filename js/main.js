var filename = "/candy.csv";
var candy_data;

// Load data and run program.
d3.csv(filename, raw => getResponse(raw), (error, data) =>
{
    response_data = data;  // This is an array of each row in the CSV (essentially).
    candy_data = getCandyData(data, candies);  // This is an array of each candy and its respective data.

    buildLeftChart(candy_data);
    buildRightChart();

    sortChart(sortByName(candy_data, true));
});
