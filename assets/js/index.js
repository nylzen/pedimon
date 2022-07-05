// Paso 1 hacer el menu desplegable del navbar
// Menu hamburguesa
// Llamamos a los elementos que necesitamos
const menu = document.querySelector('.menu');
const item = document.querySelectorAll('.item');
// Contador Carrito
const totalItems = document.getElementById('totalItems');
const totalProducts = document.getElementById('totalProducts');
// Boton comprar
const btnComprar = document.querySelectorAll('#btnComprar');
// Div Carrito
const cart = document.getElementById('cart');

// Mostrar menu ( toggle )
// Agregamos un evento click a la clase menu
menu.addEventListener('click', () => {
  // A cada item le agregamos la clase show con un forEach
  item.forEach((i) => i.classList.toggle('show'));
});

// Creamos el array productos y lo inicializamos en 0
let products = [];

// Vamos a crear dos funciones para actualizar el contador de productos y el precio total del carrito de compras
// Funcion para actualizar el contador de productos
const setCount = () => {
  let totalCount = 0;
  // Recorremos el array de productos y sumamos el contador
  for (let item in products) {
    totalCount += Number(products[item].count);
  }

  //   Actualizamos el contador en el spam
  totalItems.innerText = totalCount.toString();
  //   console.log(totalCount);
  return totalCount;
};

// Funcion para actualizar el precio total del carrito de compras
const totalPrice = () => {
  let totalCart = 0;

  for (let item in products) {
    totalCart += Number(products[item].price * products[item].count);
  }
  totalProducts.innerText = totalCart.toString();
  return totalCart;
};

//Paso 2
// Creamos la funcion que se encarga de agregar los productos al carrito de compras y pintarlo en el carrito de compras
const handleAddProduct = (e) => {
  // cancelamos el comportamiento por defecto del boton
  e.preventDefault();

  // Hacemos un if negar todo lo que no sea el boton o si el boton tiene la clase disabled
  if (
    !e.target.classList.contains('product__btn') ||
    e.target.classList.contains('disabled')
  ) {
    return;
  }

  // Hacemos un for in para recorrer el array de productos

  for (let item in products) {
    // Si el name del producto es igual al id del producto que se esta agregando al carrito de compras
    if (products[item].name === e.target.dataset.name) {
      // console.log(products[item]);
      // Incrementamos el contador del producto
      products[item].count++;
      // Actualizamos el contador de productos en el carrito de compras
      setCount();
      // Actualizamos el precio total del carrito de compras
      products[item].price * products[item].count;
      // Ejecutamos la funcion para actualizar el precio total del carrito de compras
      totalPrice();
      // Ejectuamos la funcion para pintar el carrito de compras
      productList();
      return;
    }
  }
  //   Guardamos los target de los dataset
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
  //   console.log(newProduct);
};

// Funcion para pintar el carrito

const productList = () => {
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
</div> `;
    })
    .join('');
};

// Listener boton comprar
btnComprar.forEach((item) => {
  item.addEventListener('click', handleAddProduct);
});
