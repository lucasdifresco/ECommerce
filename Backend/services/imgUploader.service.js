var cloudinary = require('cloudinary');
cloudinary.config({ cloud_name: 'ds5rexrjn', api_key: '118194823963964', api_secret: 'VrXD9lhgECWhQRk1p5Y1O_BfYIg' });
exports.cloudinaryUpload = async function (imgName)
{
    cloudinary.uploader.upload(process.env.UPLOAD_DIR + imgName, function (result) { return result; });
}