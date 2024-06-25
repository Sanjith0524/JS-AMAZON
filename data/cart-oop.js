function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,
        total: 0,
        loadFromStorage() {
          this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
          if (!this.cartItems) {
            this.cartItems = [
              {
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: "1",
              },
              {
                id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: "2",
              },
            ];
          }
        },
        saveToStorage() {
          localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
        AddtoCart(Productid) {
          let matchingitem;
          this.cartItems.forEach((product) => {
            if (Productid === product.id) {
              matchingitem = product;
            }
          });
          //let quant = document.querySelector(`.js-quantity-${Productid}`);
          //let quan = quant.value;
          let val = 1;//Number(quan);
          if (matchingitem) {
            matchingitem.quantity += val;
            this.total += val;
          } else {
            this.cartItems.push({
              id: Productid,
              quantity: val,
              deliveryOptionId: "1",
            });
            this.total += val;
          }
          this.saveToStorage();
        },
        displayMessage(Productid) {
          const addedMsg = document.querySelector(`.add-${Productid}`);
          addedMsg.classList.add("added");
          const tim = {};
          setTimeout(() => {
            function rem() {
              addedMsg.classList.remove("added");
            }
            const prevtimeout = tim[Productid];
            if (prevtimeout) {
              clearTimeout(prevtimeout);
            }
            const timeout = setTimeout(rem, 2000);
            tim[Productid] = timeout;
          });
        },
        removeFromCart(productId) {
          const newCart = [];
      
          this.cartItems.forEach((cartItem) => {
            if (cartItem.id !== productId) {
              newCart.push(cartItem);
            }
          });
          this.cartItems = newCart;
          this.saveToStorage();
        },
        calculateCartQuantity() {
          let cartQuantity = 0;
          this.cartItems.forEach((item) => {
            cartQuantity += item.quantity;
          });
          return cartQuantity;
        },
        updateQuantity(productId, quantity) {
          this.cartItems.forEach((cartItem) => {
            if (cartItem.id == productId) cartItem.quantity = quantity;
            this.saveToStorage();
          });
        },
        updateDeliveryOptions(productId, deliveryOptionId) {
          let matchingitem;
          this.cartItems.forEach((product) => {
            if (productId === product.id) {
              matchingitem = product;
            }
          });
          matchingitem.deliveryOptionId = deliveryOptionId;
          this.saveToStorage();
        },
      };
    return cart;
}

const cart = Cart();
cart.loadFromStorage();
console.log(cart);
