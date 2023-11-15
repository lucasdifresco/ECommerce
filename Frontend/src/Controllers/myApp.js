import urls from '../Controllers/constants.js';
import shopItem from '../Components/Logic/logic.shop.js';
import orderItem from '../Components/Logic/logic.orders.js';

export const login = async function (login) {
    
    //url webservices
    let url = urls.login;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('email', login.email);
    formData.append('password', login.password);
    
    try {
        let response = await fetch(url, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,

        });

        let status = response.status;
        let data = await response.json();
        switch (status) {
            case 201:
                {
                    localStorage.setItem("x", JSON.stringify({ token: data.loginUser.token, email: data.loginUser.user.email, admin: data.loginUser.user.isAdmin }));
                    if (!data.loginUser.user.isAdmin) { getOrders(); }
                    else { getAllOrders(); }
                    return ({ rdo: 0, mensaje: "Ok" });
                }
            case 400: { return ({ rdo: 1, mensaje: "Incorrect username and/or password." }); } //error mail 
            default: { return ({ rdo: 1, mensaje: "Somethig is wrong."}); } //otro error
        }
    }
    catch (e) { console.log("error", e); };
}
export const signup = async function (login) {

    //url webservices
    let url = urls.register;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('email', login.email);
    formData.append('password', login.password);

    try {
        let response = await fetch(url, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,

        });

        let rdo = response.status;
        let data = await response.json();
        console.log(data);
        switch (rdo) {
            case 201:
                {
                    let user = data.createdUser.user;
                    localStorage.setItem("x", JSON.stringify({ token: data.createdUser.token, email: data.createdUser.user.email, admin: data.createdUser.user.isAdmin }));
                    return ({ rdo: 0, mensaje: "Ok" });
                }
            case 400: { return ({ rdo: 1, mensaje: "Incorrect username or password." }); }
            default: { return ({ rdo: 1, mensaje: "Ha ocurrido un error" }); }
        }
    }
    catch (e) { console.log("error", e); };
}
export const logout = function ()
{
    localStorage.removeItem("x");
    localStorage.removeItem("orders");
}

export const getProducts = async function (data) {
    //url webservices
    let url = urls.getProducts;
    const formData = new URLSearchParams();
    formData.append('query', "{}");
    formData.append('page', 1);
    formData.append('limit', 20);

    try {
        let response = await fetch(url, {
            method: 'GET',
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });

        let rdo = response.status;
        let data = await response.json();
        var prod = data.data.docs;
        let products = [];
        for (let i = 0; i < prod.length; i++) { products.push(shopItem(prod[i]._id, prod[i].name, prod[i].author, prod[i].category, prod[i].year, prod[i].price, prod[i].stock, prod[i].description, prod[i].photo)); }

        localStorage.setItem('products', JSON.stringify(products));

        switch (rdo) {
            case 201: { return ({ rdo: 0, mensaje: "Lectura correcta.", datos: data}); }
            case 304: { return ({ rdo: 0, mensaje: "Lectura correcta.", datos: data }); }
            case 400: { return ({ rdo: 1, mensaje: "Incorrect username or password." }); }
            default:  { return ({ rdo: 1, mensaje: "Ha ocurrido un error" }); }
        }
    } catch (e) { console.log("error", e); };
}
export const createProduct = async function (data) {
    //url webservices
    let url = urls.addProduct;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('name', data.name);
    formData.append('author', data.author);
    formData.append('category', data.category);
    formData.append('description', data.description);
    formData.append('photo', data.photo);
    formData.append('year', data.year);
    formData.append('price', data.price);
    formData.append('stock', data.stock);

    try {
        let response = await fetch(url, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'x-access-token': JSON.parse(localStorage.getItem('x')).token,
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,

        });

        let rdo = response.status;
        let data = await response.json();
        console.log(data);
        switch (rdo) {
            case 201: { return ({ rdo: 0, mensaje: "Ok" }); } //correcto
            case 400: { return ({ rdo: 1, mensaje: "Error." }); } //error password
            default: { return ({ rdo: 1, mensaje: "Ha ocurrido un error" }); } //otro error
        }
    }
    catch (e) { console.log("error", e); };
}
export const modifyProduct = async function (data) {
    //url webservices
    let url = urls.modifyProduct;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('id', data.id);
    formData.append('name', data.name);
    formData.append('author', data.author);
    formData.append('category', data.category);
    formData.append('description', data.description);
    formData.append('photo', data.photo);
    formData.append('year', data.year);
    formData.append('price', data.price);
    formData.append('stock', data.stock);

    try {
        let response = await fetch(url, {
            method: 'PUT',
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'x-access-token': JSON.parse(localStorage.getItem('x')).token,
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,

        });

        let rdo = response.status;
        let data = await response.json();
        switch (rdo) {
            case 201: { return ({ rdo: 0, mensaje: "Ok" }); } //correcto
            case 400: { return ({ rdo: 1, mensaje: "Error." }); } //error password
            default: { return ({ rdo: 1, mensaje: "Ha ocurrido un error" }); } //otro error
        }
    }
    catch (e) { console.log("error", e); };
}
export const updateProduct = async function (data) {
    //url webservices
    let url = urls.updateProduct;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('id', data.id);
    formData.append('stock', data.stock);

    try {
        let response = await fetch(url, {
            method: 'PUT',
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'x-access-token': JSON.parse(localStorage.getItem('x')).token,
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,

        });

        let rdo = response.status;
        let data = await response.json();
        switch (rdo) {
            case 201: { return ({ rdo: 0, mensaje: "Ok" }); } //correcto
            case 400: { return ({ rdo: 1, mensaje: "Error." }); } //error password
            default: { return ({ rdo: 1, mensaje: "Ha ocurrido un error" }); } //otro error
        }
    }
    catch (e) { console.log("error", e); };
}
export const removeProduct = async function (data) {
    //url webservices
    let url = urls.removeProduct;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('id', data.id);
    try {
        let response = await fetch(url, {
            method: 'DELETE',
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'x-access-token': JSON.parse(localStorage.getItem('x')).token,
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,

        });

        let rdo = response.status;
        let data = await response.json();
        switch (rdo) {
            case 201: { return ({ rdo: 0, mensaje: "Ok" }); } //correcto
            case 400: { return ({ rdo: 1, mensaje: "Error." }); } //error password
            default: { return ({ rdo: 1, mensaje: "Ha ocurrido un error" }); } //otro error
        }
    }
    catch (e) { console.log("error", e); };
}

