// Gettign the Newly created Mongoose Model we just created 
var Product = require('../models/Product.model');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Product List
exports.get = async function (query, page, limit) {

    limit = parseInt(limit);
    var options = { page, limit }
    try {
        var Products = await Product.paginate(query, options)
        return Products;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e)
        throw Error('Error while Paginating Products');
    }
}
exports.create = async function (product) {
    
    var newProduct = new Product({
        name: product.name,
        author: product.author,
        category: product.category,
        description: product.description,
        photo: product.photo,
        year: product.year,
        price: product.price,
        stock: product.stock,
    })

    try { var savedProduct = await newProduct.save(); }
    catch (e) {
        console.log(e)
        throw Error("Error while Creating Product")
    }
}
exports.update = async function (product) {

    var id = { _id: product.id }
    
    try { var oldProduct = await Product.findOne(id); }
    catch (e) { throw Error("Error occured while Finding the Product") }
    
    // If no old Product Object exists return false
    if (!oldProduct) { return false; }

    //Edit the Product Object
    oldProduct.name = product.name ? product.name : oldProduct.name;
    oldProduct.author = product.author ? product.author : oldProduct.author;
    oldProduct.category = product.category ? product.category : oldProduct.category;
    oldProduct.description = product.description ? product.description : oldProduct.description;
    oldProduct.photo = product.photo ? product.photo : oldProduct.photo;
    oldProduct.year = product.year ? product.year : oldProduct.year;
    oldProduct.price = product.price ? product.price : oldProduct.price;
    oldProduct.stock = product.stock ? product.stock : oldProduct.stock;

    try {
        var savedProduct = await oldProduct.save()
        return savedProduct;
    } catch (e) { throw Error("An Error occured while updating the Product"); }
}
exports.delete = async function (id) {

    try {
        var deleted = await Product.deleteOne({ _id: id })
        if (deleted.n === 0 && deleted.ok === 1) { throw Error("Product Could not be deleted") }
        return deleted;
    } catch (e) { throw Error("Error Occured while Deleting the Product") }
}