const API_URL = 'http://localhost:5000/api/products';
const container = document.getElementById('product-container');

// Función para obtener productos del Backend
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();

        // Limpiar el mensaje de "Cargando..."
        container.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('card');

            // Usamos una imagen por defecto si no tiene una
            const imgUrl = product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image';

            card.innerHTML = `
                <img src="${imgUrl}" alt="${product.name}">
                <div class="card-body">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">$${product.price}</p>
                    <p>Stock: ${product.stock}</p>
                    <button>Añadir al Carrito</button>
                </div>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p>Error al cargar los productos. Asegúrate de que el servidor esté corriendo.</p>';
    }
}

// Llamar a la función al cargar la página
fetchProducts();

// --- LÓGICA DE AUTENTICACIÓN ---

const loginBtn = document.getElementById('loginBtn');
const modal = document.getElementById('loginModal');
const closeBtn = document.getElementsByClassName('close')[0];
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('error-msg');

// 1. Abrir el modal
loginBtn.onclick = function() {
    modal.style.display = "block";
}

// 2. Cerrar el modal (X)
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// 3. Cerrar si clic fuera del modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 4. MANEJAR EL LOGIN
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue sola
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // ¡ÉXITO! Guardamos el token en el navegador
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            
            alert(`¡Bienvenido, ${data.username}! 🚀`);
            modal.style.display = "none";
            
            // Cambiar el botón de Login por "Logout"
            checkLoginStatus();
        } else {
            // Error (ej: contraseña incorrecta)
            errorMsg.innerText = data.message;
        }

    } catch (error) {
        errorMsg.innerText = "Error de conexión con el servidor.";
    }
});

// 5. Verificar si ya estamos logueados
function checkLoginStatus() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token) {
        loginBtn.innerText = `Hola, ${username} (Salir)`;
        loginBtn.onclick = logout; // Cambiamos la función del botón
    }
}

// 6. Cerrar Sesión
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    location.reload(); // Recargar la página
}

// Ejecutar al cargar la página
checkLoginStatus();