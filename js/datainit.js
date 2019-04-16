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
            candies[candy].likes.push(Response(response.gender, response.age, response.country));
        });
        response.disliked.forEach(candy =>
        {
            candies[candy].dislikes.push(Response(response.gender, response.age, response.country));
        });
        response.neutral.forEach(candy =>
        {
            candies[candy].neutral.push(Response(response.gender, response.age, response.country));
        });
    })
    // Turn object list into array for data purposes. Also, get percentages.
    var candy_list = [];
    Object.entries(candies).forEach(candy =>
    {
        var candy_obj = candy[1];
        // Get Percentages.
        candy_obj.like_count = candy_obj.likes.length;
        candy_obj.dislike_count = candy_obj.dislikes.length;
        candy_obj.neutral_count = candy_obj.neutral.length;
        candy_obj.update();
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
    Any_full_sized_candy_bar: new Candy("Any Full Sized Candy Bars", "chocolate"),
    Butterfinger:  new Candy("Butterfinger", "chocolate"),
    Candy_Corn:  new Candy("Candy Corn", "candy"),
    Chiclets: new Candy("Chiclets", "candy"),
    Dots: new Candy("Dots", "candy"),
    Fuzzy_Peaches: new Candy("Fuzzy Peaches", "candy"),
    Good_N_Plenty: new Candy("Good & Plenty", "candy"),
    Gummy_Bears_straight_up: new Candy("Gummy Bears", "candy"),
    Healthy_Fruit: new Candy("Healthy Fruit", "other"),
    Heath_Bar: new Candy("Health Bar", "other"),
    Hershey_s_Dark_Chocolate: new Candy("Hershey's Dark Chocolate", "chocolate"),
    Hershey_s_Milk_Chocolate: new Candy("Hershey's Milk Chocolate", "chocolate"),
    Hershey_s_Kisses: new Candy("Hershey's Kisses", "chocolate"),
    Jolly_Rancher_bad_flavor: new Candy("Jolly Rancher (Bad Flavor)", "candy"),
    Jolly_Ranchers_good_flavor: new Candy("Jolly Rancher (Good Flavor)", "candy"),
    Junior_Mints: new Candy("Junior Mints", "chocolate"),
    Kit_Kat: new Candy("Kit Kat", "chocolate"),
    LaffyTaffy: new Candy("Laffy Taffy", "candy"),
    LemonHeads: new Candy("Lemonhead", "candy"),
    Licorice_not_black: new Candy("Non-black Licorice", "candy"),
    Licorice_yes_black: new Candy("Black Licorice", "candy"),
    Lollipops: new Candy("Lollipops", "candy"),
    Mike_and_Ike: new Candy("Mike and Ike", "candy"),
    Milk_Duds: new Candy("Milk Duds", "chocolate"),
    Milky_Way: new Candy("Milky Way", "chocolate"),
    Regular_M_Ms: new Candy("M&M's", "chocolate"),
    Peanut_M_M_s: new Candy("Peanut M&M's", "chocolate"),
    Mint_Kisses: new Candy("Mint Kisses", "chocolate"),
    Mr_Goodbar: new Candy("Mr. Goodbar", "chocolate"),
    Nerds: new Candy("Nerds", "candy"),
    Nestle_Crunch: new Candy("Nestlé Crunch", "chocolate"),
    Peeps: new Candy("Peeps", "candy"),
    Pixy_Stix: new Candy("Pixy Stix", "candy"),
    Reese_s_Peanut_Butter_Cups: new Candy("Reese's Peanut Butter Cups", "chocolate"),
    Reese_s_Pieces: new Candy("Reese's Pieces", "chocolate"),
    Rolos: new Candy("Rolos", "chocolate"),
    Skittles: new Candy("Skittles", "candy"),
    Snickers: new Candy("Snickers", "chocolate"),
    Sourpatch_Kids_i_e_abominations_of_nature: new Candy("Sour Patch Kids", "candy"),
    Starburst: new Candy("Starburst", "candy"),
    Swedish_Fish: new Candy("Swedish Fish", "candy"),
    Tic_Tacs: new Candy("Tic Tacs", "other"),
    Three_Musketeers: new Candy("Three Musketeers", "chocolate"),
    Tolberone_something_or_other: new Candy("Toblerone", "chocolate"),
    Trail_Mix: new Candy("Trail Mix", "other"),
    Twix: new Candy("Twix", "chocolate"),
    Whatchamacallit_Bars: new Candy("Whatchamacallit Bars", "chocolate"),
    York_Peppermint_Patties: new Candy("York Peppermint Patties", "chocolate")
};
