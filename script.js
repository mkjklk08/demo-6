const cartShow = document.getElementById('cart-show');
const counter = document.querySelector('.counter-books');
const totalCostEl = document.getElementById('total-sum');

const cards = document.querySelectorAll('.books-type');
const cartRental = document.getElementById('cart-rental');
const rentBtns = document.querySelectorAll('.rent-btn');

cartShow.addEventListener('click', function() {
    cartRental.style.display = cartRental.style.display === 'none' ? 'block' : 'none';
});

for (let i = 0; i < rentBtns.length; i++) {
    rentBtns[i].addEventListener('click', function () {
        const title = cards[i].querySelector('.name-book').textContent.trim();
        const price = cards[i].querySelector('.cost-price').textContent.trim();

        let found = false;
        let rentedItems = cartRental.querySelectorAll('div');

        rentedItems.forEach(item => {
            const itemTitle = item.querySelector('.title').textContent.replace(' -', '');
            if (itemTitle === title) {
                const dayCounter = item.querySelector('.day');
                let currentDays = parseInt(dayCounter.textContent);
                dayCounter.textContent = currentDays + 1;
                found = true;
            }
        });

        if (!found) {
            const newBook = document.createElement('div');
            newBook.innerHTML = `
                <span class="title">${title} -</span>
                <span class="price">${price} -</span>
                <span><span class="day">1</span> day(s)</span>
            `;
            cartRental.appendChild(newBook);
        }

        updateCartCounter();
        updateTotal();
    });
}

function updateCartCounter() {
    const rentedItems = cartRental.querySelectorAll('div');
    counter.textContent = rentedItems.length;
}

function updateTotal() {
    let total = 0;
    const rentedItems = cartRental.querySelectorAll('div');
    rentedItems.forEach(item => {
        const priceText = item.querySelector('.price').textContent.replace('$', '').replace(' -', '');
        const days = parseInt(item.querySelector('.day').textContent);
        const price = parseFloat(priceText);
        total += price * days;
    });

    totalCostEl.textContent = `Total: $${total.toFixed(2)}`;
}