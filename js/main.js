var filename = "/candy.csv";

// Load data and run program.
d3.csv(filename, raw => getResponse(raw), (error, data) =>
{
    var response_data = data;  // This is an array of each row in the CSV (essentially).
    var candy_data = getCandyData(data, candies);  // This is an array of each candy and its respective data.

    buildLeftChart(candy_data);
});
