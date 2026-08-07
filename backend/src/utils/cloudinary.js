const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Uploads a PDF buffer to Cloudinary as a "raw" resource (Cloudinary treats
// non-image files this way) and returns { url, publicId }.
function uploadPdfBuffer(buffer, filename) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: 'sbte-portal/pdfs',
        public_id: filename.replace(/\.pdf$/i, '').replace(/\s+/g, '_'),
        format: 'pdf',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

function deleteRawAsset(publicId) {
  if (!publicId) return Promise.resolve();
  return cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
}

module.exports = { uploadPdfBuffer, deleteRawAsset };
