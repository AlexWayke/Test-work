;(function(){
    const cartDOMElement = document.querySelector('.js-cart');

    // if(!cartDOMElement) {
        // return;
    // }

    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartItemsCounterDOMElements = document.querySelector('.js-cart-total-count-items');
    const cartTotalPriceDOMElements = document.querySelector('.js-cart-total-price');

    const renderCartItem = ({ id, name, imgSrc, cost, quantity }) => {
        const cartItemDOMElement = document.createElement('div')

        const cartItemTemplate = `
        <div data-product-id="${id}" class="cart_item js-cart-item">
            <div class="cart_image">
                <img src="${imgSrc}" alt="item">
            </div>
            <div class="cart_name text">
                ${name}
            </div>
            <div class="cart_counter counter_wrapper">
                <div class="counter_minus js-btn-product-decrease-quantity" data-action="minus"><img src="./src/icon/minus.svg" alt="-"></div>
                <div class="counter_current js-cart-item-quantity" data-counter>${quantity}</div>
                <div class="counter_plus js-btn-product-increase-quantity" data-action="plus"><img src="./src/icon/plus.svg" alt="+"></div>
            </div>
            <div class="cart_price cost"> <span class="js-cart-item-cost">${cost}</span> ₽</div>
            <button class="cart_remove-icon js-btn-cart-item-remove"><img src="./src/icon/close.svg" alt="close"></button>
            <button class="cart_remove-btn js-btn-cart-item-remove"><img src="./src/icon/remove.png" alt="close"></button>
        </div>
        `;

        cartItemDOMElement.innerHTML = cartItemTemplate;
        cartItemDOMElement.setAttribute('data-product-id', id);
        cartItemDOMElement.classList.add('js-cart-item');

        cartDOMElement.appendChild(cartItemDOMElement);
    };

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const updateCart = () => {

        saveCart();
    }

    const addCartItem = (data) => {
        const { id } = data;

        cart[id] = data;

        renderCartItem(data);
        updateCart();
    };

    const deleteCartItem = (id) => {
        const cartItemDOMElement = cartDOMElement.querySelector(`[data-product-id="${id}"]`);
        console.log(cartItemDOMElement);

        cartDOMElement.removeChild(cartItemDOMElement);
        delete cart[id];
        updateCart();
    };

    const updateQuantity = (id, quantity) => {
        const cartItemDOMElement = cartDOMElement.querySelector(`[data-product-id="${id}"]`);
        const cartItemQuantityDOMElement = cartDOMElement.querySelector('.js-cart-item-quantity');
        const cartItemCostDOMElement = cartDOMElement.querySelector('.js-cart-item-cost');

        cart[id].quantity = quantity;
        cartItemQuantityDOMElement.textContent = quantity;
        cartItemCostDOMElement.textContent = quantity * cart[id].cost;

        updateCart();
    };

    const decreaseQuantity = (id) => {
        const newQuantity = cart[id].quantity - 1;
        if(newQuantity >=1) {
            updateQuantity(id, newQuantity);
        }
    };

    const increaseQuantity = (id) => {
        const newQuantity = cart[id].quantity + 1;
        updateQuantity(id, newQuantity);
    };

    const getProductData = (productDOMElement) => {
        
        const name = productDOMElement.getAttribute('data-name');
        const imgSrc = productDOMElement.getAttribute('data-imgSrc');
        const cost = productDOMElement.getAttribute('data-cost');
        const id = productDOMElement.getAttribute('data-product-id');
        const quantity = productDOMElement.getAttribute('data-quantity');

        return{name,imgSrc,cost,id,quantity,};
    };

    const renderCart = () => {
        const ids = Object.keys(cart);
        console.log(ids);
        ids.forEach(id => renderCartItem(cart[id]));
    };

    const cartInit = () => {
        renderCart();

        document.querySelector('body').addEventListener('click', (e) => {
            const target = e.target;

            if(target.classList.contains('js-btn-add-to-cart')) {
                e.preventDefault();
                const productDOMElement = target.closest('.js-product');
                const data = getProductData(productDOMElement);
                addCartItem(data);
            }
            
            if(target.classList.contains('js-btn-cart-item-remove')) {
                e.preventDefault();
                const cartItemDOMElement = target.closest('.js-cart-item');
                const productID = cartItemDOMElement.getAttribute('data-product-id');
                deleteCartItem(productID);
            }

            if(target.classList.contains('js-btn-product-increase-quantity')) {
                e.preventDefault();
                const cartItemDOMElement = target.closest('.js-cart-item');
                const productID = cartItemDOMElement.getAttribute('data-product-id');
                increaseQuantity(productID);
            }

            if(target.classList.contains('js-btn-product-decrease-quantity')) {
                e.preventDefault();
                const cartItemDOMElement = target.closest('.js-cart-item');
                const productID = cartItemDOMElement.getAttribute('data-product-id');
                decreaseQuantity(productID);
            }
        });
    };

    cartInit();
})();