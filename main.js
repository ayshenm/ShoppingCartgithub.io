let shoppingCart = [];
let container = document.querySelector("#container");
let button = document.querySelector("#button-info");
console.log("button", button);
let cartList = document.querySelector(".shopping-cart-list");
// let cartListj = document.querySelector(".shopping-cart");
console.log("hh", cartList);
let listItem = document.querySelector(".list-item");
let p = document.querySelector("p");
// console.log("p",p)

const apiUrl = "https://raw.githubusercontent.com/TheOksigen/purfect_data/main/yemekler.json";

function getDataFromApi() {
  fetch(apiUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("API isteği başarısız oldu.");
      }
    })
    .then((data) => {
      window.apiData = data;
      data.data.food.map((item, key) => {
        container.innerHTML += `
                <div class="card" style="width: 18rem;">
               <img class="card-img-top" src="${item.img}" alt="Card image cap">
               <div class="card-body">
             <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.composition}</p>
            <div class =" w-100 d-flex justify-content-between">
            <a href="#" class="btn btn-primary" onclick="addToCard('${item.name}','${item.img}','${item.price}')">Sebete elave et</a>
            <a href="#" class="btn btn-primary">${item.price} $</a>
            </div>
            
            </div>
            </div>
    
    
                `;
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

getDataFromApi();

let select = document.querySelector("select");

function GetOption(data) {
  fetch(apiUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("API isteği başarısız oldu.");
      }
    })
    .then((data) => {
      window.apiData = data;
      select.innerHTML = "";
      const categories = [];

      data.data.food.map((item) => {
        if (!categories.includes(item.category)) {
          categories.push(item.category);
        }
      });

      categories.forEach((category) => {
        select.innerHTML += `<option>${category}</option> `;
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

GetOption();

function addToCard(name, img, price) {
  const newItem = document.createElement("div");
  newItem.className = "row align-items-center text-white-50 list-item";
  newItem.innerHTML = `
  <div class="col-md-3"> 
      <img src="${img}" alt="hh" class="img-fluid"/>
  </div>
  <div class="col-md-5">
      <h5>${name}</h5>
  </div>
  <div class="col-md-2 price">
      <h5>${price}</h5>
  </div>
  <div class="col-md-2">
      <button class="btn btn-delete">
          <i class="fas fa-trash"></i>
      </button>
  </div>`;
calculateTotalPrice()
  const deleteButton = newItem.querySelector(".btn-delete");

  deleteButton.addEventListener("click", function () {
    removeItem(newItem);
    
  });

  listItem.appendChild(newItem);
  shoppingCart.push({ name, img, price });
  console.log("push olunanlar", shoppingCart);

  cartCount();
  calculateTotalPrice()
  
  
}

function cartCount() {
  const itemCount = document.querySelector("#item-count");
  // const cartList = document.querySelectorAll(".list-item");
  console.log(itemCount);
  itemCount.innerHTML = shoppingCart.length;
}

function removeItem(itemToRemove) {
  itemToRemove.remove();
  // calculateTotalPrice()

  const itemName = itemToRemove.querySelector(".col-md-5 h5").textContent;
  shoppingCart = shoppingCart.filter((item) => item.name !== itemName);

cartCount();
calculateTotalPrice()
 
}

function openCart() {
  cartList.style.display =
    cartList.style.display === "none" || cartList.style.display === "" ? "block" : "none";
}




function calculateTotalPrice() {
  let totalPrice = 0;
  if (shoppingCart.length > 0) {
    for (const item of shoppingCart) {
      const price = parseFloat(item.price);
      totalPrice += price;
    }
  }

  const totalPriceElement = document.querySelector("#total-price");
  totalPriceElement.textContent = totalPrice.toFixed(2); 
}

calculateTotalPrice();




