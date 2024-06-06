export var cart = [{
  id:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:2
},{
  id:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:3
}];
let total=0;
export function AddtoCart(Productid) {
    let matchingitem;
    cart.forEach((product)=> {
      if (Productid === product.id){
          matchingitem = product;
          }
      })
      let quant = document.querySelector(`.js-quantity-${Productid}`);
      let quan = quant.value;
      let val = Number(quan);
  if(matchingitem){
      matchingitem.quantity+=val;
      total+=val;
  }
  else{
      cart.push({id:Productid,quantity:1})
      total+=val;
  }
  }

export function displayMessage(Productid){
    document.querySelector('.js-cart-quantity').innerHTML = total;
  
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
    if ( cartItem.id !== productId ){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
}