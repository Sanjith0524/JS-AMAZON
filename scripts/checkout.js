import { calculateCartQuantity, cart,removeFromCart,updateQuantity,updateDeliveryOptions} from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";
import { products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from "../data/deliveryOptions.js";

function renderOrderSummary(){
    let cartSummaryHTML='';
    cart.forEach((cartItem) => {
    const productId = cartItem.id;
    let matchingproduct;

    products.forEach((products) => {
        if (productId == products.id) {
        matchingproduct = products;
        }
    });
    updateCartQuantity();

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId){
            deliveryOption = option;
        }
    })
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingproduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingproduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingproduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingproduct.id}">${
                    cartItem.quantity
                    }</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingproduct.id}">
                    Update
                    </span>
                    <input class="quantity-input js-input-${matchingproduct.id}">
                    <span class="save-quantity-link js-save-link" data-product-id="${matchingproduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingproduct,cartItem)}
                </div>
            </div>
            </div>
        `;
    document.querySelector(".order-summary").innerHTML = cartSummaryHTML;
    });

    function deliveryOptionsHTML (matchingproduct,cartItem) {
        let html=''
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceCents = deliveryOption.priceCents === 0? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            html +=
            `<div class="delivery-option">
                    <input type="radio"
                    ${isChecked ? 'checked' :''} 
                    class="delivery-option-input js-delivery-option"
                    name="delivery-option-${matchingproduct.id}" data-product-id="${matchingproduct.id}" data-delivery-option-id="${deliveryOption.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceCents} Shipping
                    </div>
                    </div>
                </div>`
        })
        return html;
    }
    function updateCartQuantity () {
        let cartQuantity = calculateCartQuantity();
        document.querySelector('.js-number-of-items').innerHTML = `${cartQuantity} items`;
        }
    document.querySelectorAll('.js-delete-link').forEach((link) =>{
        link.addEventListener('click', () => {
        const productId =  link.dataset.productId;
        removeFromCart(productId);
        updateCartQuantity();
        const item = document.querySelector(`.js-cart-item-container-${productId}`);
        item.remove();
        })
    });


    document.querySelectorAll('.js-update-link').forEach((link) => {
        link.addEventListener('click' , () => {
            const productId = link.dataset.productId;
            const quanCont = document.querySelector(`.js-cart-item-container-${productId}`);
            quanCont.classList.add('is-editing-quantity');
        })
    });
    
    document.querySelectorAll('.js-save-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const quantityInput = document.querySelector(`.js-input-${productId}`);
            const quantity = Number(quantityInput.value);
            if (quantity<0 || quantity>1000){
                alert('Quantity must be at least 0 and less than 1000');
                return;
            }
            const quanCont = document.querySelector(`.js-cart-item-container-${productId}`);
            quanCont.classList.remove('is-editing-quantity');
            updateQuantity(productId,quantity);
            const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
            quantityLabel.innerHTML = quantity;
            const numberofitems = document.querySelector(`.js-number-of-items`);
            numberofitems.innerHTML = ` ${calculateCartQuantity()} items `;
        })})

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click' , () => {
            const {productId,deliveryOptionId} = element.dataset;
            updateDeliveryOptions(productId,deliveryOptionId);
            renderOrderSummary();
        });
    });
}

renderOrderSummary();