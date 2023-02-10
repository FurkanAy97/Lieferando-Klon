
let shoppingBasket = [{
    "foodName": [],
    "prices": [],
    "listPrices": [],
    "amount": []
}];


function render(){
    let shoppingBasketContainer = document.getElementById('shopping-basket');
    let shoppingBasketContainerMobile = document.getElementById('shopping-basket-mobile');
    document.getElementById('basketButton').innerHTML = `Warenkorb`;
    shoppingBasketContainer.innerHTML = ''; 
    shoppingBasketContainerMobile.innerHTML = ''; 
    for (let i = 0; i < shoppingBasket[0]['foodName'].length; i++) {
        const foodName = shoppingBasket[0]['foodName'][i];
        const price = shoppingBasket[0]['prices'][i].toLocaleString();
        const amount = shoppingBasket[0]['amount'][i];
        shoppingBasketContainer.innerHTML += shoppingBasketContainerHTML(foodName, price, amount);
        shoppingBasketContainerMobile.innerHTML += shoppingBasketContainerHTML(foodName, price, amount);
    }
    checkIfBasketEmpty()
    checkIfMobileBasketEmpty()
}

function checkIfBasketEmpty(){
    let shoppingBasketContainer = document.getElementById('shopping-basket');
    if (shoppingBasketContainer.innerHTML === '') {
        shoppingBasketContainer.innerHTML = emptyBasketHTML();
        document.getElementById('total-container').classList.add("d-none");
        document.getElementById('order-button').classList.add("d-none");
    } else {
        updateShoppingBasket(); 
        document.getElementById('total-container').classList.remove("d-none");
        document.getElementById('order-button').classList.remove("d-none");
    }
    return;
}

function checkIfMobileBasketEmpty(){
    let shoppingBasketContainerMobile = document.getElementById('shopping-basket-mobile');
    if (shoppingBasketContainerMobile.innerHTML === '') {
        shoppingBasketContainerMobile.innerHTML = emptyBasketHTML();
        document.getElementById('total-container-mobile').classList.add("d-none");
        document.getElementById('basketButton-mobile').classList.add("d-none");
    } else {
        updateShoppingBasket(); 
        document.getElementById('total-container-mobile').classList.remove("d-none");
        document.getElementById('basketButton-mobile').classList.remove("d-none");
    }
    return;
}



function shoppingBasketContainerHTML(foodName, price, amount){
    return `
    <div class="basket-item">
        <div class="basketRow1">
            <div class="amount">${amount}</div>
            <div class="itemName"><b>${foodName}</b></div>
            <div class="itemPrice">${price}€</div>
            <div class="deleteButton"><img src="img/delete-24.ico" onclick="deleteItem('${foodName}', ${price})"></div>
        </div>
    </div>
    `;
}


function emptyBasketHTML(){
    return `
    <div class="empty-basket-container">
        <img src="img/shopping-bag-24.ico">
        <h2>Fülle deinen Warenkorb</h2>
        <p id="emptyBasketDescription">Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
    </div>
    `;
}


function addToBasket(name, price, amount){
    let isItemExistent = checkIfItemExistent(name);
    if (isItemExistent) {
        let index = shoppingBasket[0]['foodName'].indexOf(name);
        let currentPrice = shoppingBasket[0]['prices'][index];
        let newPrice = calculatePrice(currentPrice, price);
        shoppingBasket[0]['amount'][index] += amount;
        shoppingBasket[0]['prices'][index] = newPrice;
    } else {
        shoppingBasket[0]['foodName'].push(name);
        shoppingBasket[0]['prices'].push(price);
        shoppingBasket[0]['listPrices'].push(price);
        shoppingBasket[0]['amount'].push(amount);
    }
    render();
}


function deleteItem(foodName){
    let index = shoppingBasket[0]['foodName'].indexOf(foodName);
    let currentPrice = shoppingBasket[0]['prices'][index];
    let listPrice = shoppingBasket[0]['listPrices'][index];
    if (shoppingBasket[0]['amount'][index] > 1) {
        let currentAmount = shoppingBasket[0]['amount'][index];
        shoppingBasket[0]['amount'][index] = currentAmount - 1;
        let totalPrice = currentPrice - listPrice;
        shoppingBasket[0]['prices'][index] = totalPrice;
    } else {
        shoppingBasket[0]['foodName'].splice(index, 1) 
	    shoppingBasket[0]['prices'].splice(index, 1) 
	    shoppingBasket[0]['listPrices'].splice(index, 1) 
	    shoppingBasket[0]['amount'].splice(index, 1) 
    }
    render();
}



function calculatePrice(oldPrice, newPrice) {
    return oldPrice + newPrice;
}


function checkIfItemExistent(name){
    let item = shoppingBasket[0]['foodName']
    return item.includes(name)
}


function updateShoppingBasket(){
    let sum = 0;
    for (let i = 0; i < shoppingBasket[0]['prices'].length; i++) {
        sum += shoppingBasket[0]['prices'][i];
    }
    document.getElementById('sum').innerHTML = sum.toLocaleString() + '€';
    document.getElementById('sum-mobile').innerHTML = sum.toLocaleString() + '€';
    let totalSum = (sum + 2).toLocaleString() + '€';
    document.getElementById('total-sum').innerHTML = totalSum;
    document.getElementById('total-sum-mobile').innerHTML = totalSum;
    updateOrderButton(totalSum);
}

function updateOrderButton(totalSum){
    document.getElementById('order-button').innerHTML = `Bezahlen (${totalSum})`;
    document.getElementById('basketButton-mobile').innerHTML = `Bezahlen (${totalSum})`;
    
    let amount = 0;
    for (let i = 0; i < shoppingBasket[0]['prices'].length; i++) {
        amount += shoppingBasket[0]['amount'][i];
    }
    document.getElementById('basketButton').innerHTML = `${amount} Warenkorb (${totalSum})`;

}


function openMobileBasket(){
    document.getElementById('mobileBasketOverlay').classList.remove('d-none');
    document.getElementById('header').classList.add('mobileHeader');

}

function closeMobileBasket(){
    document.getElementById('mobileBasketOverlay').classList.add('d-none');
    document.getElementById('header').classList.remove('mobileHeader');
}

  
function addClassForScreenWidth() {
    const overlay = document.getElementById("mobileBasketOverlay");
    if (window.innerWidth > 1000) {
      overlay.classList.add("d-none");
    }
}
  
window.addEventListener("resize", addClassForScreenWidth);
addClassForScreenWidth();
  
  
