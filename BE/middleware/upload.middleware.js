const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

let streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};

const uploadCloud = async (buffer) => {
    let result = await streamUpload(buffer);
    return result.secure_url;
}

module.exports = async (req, res, next) => {
    if (req.file) {
        const result = await uploadCloud(req.file.buffer);
        req.body[req.file.fieldname] = result;
        console.log(result);
    }
    next();
}