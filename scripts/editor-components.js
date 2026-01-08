// scripts/editor-components.js
// Composants d'édition pour la page d'accueil avec styles intégrés

class HomepageEditor {
    constructor() {
        this.homepageSections = [];
        this.currentEditingSection = null;
        this.suggestions = [];
        
        this.availableSuggestions = [
            {
                key: '#bannière',
                type: 'hero',
                title: 'Bannière Hero',
                description: 'Grande bannière avec titre et image de fond',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>'
            },
            {
                key: '#titre',
                type: 'text',
                title: 'Titre',
                description: 'Titre de section avec texte',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3M9 20h6M12 4v16"></path></svg>'
            },
            {
                key: '#texte',
                type: 'text',
                title: 'Bloc de texte',
                description: 'Paragraphe de texte',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" y2="20"></line></svg>'
            },
            {
                key: '#image',
                type: 'image',
                title: 'Image',
                description: 'Image avec légende',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'
            },
            {
                key: '#bouton',
                type: 'cta',
                title: 'Bouton',
                description: 'Bouton avec lien',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8M8 12h8"></path></svg>'
            },
            {
                key: '#séparateur',
                type: 'separator',
                title: 'Séparateur',
                description: 'Ligne de séparation',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line></svg>'
            }
        ];

        this.injectModalStyles();
    }

