document.getElementById("category1").addEventListener("click", function() {
  loadProducts('category1');
});

document.getElementById("category2").addEventListener("click", function() {
  loadProducts('category2');
});

document.getElementById("category3").addEventListener("click", function() {
  loadProducts('category3');
});

document.getElementById("my-orders-button").addEventListener("click", showMyOrders);

function loadProducts(category) {

  document.getElementById("product-list").innerHTML = "";


  let products = getProductsByCategory(category);

  products.forEach(function(product) {
    let li = document.createElement("li");
      li.innerHTML = product.name;
      li.onclick = function() {
          displayProductInfo(product);
      };
      document.getElementById("product-list").appendChild(li);
  });
}

function displayProductInfo(product) {
  document.getElementById("product-info").innerHTML = "Назва: " + product.name + "<br>Ціна: " + product.price + "<br><button onclick=\"showOrderForm('" + product.name + "', " + product.price + ")\">Купити</button>";
}

function showOrderForm(productName, productPrice) {
  let orderForm = document.createElement("div");
  orderForm.innerHTML = "<h3>Оформлення замовлення</h3>" +
      "<form onsubmit=\"submitOrder(event, '" + productName + "', " + productPrice + ")\">" +
      "ПІБ покупця: <input type=\"text\" id=\"name\" required><br>" +
      "Місто: <input type=\"text\" id=\"city\" required><br>" +
      "Склад Нової пошти для надсилання: <input type=\"text\" id=\"postOffice\" required><br>" +
      "Післяплати або оплати банківської картки: <input type=\"text\" id=\"payment\" required><br>" +
      "Кількість продукції, що купується: <input type=\"number\" id=\"quantity\" required><br>" +
      "Коментар до замовлення: <textarea id=\"comment\"></textarea><br>" +
      "<input type=\"submit\" value=\"Замовити\">" +
      "</form>";

  document.getElementById("product-info").appendChild(orderForm);
}

function submitOrder(event, productName, productPrice) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let city = document.getElementById("city").value;
  let postOffice = document.getElementById("postOffice").value;
  let payment = document.getElementById("payment").value;
  let quantity = document.getElementById("quantity").value;
  let comment = document.getElementById("comment").value;

  if (name === "" || city === "" || postOffice === "" || payment === "" || quantity === "") {
      alert("Будь ласка, заповніть всі обов'язкові поля.");
      return;
  }

  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  let order = {
      id: Date.now(),
      productName: productName,
      productPrice: productPrice,
      name: name,
      city: city,
      postOffice: postOffice,
      payment: payment,
      quantity: quantity,
      comment: comment
  };
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  document.getElementById("name").value = "";
  document.getElementById("city").value = "";
  document.getElementById("postOffice").value = "";
  document.getElementById("payment").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("comment").value = "";

  alert("Замовлення успішно оформлено!");

  document.getElementById("product-info").innerHTML = "";
}

function getProductsByCategory(category) {
  if (category === "category1") {
      return [
          { name: "Товар 1", price: 100 },
          { name: "Товар 2", price: 200 },
          { name: "Товар 3", price: 300 }
      ];
  } else if (category === "category2") {
      return [
          { name: "Товар 4", price: 400 },
          { name: "Товар 5", price: 500 },
          { name: "Товар 6", price: 600 }
      ];
  } else if (category === "category3") {
      return [
          { name: "Товар 7", price: 700 },
          { name: "Товар 8", price: 800 },
          { name: "Товар 9", price: 900 }
      ];
  }
}

function showMyOrders() {
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  let myOrders = document.getElementById("my-orders");

  if (myOrders.innerHTML === "") {
      myOrders.innerHTML = "<h3>Мої замовлення</h3>";

      if (orders.length === 0) {
          myOrders.innerHTML += "Немає збережених замовлень.";
      } else {
          orders.forEach(function(order) {
            let orderElement = document.createElement("div");
              orderElement.innerHTML = "Дата: " + new Date(order.id).toLocaleString() + "<br>Ціна: " + order.productPrice + "<br>" +
                  "<button onclick=\"showOrderDetails(" + order.id + ")\">Деталі</button> " +
                  "<button onclick=\"deleteOrder(" + order.id + ")\">Видалити</button>";
              myOrders.appendChild(orderElement);
          });
      }
  } else {
      myOrders.innerHTML = "";
  }
}

function showOrderDetails(orderId) {
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  let order = orders.find(function(order) {
      return order.id === orderId;
  });

  if (order) {
    let orderDetails = document.createElement("div");
      orderDetails.innerHTML = "Назва товару: " + order.productName + "<br>" +
          "Ціна: " + order.productPrice + "<br>" +
          "ПІБ покупця: " + order.name + "<br>" +
          "Місто: " + order.city + "<br>" +
          "Склад Нової пошти для надсилання: " + order.postOffice + "<br>" +
          "Післяплати або оплати банківської картки: " + order.payment + "<br>" +
          "Кількість продукції: " + order.quantity + "<br>" +
          "Коментар до замовлення: " + order.comment;

      let myOrders = document.getElementById("my-orders");
      myOrders.appendChild(orderDetails);
  }
}

function deleteOrder(orderId) {
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  let updatedOrders = orders.filter(function(order) {
      return order.id !== orderId;
  });

  localStorage.setItem('orders', JSON.stringify(updatedOrders));

  showMyOrders();
}