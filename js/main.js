var filename = "/candy.csv";
var candy_data; // original candy data
var filtered_data; // current filtered data

// Load data and run program.
d3.csv(filename, raw => getResponse(raw), (error, data) =>
{
    response_data = data;  // This is an array of each row in the CSV (essentially).
    candy_data = getCandyData(data, candies);  // This is an array of each candy and its respective data.
    filtered_data = candy_data;

    buildLeftChart();
    buildRightChart();

    updateDataset(sortByName(candy_data, true));
});
