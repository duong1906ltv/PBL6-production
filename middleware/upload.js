import multer from "multer";
import path from "path";
import moment from "moment";

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images/"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + moment.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

export default upload;