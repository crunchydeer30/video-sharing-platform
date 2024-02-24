import multer from 'multer';

export const UPLOAD_PATH = './uploads';

const storage = multer.diskStorage({
  destination: UPLOAD_PATH,
  filename: (_req, file, cb) => {
    cb(null, file.originalname + Date.now());
  }
});

export const upload = multer({ storage });

export default upload;
