/**
 * Creates an object for raw responses.
 *
 * @param gender    Gender of the respondent.
 * @param age       Age of the respondent.
 * @param country   Country of the respondent.
 * @param likes     Array of liked treats.
 * @param dislikes  Array of disliked treats.
 * @param neutral   Array of neutral opinion treats.
 */
function RawResponse(gender, age, country, likes, dislikes, neutral)
{
    return {
        gender: gender,
        age: age,
        country: country,
        liked: likes,
        disliked: dislikes,
        neutral: neutral
    }
}

/**
 * Creates a response object.
 *
 * @param gender   the gender of the respondent.
 * @param age      the age of the respondent.
 * @param country  the country of the respondent.
 * @return the response object.
 */
function Response(gender, age, country)
{
    // "M" for male, "F" for female, "O" for other.
    var gender_symbol = gender === "Male" ? 'M' : (gender === "Female" ? 'F' : 'O');
    // "U" for US, "C" for Canada, "O" for other.
    var country_symbol = country === "United States" ? 'U' : (country === "Canada" ? 'C' : 'O');
    return {
        gender: gender_symbol,
        age: age,
        country: country_symbol
    }
}

/**
 * Object to store candy data.
 */
class Candy
{
    /**
     * Initializes candy object, including empty arrays.
     *
     * @param name  the name of the candy.
     * @param type  the type of the candy.
     */
    constructor(name, type)
    {
        this.name = name;
        this.type = type;

        this.likes = [];
        this.dislikes = [];
        this.neutral = [];
        this.total = 0;
    }

    /**
     * Updates calculated values for a candy.
     */
    update()
    {
        this.total = this.likes.length + this.dislikes.length + this.neutral.length;
        if (this.total != 0) {
            this.like_perc = this.likes.length * 1.0 / this.total;
            this.dislike_perc = this.dislikes.length * 1.0 / this.total;
            this.neutral_perc = this.neutral.length * 1.0 / this.total;
        } else {
            this.like_perc = 0;
            this.dislike_perc = 0;
            this.neutral_perc = 0;
        }
     }

    /**
     * Makes a copy of a candy object.
     */
    static copy(candy)
    {
        var faker = new Candy(candy.name, candy.type);
        candy.likes.forEach(response => { faker.likes.push({ gender: response.gender, age: response.age, country: response.country }) });
        candy.dislikes.forEach(response => { faker.dislikes.push({ gender: response.gender, age: response.age, country: response.country }) });
        candy.neutral.forEach(response => { faker.neutral.push({ gender: response.gender, age: response.age, country: response.country }) });
        faker.update();
        return faker;
    }
    // take in a candy object and add its likes, dislikes, and neutrals to the group of candies it is a part of
    addResponsesOf(candy) {
        for (var i = 0; i < candy.likes.length; i++) {
            this.likes.push(candy.likes[i]);
        }
        for (var i = 0; i < candy.dislikes.length; i++) {
            this.dislikes.push(candy.dislikes[i]);
        }
        for (var i = 0; i < candy.neutral.length; i++) {
            this.neutral.push(candy.neutral[i]);
        }
    }
}


function unfilteredGroupedData(treatlist) {
    var copylist = [];
    var candyIndex = -1;
    var chocolateIndex = -1;
    var otherIndex = -1;
    if (groupSelection[0]){
        copylist.push(new Candy("All Candies (Group)", "group"));
        candyIndex = 0;
    }
    if (groupSelection[1]){
        copylist.push(new Candy("All Chocolates (Group)", "group"));
        if (candyIndex == -1) {
            chocolateIndex = 0;
        } else {
            chocolateIndex = 1;
        }
    }
    if (groupSelection[2]){
        copylist.push(new Candy("All Others (Group)", "group"));
        if (chocolateIndex == -1) {
            otherIndex = 0;
        } else {
            otherIndex = 1;
        }
        if (candyIndex != -1) {
            otherIndex++;
        }
    }
    treatlist.forEach(treat =>
    {
        if (treat.type == "candy") {
            if (groupSelection[0]) {
                copylist[candyIndex].addResponsesOf(treat);
            } else {
                copylist.push(Candy.copy(treat));
            }
        } else if (treat.type == "chocolate") {
            if (groupSelection[1]) {
                copylist[chocolateIndex].addResponsesOf(treat);
            } else {
                copylist.push(Candy.copy(treat));
            }
        } else {
            if (groupSelection[2]) {
                copylist[otherIndex].addResponsesOf(treat);
            } else {
                copylist.push(Candy.copy(treat));
            }
        }
    });

    return copylist;
}


/**
 * Copies a list of candies.
 *
 * @param treatlist  the list to copy.
 * @return a copy of the given list.
 */
function copyCandies(treatlist)
{
   var copylist = [];
   treatlist.forEach(treat =>
   {
       copylist.push(Candy.copy(treat));
   });
   return copylist;
}
