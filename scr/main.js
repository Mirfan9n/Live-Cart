let shop = document.querySelector('#shop');
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemData
        .map((e) => {
            let {id,name,price,desc,img} = e;
            let search = basket.find((e) => e.id === id) || [];
            return `
        <div class="item">
            <img width="220" src=${img} alt="">
            <div class="details">
                <h2>${name}</h2>
                <p>${desc}</p>
                <div class="price-quantity">
                <h2>${price}</h2>
                    <div class="buttons">
                        <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id="${id}" class="quantity">
                            ${search.items === undefined ? 0 : search.items}
                        </div>
                        <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>

        </div>
    `
    }).join(""));
};
generateShop();


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
    update(id);
    basket = basket.filter((x) => x.items !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML =search.items;
    calculateCartItems();
};

function calculateCartItems() {
    let cal = 0;
    for (let i in basket) {
        cal += basket[i].items;
    }
    document.querySelector('.cartAmount').innerHTML = cal;
}
calculateCartItems();