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
    var gender_symbol = gender === "Male" ? "M" : (gender === "Female" ? "F" : "O");
    return {
        gender: gender_symbol,
        age: age,
        country: country
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
}
