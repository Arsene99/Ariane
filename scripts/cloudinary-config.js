// scripts/cloudinary-config.js

const cloudinaryConfig = {
    cloudName: 'dlhng4hd9',
    apiKey: '218915746738668',
    uploadPreset: 'ariane'
};

// Upload une image vers Cloudinary
async function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
    formData.append('cloud_name', cloudinaryConfig.cloudName);
    
    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return {
            url: data.secure_url,
            publicId: data.public_id
        };
    } catch (error) {
        console.error('Erreur upload Cloudinary:', error);
        throw error; // Important : relancer l'erreur au lieu de retourner null
    }
}

// Supprime une image de Cloudinary
async function deleteImageFromCloudinary(publicId) {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = await generateSignature(publicId, timestamp);
        
        const formData = new FormData();
        formData.append('public_id', publicId);
        formData.append('signature', signature);
        formData.append('api_key', cloudinaryConfig.apiKey);
        formData.append('timestamp', timestamp);
        
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/destroy`,
            {
                method: 'POST',
                body: formData
            }
        );
        
        return await response.json();
    } catch (error) {
        console.error('Erreur suppression:', error);
        return null;
    }
}

// Génère une signature pour l'API Cloudinary
async function generateSignature(publicId, timestamp) {
    // Note: En production, cette signature devrait être générée côté serveur
    // Pour le développement, vous pouvez utiliser un endpoint backend
    const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}`;
    // Retourne une signature factice - à remplacer par un appel serveur
    return 'signature_from_server';
}



