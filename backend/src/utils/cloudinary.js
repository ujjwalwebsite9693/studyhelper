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
        if (error) {
          // Cloudinary's own size-limit rejection reads like
          // "File size too large. Got 16213565. Maximum is 10485760." —
          // technically correct but confusing to see in the app.
          if (/maximum is/i.test(error.message || '')) {
            return reject(new Error(
              "This PDF is over Cloudinary's free-plan limit of 10MB. Compress it first — " +
              'try ilovepdf.com/compress-pdf or Smallpdf — then upload the smaller file.'
            ));
          }
          return reject(error);
        }
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

// Same idea as uploadPdfBuffer, but for the Documents section (bonafide,
// forms, fee structure, etc.) where the admin might upload a PDF, ZIP,
// DOC/DOCX, XLS/XLSX, or an image — so this keeps the original extension
// instead of forcing .pdf, and lets Cloudinary auto-detect the resource type.
function uploadFileBuffer(buffer, filename) {
  return new Promise((resolve, reject) => {
    const ext = (filename.match(/\.[a-zA-Z0-9]+$/) || [''])[0];
    const base = filename.replace(/\.[a-zA-Z0-9]+$/, '').replace(/\s+/g, '_');
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: 'sbte-portal/documents',
        public_id: base,
      },
      (error, result) => {
        if (error) {
          if (/maximum is/i.test(error.message || '')) {
            return reject(new Error(
              "This file is over Cloudinary's free-plan limit of 10MB. Compress it first, then upload again."
            ));
          }
          return reject(error);
        }
        resolve({ url: result.secure_url, publicId: result.public_id, resourceType: result.resource_type, extension: ext.replace('.', '').toUpperCase() });
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

module.exports = { uploadPdfBuffer, deleteRawAsset, uploadFileBuffer };
