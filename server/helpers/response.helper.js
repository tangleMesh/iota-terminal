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

    static requestHandler (handlerMethod, ...parameterNames) {
        return async (req, res) => {
            try {
                let parameters = [];
                for (const parameterName of parameterNames) {
                    const parameterParts = parameterName.split (".");
                    parameters.push (
                        req [parameterParts [0]] [parameterParts [1]]
                    );
                }
                const result = await handlerMethod (...parameters);
                if (result [0] !== null) {
                    return ResponseHelper.error (res, result [0].statusCode ? result [0].details : result [0], result [0].statusCode);
                }
                return ResponseHelper.success (res, result [1].statusCode ? result [1].data : result [1], result [1].statusCode);
            } catch (e) {
                console.error (e);
                return ResponseHelper.UnknownError (res);
            } 
        };
    }

}

module.exports = ResponseHelper;