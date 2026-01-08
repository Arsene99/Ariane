const themesManager = {
    pickrInstances: {},
    currentTheme: 'light',
    hasChanges: false,
    
    defaultValues: {
        light: {
            primaryColor: '#6a11cb',
            backgroundColor: '#ffffff',
            gradientStart: '#6a11cb',
            gradientEnd: '#2575fc'
        },
        dark: {
            primaryColor: '#8b5cf6',
            backgroundColor: '#1a1a1a',
            gradientStart: '#8b5cf6',
            gradientEnd: '#3b82f6'
        }
    },
    
    currentValues: {
        light: {},
        dark: {}
    },
    
    async init() {
        // Empêcher la navbar de modifier les thèmes sur cette page
        window.THEMES_EDITING_MODE = true;
        
        await this.loadSavedThemes();
        this.initTabs();
        this.initColorPickers();
        this.initEventListeners();
        // NE PLUS appeler updatePreview() - plus d'aperçu temps réel
    },
    
    async loadSavedThemes() {
        try {
            const doc = await db.collection('config').doc('themes').get();
            
            console.log('=== CHARGEMENT DES THÈMES ===');
            
            if (doc.exists) {
                const themes = doc.data();
                console.log('Thèmes chargés:', JSON.stringify(themes, null, 2));
                
                this.currentValues = {
                    light: themes.light ? {...themes.light} : {...this.defaultValues.light},
                    dark: themes.dark ? {...themes.dark} : {...this.defaultValues.dark}
                };
            } else {
                console.log('Aucun thème trouvé, valeurs par défaut');
                this.currentValues = {
                    light: {...this.defaultValues.light},
                    dark: {...this.defaultValues.dark}
                };
            }
            
            console.log('CurrentValues:', JSON.stringify(this.currentValues, null, 2));
            
        } catch (error) {
            console.error('Erreur chargement thèmes:', error);
            this.currentValues = {
                light: {...this.defaultValues.light},
                dark: {...this.defaultValues.dark}
            };
        }
    },
    
    initTabs() {
        const tabs = document.querySelectorAll('.theme-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                document.querySelectorAll('.theme-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${tabId}Theme`).classList.add('active');
                
                this.currentTheme = tabId;
            });
        });
    },
    
    initColorPickers() {
        const colorInputs = document.querySelectorAll('.color-input');
        
        colorInputs.forEach(input => {
            const previewId = input.id.replace('Input', 'Preview');
            const preview = document.getElementById(previewId);
            
            const mode = input.id.includes('light') ? 'light' : 'dark';
            let colorType = '';
            
            if (input.id.includes('Primary')) {
                colorType = 'primaryColor';
            } else if (input.id.includes('Bg') && !input.id.includes('Gradient')) {
                colorType = 'backgroundColor';
            } else if (input.id.includes('GradientStart')) {
                colorType = 'gradientStart';
            } else if (input.id.includes('GradientEnd')) {
                colorType = 'gradientEnd';
            }
            
            const savedColor = this.currentValues[mode][colorType] || this.defaultValues[mode][colorType];
            
            console.log(`Init ${input.id}: ${savedColor}`);
            
            input.value = savedColor;
            preview.style.background = savedColor;
            
            const pickr = Pickr.create({
                el: preview,
                theme: 'classic',
                default: savedColor,
                swatches: [
                    '#6a11cb', '#2575fc', '#8b5cf6', '#3b82f6',
                    '#10b981', '#ef4444', '#f59e0b', '#8b5cf6',
                    '#ffffff', '#1a1a1a', '#f3f4f6', '#111827'
                ],
                components: {
                    preview: true,
                    opacity: false,
                    hue: true,
                    interaction: {
                        hex: true,
                        rgba: false,
                        hsva: false,
                        input: true,
                        clear: false,
                        save: true
                    }
                }
            });
            
            pickr.on('save', (color) => {
                if (!color) return;
                const hexColor = color.toHEXA().toString();
                input.value = hexColor;
                preview.style.background = hexColor;
                this.updateCurrentValues(input.id, hexColor);
                this.onColorChange();
                pickr.hide();
            });
            
            pickr.on('change', (color) => {
                if (!color) return;
                const hexColor = color.toHEXA().toString();
                preview.style.background = hexColor;
            });
            
            this.pickrInstances[input.id] = pickr;
            
            input.addEventListener('input', (e) => {
                const color = e.target.value;
                if (this.isValidColor(color)) {
                    preview.style.background = color;
                    if (pickr) {
                        pickr.setColor(color);
                    }
                    this.updateCurrentValues(e.target.id, color);
                    this.onColorChange();
                }
            });
            
            input.addEventListener('change', (e) => {
                const color = e.target.value;
                if (!this.isValidColor(color)) {
                    e.target.value = savedColor;
                    preview.style.background = savedColor;
                    if (pickr) {
                        pickr.setColor(savedColor);
                    }
                } else {
                    this.updateCurrentValues(e.target.id, color);
                    this.onColorChange();
                }
            });
        });
    },
    
    updateCurrentValues(inputId, color) {
        const mode = inputId.includes('light') ? 'light' : 'dark';
        
        if (inputId.includes('Primary')) {
            this.currentValues[mode].primaryColor = color;
        } else if (inputId.includes('Bg') && !inputId.includes('Gradient')) {
            this.currentValues[mode].backgroundColor = color;
        } else if (inputId.includes('GradientStart')) {
            this.currentValues[mode].gradientStart = color;
        } else if (inputId.includes('GradientEnd')) {
            this.currentValues[mode].gradientEnd = color;
        }
        
        console.log(`Mis à jour: ${inputId} = ${color}`);
        console.log('CurrentValues:', JSON.stringify(this.currentValues, null, 2));
    },
    
    initEventListeners() {
        document.getElementById('resetBtn').addEventListener('click', () => {
            if (confirm('Voulez-vous vraiment réinitialiser tous les thèmes aux valeurs par défaut ?')) {
                this.resetToDefaults();
            }
        });
        
        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveThemes();
        });
    },
    
    onColorChange() {
        this.hasChanges = true;
        document.getElementById('saveBtn').disabled = false;
        // NE PLUS appeler updatePreview()
    },
    
    lightenDarkenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        
        return "#" + (
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 1 ? 0 : B) : 255)
        ).toString(16).slice(1);
    },
    
    isValidColor(color) {
        const s = new Option().style;
        s.color = color;
        return s.color !== '';
    },
    
    resetToDefaults() {
        this.currentValues = {
            light: {...this.defaultValues.light},
            dark: {...this.defaultValues.dark}
        };
        
        ['light', 'dark'].forEach(mode => {
            Object.keys(this.defaultValues[mode]).forEach(colorType => {
                let inputId = '';
                if (colorType === 'primaryColor') inputId = `${mode}PrimaryInput`;
                else if (colorType === 'backgroundColor') inputId = `${mode}BgInput`;
                else if (colorType === 'gradientStart') inputId = `${mode}GradientStartInput`;
                else if (colorType === 'gradientEnd') inputId = `${mode}GradientEndInput`;
                
                const input = document.getElementById(inputId);
                const preview = document.getElementById(inputId.replace('Input', 'Preview'));
                const color = this.defaultValues[mode][colorType];
                
                if (input && preview) {
                    input.value = color;
                    preview.style.background = color;
                    if (this.pickrInstances[inputId]) {
                        this.pickrInstances[inputId].setColor(color);
                    }
                }
            });
        });
        
        this.hasChanges = true;
        document.getElementById('saveBtn').disabled = false;
    },
    
    async saveThemes() {
        try {
            console.log('=== SAUVEGARDE ===');
            console.log('CurrentValues:', JSON.stringify(this.currentValues, null, 2));
            
            const themes = {
                light: {
                    primaryColor: this.currentValues.light.primaryColor,
                    backgroundColor: this.currentValues.light.backgroundColor,
                    gradientStart: this.currentValues.light.gradientStart,
                    gradientEnd: this.currentValues.light.gradientEnd
                },
                dark: {
                    primaryColor: this.currentValues.dark.primaryColor,
                    backgroundColor: this.currentValues.dark.backgroundColor,
                    gradientStart: this.currentValues.dark.gradientStart,
                    gradientEnd: this.currentValues.dark.gradientEnd
                }
            };
            
            console.log('À sauvegarder:', JSON.stringify(themes, null, 2));
            
            // Vérification
            let hasUndefined = false;
            ['light', 'dark'].forEach(mode => {
                Object.keys(themes[mode]).forEach(key => {
                    if (!themes[mode][key]) {
                        console.error(`❌ ${mode}.${key} est undefined!`);
                        hasUndefined = true;
                    }
                });
            });
            
            if (hasUndefined) {
                alert('Erreur: Certaines couleurs ne sont pas définies.');
                return;
            }
            
            // Sauvegarde
            localStorage.setItem('cachedThemes', JSON.stringify(themes));
            await db.collection('config').doc('themes').set(themes);
            
            console.log('✅ Sauvegardé');
            
            const verifyDoc = await db.collection('config').doc('themes').get();
            console.log('✅ Vérifié:', JSON.stringify(verifyDoc.data(), null, 2));
            
            this.hasChanges = false;
            document.getElementById('saveBtn').disabled = true;
            
            alert('Thèmes enregistrés avec succès ! Les changements seront visibles après avoir basculé entre les modes clair/sombre.');
            
            window.location.href = 'dashboard.html';
            
        } catch (error) {
            console.error('❌ Erreur sauvegarde:', error);
            alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
        }
    }
};

window.themesManager = themesManager;
