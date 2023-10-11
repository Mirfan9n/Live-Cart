let label = document.getElementById('label');
let shoppingiCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem("data")) || [];

function calculateCartItems() {
    let cal = 0;
    for (let i in basket) {
        cal += basket[i].items;
    }
    document.querySelector('.cartAmount').innerHTML = cal;
}
calculateCartItems();

let generateCartItems = () => {
    if (basket.length !== 0) {
        shoppingiCart.innerHTML = basket.map((x) => {
            let {id,items} = x;
            let search = shopItemData.find((y) => y.id === id);
            return `
        <div class="cart-item">
            <img width="100" src="${search.img}" alt="">
            <div class="details">
               <div class="title-price-x">
                    <h4 class= "tittle-price">
                        <p>${search.name}</p>
                        <p class ="cart-item-price">$${search.price}</p>
                    </h4>
                    <i class="bi bi-x-lg" id="crossBtn" onclick="cross(${id})"></i>
               </div>
               <div class="buttons cart">
                        <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id="${id}" class="quantity">
                            ${items}
                        </div>
                        <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
               <h3><span class="final-price">$ ${items *search.price}</span></h3>
            </div>
        </div>
        `;
        }).join("");
    }

  else {
    shoppingiCart.innerHTML = ``
    label.innerHTML = `
        <h2>Cart is empty </h2>
        <a href="index.html">
            <button class = "HomeBtn">Back to home </button>
        </a>
    `
 }
}
generateCartItems()

let increment = (id) => {
    let itemSelected = id;
    let search = basket.find((x) => x.id === itemSelected)

    if (search === undefined) {
        basket.push({
            id: itemSelected,
            items: 1
        })
    } else {
        search.items += 1;
    }
    generateCartItems()
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
    let itemSelected = id;
    let search = basket.find((x) => x.id === itemSelected)

    if (search === undefined) return
    else if (search.items === 0) {
        return
    } else {
        search.items -= 1;
    }
    update(id)
    basket = basket.filter((x) => x.items !== 0);
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.items;
    calculateCartItems();
    totalAmount()
};

function cross(id){
    basket= basket.filter((x) => x.id !== id)
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket));
    totalAmount()
    calculateCartItems()
} 

function totalAmount(){
    let ttlAmt=0;
    basket.find((x)=>{
        let{items, id} =x;
        let search = shopItemData.find((y)=>y.id === id);
        ttlAmt += search.price * items
        // console.log(ttlAmt);
        document.getElementById('label').innerHTML = `<h2>Total bill: $ <span class="calculated-price"> ${ttlAmt} </span></h2>
        <button class="checkout">checkout </button>
        <button class="removeall" onclick = "clearCart()">Clear Cart </button>
        `;

    })
}
totalAmount()

function clearCart(){
    basket = [];
    generateCartItems();
    calculateCartItems()
    localStorage.setItem("data", JSON.stringify(basket));
}