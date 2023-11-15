var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var schema = new mongoose.Schema({
    user: String,
    status: String,
    total: Number,
    information: { name: String, surname: String, phone: Number, country: String, city: String, street: String, streetNum: Number, doorbell: String, comments: String },
    products: [{ title: String, amount: Number, price: Number }]
})

schema.plugin(mongoosePaginate)
const Model = mongoose.model('order', schema)

module.exports = Model;