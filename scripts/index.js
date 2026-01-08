// scripts/index.js:

// Products management
let allProducts = [];

document.addEventListener('DOMContentLoaded', function() {
    // Only run on products page
    if (document.getElementById('productsGrid')) {
        loadProducts();
        setupFilters();
    }
});

function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    // Sample products data (in real app, you would fetch from Firestore)
    allProducts = [
        {
            id: 1,
            name: "Smartphone Premium",
            description: "Smartphone haut de gamme avec écran 6.7\" et triple caméra",
            price: 899.99,
            category: "electronics",
            imageUrl: "https://res.cloudinary.com/demo/image/upload/v1586184549/smartphone.jpg"
        },
        {
            id: 2,
            name: "Casque Audio sans Fil",
            description: "Casque Bluetooth avec réduction de bruit active",
            price: 249.99,
            category: "electronics",
            imageUrl: "https://res.cloudinary.com/demo/image/upload/v1586184550/headphones.jpg"
        },
        {
            id: 3,
            name: "T-Shirt Premium",
            description: "T-shirt en coton bio, confortable et élégant",
            price: 29.99,
            category: "fashion",
            imageUrl: "https://res.cloudinary.com/demo/image/upload/v1586184551/tshirt.jpg"
        },
        {
            id: 4,
            name: "Livre de Développement Web",
            description: "Guide complet pour devenir développeur web full-stack",
            price: 39.99,
            category: "books",
            imageUrl: "https://res.cloudinary.com/demo/image/upload/v1586184552/book.jpg"
        },
        {
            id: 5,
            name: "Lampadaire Design",
            description: "Lampadaire moderne avec lumière LED ajustable",
            price: 129.99,
            category: "home",
            imageUrl: "https://res.cloudinary.com/demo/image/upload/v1586184553/lamp.jpg"
        },
        {
            id: 6,
            name: "Montre Connectée",
            description: "Montre intelligente avec suivi d'activité et notifications",
            price: 199.99,
            category: "electronics",
            imageUrl: "https://res.cloudinary.com/demo/image/upload/v1586184554/smartwatch.jpg"
        }
    ];
    
    displayProducts(allProducts);
}

function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">Aucun produit trouvé.</p>';
        return;
    }
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.imageUrl}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Produit'">
            </div>
            <div class="product-info">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price.toFixed(2)} €</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Ajouter au panier</button>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const categories = {
        'electronics': 'Électronique',
        'fashion': 'Mode',
        'home': 'Maison',
        'books': 'Livres'
    };
    return categories[category] || category;
}

function setupFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    
    categoryFilter.addEventListener('change', function() {
        filterProducts();
    });
    
    searchInput.addEventListener('input', function() {
        filterProducts();
    });
}

function filterProducts(category = null) {
    const selectedCategory = category || document.getElementById('categoryFilter').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    let filteredProducts = allProducts;
    
    // Filter by category
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    displayProducts(filteredProducts);
}

// Make filterProducts globally available for navbar
window.filterProducts = filterProducts;

function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        alert(`"${product.name}" a été ajouté au panier!`);
        // In a real app, you would update cart state here
    }
}
