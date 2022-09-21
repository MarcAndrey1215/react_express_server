const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "../public/uploads"));
    },
    filename: (req, file, callback) => {
        const fileName = Date.now() + "_" +  file.fieldname + path.extname(file.originalname);
        // 20220920114188_filename.jpg
        callback(null, fileName);
    }
});

const upload = multer({
    storage: storage
});

const imageUpload = upload.fields( [ { name: 'image' } ] );

router.post('/register', imageUpload, userController.register);
router.post('/login', userController.login);
router.get('/', userController.fetch);
router.get('/:id', userController.getUser);
router.post('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;