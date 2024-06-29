export let cart;
loadFromStorage();



export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));
  if(!cart){
    cart = [{
      productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity:2,
      deliveryOptionId : '1'
    },{
      productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity:1,
      deliveryOptionId : '2'
    }];
  };
}

export function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}


export function AddtoCart(Productid) {
    let matchingitem;
    console.log(Productid);
    cart.forEach((product)=> {
      if (Productid === product.productId){
          matchingitem = product;
          }
      })
      let quant = document.querySelector(`.js-quantity-${Productid}`);
      let quan = quant.value;
      let val = Number(quan);
  if(matchingitem){
      matchingitem.quantity+=val;
      
  }
  else{
      cart.push({productId:Productid,
        quantity:val,
        deliveryOptionId:'1'})
      
  }
  saveToStorage();
  }

export function displayMessage(Productid){
      const addedMsg = document.querySelector(`.add-${Productid}`);
      addedMsg.classList.add("added");
      const tim = {};
      setTimeout(() => {
        function rem(){
          addedMsg.classList.remove("added");
        }

        
        const prevtimeout = tim[Productid];
        if(prevtimeout){
          clearTimeout(prevtimeout);
        }
        const timeout = setTimeout(rem,2000);
        tim[Productid] = timeout;
      });
  }



export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if ( cartItem.productId !== productId ){
      newCart.push(cartItem);
    }
      });
  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  return cartQuantity;
}

export function updateQuantity (productId,quantity){
  cart.forEach((cartItem) => {
    if (cartItem.productId == productId)
    cartItem.quantity = quantity;
    saveToStorage()
})
}

export function updateDeliveryOptions(productId,deliveryOptionId) {
  let matchingitem;
  
    cart.forEach((product)=> {
      if (product.productId === productId){
          matchingitem = product;
          }
      });
      matchingitem.deliveryOptionId = deliveryOptionId;
      saveToStorage();
}

export function loadCart(fun){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load',() => {
    console.log(xhr.response);
    fun();
  });
  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
}