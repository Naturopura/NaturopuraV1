"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const env = (0, envalid_1.cleanEnv)(process.env, {
    NODE_ENV: (0, envalid_1.str)({ default: "dev" }),
    PORT: (0, envalid_1.num)({ default: 4000 }),
    DATABASE_HOST_NAME: (0, envalid_1.str)({ default: "mysql" }),
    DATABASE_USER_NAME: (0, envalid_1.str)({ default: "root" }),
    DATABASE_USER_PASSWORD: (0, envalid_1.str)({ default: "root" }),
    SERVICE_DATABASE_NAME: (0, envalid_1.str)({ default: "usersDb" }),
    //   PRODUCT_SERVICE_DATABASE_NAME:str(),
    //   PRODUCT_DATABASE_USER_NAME:str(),
    //   PRODUCT_DATABASE_USER_PASSWORD:str(),
    TOKEN_SECRET: (0, envalid_1.str)({
        default: "7ef521015a24ccf37363fedaf978bd2b7845b47e6c8301d91e866ae474726b8296aba5040e42773c3bd17c0f77971fd7a43488e8f7a994e297bad95d746b4d9d",
    }),
    //   AWS_S3_REGION: str(),
    //   AWS_S3_ACCESS_KEY_ID: str(),
    //   AWS_S3_SECRET_ACCESS_KEY: str(),
    //   AWS_S3_BUCKET_NAME:str()
});
exports.default = env;
