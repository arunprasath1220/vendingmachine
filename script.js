const products = [
    { id: 'A1', name: 'Freeky Fries', price: 30, stock: 15 },
    { id: 'A2', name: 'Moong Dal', price: 20, stock: 15 },
    { id: 'A3', name: 'Mad Angles', price: 30, stock: 15 },
    { id: 'A4', name: 'KurKure', price: 30, stock: 15 },
    { id: 'B1', name: 'Brownie', price: 25, stock: 15 },
    { id: 'B2', name: 'Plum Cake', price: 30, stock: 15 },
    { id: 'B3', name: 'Milk Cake', price: 60, stock: 15 },
    { id: 'B4', name: 'Venilla Slice', price: 45, stock: 15 },
    { id: 'C1', name: '5-Star', price: 20, stock: 15 },
    { id: 'C2', name: 'Kitkat', price: 40, stock: 15 },
    { id: 'C3', name: 'Munch Max', price: 30, stock: 15 },
    { id: 'C4', name: 'DiaryMilk Silk', price: 70, stock: 15 },
    { id: 'D1', name: '7-Up', price: 40, stock: 15 },
    { id: 'D2', name: 'Mountain Dew', price: 35, stock: 15 },
    { id: 'D3', name: 'Milkshake', price: 40, stock: 15 },
    { id: 'D4', name: 'Coke', price: 50, stock: 15 }
];

let selectedItems = [];
let discountApplied = false;
let totalCost = 0;

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function () {
        const parentDiv = this.parentElement;
        const productId = parentDiv.querySelector('.name').textContent.split(':')[0].trim();
        const quantity = parseInt(parentDiv.querySelector('.no1').value);
        const product = products.find(p => p.id === productId);
        
        if (quantity > 0 && quantity <= product.stock) {
            product.stock -= quantity;
            selectedItems.push({ product, quantity });
            updateTotalCost();
            updateItemCount();
        } else {
            alert('Invalid quantity');
        }
    });
});

function updateTotalCost() {
    totalCost = selectedItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    if (discountApplied) {
        totalCost *= 0.7;
    }
    document.querySelector('.pay h2').textContent = `Total Cost: ₹${totalCost.toFixed(2)}`;
}

function updateItemCount() {
    const totalItems = selectedItems.reduce((acc, item) => acc + item.quantity, 0);
    document.querySelector('#bottom h1').textContent = `Number of items: ${totalItems}`;
}

document.getElementById('applyDiscountButton').addEventListener('click', function () {
    const discountCode = document.querySelector('.box').value;
    if (discountCode === 'DISCOUNT30') {
        discountApplied = true;
        alert('Discount applied successfully!');
        updateTotalCost();
    } else {
        alert('Invalid discount code');
    }
});

document.querySelectorAll('.pay_btn, .pay_btn2').forEach(button => {
    button.addEventListener('click', function () {
        const paymentMethod = this.textContent;
        processPayment(paymentMethod);
    });
});

function processPayment(paymentMethod) {
    const confirmation = window.confirm(`Proceeding with ${paymentMethod}. Do you want to confirm the payment?`);
    
    if (confirmation) {
        alert(`Payment through ${paymentMethod} successful!`);
        dispatchProducts();
    } else {
        alert('Payment canceled');
    }
}

function dispatchProducts() {
    selectedItems.forEach(item => {
        const product = products.find(p => p.id === item.product.id);
        product.stock -= item.quantity;
    });

    selectedItems = [];
    document.querySelectorAll('.no1').forEach(input => input.value = '');
    
    updateTotalCost();
    updateItemCount();
    
    alert('Your items are on the way!');
}

const exitButton = document.createElement('button');
exitButton.textContent = 'Exit';
exitButton.addEventListener('click', function () {
    alert('Thank you for using the Vending Machine! Have a great day!');
    window.location.reload();
});
document.body.appendChild(exitButton);

