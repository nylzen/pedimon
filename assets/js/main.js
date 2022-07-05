const navbar = document.getElementById('navbar');
const menu = document.querySelector('.menu');
const item = document.querySelectorAll('.item');
const totalItems = document.getElementById('totalItems');
const totalProducts = document.getElementById('totalProducts');
const cart = document.getElementById('cart');
const btnComprar = document.querySelectorAll('#btnComprar');

// Show Menu Toggle
menu.addEventListener('click', () => {
  item.forEach((i) => i.classList.toggle('show'));
});

// Show Navbar Scroll
let lastScrollTop;

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.style.top = '-150px';
  } else {
    navbar.style.top = '0';
  }

  lastScrollTop = scrollTop;
});

// Carrito
let products = [];

// Set count es la funcion que se encarga de actualizar el contador de productos
const setCount = () => {
  let totalCount = 0;
  // Recorro el array de productos y sumo los contadores
  for (let item in products) {
    totalCount += Number(products[item].count);
  }

  // Actualizo el contador de productos en el carrito de compras en el Carrito del navbar
  totalItems.innerText = totalCount.toString();
  return totalCount;
};

// totalPrice es la funcion que se encarga de actualizar el precio total del carrito de compras
const totalPrice = () => {
  // Inicializo el precio total en 0
  let totalCart = 0;

  // Recorro el array de productos y sumo los precios
  for (let item in products) {
    totalCart += Number(products[item].price * products[item].count);
  }
  //  Actualizo el precio total en el card del carrito
  totalProducts.innerText = totalCart.toString();

  return totalCart;
};

// Agregar productos al carrito
const productList = () => {
  // Creamos un div que contendra todos los productos del carrito de compras
  // hacemos un map para recorrer el array de productos y crear un div por cada producto
  cart.innerHTML = products
    .map((product) => {
      return `
    <div class="cart__container">
        <div class="cart__item--content">
          <div>
          <img src="${product.img}" class="item-img">
          <span>x ${product.count} </span>
          <span>(c/u $${product.price})</span>
          </div>
          <p class="cart__title">${product.name}</p>
          <span class="cart__price">$${
            product.count === 1 ? product.price : product.price * product.count
          }</span>
        </div>
          </div>
        </div>
    </div> 
    `;
    })
    .join('');
  // usamos join para que el array de productos se convierta en un string
};

const handleAddProduct = (e) => {
  e.preventDefault();

  // Si el target del elemento no es el button con la clase product__buton o que tenga la clase disabled, que no haga nada.
  if (
    !e.target.classList.contains('product__btn') ||
    e.target.classList.contains('disabled')
  )
    return;

  for (let item in products) {
    if (products[item].name === e.target.dataset.name) {
      products[item].count++;
      setCount();
      products[item].price * products[item].count;
      totalPrice();
      productList();
      return;
    }
  }
  // Guardo los target de los dataset
  const newProduct = {
    img: e.target.dataset.img,
    name: e.target.dataset.name,
    price: e.target.dataset.price,
    count: e.target.dataset.count,
  };

  products.push(newProduct);

  setCount();
  totalPrice();
  productList();
  console.log(newProduct);
};

// Listener
btnComprar.forEach((item) => {
  item.addEventListener('click', handleAddProduct);
});
