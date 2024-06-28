import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProductsFetch } from "../../data/products.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";

describe("test suite : renderOrderSummary", () => {
  const product1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const product2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });
  
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          id: product1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          id: product2,
          quantity: 3,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();
    renderOrderSummary()
    
  });
  it("displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-product-quantity-${product2}`).innerText
    ).toContain("Quantity: 3");
  });

  it("removes a product", () => {
    document.querySelector(`.js-delete-link-${product1}`).click();
    expect(cart.length).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${product1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${product2}`)
    ).not.toEqual(null);
    expect(cart[0].id).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
  });
});