export const getAllOrders = async function () {
    //url webservices
    let url = urls.getAllOrders;
    const formData = new URLSearchParams();
    try {
        let response = await fetch(url, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'x-access-token': JSON.parse(localStorage.getItem('x')).token,
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,
        });

        let rdo = response.status;
        let data = await response.json();
        var result = data.data;
        let orders = [];
        for (let i = 0; i < result.length; i++) { orders.push(orderItem(result[i]._id, result[i].status, result[i].total, result[i].information, result[i].products)); }
        localStorage.setItem('orders', JSON.stringify(orders));

        switch (rdo) {
            case 201: { return ({ rdo: 0, mensaje: "Lectura correcta.", datos: data }); }
            case 304: { return ({ rdo: 0, mensaje: "Lectura correcta.", datos: data }); }
            case 400: { return ({ rdo: 1, mensaje: "Incorrect username or password." }); }
            default: { return ({ rdo: 1, mensaje: "Ha ocurrido un error" }); }
        }
    } catch (e) { console.log("error", e); };
}
export const getOrders = async function () {
    //url webservices
    let url = urls.getOrders;
    const formData = new URLSearchParams();
    formData.append('user', JSON.parse(localStorage.getItem('x')).email);
    try {
        let response = await fetch(url, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'x-access-token': JSON.parse(localStorage.getItem('x')).token,
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,
        });

        let rdo = response.status;
        let data = await response.json();
        var result = data.data;
        let orders = [];
        for (let i = 0; i < result.length; i++) { orders.push(orderItem(result[i]._id, result[i].status, result[i].total, result[i].information, result[i].products)); }
        localStorage.setItem('orders', JSON.stringify(orders));

        switch (rdo) {
            case 201: { return ({ rdo: 0, mensaje: "Lectura correcta.", datos: data }); }
            case 304: { return ({ rdo: 0, mensaje: "Lectura correcta.", datos: data }); }
            case 400: { return ({ rdo: 1, mensaje: "Incorrect username or password." }); }
            default: { return ({ rdo: 1, mensaje: "Ha ocurrido un error" }); }
        }
    } catch (e) { console.log("error", e); };
}
export const createOrder = async function (data) {
    //url webservices
    let url = urls.addOrder;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('user', JSON.parse(localStorage.getItem('x')).email);
    formData.append('status', data.status);
    formData.append('total', data.total);
    formData.append('info', JSON.stringify(data.info));
    formData.append('products', JSON.stringify(data.products));
    try {
        let response = await fetch(url, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'x-access-token': JSON.parse(localStorage.getItem('x')).token,
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,
        });

        let rdo = response.status;
        let data = await response.json();
        switch (rdo) {
            case 201: { return ({ rdo: 0, mensaje: "Ok" }); } //correcto
            case 400: { return ({ rdo: 1, mensaje: "Error." }); } //error password
            default: { return ({ rdo: 1, mensaje: "Ha ocurrido un error" }); } //otro error
        }
    }
    catch (e) { console.log("error", e); };
}
export const modifyOrder = async function (data) {
    //url webservices
    let url = urls.modifyOrder;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('id', data.id);
    formData.append('status', data.status);

    try {
        let response = await fetch(url, {
            method: 'PUT',
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'x-access-token': JSON.parse(localStorage.getItem('x')).token,
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,
        });
        let rdo = response.status;
        let data = await response.json();
        switch (rdo) {
            case 201: { return ({ rdo: 0, mensaje: "Ok" }); } //correcto
            case 400: { return ({ rdo: 1, mensaje: "Error." }); } //error password
            default: { return ({ rdo: 1, mensaje: "Ha ocurrido un error" }); } //otro error
        }
    }
    catch (e) { console.log("error", e); };
}

export const storeImgInServer = async function (file, name) {
    let url = urls.uploadImg;
    const formData = new FormData();
    formData.append('files', file, name)
    try {
        let response = await fetch(url, {
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers: {
                'Accept': 'application/form-data',
                'x-access-token': JSON.parse(localStorage.getItem('x')).token,
                'Origin': 'http://localhost:3000',
            },
            body: formData
        });

        let archivos = await response.json()
        return archivos;
    } catch (e) { alert('Error uploading the files.'); console.log('Error uploading the files.', e); }
}
export const storeImgInCloud = async function (name) {
    let url = urls.cloudImg;
    const formData = new URLSearchParams();
    formData.append('name', name)
    try {
        let response = await fetch(url, {
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers: {
                'Accept': 'application/form-data',
                'x-access-token': JSON.parse(localStorage.getItem('x')).token,
                'Origin': 'http://localhost:3000',
            },
            body: formData
        });

        let archivos = await response.json()
        return archivos;
    } catch (e) { alert('Error uploading the files.'); console.log('Error uploading the files.', e); }
}