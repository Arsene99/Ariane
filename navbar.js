// navbar.js

let isAdmin = false;
let isDarkMode = false;

async function checkIfAdmin(userEmail) {
    try {
        const configDoc = await firebase.firestore().collection('config').doc('admin').get();
        if (configDoc.exists) {
            const adminEmail = configDoc.data().email;
            return userEmail === adminEmail;
        }
        return false;
    } catch (error) {
        console.error('Erreur lors de la vérification admin:', error);
        return false;
    }
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Recharger les thèmes pour appliquer les couleurs du bon mode
    loadCustomThemes();
}

function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    if (page === 'index.html' || page === '') {
        return 'home';
    } else if (page === 'products.html') {
        return 'products';
    } else if (page === 'dashboard.html') {
        return 'dashboard';
    } else if (page === 'login.html') {
        return 'login';
    }
    return null;
}

// Fonction pour appliquer les thèmes aux variables CSS
function applyThemeColors(theme, mode) {
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--accent-gradient', 
        `linear-gradient(135deg, ${theme.gradientStart} 0%, ${theme.gradientEnd} 100%)`);
    
    // Définir les couleurs de fond fixes selon le mode
    if (mode === 'dark') {
        root.style.setProperty('--background-color', '#1a1a1a');
        root.style.setProperty('--menu-bg', '#2a2a2a');
        root.style.setProperty('--hover-bg', '#2a2a2a');
        root.style.setProperty('--border-color', '#333333');
        root.style.setProperty('--text-primary', '#f5f5f5');
        root.style.setProperty('--text-secondary', '#a0a0a0');
    } else {
        root.style.setProperty('--background-color', '#ffffff');
        root.style.setProperty('--menu-bg', '#ffffff');
        root.style.setProperty('--hover-bg', '#f5f7fa');
        root.style.setProperty('--border-color', '#e5e7eb');
        root.style.setProperty('--text-primary', '#1a1a1a');
        root.style.setProperty('--text-secondary', '#666666');
    }
}

// Fonction pour charger les thèmes personnalisés avec cache localStorage
async function loadCustomThemes() {
    // Ne pas charger les thèmes si on est en mode édition
    if (window.THEMES_EDITING_MODE) {
        console.log('Mode édition détecté, thèmes non chargés par navbar');
        return;
    }
    
    try {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        const mode = isDarkMode ? 'dark' : 'light';

        
        // 1. Charger immédiatement depuis le cache localStorage si disponible
        const cachedThemes = localStorage.getItem('cachedThemes');
        if (cachedThemes) {
            try {
                const themes = JSON.parse(cachedThemes);
                if (themes[mode]) {
                    applyThemeColors(themes[mode], mode);
                }
            } catch (e) {
                console.error('Erreur parsing cache thèmes:', e);
            }
        }
        
        // 2. Charger depuis Firebase en arrière-plan
        const themesDoc = await firebase.firestore().collection('config').doc('themes').get();
        if (themesDoc.exists) {
            const themes = themesDoc.data();
            
            // Comparer avec le cache
            const cachedThemesData = cachedThemes ? JSON.parse(cachedThemes) : null;
            const hasChanged = !cachedThemesData || 
                JSON.stringify(themes) !== JSON.stringify(cachedThemesData);
            
            if (hasChanged) {
                // Les thèmes ont changé, mettre à jour le cache et appliquer
                localStorage.setItem('cachedThemes', JSON.stringify(themes));
                
                if (themes[mode]) {
                    applyThemeColors(themes[mode], mode);
                }
            }
        }
    } catch (error) {
        console.error('Erreur lors du chargement des thèmes:', error);
    }
}

