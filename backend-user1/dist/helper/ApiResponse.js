"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    constructor(success, message, responseType, data = null) {
        this.success = success;
        this.message = message;
        this.responseType = responseType;
        this.data = data;
    }
    static success(message, data = null, responseType = "SUCCESS") {
        return new ApiResponse(true, message, responseType, data);
    }
    static error(message, responseType = "ERROR", data = null) {
        return new ApiResponse(false, message, responseType, data);
    }
}
exports.default = ApiResponse;
