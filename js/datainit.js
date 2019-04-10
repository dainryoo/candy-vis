/**
 * Turns raw data into object form.
 *
 * @param raw  the raw data from the csv.
 * @return object representation of a single response in the data.
 */
function getResponse(raw)
{
    // Divvy up the candies into their respective categories for each response.
    var liked = [];
    var disliked = [];
    var neutral = [];
    Object.entries(raw).forEach(attr =>
    {
        var key = attr[0];
        var value = attr[1];
        if (key.substring(0, 3) === "Q6_")
        {
            var name = key.substring(3);
            if (value === "JOY")
            {
                liked.push(name);
            }
            else if (value === "DESPAIR")
            {
                disliked.push(name);
            }
            else if (value === "MEH")
            {
                neutral.push(name);
            }
        }
    });
    // Return object representation of each response.
    return {
        gender: raw.Q2_GENDER,
        age: +raw.Q3_AGE,
        country: raw.Q4_COUNTRY,
        liked: liked,
        disliked: disliked,
        neutral: neutral
    }
}

/**
 * Gets array of candy data in object form for manipulation purposes.
 *
 * @param responses  survey response data.
 * @param candies    dictionary of candies.
 * @return array of candy objects.
 */
function getCandyData(responses, candies)
{
    // Get counts for each candy
    responses.forEach(response =>
    {
        response.liked.forEach(candy =>
        {
            candies[candy].like_count != null ? candies[candy].like_count += 1 : candies[candy].like_count = 1;
        });
        response.disliked.forEach(candy =>
        {
            candies[candy].dislike_count != null ? candies[candy].dislike_count += 1 : candies[candy].dislike_count = 1;
        });
        response.neutral.forEach(candy =>
        {
            candies[candy].neutral_count != null ? candies[candy].neutral_count += 1 : candies[candy].neutral_count = 1;
        });
    })
    // Turn object list into array for data purposes. Also, get percentages.
    var candy_list = [];
    Object.entries(candies).forEach(candy =>
    {
        var candy_obj = candy[1];
        // Get Percentages.
        var total = candy_obj.like_count + candy_obj.dislike_count + candy_obj.neutral_count;
        candy_obj.total_count = total;
        candy_obj.like_perc = candy_obj.like_count * 1.0 / total;
        candy_obj.dislike_perc = candy_obj.dislike_count * 1.0 / total;
        candy_obj.neutral_perc = candy_obj.neutral_count * 1.0 / total;
        // Add ID for lookup purposes.
        candy_obj.id = candy[0];
        // Add to array.
        candy_list.push(candy_obj);
    });
    return candy_list;
}

// List of candies. Made by hand because of inconsistencies in the naming convention
// made it impossible to get accurate  names just from the data set. Also added
// type for potential use.
var candies = {
    Any_full_sized_candy_bar: { name: "Any Full Sized Candy Bars", type: "candy" },
    Butterfinger: { name: "Butterfinger", type: "chocolate" },
    Candy_Corn: { name: "Candy Corn", type: "candy" },
    Chiclets: { name: "Chiclets", type: "candy" },
    Dots: { name: "Dots", type: "candy" },
    Fuzzy_Peaches: { name: "Fuzzy Peaches", type: "candy" },
    Good_N_Plenty: { name: "Good & Plenty", type: "candy" },
    Gummy_Bears_straight_up: { name: "Gummy Bears", type: "candy" },
    Healthy_Fruit: { name: "Healthy Fruit", type: "other" },
    Heath_Bar: { name: "Health Bar", type: "other" },
    Hershey_s_Dark_Chocolate: { name: "Hershey's Dark Chocolate", type: "chocolate" },
    Hershey_s_Milk_Chocolate: { name: "Hershey's Milk Chocolate", type: "chocolate" },
    Hershey_s_Kisses: { name: "Hershey's Kisses", type: "chocolate" },
    Jolly_Rancher_bad_flavor: { name: "Jolly Rancher (Bad Flavor)", type: "candy" },
    Jolly_Ranchers_good_flavor: { name: "Jolly Rancher (Good Flavor)", type: "candy" },
    Junior_Mints: { name: "Junior Mints", type: "chocolate" },
    Kit_Kat: { name: "Kit Kat", type: "chocolate" },
    LaffyTaffy: { name: "Laffy Taffy", type: "candy" },
    LemonHeads: { name: "Lemonhead", type: "candy" },
    Licorice_not_black: { name: "Non-black Licorice", type: "candy" },
    Licorice_yes_black: { name: "Black Licorice", type: "candy" },
    Lollipops: { name: "Lollipops", type: "candy" },
    Mike_and_Ike: { name: "Mike and Ike", type: "candy" },
    Milk_Duds: { name: "Milk Duds", type: "chocolate" },
    Milky_Way: { name: "Milky Way", type: "chocolate" },
    Regular_M_Ms: { name: "M&M's", type: "chocolate" },
    Peanut_M_M_s: { name: "Peanut M&M's", type: "chocolate" },
    Mint_Kisses: { name: "Mint Kisses", type: "chocolate" },
    Mr_Goodbar: { name: "Mr. Goodbar", type: "chocolate" },
    Nerds: { name: "Nerds", type: "candy" },
    Nestle_Crunch: { name: "Nestlé Crunch", type: "chocolate" },
    Peeps: { name: "Peeps", type: "candy" },
    Pixy_Stix: { name: "Pixy Stix", type: "candy" },
    Reese_s_Peanut_Butter_Cups: { name: "Reese's Peanut Butter Cups", type: "chocolate" },
    Reese_s_Pieces: { name: "Reese's Pieces", type: "chocolate" },
    Rolos: { name: "Rolos", type: "chocolate" },
    Skittles: { name: "Skittles", type: "candy" },
    Snickers: { name: "Snickers", type: "chocolate" },
    Sourpatch_Kids_i_e_abominations_of_nature: { name: "Sour Patch Kids", type: "candy" },
    Starburst: { name: "Starburst", type: "candy" },
    Swedish_Fish: { name: "Swedish Fish", type: "candy" },
    Tic_Tacs: { name: "Tic Tacs", type: "other" },
    Three_Musketeers: { name: "Three Musketeers", type: "chocolate" },
    Tolberone_something_or_other: { name: "Toblerone", type: "chocolate" },
    Trail_Mix: { name: "Trail Mix", type: "other" },
    Twix: { name: "Twix", type: "chocolate" },
    Whatchamacallit_Bars: { name: "Whatchamacallit Bars", type: "chocolate" },
    York_Peppermint_Patties: { name: "York Peppermint Patties", type: "chocolate" }
};
