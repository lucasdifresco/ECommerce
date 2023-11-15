var ProductService = require('../services/product.service');
var UserImgService = require('../services/userImg.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getProduct = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filters = { _id: req.body.id };
    try {
        var Users = await ProductService.get(filters, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Users, message: "Succesfully Users Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getProducts = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 20;
    try {
        var Users = await ProductService.get({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Users, message: "Succesfully Users Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.createProduct = async function (req, res) {
    // Req.Body contains the form submit values.
    var Product = {
        name: req.body.name,
        author: req.body.author,
        category: req.body.category,
        description: req.body.description,
        photo: req.body.photo,
        year: req.body.year,
        price: req.body.price,
        stock: req.body.stock        
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdProduct = await ProductService.create(Product)
        return res.status(201).json({ createdProduct, message: "Succesfully Created Product" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: "Product Creation was Unsuccesfull" })
    }
}
exports.updateProduct = async function (req, res) {

    // Id is necessary for the update
    if (!req.body.id) { return res.status(400).json({ status: 400., message: "Must provide product id." }) }

    var Product = {
        id: req.body.id,
        name: req.body.name ? req.body.name : null,
        author: req.body.author ? req.body.author : null,
        category: req.body.category ? req.body.category : null,
        description: req.body.description ? req.body.description : null,
        photo: req.body.photo ? req.body.photo : null,
        year: req.body.year ? req.body.year : null,
        price: req.body.price ? req.body.price : null,
        stock: req.body.stock ? req.body.stock : null
    }
    try {
        var updatedProduct = await ProductService.update(Product)
        return res.status(200).json({ status: 200, data: updatedProduct, message: "Succesfully Updated Product" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}
exports.updateStock = async function (req, res) {

    console.log(req.body.id);
    // Id is necessary for the update
    if (!req.body.id) { return res.status(400).json({ status: 400., message: "Must provide product id." }) }
    
    var Product = {
        id: req.body.id,
        name: null,
        author: null,
        category: null,
        description: null,
        photo: null,
        year: null,
        price: null,
        stock: req.body.stock ? req.body.stock : null
    }
    try {
        var updatedProduct = await ProductService.update(Product)
        return res.status(200).json({ status: 200, data: updatedProduct, message: "Succesfully Updated Product" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}
exports.removeProduct = async function (req, res) {

    var id = req.body.id;
    try {
        var deleted = await ProductService.delete(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}

exports.guardarImagenUser = async function (req, res) {

    console.log("ImgUser", req.body)
    // Id is necessary for the update
    if (!req.body.email) {
        return res.status(400).json({ status: 400., message: "Mail must be present" })
    }

    let userImg = {
        email: req.body.email,
        nombreImagen: req.body.nombreImagen
    }

    try {
        if (userImg.nombreImagen !== '') {
            var newUserImg = await UserImgService.createUserImg(userImg);
        }

        return res.status(201).json({ status: 201, message: "Imagen cargada" });

    } catch (e) {
        console.log("error guardar imagen", e)
        return res.status(400).json({ status: 400., message: e.message })
    }
}
exports.getImagenUserByMail = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    //obtener filtro
    var filtro = {
        mail: req.body.email
    }
    try {
        var UsersImg = await UserImgService.getImagenesByUser(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        console.log("userByDni", UsersImg)
        if (UsersImg.total === 0)
            return res.status(201).json({ status: 201, data: UsersImg, message: "No existe Mail" });
        else
            return res.status(200).json({ status: 200, data: UsersImg, message: "Succesfully Users Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}