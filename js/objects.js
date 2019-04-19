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
        this.like_perc = this.likes.length * 1.0 / this.total;
        this.dislike_perc = this.dislikes.length * 1.0 / this.total;
        this.neutral_perc = this.neutral.length * 1.0 / this.total;
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