    // Injecter les styles pour les modals
    injectModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 2000;
                display: none;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }

            .modal-content {
                background: white;
                border-radius: 16px;
                padding: 25px;
                width: 100%;
                max-width: 500px;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            }

            .modal-header {
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #e0e0e0;
            }

            .modal-title {
                font-size: 20px;
                font-weight: 600;
                color: #1d1d1f;
                margin: 0;
            }

            .close-modal {
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 24px;
                color: #86868b;
                cursor: pointer;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.2s;
            }

            .close-modal:hover {
                background: #f5f5f7;
            }

            .form-group {
                margin-bottom: 20px;
            }

            .form-label {
                display: block;
                font-weight: 600;
                color: #1d1d1f;
                margin-bottom: 8px;
                font-size: 14px;
            }

            .input-field, .textarea-field {
                width: 100%;
                padding: 12px 15px;
                border: 1px solid #d2d2d7;
                border-radius: 8px;
                font-size: 16px;
                background: #f5f5f7;
                color: #1d1d1f;
                font-family: inherit;
                transition: border-color 0.2s;
            }

            .input-field:focus, .textarea-field:focus {
                outline: none;
                border-color: #6a11cb;
            }

            .textarea-field {
                min-height: 100px;
                resize: vertical;
            }

            .modal-actions {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }

            .modal-btn {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }

            .modal-btn-primary {
                background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
                color: white;
            }

            .modal-btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(106, 17, 203, 0.3);
            }

            .modal-btn-secondary {
                background: #f5f5f7;
                color: #1d1d1f;
                border: 1px solid #d2d2d7;
            }

            .modal-btn-secondary:hover {
                background: #e0e0e0;
            }

            .image-preview {
                max-width: 200px;
                border-radius: 8px;
                margin: 10px auto;
                display: block;
            }

            @media (max-width: 768px) {
                .modal-content {
                    padding: 20px 15px;
                }
                
                .modal-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Créer le modal
    createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'editModal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal" onclick="homepageEditor.closeEditModal()">×</button>
                <div class="modal-header">
                    <h3 class="modal-title" id="modalTitle">Éditer l'élément</h3>
                </div>
                <div id="modalContent">
                    <!-- Contenu du modal sera injecté ici -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Initialiser l'éditeur
    init() {
        this.createModal();
        this.bindEvents();
        this.loadHomepage();
    }

    // Charger les sections de la page d'accueil
    async loadHomepage() {
        try {
            const doc = await db.collection('config').doc('homepage').get();
            if (doc.exists) {
                this.homepageSections = doc.data().sections || [];
            } else {
                this.homepageSections = this.getDefaultSections();
            }
            this.renderSectionsAccordion();
        } catch (error) {
            console.error('Erreur lors du chargement:', error);
            this.homepageSections = this.getDefaultSections();
            this.renderSectionsAccordion();
        }
    }

    // Sections par défaut
    getDefaultSections() {
        return [
            {
                id: 'hero1',
                type: 'hero',
                title: '', // Vide par défaut
                subtitle: '', // Vide par défaut
                image: '',
                backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textColor: '#ffffff',
                order: 0
            },
            {
                id: 'text1',
                type: 'text',
                title: '', // Vide par défaut
                content: '', // Vide par défaut
                alignment: 'left',
                order: 1
            }
        ];
    }
    

    // Rendre les sections en accordéon
    renderSectionsAccordion() {
        const container = document.getElementById('sectionsAccordion');
        const countElement = document.getElementById('sectionsCount');
        
        countElement.textContent = this.homepageSections.length;
        
        if (this.homepageSections.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <svg class="empty-state-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <div class="empty-state-title">Votre page est vide</div>
                    <p>Commencez à écrire en bas de la page !</p>
                </div>
            `;
            return;
        }
        
        this.homepageSections.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        let html = '';
        
        this.homepageSections.forEach((section, index) => {
            const typeNames = {
                'hero': 'Bannière',
                'text': 'Texte',
                'image': 'Image',
                'cta': 'Bouton',
                'separator': 'Séparateur'
            };
            
            const icons = {
                'hero': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>',
                'text': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3M9 20h6M12 4v16"></path></svg>',
                'image': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
                'cta': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8M8 12h8"></path></svg>',
                'separator': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line></svg>'
            };
            
            let previewHTML = '';
            switch(section.type) {
                case 'hero':
                    const previewBg = section.image ?
                        `background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${section.image}'); background-size: cover; background-position: center;` :
                        `background: ${section.backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}`;
                    
                    previewHTML = `
                        <div style="${previewBg}; padding: 15px; border-radius: 8px; color: ${section.textColor || '#ffffff'}">
                            ${section.title ? `<h4 style="margin: 0 0 10px 0; font-size: 16px;">${section.title}</h4>` : ''}
                            ${section.subtitle ? `<p style="margin: 0; font-size: 14px; opacity: 0.9;">${section.subtitle}</p>` : ''}
                            ${!section.title && !section.subtitle ? '<p style="margin: 0; font-size: 14px; opacity: 0.9; font-style: italic;">Bannière sans texte</p>' : ''}
                        </div>
                    `;
                    break;
            
                case 'text':
                    previewHTML = `
                        <div style="padding: 15px; background: white; border-radius: 8px; border: 1px solid #e0e0e0;">
                            ${section.title ? `<h4 style="margin: 0 0 10px 0; font-size: 16px; color: #333;">${section.title}</h4>` : ''}
                            ${section.content ? `<p style="margin: 0; font-size: 14px; color: #666; line-height: 1.5;">${section.content.substring(0, 100)}${section.content.length > 100 ? '...' : ''}</p>` : '<p style="color: #999; font-style: italic;">Texte vide</p>'}
                        </div>
                    `;
                    break;
                case 'image':
                    previewHTML = `
                        <div style="padding: 15px; background: white; border-radius: 8px; border: 1px solid #e0e0e0; text-align: center;">
                            ${section.image ? `<img src="${section.image}" style="max-width: 100%; max-height: 150px; border-radius: 6px;">` : '<p style="color: #999; font-style: italic;">Aucune image</p>'}
                            ${section.caption ? `<p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">${section.caption}</p>` : ''}
                        </div>
                    `;
                    break;
                case 'cta':
                    previewHTML = `
                        <div style="padding: 15px; background: white; border-radius: 8px; border: 1px solid #e0e0e0;">
                            ${section.title ? `<h4 style="margin: 0 0 10px 0; font-size: 16px; color: #333;">${section.title}</h4>` : ''}
                            <a href="${section.buttonUrl || '#'}" style="
                                display: inline-block;
                                background: ${section.buttonColor || '#6a11cb'};
                                color: white;
                                padding: 8px 16px;
                                border-radius: 6px;
                                text-decoration: none;
                                font-weight: 600;
                                font-size: 14px;
                            ">${section.buttonText || 'Bouton'}</a>
                        </div>
                    `;
                    break;
                case 'separator':
                    previewHTML = `
                        <div style="padding: 15px; text-align: center;">
                            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 0;">
                        </div>
                    `;
                    break;
            }
            
            html += `
            <div class="section-accordion" data-id="${section.id}">
                <div class="accordion-header" onclick="homepageEditor.toggleAccordion('${section.id}')">
                    <div class="section-title">
                        <div class="drag-handle" onmousedown="event.stopPropagation();" ontouchstart="event.stopPropagation();">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="9" cy="5" r="1"></circle>
                                <circle cx="9" cy="12" r="1"></circle>
                                <circle cx="9" cy="19" r="1"></circle>
                                <circle cx="15" cy="5" r="1"></circle>
                                <circle cx="15" cy="12" r="1"></circle>
                                <circle cx="15" cy="19" r="1"></circle>
                            </svg>
                        </div>
                        <div class="section-icon">${icons[section.type] || ''}</div>
                        <span class="section-name">${this.getSectionDisplayName(section)}</span>
                        <span class="section-type">${typeNames[section.type]}</span>
                    </div>
                    <svg class="accordion-chevron" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                <div class="accordion-content">
                    ${previewHTML}
                    <div class="section-actions">
                        <button class="btn btn-edit" onclick="homepageEditor.openEditModal('${section.id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            Modifier
                        </button>
                        <button class="btn btn-delete" onclick="homepageEditor.removeSection('${section.id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                <path d="M10 11v6"></path>
                                <path d="M14 11v6"></path>
                                <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
            `;
        });
        
        container.innerHTML = html;
        
        // ✅ CRUCIAL : Réinitialiser le drag & drop après le render
        setTimeout(() => {
            if (typeof window.reinitDragDrop === 'function') {
                window.reinitDragDrop();
            }
        }, 100);
    }
    

    // Obtenir le nom d'affichage d'une section
    getSectionDisplayName(section) {
        switch(section.type) {
            case 'hero':
                return section.title || 'Bannière sans titre';
            case 'text':
                return section.title || (section.content ? section.content.substring(0, 30) + '...' : 'Texte vide');
            case 'image':
                return section.caption || (section.image ? 'Image sans légende' : 'Image sans fichier');
            case 'cta':
                return section.buttonText || 'Bouton sans texte';
            case 'separator':
                return 'Séparateur';
            default:
                return 'Élément sans nom';
        }
    }
    

    // Toggle l'accordéon
    toggleAccordion(sectionId) {
        const accordion = document.querySelector(`.section-accordion[data-id="${sectionId}"]`);
        accordion.classList.toggle('active');
    }

    // Gérer l'input de l'éditeur
    handleEditorInput() {
        const editor = document.getElementById('contentEditor');
        const text = editor.value;
        const lastChar = text[text.length - 1];
        
        if (lastChar === '#') {
            this.showSuggestions();
        } else {
            this.hideSuggestions();
        }
        
        const sendButton = document.getElementById('sendButton');
        sendButton.style.opacity = text.trim() ? '1' : '0.5';
    }

    // Gérer les touches du clavier
    handleEditorKeydown(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.addTextSection();
        } else if (event.key === 'Escape') {
            this.hideSuggestions();
        }
    }

    // Afficher les suggestions
    showSuggestions() {
        const dropdown = document.getElementById('suggestionsDropdown');
        dropdown.innerHTML = '';
        
        this.availableSuggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.innerHTML = `
                <div class="suggestion-icon">${suggestion.icon}</div>
                <div class="suggestion-content">
                    <div class="suggestion-title">${suggestion.title}</div>
                    <div class="suggestion-desc">${suggestion.description}</div>
                </div>
            `;
            item.onclick = () => this.selectSuggestion(suggestion);
            dropdown.appendChild(item);
        });
        
        dropdown.style.display = 'block';
    }

    // Cacher les suggestions
    hideSuggestions() {
        const dropdown = document.getElementById('suggestionsDropdown');
        dropdown.style.display = 'none';
    }

    // Sélectionner une suggestion
    selectSuggestion(suggestion) {
        const editor = document.getElementById('contentEditor');
        let text = editor.value;
        
        text = text.substring(0, text.lastIndexOf('#'));
        
        if (text && !text.endsWith('\n')) {
            text += '\n';
        }
        
        editor.value = text;
        this.hideSuggestions();
        this.addSectionFromSuggestion(suggestion);
    }

    // Ajouter une section à partir d'une suggestion
    addSectionFromSuggestion(suggestion) {
        const sectionId = `section_${Date.now()}`;
        let newSection = {
            id: sectionId,
            type: suggestion.type,
            order: this.homepageSections.length
        };
    
        switch(suggestion.type) {
            case 'hero':
                newSection.title = ''; // Vide par défaut
                newSection.subtitle = ''; // Vide par défaut
                newSection.image = '';
                newSection.backgroundColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                newSection.textColor = '#ffffff';
                break;
            case 'text':
                newSection.title = suggestion.key === '#titre' ? '' : ''; // Vide par défaut
                newSection.content = suggestion.key === '#texte' ? '' : ''; // Vide par défaut
                newSection.alignment = 'left';
                break;
            case 'image':
                newSection.image = '';
                newSection.caption = ''; // Vide par défaut
                newSection.alignment = 'center';
                break;
            case 'cta':
                newSection.title = ''; // Vide par défaut
                newSection.buttonText = 'Découvrir'; // Seul texte obligatoire
                newSection.buttonUrl = '#';
                newSection.buttonColor = '#6a11cb';
                break;
            case 'separator':
                newSection.type = 'separator';
                break;
        }
    
        this.homepageSections.push(newSection);
        this.renderSectionsAccordion();
        this.openEditModal(newSection.id);
    }
    
    // Ajouter une section de texte simple
    addTextSection() {
        const editor = document.getElementById('contentEditor');
        const text = editor.value.trim();
        
        if (!text) return;
        
        const sectionId = `section_${Date.now()}`;
        const newSection = {
            id: sectionId,
            type: 'text',
            content: text,
            order: this.homepageSections.length
        };
        
        this.homepageSections.push(newSection);
        this.renderSectionsAccordion();
        
        editor.value = '';
        this.hideSuggestions();
        
        setTimeout(() => {
            const newElement = document.querySelector(`[data-id="${sectionId}"]`);
            if (newElement) {
                newElement.scrollIntoView({ behavior: 'smooth' });
                newElement.classList.add('active');
            }
        }, 100);
    }

    // Ouvrir le modal d'édition
    openEditModal(sectionId) {
        const section = this.homepageSections.find(s => s.id === sectionId);
        if (!section) return;
        
        this.currentEditingSection = section;
        const modal = document.getElementById('editModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        
        modalTitle.textContent = `Éditer ${this.getSectionTypeName(section.type)}`;
        
        let content = '';
        
        switch(section.type) {
            case 'hero':
                content = this.createHeroModalContent(section);
                break;
            case 'text':
                content = this.createTextModalContent(section);
                break;
            case 'image':
                content = this.createImageModalContent(section);
                break;
            case 'cta':
                content = this.createCtaModalContent(section);
                break;
            case 'separator':
                content = this.createSeparatorModalContent(section);
                break;
        }
        
        modalContent.innerHTML = content;
        modal.style.display = 'flex';
    }

    // Fermer le modal d'édition
    closeEditModal() {
        const modal = document.getElementById('editModal');
        modal.style.display = 'none';
        this.currentEditingSection = null;
    }

    // Obtenir le nom d'un type de section
    getSectionTypeName(type) {
        const names = {
            'hero': 'Bannière',
            'text': 'Texte',
            'image': 'Image',
            'cta': 'Bouton',
            'separator': 'Séparateur'
        };
        return names[type] || 'Élément';
    }

    // Contenu modal pour Hero
    createHeroModalContent(section) {
        return `
            <div class="form-group">
                <label class="form-label">Titre</label>
                <input type="text" class="input-field" value="${section.title || ''}" 
       onchange="homepageEditor.updateCurrentSection('title', this.value)" 
       placeholder="Titre de la bannière (optionnel)">
            </div>
            <div class="form-group">
                <label class="form-label">Sous-titre</label>
                <input type="text" class="input-field" value="${section.subtitle || ''}" 
       onchange="homepageEditor.updateCurrentSection('subtitle', this.value)"
       placeholder="Sous-titre (optionnel)">
            </div>
            <div class="form-group">
                <label class="form-label">Image de fond</label>
                <button class="modal-btn modal-btn-secondary" onclick="homepageEditor.uploadImageForCurrentSection()" style="width: 100%;">
                    ${section.image ? 'Changer l\'image' : 'Ajouter une image'}
                </button>
                ${section.image ? `
                    <div style="margin-top: 10px; text-align: center;">
                        <img src="${section.image}" class="image-preview">
                    </div>
                ` : ''}
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-primary" onclick="homepageEditor.closeEditModal()">
                    Enregistrer
                </button>
                <button class="modal-btn modal-btn-secondary" onclick="homepageEditor.closeEditModal()">
                    Annuler
                </button>
            </div>
        `;
    }

    // Contenu modal pour Texte
    createTextModalContent(section) {
        return `
            <div class="form-group">
                <label class="form-label">Titre (optionnel)</label>
                <input type="text" class="input-field" value="${section.title || ''}" 
       onchange="homepageEditor.updateCurrentSection('title', this.value)" 
       placeholder="Titre (optionnel)">
            </div>
            <div class="form-group">
                <label class="form-label">Contenu</label>
                <textarea class="textarea-field" rows="4" 
          onchange="homepageEditor.updateCurrentSection('content', this.value)"
          placeholder="Votre texte ici...">${section.content || ''}</textarea>
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-primary" onclick="homepageEditor.closeEditModal()">
                    Enregistrer
                </button>
                <button class="modal-btn modal-btn-secondary" onclick="homepageEditor.closeEditModal()">
                    Annuler
                </button>
            </div>
        `;
    }

    // Contenu modal pour Image
    createImageModalContent(section) {
        return `
            <div class="form-group">
                <label class="form-label">Image</label>
                <button class="modal-btn modal-btn-secondary" onclick="homepageEditor.uploadImageForCurrentSection()" style="width: 100%;">
                    ${section.image ? 'Changer l\'image' : 'Ajouter une image'}
                </button>
                ${section.image ? `
                    <div style="margin-top: 10px; text-align: center;">
                        <img src="${section.image}" class="image-preview">
                    </div>
                ` : ''}
            </div>
            <div class="form-group">
                <label class="form-label">Légende (optionnel)</label>
                <input type="text" class="input-field" value="${section.caption || ''}" 
       onchange="homepageEditor.updateCurrentSection('caption', this.value)" 
       placeholder="Légende (optionnel)">
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-primary" onclick="homepageEditor.closeEditModal()">
                    Enregistrer
                </button>
                <button class="modal-btn modal-btn-secondary" onclick="homepageEditor.closeEditModal()">
                    Annuler
                </button>
            </div>
        `;
    }

    // Contenu modal pour CTA
    createCtaModalContent(section) {
        return `
            <div class="form-group">
                <label class="form-label">Texte du bouton</label>
                <input type="text" class="input-field" value="${section.buttonText || 'Découvrir'}" 
                       onchange="homepageEditor.updateCurrentSection('buttonText', this.value)"
                       placeholder="Texte du bouton (obligatoire)" required>
            </div>
            <div class="form-group">
                <label class="form-label">URL de destination</label>
                <input type="text" class="input-field" value="${section.buttonUrl || ''}" 
                       onchange="homepageEditor.updateCurrentSection('buttonUrl', this.value)" placeholder="https://...">
            </div>
            <div class="form-group">
                <label class="form-label">Couleur du bouton</label>
                <input type="color" class="input-field" value="${section.buttonColor || '#6a11cb'}" 
                       onchange="homepageEditor.updateCurrentSection('buttonColor', this.value)" style="height: 50px; padding: 5px;">
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-primary" onclick="homepageEditor.closeEditModal()">
                    Enregistrer
                </button>
                <button class="modal-btn modal-btn-secondary" onclick="homepageEditor.closeEditModal()">
                    Annuler
                </button>
            </div>
        `;
    }
    
    // Contenu modal pour Séparateur
    createSeparatorModalContent(section) {
        return `
            <div style="text-align: center; padding: 30px 0;">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #86868b;">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                </svg>
                <p style="color: #86868b; margin-top: 15px;">
                    Ligne de séparation entre les sections
                </p>
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="homepageEditor.closeEditModal()">
                    Fermer
                </button>
            </div>
        `;
    }

    // Mettre à jour la section en cours d'édition
    updateCurrentSection(key, value) {
        if (this.currentEditingSection) {
            this.currentEditingSection[key] = value;
            this.renderSectionsAccordion();
        }
    }

    // Upload d'image pour la section en cours
    async uploadImageForCurrentSection() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        // Sauvegarder l'ID de la section AVANT l'upload
        const sectionId = this.currentEditingSection ? this.currentEditingSection.id : null;
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            // Retrouver la section par son ID au lieu d'utiliser this.currentEditingSection
            const section = this.homepageSections.find(s => s.id === sectionId);
            if (!section) {
                alert('❌ Erreur: section introuvable');
                return;
            }
            
            try {
                const result = await uploadImageToCloudinary(file);
                
                if (result && result.url) {
                    // Mettre à jour la section directement dans le tableau
                    section.image = result.url;
                    
                    // Rafraîchir l'affichage
                    this.renderSectionsAccordion();
                    
                    alert('✅ Image uploadée avec succès !');
                    
                    // Rouvrir le modal avec la section mise à jour
                    setTimeout(() => {
                        this.openEditModal(sectionId);
                    }, 100);
                } else {
                    alert('❌ Échec de l\'upload');
                }
            } catch (error) {
                alert('❌ Erreur: ' + (error.message || 'Upload impossible'));
            }
        };
        
        input.click();
    }
    

    // Supprimer une section
    removeSection(sectionId) {
        if (!confirm('Supprimer définitivement cet élément ?')) return;
        this.homepageSections = this.homepageSections.filter(s => s.id !== sectionId);
        
        // Mettre à jour les ordres
        this.homepageSections.forEach((section, i) => {
            section.order = i;
        });
        
        this.renderSectionsAccordion();
    }

    // Sauvegarder la page d'accueil
    async saveHomepage() {
        try {
            await db.collection('config').doc('homepage').set({
                sections: this.homepageSections,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                updatedBy: auth.currentUser.email
            });
            
            alert('✅ Page enregistrée avec succès !');
        } catch (error) {
            console.error('Erreur sauvegarde:', error);
            alert('❌ Erreur lors de la sauvegarde');
        }
    }

    // Réinitialiser aux valeurs par défaut
    resetToDefault() {
        if (confirm('Voulez-vous vraiment réinitialiser à la configuration par défaut ?')) {
            this.homepageSections = this.getDefaultSections();
            this.renderSectionsAccordion();
        }
    }

    // Lier les événements
    bindEvents() {
        const editor = document.getElementById('contentEditor');
        if (editor) {
            editor.oninput = () => this.handleEditorInput();
            editor.onkeydown = (e) => this.handleEditorKeydown(e);
        }
    }
}

// Instance globale
const homepageEditor = new HomepageEditor();
