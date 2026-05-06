import {
   collection,
   getDocs,
   getFirestore,
   query,
   where,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {app} from "./firebase_config.js";

export async function fetchData(collectionName) {
   const db = getFirestore(app);    //đi vào project của firestore ở firebase_config.js để lấy database
   const querySnapshot = await getDocs(collection(db, collectionName));    //lấy tất cả các document từ collection(tên collectionName) nằm trong database đã khởi tạo
//querySnapshot = phản hồi sau khi chạy code(data hoặc lỗi),sau khi có data chạy danh sách trống
   let products = [];
   querySnapshot.forEach((doc) => { // duyệt qua từng document,bỏ vào mảng product
      //doc.data() is never undefined for query doc snapshots
      products.push({id: doc.id, ...doc.data() });
   });
   return products;
}
//export: cho phép các file khác có thể sử dụng hàm này

//hàm hiển thị sản phẩm trên trong web dựa trên (id) của phần tử HTML
export async function renderProducts(id) {

   //lấy phần tử html sẽ chứa danh sách sản phẩm theo id
    let productContainer = document.getElementById(id);
    let productHtml = "";
    let products = await fetchData("products");

   //products: danh sách sản phẩm
   //forEach: lặp qua từng sản phẩm trong danh sách
   //và gán từng sản phẩm vào biến p
    products.forEach((p) => {
         productHtml += `
         <div class="product-card">
            <img
              src="../assets/images/${p.image}"
              alt=""
              class="product-image"
            />
            <div class="product-info">
              <a href="FoodDetail.html?id=${p.id}">
                <button class="product-button">Order</button>
              </a>

              <h3 class="product-name">${p.name}</h3>
              <p class="product-description">${p.description}</p>
              <p class="product-price">${p.price}</p>
              <button class="btn-add" onclick="addToCart${p.id}>Add to Cart</button>
            </div>
          </div>
         `;
        ;   
    });
    productContainer.innerHTML = productHtml;
}

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

async function SearchProducts() {
   let searchText = searchInput.value.trim();

      const db = getFirestore(app);
      const q = query(
         collection(db,"products"),
         where("name", ">=", searchText),                //where: nơi đặt điều kiện vào
         where("name","<=",searchText+"\uf8ff"),         
      );

      const querySnapshot = await getDocs(q);

      let products = [];
      querySnapshot.forEach((doc) => {
         products.push({ id: doc.id, ...doc.data()});
      })
      console.log(products);
      renderSearchedProducts(products);
   }


export async function renderSearchedProducts(products) {

   //lấy phần tử html sẽ chứa danh sách sản phẩm theo id
    let productContainer = document.getElementById("product-list");
    let productHtml = "";

    if (productContainer.length === 0) {
      productHtml ="không tìm thấy sản phẩm";
      productContainer,innerHTML = productHtml;
      return;
    }

   //products: danh sách sản phẩm
   //forEach: lặp qua từng sản phẩm trong danh sách
   //và gán từng sản phẩm vào biến p
    products.forEach((p) => {
         productHtml += `
         <div class="product-card">
            <img
              src="../assets/images/${p.image}"
              alt=""
              class="product-image"
            />
            <div class="product-info">
              <a href="FoodDetail.html?id=${p.id}">
                <button class="product-button">Order</button>
              </a>

              <h3 class="product-name">${p.name}</h3>
              <p class="product-description">${p.description}</p>
              <p class="product-price">$${p.price}</p>
              <button class="btn-add"onclick="addToCart${p.id}>Add to Cart</button>
            </div>
          </div>
         `;
        ;   
    });
    productContainer.innerHTML = productHtml;
}


searchBtn.addEventListener("click",SearchProducts);