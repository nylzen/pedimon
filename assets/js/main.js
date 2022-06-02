const navbar = document.getElementById("navbar");
const menu = document.querySelector(".menu");
const item = document.querySelectorAll(".item");
const totalItems = document.getElementById("totalItems");
const totalProducts = document.getElementById("totalProducts");
const cart = document.getElementById("cart");
const btnComprar = document.querySelectorAll("#btnComprar");

// Show Menu Toggle
menu.addEventListener("click", () => {
  item.forEach((i) => i.classList.toggle("show"));
});

// Show Navbar Scroll
let lastScrollTop;

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-150px";
  } else {
    navbar.style.top = "0";
  }

  lastScrollTop = scrollTop;
});

let products = [];

const setCount = () => {
  let totalCount = 0;

  for (let item in products) {
    totalCount += Number(products[item].count);
  }
  totalItems.innerText = totalCount.toString();
  return totalCount;
};

const totalPrice = () => {
  let totalCart = 0;

  for (let item in products) {
    totalCart += Number(products[item].price * products[item].count);
  }

  totalProducts.innerText = totalCart.toString();

  return totalCart;
};

const productList = () => {
  cart.innerHTML = products
    .map((product) => {
      return `
    <div class="cart__container">
        <div class="cart__item--content">
          <div>
          <img src="${product.img}" class="item-img">
          <span>x ${product.count} </span>
          </div>
          <p class="cart__title">${product.name}</p>
          <span class="cart__price">$${product.price}</span>
        </div>
          </div>
        </div>
    </div> 
    `;
    })
    .join("");
};

const handleAddProduct = (e, product) => {
  e.preventDefault();

  // Si el target del elemento no es el button con la clase product__buton o que tenga la clase disabled, que no haga nada.
  if (
    !e.target.classList.contains("product__btn") ||
    e.target.classList.contains("disabled")
  )
    return;

  for (let item in products) {
    if (products[item].name === e.target.dataset.name) {
      products[item].count++;
      setCount();
      totalPrice();
      productList();
      return;
    }
    console.log(products[item].product);

    console.log(product);
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
  item.addEventListener("click", handleAddProduct);
});
