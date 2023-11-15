// Gettign the Newly created Mongoose Model we just created 
var Order = require('../models/Order.model');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Orders List
exports.get = async function (query) {
    try {
        var Orders = await Order.find(query);
        //console.log(Orders);
        return Orders;
    } catch (e) {
        console.log("error services", e)
        throw Error('Error while Paginating Orders');
    }
}
exports.update = async function (order) {

    var id = { _id: order.id }

    try { var oldOrder = await Order.findOne(id); }
    catch (e) { throw Error("Error occured while Finding the Order") }

    // If no old Order Object exists return false
    if (!oldOrder) { return false; }

    //Edit the Order Object
    oldOrder.status = order.status ? order.status : oldOrder.status;
    
    try {
        var savedOrder = await oldOrder.save()
        return savedOrder;
    } catch (e) { throw Error("And Error occured while updating the Order"); }
}
exports.create = async function (order) {
    var newOrder = new Order({
        user: order.user,
        status: order.status,
        total: order.total,
        information: JSON.parse(order.info),
        products: JSON.parse(order.products)
    });
    
    try {
        var createdOrder = await newOrder.save();
        return createdOrder;
    } catch (e) {
        console.log(e)
        throw Error("An Error occured while creating the Order");
    }
}