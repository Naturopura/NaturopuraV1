declare namespace NodeJS {
  interface Global {
    mongoose: {
      conn: any;
      promise: Promise<any> | null;
    };
  }
}

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File; // For Multer
      files?: { [fieldname: string]: File[] }; // For express-fileupload
    }
  }
}
