import { getBookById } from "./logic.shop";

export default function item(id, product, amount) {
    const item =
    {
        id: id,
        product: product,
        amount: amount,
    };
    return (item);
}

export function getCart() {
    const items = getItems();
    return items;
}
export function addToCart(product) {
    let items = getItems();
    let inCart = false;

    for (let i = 0; i < items.length; i++) { if (items[i].product == product) { inCart = true; } }
    if (inCart) { console.log("Item is already in the cart."); return false; }
    
    items.push(item(items.length + 1, product, 1));
    setItems(items);
    return items;
}
export function removeFromCart(id) {
    let items = getItems();
    if (id <= 0 || items.lenght < id) { console.log("Cart Item ", id, " does not exist."); return; }
    let ids = [];
    for (let i = 0; i < items.length; i++){ ids.push(items[i].id);}
    items.splice(ids.indexOf(id), 1);
    setItems(items);
    return items;
}
export function addAmount(id) {
    let items = getItems();
    if (id <= 0 || items.lenght < id) { console.log("Cart Item ", id, " does not exist."); return; }
    
    const stock = getBookById(items[id - 1].product).stock;
    const amount = items[id - 1].amount;
    if (amount >= stock) { console.log("Out of stock."); return false; }

    items[id - 1].amount += 1;
    setItems(items);
    return items;
}
export function substractAmount(id) {
    let items = getItems();
    if (id <= 0 || items.lenght < id) { console.log("Cart Item ", id, " does not exist."); return; }
    
    const amount = items[id - 1].amount;
    if (amount <= 1) { console.log("Minimum amount reached."); return false;  }

    items[id - 1].amount -= 1;
    setItems(items);
    return items;
}
export function emptyCart(){
    localStorage.removeItem('cart');
}

function setItems(items) {
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(items));
}
function getItems() {
    const items = [
        item(1, "60dee0405b5f1c1d4ca30c59", 1),
        item(2, "60dee0455b5f1c1d4ca30c5a", 2),
        item(3, "60dee0545b5f1c1d4ca30c5d", 3),
        item(4, "60dee0585b5f1c1d4ca30c5e", 4),
    ];
    
    let dbItems = JSON.parse(localStorage.getItem('cart'));
    if (dbItems === null)
    {
        setItems([]);
        dbItems = [];
    }
    return (dbItems);
}