function loadNavbar() {
    // Charger les thèmes personnalisés
    loadCustomThemes();
    
    const navbarContainer = document.getElementById('navbar-container');
    const currentPage = getCurrentPage();
    
    // Check saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
    }
    
    // Déterminer quelle icône doit être active
    const homeActive = currentPage === 'home' ? 'active' : '';
    const productsActive = currentPage === 'products' ? 'active' : '';
    const dashboardActive = currentPage === 'dashboard' ? 'active' : '';
    
    // Create navbar HTML avec les classes active appropriées
    navbarContainer.innerHTML = `
        <nav class="navbar-modern">
            <div class="navbar-content">
                <!-- Left Icons -->
                <div class="nav-icons-left">
                    <a href="index.html" class="nav-icon-btn ${homeActive}" id="homeBtn" title="Accueil">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </a>
                    <a href="products.html" class="nav-icon-btn ${productsActive}" id="productsBtn" title="Produits">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </a>
                </div>
                
                <!-- Center Profile Picture -->
                <div class="profile-center">
                    <div class="profile-picture" id="profilePicture">
                        <img src="assets/profile-default.png" alt="Profile" id="profileImage">
                    </div>
                    
                    <!-- Dropdown Menu -->
                    <div class="profile-menu" id="profileMenu">
                        <div class="profile-menu-header">
                            <img src="assets/profile-default.png" alt="Profile" id="menuProfileImage">
                            <div class="profile-menu-info">
                                <span class="profile-menu-name" id="menuUserName">Utilisateur</span>
                                <span class="profile-menu-email" id="menuUserEmail">email@example.com</span>
                            </div>
                        </div>
                        
                        <div class="profile-menu-divider"></div>
                        
                        <a href="dashboard.html" class="profile-menu-item" id="dashboardMenuItem" style="display: none;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                            <span>Dashboard Admin</span>
                        </a>
                        
                        <a href="#" class="profile-menu-item logout" id="logoutMenuItem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            <span>Déconnexion</span>
                        </a>
                    </div>
                </div>
                
                <!-- Right Icons -->
                <div class="nav-icons-right">
                    <button class="nav-icon-btn" id="categoriesBtn" title="Catégories">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                    </button>
                    <button class="nav-icon-btn" id="darkModeBtn" title="Mode sombre">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon">
                            ${isDarkMode ? 
                                '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>' 
                                : 
                                '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
                            }
                        </svg>
                    </button>
                </div>
            </div>
            
            <!-- Categories Dropdown -->
            <div class="categories-dropdown" id="categoriesDropdown">
                <div class="categories-grid">
                    <a href="products.html" class="category-item" data-category="all">
                        <div class="category-icon">🛍️</div>
                        <span>Tous les produits</span>
                    </a>
                    <div id="dynamicCategories"></div>
                </div>
            </div>
        </nav>
    `;
    
    setupNavbarEvents();
    loadDynamicCategories();
}

async function loadDynamicCategories() {
    try {
        const categoriesSnapshot = await firebase.firestore().collection('categories').orderBy('name').get();
        const dynamicCategoriesContainer = document.getElementById('dynamicCategories');
        
        if (dynamicCategoriesContainer && !categoriesSnapshot.empty) {
            let categoriesHTML = '';
            categoriesSnapshot.forEach(doc => {
                const category = doc.data();
                categoriesHTML += `
                    <a href="products.html?category=${doc.id}" class="category-item" data-category="${doc.id}">
                        <div class="category-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                        </div>
                        <span>${category.name}</span>
                    </a>
                `;
            });
            dynamicCategoriesContainer.innerHTML = categoriesHTML;
        }
    } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
    }
}
async function setupNavbarEvents() {
    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            const displayName = user.displayName || user.email.split('@')[0];
            document.getElementById('menuUserName').textContent = displayName;
            document.getElementById('menuUserEmail').textContent = user.email;
            
            const profileImage = document.getElementById('profileImage');
            const menuProfileImage = document.getElementById('menuProfileImage');
            
            // Toujours utiliser l'image par défaut du dossier assets
            profileImage.src = 'assets/profile-default.png';
            menuProfileImage.src = 'assets/profile-default.png';
            
            isAdmin = await checkIfAdmin(user.email);
            
            if (isAdmin) {
                document.getElementById('dashboardMenuItem').style.display = 'flex';
            }
        }
    });
    
    const profilePicture = document.getElementById('profilePicture');
    const profileMenu = document.getElementById('profileMenu');
    
    profilePicture.addEventListener('click', function(e) {
        e.stopPropagation();
        profileMenu.classList.toggle('active');
        document.getElementById('categoriesDropdown').classList.remove('active');
    });
    
    const categoriesBtn = document.getElementById('categoriesBtn');
    const categoriesDropdown = document.getElementById('categoriesDropdown');
    
    categoriesBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        categoriesDropdown.classList.toggle('active');
        profileMenu.classList.remove('active');
    });
    
    document.getElementById('darkModeBtn').addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDarkMode();
        
        // Update icon
        const btn = e.currentTarget;
        const svg = btn.querySelector('svg');
        svg.innerHTML = isDarkMode ? 
            '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>' 
            : 
            '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    });
    
    document.addEventListener('click', function(e) {
        if (!profileMenu.contains(e.target) && !profilePicture.contains(e.target)) {
            profileMenu.classList.remove('active');
        }
        if (!categoriesDropdown.contains(e.target) && !categoriesBtn.contains(e.target)) {
            categoriesDropdown.classList.remove('active');
        }
    });
    
    document.getElementById('logoutMenuItem').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
            firebase.auth().signOut().then(() => {
                window.location.href = 'login.html';
            });
        }
    });
    
    const categoryLinks = document.querySelectorAll('[data-category]');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const category = this.getAttribute('data-category');
            categoriesDropdown.classList.remove('active');
        });
    });
}

window.loadNavbar = loadNavbar;