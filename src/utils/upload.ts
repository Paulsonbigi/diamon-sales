import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import HttpException from "../exceptions/HttpException"; 

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECURITY_KEY
});
const s3 = new aws.S3();
  
const multerFilter = (req:any, file: any, cb: any) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    } else {
        return cb(new HttpException(400, "Please upload an image of type, jpg/jpeg/png"), false);
    }
}
const Upload = multer({
    fileFilter:multerFilter,
    storage: multerS3({
      s3: s3,
      bucket: `${process.env.AWS_BUCKET_NAME}`,
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname})
      },
      key: (req, file, cb) => {
        cb(null, Date.now().toString() + file.originalname)
      }
    })
  })

export default Upload;