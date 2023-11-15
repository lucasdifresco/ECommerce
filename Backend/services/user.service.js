// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.get = async function (query, page, limit) {

    limit = parseInt(limit);
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Users = await User.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Users;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}
exports.create = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.password, 8);    

    try {
        var newUser = new User({
            email: user.email,
            date: new Date(),
            password: hashedPassword,
            isAdmin: false
        })

        var twin = await User.findOne({ email: newUser.email })
        if (twin != null) { console.log("User already exists."); return; }
            
        var savedUser = await newUser.save();
        var token = jwt.sign({ id: savedUser._id, isAdmin: savedUser.isAdmin }, process.env.SECRET, { expiresIn: 86400  }); // expires in 24 hours
        return { token: token, user: savedUser };
    } catch (e) {
        console.log(e);
        // throw Error("Error while Creating User")
    }
}
exports.update = async function (user) {
    
    var id = {email :user.email}

    //Try find the old User Object by the Id 
    try { var oldUser = await User.findOne(id); }
    catch (e) { throw Error("Error occured while Finding the User") }
    
    // If no old User Object exists return false
    if (!oldUser) { return false; }
    
    //Edit the User Object
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    oldUser.password = hashedPassword 
    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) { throw Error("And Error occured while updating the User"); }
}
exports.delete = async function (id) {

    // Delete the User
    try {
        var deleted = await User.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}
exports.login = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    // Find the User 
    
    try {
        console.log("login:", user);
        var dbUser = await User.findOne({ email: user.email });
        if (dbUser == null) {
            return;
            //throw Error("User doesn't exist.");
        }
        var passwordIsValid = bcrypt.compareSync(user.password, dbUser.password);
        if (!passwordIsValid) { throw Error("Invalid username/password."); }

        var token = jwt.sign({
            id: dbUser._id,
            isAdmin: dbUser.isAdmin
        }, process.env.SECRET, { expiresIn: 86400 }); // expires in 24 hours
        return { token: token, user: dbUser };
    
    } catch (e) {
        console.log(e);
        throw Error("Error while Login User")
    }

}