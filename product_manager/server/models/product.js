const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You must include a name."],
    },
    rating: {
        type: Number,
        required: [true, "Please leave a rating."]
    },
    comment: {
        type: String,
        required: [true, "Tell us about this product"]
    }
}, {timestamps:true});

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'You must include a title.'],
        unique: true,
        minlength: [3, "Title must be longer than that."]
    },
    price: {
        type: Number,
        required: [true, "You must include a price"],
        min: [0, "Price must be more than that."]
    },
    image: {
        type: String,
        required: [true, "You must include an image"]
    },
    reviews: [ReviewSchema],
}, {timestamps:true});




ProductSchema.plugin(uniqueValidator, {message: "That product already exists!"});

mongoose.model("Product", ProductSchema);
mongoose.model("Review", ReviewSchema)
