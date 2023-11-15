var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var schema = new mongoose.Schema({
    name: String,
    author: String,
    category: String,
    year: Number,
    price: Number,
    stock: Number,
    description: String,
    photo: String,    
})

schema.plugin(mongoosePaginate)
const Model = mongoose.model('product', schema)

module.exports = Model;