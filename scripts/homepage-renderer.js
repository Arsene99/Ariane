// scripts/homepage-renderer.js
// Logique de rendu des sections pour les deux pages avec styles intégrés

class HomepageRenderer {
    constructor() {
        this.sections = [];
        this.injectStyles();
    }

    // Injecter les styles CSS
    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
           .homepage-section {
    width: 100%;
    margin: 0 auto;
    animation: fadeIn 0.5s ease-out;
    position: relative;
}

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            /* Styles pour Hero */
           .homepage-hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    padding: 100px 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
    width: 100vw;
    left: 50%;
    margin-left: -50vw;
    border-radius: 0 !important;
    margin-bottom: 0 !important;
}


            .homepage-hero.with-image {
                background-size: cover;
                background-position: center;
            }

            .homepage-hero h2 {
                font-size: 36px;
                margin-bottom: 20px;
                font-weight: 700;
                position: relative;
                z-index: 2;
            }

            .homepage-hero p {
                font-size: 18px;
                opacity: 0.9;
                max-width: 600px;
                margin: 0 auto 30px;
                line-height: 1.6;
                position: relative;
                z-index: 2;
            }

            .hero-image {
                max-width: 500px;
                margin: 40px auto 0;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                position: relative;
                z-index: 2;
            }

            .hero-image img {
                width: 100%;
                height: auto;
                display: block;
            }

            /* Styles pour Texte */
            .homepage-text {
    padding: 60px 20px;
    margin: 0 auto;
    max-width: 800px;
    transition: transform 0.3s;
    background: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
}

.homepage-text:hover {
    transform: none;
}

.homepage-text h3 {
    margin-bottom: 20px;
    font-size: 28px;
    color: #1d1d1f;
    font-weight: 600;
    text-align: center;
}

.homepage-text p {
    line-height: 1.8;
    color: #444;
    font-size: 18px;
    margin: 0 auto;
    max-width: 600px;
}

            /* Styles pour Image */
            .homepage-image {
    padding: 40px 20px;
    margin: 0 auto;
    max-width: 1200px;
    background: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
}

.image-container {
    border-radius: 8px;
    overflow: hidden;
    margin: 0 auto 20px;
    max-width: 800px;
}


            .image-container img {
                width: 100%;
                height: auto;
                display: block;
                transition: transform 0.3s;
            }

            .image-container:hover img {
                transform: scale(1.02);
            }

            .image-caption {
                font-size: 16px;
                color: #666;
                margin-top: 15px;
                font-style: italic;
            }

            /* Styles pour CTA */
            .homepage-cta {
    padding: 80px 20px;
    margin: 0 auto;
    max-width: 800px;
    text-align: center;
    background: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
}


            .homepage-cta h3 {
                margin-bottom: 25px;
                font-size: 24px;
                color: #1d1d1f;
                font-weight: 600;
            }

            .cta-button {
                display: inline-block;
                background: #6a11cb;
                color: white;
                padding: 16px 32px;
                border-radius: 10px;
                text-decoration: none;
                font-weight: 600;
                font-size: 16px;
                transition: all 0.3s;
                box-shadow: 0 4px 15px rgba(106, 17, 203, 0.3);
            }

            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(106, 17, 203, 0.4);
            }

            /* Styles pour Séparateur */
            .homepage-separator {
    padding: 40px 0;
    margin: 0 auto;
    max-width: 800px;
}

