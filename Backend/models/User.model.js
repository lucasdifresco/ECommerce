var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var schema = new mongoose.Schema({
    email: String,
    password: String,
    date: Date,
    isAdmin: Boolean
})

schema.plugin(mongoosePaginate)
const Model = mongoose.model('user', schema)

module.exports = Model;