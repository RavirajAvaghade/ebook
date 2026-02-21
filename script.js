// ---------------- CART ----------------

function addToCart(name, price, image){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price,
        image: image
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Book added to cart 🛒");
}

function loadCart(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let table = document.getElementById("cart-items");
    let total = 0;

    if(!table) return;   // cart page नसल्यास error टाळण्यासाठी

    table.innerHTML = "";

    cart.forEach((item, index) => {

        total += item.price;

        table.innerHTML += `
        <tr>
            <td>
                <img src="${item.image}" width="50" style="border-radius:8px;">
                ${item.name}
            </td>
            <td>₹${item.price}</td>
            <td>
                <button class="btn btn-danger btn-sm"
                onclick="removeItem(${index})">Remove</button>
            </td>
        </tr>`;
    });

    let totalElement = document.getElementById("total");
    if(totalElement){
        totalElement.innerText = total;
    }
}

function removeItem(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkout(){
    alert("Payment Successful 🎉");
    localStorage.removeItem("cart");
    loadCart();
}


// ---------------- LOGIN ----------------

function login(){
    localStorage.setItem("loggedIn","true");
    alert("Login Successful 🎉");
    window.location.href="index.html";
}


// ---------------- READ BOOK ----------------

function openBook(file){

    let status = localStorage.getItem("loggedIn");

    if(status === "true"){
        window.location.href = "reader.html?file=" + file;
    }else{
        alert("Please Login First 🔐");
        window.location.href = "login.html";
    }
}


// ---------------- DOWNLOAD BOOK ----------------

function downloadBook(file){

    let status = localStorage.getItem("loggedIn");

    if(status === "true"){

        let link = document.createElement("a");
        link.href = "pdf/" + file;
        link.download = file;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }else{
        alert("Please Login First 🔐");
        window.location.href="login.html";
    }
}
function login(){

    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user && pass){
        localStorage.setItem("loggedIn","true");
        alert("Login Successful 🎉");

        // 👇 IMPORTANT CHANGE
        window.location.href = "index.html";

    } else {
        alert("Enter Username & Password");
    }
}
// ================= THEME SYSTEM =================

function toggleTheme(){
    document.body.classList.toggle("light-theme");

    if(document.body.classList.contains("light-theme")){
        localStorage.setItem("theme","light");
        updateThemeIcon("☀️");
    } else {
        localStorage.setItem("theme","dark");
        updateThemeIcon("🌙");
    }
}

function applySavedTheme(){
    let theme = localStorage.getItem("theme");

    if(theme === "light"){
        document.body.classList.add("light-theme");
        updateThemeIcon("☀️");
    } else {
        document.body.classList.remove("light-theme");
        updateThemeIcon("🌙");
    }
}

function updateThemeIcon(icon){
    let btn = document.getElementById("themeBtn");
    if(btn){
        btn.innerHTML = icon;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    applySavedTheme();
});
// ================= ADD TO CART =================

function addToCart(name, price, image){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price,
        image: image
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart 🛒");

    updateCartCount();
}


// ================= UPDATE CART COUNT =================

function updateCartCount(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = document.getElementById("cartCount");

    if(count){
        count.innerText = cart.length;
    }
}

document.addEventListener("DOMContentLoaded", updateCartCount);


// ================= LOAD CART PAGE =================

function loadCart(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let table = document.getElementById("cart-items");
    let total = 0;

    if(!table) return;

    table.innerHTML = "";

    cart.forEach((item, index) => {

        total += item.price;

        table.innerHTML += `
        <tr>
            <td>
                <img src="${item.image}" width="50" style="border-radius:8px;">
                ${item.name}
            </td>
            <td>₹${item.price}</td>
            <td>
                <button class="btn btn-danger btn-sm"
                onclick="removeItem(${index})">Remove</button>
            </td>
        </tr>`;
    });

    document.getElementById("total").innerText = total;
}


// ================= REMOVE ITEM =================

function removeItem(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
    updateCartCount();
}


// ================= CHECKOUT =================

function checkout(){
    alert("Payment Successful 🎉");
    localStorage.removeItem("cart");
    loadCart();
    updateCartCount();
}
document.addEventListener("DOMContentLoaded", function(){

    updateCartCount();

    if(document.getElementById("cart-items")){
        loadCart();
    }

});
function goToPayment(){
    let cart = JSON.parse(localStorage.getItem("cart"));

    if(!cart || cart.length === 0){
        alert("Cart is Empty ❌");
        return;
    }

    window.location.href = "payment.html";
}
function showToast(message){
    let toast = document.getElementById("toastBox");
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },3000);
}
function animateCart(){
    let cartIcon = document.getElementById("cartCount");
    cartIcon.classList.add("shake");

    setTimeout(()=>{
        cartIcon.classList.remove("shake");
    },400);
}