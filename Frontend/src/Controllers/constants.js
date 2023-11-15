//URL Backend
const urlApi = process.env.REACT_APP_URL || "http://localhost:4000/";
export const urls = {
    urlApi: process.env.REACT_APP_URL || "http://localhost:4000/",
    urlImgUser: urlApi + '/uploads/imgUser/',

    login: urlApi + "users/login",
    register: urlApi + "users/registration",

    getProducts: urlApi + "products/",
    getProduct: urlApi + "products/id",
    addProduct: urlApi + "products/add",
    modifyProduct: urlApi + "products/modify",
    updateProduct: urlApi + "products/update",
    removeProduct: urlApi + "products/remove",

    getOrder: urlApi + "orders/id",
    getOrders: urlApi + "orders/",
    getAllOrders: urlApi + "orders/all",
    addOrder: urlApi + "orders/add",
    modifyOrder: urlApi + "orders/modify",

    uploadImg: urlApi + "products/img",
    cloudImg: urlApi + "products/cloud",
}
export default urls;