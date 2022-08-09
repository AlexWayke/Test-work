const productContainer = document.querySelector('#products-container');

getProducts();

async function getProducts() {
    const response = await fetch('./js/products.json');

    const productsArray = await response.json();

    renderProducts(productsArray);
}

function renderProducts(productsArray) {
    productsArray.forEach(function (item) {
        const productHTML = `<div class="catalog_item item" data-id="${item.id}">
        <div class="item_image">
            <img class="item-img" src="${item.imgSrc}" alt="item">
        </div>
        <div class="item_name text">
            ${item.name}
        </div>
        <div class="cost item_cost">
            ${item.cost} ₽
        </div>
        <button class="item_btn">
            добавить в корзину
        </button>
        </div>`;
        productContainer.insertAdjacentHTML('beforeend', productHTML);
    });
}