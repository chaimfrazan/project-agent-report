import multer from "multer";

function createMulter(extensions, storageType) {
    return multer({
        storage: typeof storageType === 'string' ? multer.diskStorage({
            destination: (req, file, cb) => cb(null, storageType),
            filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
        }) : storageType,
        
        fileFilter: (req, file, cb) => {
            const include = extensions.some(ext => 
                file.originalname.toLowerCase().endsWith(ext.toLowerCase())
            );
            if (include) {
                cb(null, true);
            } else {
                cb(new Error(`Only ${extensions.join(', ')} files are allowed!`), false);
            }
        },
        limits: { fileSize: 1024 ** 2 * 5 } // 5MB
    });
}


export const csvUpload = createMulter(['.csv'], multer.memoryStorage());
const imageUpload = createMulter(['.png', '.jpg', '.jpeg'], 'uploads/'); // שים לב לנקודה בפורמטים

export default imageUpload;
