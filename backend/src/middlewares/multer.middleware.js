import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

// console.log("Multer middleware loaded", storage);
const upload = multer({ storage });
console.log("Upload middleware created", upload.storage);
export { upload };
