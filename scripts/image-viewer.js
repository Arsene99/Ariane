// scripts/image-viewer.js

class ImageViewer {
    constructor() {
        this.currentIndex = 0;
        this.images = [];
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        this.createViewer();
        this.addStyles();
        this.addKeyboardNavigation();
        this.addOverlayClickHandler();
        this.isInitialized = true;
    }

    createViewer() {
        const viewerHTML = `
            <div id="imageViewer" class="image-viewer">
                <div class="viewer-overlay"></div>
                <div class="viewer-container">
                    <button class="viewer-close" id="viewerCloseBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    
                    <button class="viewer-nav viewer-prev" id="viewerPrevBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    
                    <div class="viewer-content">
                        <img class="viewer-image" src="" alt="">
                        <div class="viewer-counter">
                            <span class="viewer-current">1</span> / <span class="viewer-total">1</span>
                        </div>
                    </div>
                    
                    <button class="viewer-nav viewer-next" id="viewerNextBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                    
                    <div class="viewer-thumbnails"></div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', viewerHTML);
        
        document.getElementById('viewerCloseBtn').addEventListener('click', () => this.close());
        document.getElementById('viewerPrevBtn').addEventListener('click', () => this.prev());
        document.getElementById('viewerNextBtn').addEventListener('click', () => this.next());
    }

    addStyles() {
        const styles = `
            <style id="image-viewer-styles">
                .image-viewer {
                    display: none;
                    position: fixed;
                    inset: 0;
                    z-index: 999999 !important;
                    animation: fadeIn 0.3s ease;
                }

                .image-viewer.active {
                    display: block !important;
                }

                .viewer-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.95);
                    backdrop-filter: blur(10px);
                    z-index: 1;
                }

                .viewer-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 80px 20px 20px;
                    z-index: 2;
                }

                .viewer-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 50px;
                    height: 50px;
                    border: none;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 50%;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                    z-index: 10;
                }

                .viewer-close:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: rotate(90deg);
                }

                .viewer-close:active {
                    transform: rotate(90deg) scale(0.95);
                }

                .viewer-content {
                    max-width: 90vw;
                    max-height: calc(100vh - 200px);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    z-index: 5;
                }

                .viewer-image {
                    max-width: 100%;
                    max-height: calc(100vh - 250px);
                    object-fit: contain;
                    border-radius: 12px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    animation: zoomIn 0.3s ease;
                }

                .viewer-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 60px;
                    height: 60px;
                    border: none;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 50%;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                    z-index: 10;
                }

                .viewer-nav:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-50%) scale(1.1);
                }

                .viewer-nav:active {
                    transform: translateY(-50%) scale(0.95);
                }

                .viewer-prev {
                    left: 20px;
                }

                .viewer-next {
                    right: 20px;
                }

                .viewer-counter {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    padding: 8px 20px;
                    border-radius: 20px;
                    color: white;
                    font-weight: 600;
                }

                .viewer-thumbnails {
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 10px;
                    padding: 15px;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 50px;
                    max-width: 90vw;
                    overflow-x: auto;
                    z-index: 10;
                }

                .viewer-thumbnail {
                    width: 60px;
                    height: 60px;
                    border-radius: 8px;
                    cursor: pointer;
                    object-fit: cover;
                    border: 3px solid transparent;
                    transition: all 0.3s;
                    flex-shrink: 0;
                }

                .viewer-thumbnail:hover {
                    transform: scale(1.1);
                }

                .viewer-thumbnail:active {
                    transform: scale(0.95);
                }

                .viewer-thumbnail.active {
                    border-color: #8b5cf6;
                    transform: scale(1.15);
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes zoomIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @media (max-width: 768px) {
                    .viewer-container {
                        padding: 60px 10px 20px;
                    }

                    .viewer-nav {
                        width: 50px;
                        height: 50px;
                    }

                    .viewer-prev {
                        left: 10px;
                    }

                    .viewer-next {
                        right: 10px;
                    }

                    .viewer-close {
                        top: 10px;
                        right: 10px;
                    }

                    .viewer-thumbnail {
                        width: 50px;
                        height: 50px;
                    }

                    .viewer-thumbnails {
                        bottom: 10px;
                        padding: 10px;
                        gap: 8px;
                    }
                }

                @media (max-width: 480px) {
                    .viewer-nav {
                        width: 45px;
                        height: 45px;
                    }

                    .viewer-close {
                        width: 45px;
                        height: 45px;
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const viewer = document.getElementById('imageViewer');
            if (!viewer || !viewer.classList.contains('active')) return;

            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    }

    addOverlayClickHandler() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('viewer-overlay')) {
                this.close();
            }
        });
    }

    open(images, startIndex = 0) {
        if (!images || images.length === 0) return;

        this.images = images;
        this.currentIndex = startIndex;
        
        const viewer = document.getElementById('imageViewer');
        if (!viewer) return;

        viewer.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        this.updateViewer();
        this.renderThumbnails();
    }

    close() {
        const viewer = document.getElementById('imageViewer');
        if (viewer) {
            viewer.classList.remove('active');
        }
        document.body.style.overflow = '';
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateViewer();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateViewer();
    }

    goTo(index) {
        this.currentIndex = index;
        this.updateViewer();
    }

    updateViewer() {
        const img = document.querySelector('.viewer-image');
        const current = document.querySelector('.viewer-current');
        const total = document.querySelector('.viewer-total');

        if (!img || !current || !total) return;

        img.src = this.images[this.currentIndex];
        current.textContent = this.currentIndex + 1;
        total.textContent = this.images.length;

        document.querySelectorAll('.viewer-thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === this.currentIndex);
        });

        const prevBtn = document.querySelector('.viewer-prev');
        const nextBtn = document.querySelector('.viewer-next');
        if (this.images.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
        } else {
            if (prevBtn) prevBtn.style.display = 'flex';
            if (nextBtn) nextBtn.style.display = 'flex';
        }
    }

    renderThumbnails() {
        const container = document.querySelector('.viewer-thumbnails');
        if (!container) return;
        
        if (this.images.length <= 1) {
            container.style.display = 'none';
            return;
        }
        
        container.style.display = 'flex';
        container.innerHTML = this.images.map((img, i) => `
            <img src="${img}" 
                 class="viewer-thumbnail ${i === this.currentIndex ? 'active' : ''}"
                 data-index="${i}"
                 alt="Thumbnail ${i + 1}">
        `).join('');

        container.querySelectorAll('.viewer-thumbnail').forEach((thumb, i) => {
            thumb.addEventListener('click', () => this.goTo(i));
        });
    }
}

// Initialiser le viewer
let imageViewer;

function initImageViewer() {
    imageViewer = new ImageViewer();
    imageViewer.init();
    window.imageViewer = imageViewer;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageViewer);
} else {
    initImageViewer();
}

setTimeout(() => {
    if (!window.imageViewer) {
        initImageViewer();
    }
}, 500);
