import { formatCurrency } from "../scripts/utils/money.js";
import { loadProducts } from "./products.js";
import { products } from "./products.js";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    
    saveToStorage()
}


function saveToStorage() {
    localStorage.setItem('orders',JSON.stringify(orders));
}



loadProducts(renderOrderPage);
export function renderOrderPage() {
  function getProduct(productId){
    let matchingproduct;
    
      products.forEach((products) => {
          if (products.id == productId) {
          matchingproduct = products;
          };
      }
  );
  
  return matchingproduct;
  };
    let orderHTML=``
    orders.forEach((order) => {
    let productListHTML = '';
    order.products.forEach((products) => {
        let productId = products.productId;
        
        const matchingproduct = getProduct(productId);
        productListHTML+=`<div class="order-details-grid">
                          <div class="product-image-container">
                            <img src="${matchingproduct.image}">
                          </div>

                          <div class="product-details">
                            <div class="product-name">
                              ${matchingproduct.name}
                            </div>
                            <div class="product-delivery-date">
                              Arriving on: ${months[new Date(products.estimatedDeliveryTime).getMonth()]} ${new Date(products.estimatedDeliveryTime).getDate()} 
                            </div>
                            <div class="product-quantity">
                              Quantity: ${products.quantity}
                            </div>
                            <button class="buy-again-button button-primary">
                              <img class="buy-again-icon" src="images/icons/buy-again.png">
                              <span class="buy-again-message">Buy it again</span>
                            </button>
                          </div>

                          <div class="product-actions">
                            <a href="tracking.html">
                              <button class="track-package-button button-secondary">
                                Track package
                              </button>
                            </a>
                          </div>
                        </div>
                        `
        })
        orderHTML+=`<div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${months[new Date(order.orderTime).getMonth()]} ${new Date(order.orderTime).getDate()} </div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="js-orders-container-${order.id}">
          ${productListHTML}
          </div>
        </div>`;
        });
        document.querySelector('.js-orders-grid').innerHTML = orderHTML;
      }
;


