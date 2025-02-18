const arrayProducts = [{
  id: 0,
  name: "producto1",
  price: "$ 5",
  stock: 10,
  description: "descripcion1",
  img: "./img/producto1.jpg",
},
{
  id: 1,
  name: "producto2",
  price: "$ 7",
  stock: 10,
  description: "descripcion2",
  img: "./img/producto2.jpg",
},
{
  id: 2,
  name: "producto3",
  price: "$ 8",
  stock: 10,
  description: "descripcion3",
  img: "./img/producto3.jpg",
},
{
  id: 3,
  name: "producto4",
  price: "$ 12",
  stock: 10,
  description: "descripcion4",
  img: "./img/producto4.jpg",
},

];

const cart = [];
document.addEventListener("DOMContentLoaded", function() {
const products = document.querySelector(".products");
let html = ''
for (let i = 0; i < arrayProducts.length; i++) {
  html += `<div class="product">
      <div class="product_img">
          <img src=" ${arrayProducts[i].img}" alt="${arrayProducts[i].name}">
      </div>
      <div class="product_info">
          <p> nombre:  ${arrayProducts[i].name}</p>
          <p> <small>descripcion: ${arrayProducts[i].description}</small></p>
          <p> precio: ${arrayProducts[i].price}</p>
          <p> <small>stock:  ${arrayProducts[i].stock}</small> </p>
      </div>
       <div class="product_action" id='${arrayProducts[i].id}'>
          <button class="btn"> Agregar</button>
       </div>
  </div>`;
}
products.innerHTML = html;
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("btn")) {
      const idProduct = e.target.parentElement.id;
      let currentProduct = null
      for (let i = 0; i < arrayProducts.length; i++) {
          if (arrayProducts[i].id === parseInt(idProduct)) {
              currentProduct = arrayProducts[i];
          }
      }
      if (cart[idProduct]) {
          if (cart[idProduct].amount === cart[idProduct].stock) {
              alert("no hay mas productos")
              return
          }
          cart[idProduct].amount++;

      } else {

          cart[idProduct] = currentProduct;
          cart[idProduct].amount = 1;
      }
     
      const amount = document.querySelector('#amount')
      amount.textContent = Object.entries(cart).length
  }
});
const sideBarCart = document.querySelector(".sidebar_cart");
const cartShopping = document.querySelector(".cartShopping");
cartShopping.addEventListener("click", function() {
  sideBarCart.classList.toggle('show_sidebar_cart');


  const contentShopping = document.querySelector(".content_shopping");
  const shoppingArray = Object.values(cart);
  console.log(shoppingArray);
  let html = "";
  shoppingArray.forEach(({ id, name, price, stock, img, amount }) => {
      html += `
          <div class="shopping">
              <div class="shopping__header">
                  <div class="shopping__img">
                      <img src="${img}" alt="${name}">
                  </div>
                  <div class="shopping__info">
                      <p>nombre: ${name}</p>
                      <p>precio: ${price}</p>
                      <p>stock: ${stock}</p>
                  </div>
              </div>
              <div class="shopping__actions" id="${id}">
                  <button class="rest">-</button>
                  <b class="amount">${amount}</b>
                  <button class="add">+</button>
                  <button class='bx bxs-trash del'></button>
              </div>
          </div>`;
  });
  contentShopping.innerHTML = html;
});
const contentShopping = document.querySelector(".content_shopping");
contentShopping.addEventListener("click", (event) => {
  if (event.target.classList.contains("rest")) {
      const id = parseInt(event.target.parentElement.id);

      if (cart[id].amount === 1) {
          const res = confirm("desea eliminar?");
          if (res) {
              delete cart[id];
          }
      } else {
          cart[id].amount--;
      }
  }

  if (event.target.classList.contains("add")) {
      const id = parseInt(event.target.parentElement.id);

      if (cart[id].stock > cart[id].amount) {
          cart[id].amount++;
      } else {
          alert("No tenemos disponibilidad de este producto");
      }
  }

  if (event.target.classList.contains("del")) {
      const id = parseInt(event.target.parentElement.id);

      const res = confirm("seguro quieres eliminar este producto?");

      if (res) {
          delete cart[id];
      }
  }
  const amount = document.querySelector('#amount')
  amount.textContent = Object.entries(cart).length
  const shoppingArray = Object.values(cart);
  let suma = 0;

  cart.forEach((n) => {
      suma += n.amount * n.price;
  })

  const shoppingTotal = document.querySelector(".shoppingTotal");
  shoppingTotal.textContent = suma;
  const btnBuy = document.querySelector("#btnBuy");
  btnBuy.addEventListener("click", () => {
      const res = confirm("Desea encargar este preoducto?");

      if (res) {

          sideBarCart.classList.toggle('show_sidebar_cart');
          cart = []
          amount.textContent = 0
      }
  });
});




const iconMenu = document.querySelector('#iconMenu');
const menu = document.querySelector('#menu');
iconMenu.addEventListener("click", function() {
  menu.classList.toggle("menu_show")
    })
});