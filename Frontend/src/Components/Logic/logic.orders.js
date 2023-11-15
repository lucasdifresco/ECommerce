import { getCart } from "./logic.cart";
import { getBookById } from "./logic.shop";

export default function order(id, status, total, info, products) {
    const order =
    {
        id: id,
        status: status,
        total: total,
        info: info,
        products: products,
    };
    return (order);
}
export function getEmptyOrder() {
    return order(0, "", 0, { name: "", surname: "", phone: 0, country: "", city: "", street: "", streetNum: 0, doorbell: "", comments: "" }, [{ title: "", amount: 0, price: 0 }]);
}
export function getOrdersItems() {
    const items = [
        order(1, "In Process", 6342, null, [{ title: "Book 1", amount: 1, price: 5342 }, { title: "Book 2", amount: 2, price: 1000 }]),
        order(2, "Shipped", 9587, null, [{ title: "Book 1", amount: 1, price: 5342 }, { title: "Book 2", amount: 2, price: 1000 }, { title: "Book 3", amount: 3, price: 3245 }]),
        order(3, "Delivered", 3245, null, [{ title: "Book 3", amount: 3, price: 3245 }]),
    ];
    let dbItems = JSON.parse(localStorage.getItem('orders'));
    if (dbItems == null) { dbItems = [getEmptyOrder()]; }
    return (dbItems);
}
export function prepareCartToOrder(info) {
    const cart = getCart();
    let sum = 0;
    let products = [];
    cart.forEach(item => {
        const book = getBookById(item.product);
        sum += (book.price * item.amount);
        products.push({ title: book.name, amount: item.amount, price: (book.price * item.amount) });
    });

    let order = {
        status: 'In Process',
        total: sum,
        info: info,
        products: products
    }
    return order;
}