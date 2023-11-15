var imgUploaderService = require('../services/imgUploader.service');
const Formidable = require('formidable')
const bluebird = require('bluebird')
var fs = require('fs');
var fs = bluebird.promisifyAll(require('fs'))
var { join } = require('path');
var cloudinary = require('cloudinary');
cloudinary.config({ cloud_name: 'ds5rexrjn', api_key: '118194823963964', api_secret: 'VrXD9lhgECWhQRk1p5Y1O_BfYIg' });

exports.uploadFiles = async function (req, res) {
    let form = new Formidable.IncomingForm();
    const folder = process.env.UPLOAD_DIR;
    form.multiples = false;
    form.uploadDir = folder;
    form.maxFileSize = 50 * 1024 * 1024; // 50 MB
    const folderCreationResult = await checkCreateUploadsFolder(folder);
    if (!folderCreationResult) { return res.json({ ok: false, msg: "The uploads folder does't exists and couldn't be created." }) }

    form.parse(req, async (err, fields, files) => { 
        let newFile;
        if (err) { console.log('Error parsing the incoming form.', err); return res.json({ ok: false, msg: 'Error passing the incoming form.' }); }
        const file = files.files;
        if (!checkAcceptedExtensions(file)) { console.log('The received file is not a valid type.'); return res.json({ ok: false, msg: 'The sent file is not a valid type.' }); }
        const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'));
        newFile = fileName;
        try { await fs.renameAsync(file.path, join(folder, fileName)) }
        catch (e) {
            console.log('Error uploading the file');
            try { await fs.unlinkAsync(file.path) } catch (e) { }
            return res.json({ ok: false, msg: 'Error uploading the file' })
        }
        
        res.json({ ok: true, msg: 'Files uploaded succesfully!', files: file });
    })
}
exports.uploadToCloud = async function (req, res) {
    try {
        cloudinary.uploader.upload(process.env.UPLOAD_DIR + req.body.name, function (result) {
            res.json({ ok: true, msg: 'Files uploaded to cloud succesfully!', result: result });
        });
        //let response = await imgUploaderService.cloudinaryUpload(req.body.name);
        //console.log(response)
        //return res.json({ ok: true, msg: 'Files uploaded to cloud succesfully!', response: response });
    } catch (e) { console.log(e); return res.status(400).json({ status: 400, message: "Upload to cloud was Unsuccesfull" }) }
}

async function checkCreateUploadsFolder(uploadsFolder) {
    try { await fs.statAsync(uploadsFolder) }
    catch (e) {
        if (e && e.code == 'ENOENT') {
            console.log('The uploads folder doesn\'t exist, creating a new one.')
            try { await fs.mkdirAsync(uploadsFolder) }
            catch (err) { console.log('Error creating the uploads folder.'); return false; }
        } else { console.log('Error finding the uploads folder.'); return false; }
    }
    return true
}
function checkAcceptedExtensions(file) {
    const type = file.type.split('/').pop();
    const accepted = ['jpeg', 'jpg', 'png', 'gif', 'pdf', 'webp'];
    if (accepted.indexOf(type) == -1) { return false; }
    return true;
}