.separator-line {
    border: none;
    border-top: 2px solid #e0e0e0;
    width: 100px;
    margin: 0 auto;
}

            /* Message par défaut */
            .default-message {
                max-width: 800px;
                margin: 100px auto;
                padding: 60px 40px;
                text-align: center;
                background: white;
                border-radius: 20px;
                box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
                animation: fadeIn 0.8s ease-out;
            }

            .default-message h1 {
                font-size: 36px;
                background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 20px;
            }

            .default-message p {
                font-size: 18px;
                color: #666;
                margin-bottom: 30px;
                line-height: 1.6;
            }

            .default-message .btn {
                display: inline-block;
                background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
                color: white;
                padding: 16px 32px;
                border-radius: 10px;
                text-decoration: none;
                font-weight: 600;
                transition: transform 0.3s, box-shadow 0.3s;
                box-shadow: 0 4px 15px rgba(106, 17, 203, 0.3);
            }

            .default-message .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(106, 17, 203, 0.4);
            }

            /* Mode responsive */
            @media (max-width: 768px) {
                .homepage-section {
                    margin-bottom: 20px;
                }

               .homepage-hero {
        padding: 80px 15px;
    }

                .homepage-hero h2 {
        font-size: 32px;
    }

                .homepage-hero p {
                    font-size: 16px;
                }
                    .homepage-text {
        padding: 40px 15px;
    }
            .homepage-text h3 {
        font-size: 24px;
    }

     .homepage-text p {
        font-size: 16px;
    }
                
                .homepage-image,
                .homepage-cta {
                    padding: 25px;
                    border-radius: 12px;
                }

                .default-message {
                    margin: 50px 20px;
                    padding: 40px 20px;
                }

                .default-message h1 {
                    font-size: 28px;
                }
            }

            .homepage-cta {
        padding: 60px 15px;
    }

            /* Animation de chargement */
            .loading-skeleton {
                animation: pulse 1.5s infinite;
            }

            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // Créer un élément HTML pour une section
    createSectionElement(section) {
        const div = document.createElement('div');
        div.className = 'homepage-section';
        
        switch(section.type) {
            case 'hero':
    let heroStyle = '';
    if (section.image) {
        heroStyle = `background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${section.image}'); background-size: cover; background-position: center; color: ${section.textColor || '#ffffff'};`;
    } else {
        heroStyle = `background: ${section.backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}; color: ${section.textColor || '#ffffff'};`;
    }
    
    // Ne pas afficher les titres vides
    const heroTitle = section.title ? `<h2>${section.title}</h2>` : '';
    const heroSubtitle = section.subtitle ? `<p>${section.subtitle}</p>` : '';
    
    // Si pas de texte, afficher un espaceur minimal
    const heroContent = (heroTitle || heroSubtitle) ? heroTitle + heroSubtitle : '<div style="height: 20px;"></div>';
    
    div.innerHTML = `
        <div class="homepage-hero" style="${heroStyle}">
            ${heroContent}
        </div>
    `;
    break;

case 'text':
    // Ne pas afficher le titre s'il est vide
    const textTitle = section.title ? `<h3>${section.title}</h3>` : '';
    
    div.innerHTML = `
        <div class="homepage-text" style="text-align: ${section.alignment || 'left'}">
            ${textTitle}
            ${section.content ? `<p>${section.content}</p>` : ''}
        </div>
    `;
    break;

case 'image':
    // Ne pas afficher la légende si elle est vide
    const imageCaption = section.caption ? `<p class="image-caption">${section.caption}</p>` : '';
    
    div.innerHTML = `
        <div class="homepage-image" style="text-align: ${section.alignment || 'center'}">
            ${section.image ? `
                <div class="image-container">
                    <img src="${section.image}" alt="${section.caption || ''}">
                </div>
            ` : '<p style="color: #999; font-style: italic; padding: 40px 0; text-align: center;">Aucune image</p>'}
            ${imageCaption}
        </div>
    `;
    break;

case 'cta':
    // Le texte du bouton est toujours obligatoire
    div.innerHTML = `
        <div class="homepage-cta">
            ${section.title ? `<h3>${section.title}</h3>` : ''}
            <a href="${section.buttonUrl || '#'}" class="cta-button" style="background: ${section.buttonColor || '#6a11cb'}">
                ${section.buttonText || 'Découvrir'}
            </a>
        </div>
    `;
    break;

            case 'separator':
                div.innerHTML = `
                    <div class="homepage-separator">
                        <hr class="separator-line">
                    </div>
                `;
                break;
        }
        
        return div;
    }

    // Afficher un message par défaut
    showDefaultMessage(container) {
        container.innerHTML = `
            <div class="default-message">
                <h1>👋 Bienvenue !</h1>
                <p>Cette page d'accueil est en cours de configuration.</p>
                <a href="edit-home.html" class="btn">Configurer la page d'accueil</a>
            </div>
        `;
    }

    // Rendre toutes les sections dans un conteneur
    renderSections(container, sections) {
        container.innerHTML = '';
        
        if (!sections || sections.length === 0) {
            this.showDefaultMessage(container);
            return;
        }
        
        sections.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        sections.forEach((section, index) => {
            setTimeout(() => {
                const sectionElement = this.createSectionElement(section);
                container.appendChild(sectionElement);
            }, index * 100);
        });
    }
}

// Instance globale
const homepageRenderer = new HomepageRenderer();
