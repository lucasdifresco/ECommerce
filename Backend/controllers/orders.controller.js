var OrderService = require('../services/order.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getOrder = async function (req, res) {
    let filters = { user: req.body.user };
    try {
        var Orders = await OrderService.get(filters);
        return res.status(200).json({ status: 200, data: Orders, message: "Order Succesfully Recieved" });
    } catch (e) { return res.status(400).json({ status: 400, message: e.message }); }
}
exports.getAllOrders = async function (req, res) {
    try {
        var Orders = await OrderService.get({})
        return res.status(200).json({ status: 200, data: Orders, message: "Orders Succesfully Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getOrders = async function (req, res) {
    let filters = { user: req.body.user };
    try {
        var Orders = await OrderService.get(filters)
        return res.status(200).json({ status: 200, data: Orders, message: "Orders Succesfully Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.createOrder = async function (req, res) {
    var Order = {
        user: req.body.user,
        status: req.body.status,
        total: req.body.total,
        info: req.body.info,
        products: req.body.products
    }
    try {
        var createdOrder = await OrderService.create(Order);
        return res.status(201).json({ createdOrder, message: "Succesfully Created Order" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 400, message: "Order Creation was Unsuccesfull" })
    }
}
exports.updateOrder = async function (req, res) {

    // Id is necessary for the update
    if (!req.body.id) { return res.status(400).json({ status: 400, message: "Must provide order id." }) }

    var Order = {
        id: req.body.id,
        status: req.body.status ? req.body.status : null,
    }

    try {
        var updatedOrder = await OrderService.update(Order)
        return res.status(200).json({ status: 200, data: updatedOrder, message: "Succesfully Updated Order" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}