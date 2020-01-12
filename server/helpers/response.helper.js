class ResponseHelper {

    static _resolve (res, success, statusCode, content = {}) {
        let result = {
            status: statusCode,
            success,
        };
        if (success) {
            result.data = content;
        } else {
            result.details = content;
        }
        return res.status (statusCode).send (result);
    }

    static success (res, data = {}, statusCode = 200) {
        return ResponseHelper._resolve (res, true, statusCode, data);
    }

    static error (res, details = {}, statusCode = 400) {
        return ResponseHelper._resolve (res, false, statusCode, details);
    }

    static UnknownError (res) {
        return ResponseHelper._resolve (res, false, 500);
    }

}

module.exports = ResponseHelper;