import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
// import '../data/backend-practice.js'; 

async function loadpage(){
    try{
        await loadProductsFetch();
        await new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
    }
    catch (error){
        console.log('Please try again later');
    }  
    renderOrderSummary();
    renderCheckoutHeader();
    renderPaymentSummary();
}
loadpage();
/*Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve('value1');
        });
    })
]).then((values)=>{
    renderOrderSummary();
    renderCheckoutHeader();
    renderPaymentSummary();
});
*/
