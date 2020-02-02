require('../models/product')

const mongoose = require('mongoose'),
    Product = mongoose.model('Product');
    Review = mongoose.model('Review')

module.exports = {

    index: (req,res) => {
        Product.find().sort({name: 1})
            .then(result => res.json({results: result}))
            .catch(err => res.json({errors: err.errors}))
    },

    create: (req,res) => {
        Product.create(req.body)
            .then(result => res.json({results: result}))
            .catch(err => res.json({errors: err.errors}))
    },

    show: (req,res) => {
        Product.findById(req.params.id)
            .then(result => res.json({results: result}))
            .catch(err => res.json({errors: err.errors}))
    },

    update: (req,res) => {
        Product.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators:true, context: 'query', useFindAndModify:false})
            .then(result => res.json({results: result}))
            .catch(err => res.json({errors: err.errors}))
    },

    destroy: (req,res) => {
        Product.deleteOne({_id: req.params.id})
            .then(result => res.json({results: result}))
            .catch(err => res.json({errors: err.errors}))
    },
    
    createReview: (req,res) => {
        Review.create(req.body)
            .then(review => {
                Product.findByIdAndUpdate(req.params.productId, {$push:{reviews: review}})
                    .then(reviews => res.json({results: reviews}))
                    .catch(err => res.json({errors: err.errors}))
            })
            .catch(err => res.json({errors: err.errors}))
    }

}