document.addEventListener('DOMContentLoaded', () => {
    const stock = {
        a1: 15,
        a2: 15,
        a3: 15,
        a4: 15,
        b1: 15,
        b2: 15,
        b3: 15,
        b4: 15,
        c1: 15, 
        c2: 15, 
        c3: 15, 
        c4: 15, 
        d1: 15, 
        d2: 15, 
        d3: 15,
        d4: 15  
    };

    const prices = {
        a1: 30,
        a2: 20,
        a3: 30,
        a4: 30,
        b1: 25,
        b2: 30,
        b3: 60,
        b4: 45,
        c1: 20,
        c2: 40,
        c3: 30,
        c4: 70,
        d1: 40,
        d2: 35,
        d3: 40,
        d4: 50
    };

    let totalCost = 0;
    let totalItems = 0;

    const totalCostElement = document.querySelector('h2');
    const totalItemsElement = document.querySelector('h1');

    function updateStock(item, quantity) {
        const stockElement = document.querySelector(`.${item} .Stock`);
        if (stock[item] >= quantity && quantity > 0) {
            stock[item] -= quantity;
            stockElement.innerHTML = `Stock: ${stock[item]}`;

            totalCost += prices[item] * quantity;
            totalItems += quantity;

            totalCostElement.innerHTML = `Total Cost: ₹${totalCost}`;
            totalItemsElement.innerHTML = `Number of items: ${totalItems}`;
        } else {
            alert(`Not enough stock for ${item}`);
        }
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const itemElement = button.closest('div');
            const itemClass = itemElement.className;
            const quantity = parseInt(itemElement.querySelector('.no1').value) || 0;

            if (quantity > 0) {
                updateStock(itemClass, quantity);
                itemElement.querySelector('.no1').value = '';
            }
        });
    });

    const applyDiscountButton = document.getElementById('applyDiscountButton');
    applyDiscountButton.addEventListener('click', () => {
        const discountCode = document.querySelector('.box').value;
        if (discountCode === 'DISCOUNT30') {
            const discountAmount = totalCost * 0.30;
            totalCost -= discountAmount;
            totalCostElement.innerHTML = `Total Cost: ₹${totalCost.toFixed(2)}`;
            alert('Discount applied: 30%');
        } else {
            alert('Invalid discount code');
        }
    });

    document.querySelectorAll('.pay_btn, .pay_btn2').forEach(button => {
        button.addEventListener('click', () => {
            alert('Payment successful!');
            totalCost = 0;
            totalItems = 0;
            totalCostElement.innerHTML = `Total Cost: ₹0.00`;
            totalItemsElement.innerHTML = `Number of items: 0`;
            document.querySelectorAll('.Stock').forEach(stockElement => {
                const itemClass = stockElement.closest('div').className;
                stockElement.innerHTML = `Stock: ${stock[itemClass]}`;
            });
        });
    });
});
                      
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function () {
        const parentDiv = this.parentElement;
        const productId = parentDiv.querySelector('.name').textContent.split(':')[0].trim();
        const quantity = parseInt(parentDiv.querySelector('.no1').value);
        const product = products.find(p => p.id === productId);
        
        if (quantity > 0 && quantity <= product.stock) {
            product.stock -= quantity;
            selectedItems.push({ product, quantity });
            updateTotalCost();
            updateItemCount();
            alert(`Added ${quantity} of ${product.name}`);
            addPurchasedItemToList(product, quantity); 
        } else {
            alert('Invalid quantity');
        }
    });
});

function addPurchasedItemToList(product, quantity) {
    const purchasedItemsContainer = document.getElementById('purchased-items');
    
    const purchasedItemText = `${quantity} x ${product.name}`;
    
    const purchasedItem = document.createElement('p');
    purchasedItem.textContent = purchasedItemText;
    
    purchasedItemsContainer.appendChild(purchasedItem);
}

function updateTotalCost() {
    totalCost = selectedItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    if (discountApplied) {
        totalCost *= 0.7;
    }
    document.querySelector('.pay h2').textContent = `Total Cost: ₹${totalCost.toFixed(2)}`;
}

function updateItemCount() {
    const totalItems = selectedItems.reduce((acc, item) => acc + item.quantity, 0);
    document.querySelector('#bottom h1').textContent = `Number of items: ${totalItems}`;
}
