function guardarMesa() {
    const mesa = document.getElementById('mesa-input').value;
    if (mesa) {
        document.getElementById('mesa-input-container').style.display = 'none';
        document.getElementById('menu-container').style.display = 'block';
        document.getElementById('mesa-numero').textContent = mesa;
    } else {
        alert('Por favor, ingrese un número de mesa válido.');
    }
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

const menuItems = [
    { name: "Hamburguesa Clásica", price: 45.00, img: "https://img.freepik.com/fotos-premium/hamburguesa-lechuga-tomate-queso-encima_911201-2411.jpg" },
    { name: "Hamburguesa Doble", price: 50.00, img: "https://img.freepik.com/fotos-premium/hamburguesa-doble-aislada-sobre-fondo-negro-hamburguesa-fresca-comida-rapida-carne-res-queso-cheddar_174541-1262.jpg" },
    { name: "Hamburguesa Americana", price: 55.00, img: "https://img.freepik.com/fotos-premium/hamburguesa-doble-queso-fondo-negro-fondo-oscuro_68880-2392.jpg" },
    { name: "Hamburguesa Chipotle", price: 60.00, img: "https://img.freepik.com/fotos-premium/hamburguesa-mucho-humo-sobre-fondo-oscuro_856795-3589.jpg" }
];

const ingredientes = ["Tomate", "Queso", "Cebolla", "Lechuga", "Chipotle"];
const menuContainer = document.getElementById('menu-items');
const cartList = document.getElementById('cart-list');
const totalPriceElement = document.getElementById('total-price');
let total = 0;

menuItems.forEach((item, index) => {
    let ingredientsCheckboxes = ingredientes.map(ingrediente => 
        `<label class="ingrediente-label">
            <input type="checkbox" class="ingrediente" data-index="${index}" value="${ingrediente}" checked> ${ingrediente}
        </label>`
    ).join('');

    const itemHTML = `
        <div class="col-md-3 mb-4">
            <div class="card menu-item">
                <img src="${item.img}" class="card-img-top" alt="${item.name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Q${item.price.toFixed(2)}</p>
                    <div>${ingredientsCheckboxes}</div>
                    <button class="btn btn-primary" onclick="addToCart(${index})">Agregar</button>
                </div>
            </div>
        </div>
    `;
    menuContainer.innerHTML += itemHTML;
});

function addToCart(index) {
    const selectedItem = menuItems[index];
    const checkboxes = document.querySelectorAll(`.ingrediente[data-index="${index}"]`);
    let ingredientesSeleccionados = [];
    checkboxes.forEach(checkbox => {
        if (!checkbox.checked) {
            ingredientesSeleccionados.push(checkbox.value);
        }
    });

    const modificaciones = ingredientesSeleccionados.length > 0 ? `<div class="cart-item-details">Sin: ${ingredientesSeleccionados.join(', ')}</div>` : '';
    
    const cartItem = document.createElement('li');
    cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    cartItem.innerHTML = `<div>
        ${selectedItem.name} - Q${selectedItem.price.toFixed(2)}
        ${modificaciones}
    </div> 
    <button class="btn btn-danger btn-sm" onclick="removeFromCart(this, ${selectedItem.price})">X</button>`;
    cartList.appendChild(cartItem);
    total += selectedItem.price;
    totalPriceElement.textContent = total.toFixed(2);
}

function removeFromCart(button, price) {
    button.parentElement.remove();
    total -= price;
    totalPriceElement.textContent = total.toFixed(2);
}