// dashboard-back-button.js
// Bouton flottant pour retourner au dashboard depuis les pages d'édition

(function() {
    'use strict';
    
    // Liste des pages d'édition qui doivent afficher le bouton
    const editPages = [
        'edit-home.html',
        'edit-categories.html',
        'edit-products.html',
        'edit-themes.html'
    ];
    
    // Vérifier si on est sur une page d'édition
    function isEditPage() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop();
        return editPages.includes(currentPage);
    }
    
    // Créer et injecter le bouton flottant
    function createBackButton() {
        if (!isEditPage()) return;
        
        // Créer le style pour le bouton
        const style = document.createElement('style');
        style.textContent = `
            .dashboard-back-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                background: var(--accent-gradient);
                border: none;
                border-radius: 50%;
                box-shadow: 0 8px 24px rgba(106, 17, 203, 0.3);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                z-index: 999;
                animation: fadeInUp 0.5s ease;
            }
            
            .dashboard-back-btn:hover {
                transform: translateY(-4px) scale(1.05);
                box-shadow: 0 12px 32px rgba(106, 17, 203, 0.4);
            }
            
            .dashboard-back-btn:active {
                transform: translateY(-2px) scale(1.02);
            }
            
            .dashboard-back-btn svg {
                width: 28px;
                height: 28px;
                color: white;
                transition: transform 0.3s ease;
            }
            
            .dashboard-back-btn:hover svg {
                transform: translateX(-3px);
            }
            
            .dashboard-back-btn-tooltip {
                position: absolute;
                right: 75px;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.85);
                color: white;
                padding: 8px 16px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
                backdrop-filter: blur(10px);
            }
            
            .dashboard-back-btn:hover .dashboard-back-btn-tooltip {
                opacity: 1;
            }
            
            .dashboard-back-btn-tooltip::after {
                content: '';
                position: absolute;
                right: -6px;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 6px 0 6px 6px;
                border-color: transparent transparent transparent rgba(0, 0, 0, 0.85);
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Mode sombre */
            body.dark-mode .dashboard-back-btn-tooltip {
                background: rgba(255, 255, 255, 0.15);
                backdrop-filter: blur(20px);
            }
            
            body.dark-mode .dashboard-back-btn-tooltip::after {
                border-color: transparent transparent transparent rgba(255, 255, 255, 0.15);
            }
            
            /* Responsive mobile */
            @media (max-width: 768px) {
                .dashboard-back-btn {
                    width: 56px;
                    height: 56px;
                    bottom: 20px;
                    right: 20px;
                    box-shadow: 0 6px 20px rgba(106, 17, 203, 0.3);
                }
                
                .dashboard-back-btn svg {
                    width: 24px;
                    height: 24px;
                }
                
                .dashboard-back-btn-tooltip {
                    display: none;
                }
            }
            
            /* Animation de pulsation subtile */
            @keyframes pulse {
                0%, 100% {
                    box-shadow: 0 8px 24px rgba(106, 17, 203, 0.3);
                }
                50% {
                    box-shadow: 0 8px 24px rgba(106, 17, 203, 0.5);
                }
            }
            
            .dashboard-back-btn.pulse {
                animation: pulse 2s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);
        
        // Créer le bouton
        const button = document.createElement('button');
        button.className = 'dashboard-back-btn';
        button.setAttribute('aria-label', 'Retour au Dashboard');
        button.setAttribute('title', 'Retour au Dashboard');
        
        // Ajouter l'icône de flèche gauche
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span class="dashboard-back-btn-tooltip">Retour au Dashboard</span>
        `;
        
        // Ajouter l'événement de clic
        button.addEventListener('click', function() {
            window.location.href = 'dashboard.html';
        });
        
        // Ajouter un effet de pulsation pendant les 3 premières secondes
        button.classList.add('pulse');
        setTimeout(() => {
            button.classList.remove('pulse');
        }, 3000);
        
        // Injecter le bouton dans le body
        document.body.appendChild(button);
        
        console.log('✅ Bouton retour Dashboard ajouté');
    }
    
    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createBackButton);
    } else {
        createBackButton();
    }
})();