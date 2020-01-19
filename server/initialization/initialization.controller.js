const StorageHelper = require ("../helpers/storage.helper");

class InitializationController {

    static async getDeviceInformation () {
        try {

            //TODO: fetch unique device-id from tangleMesh:api
            const deviceId = "1546 - 4645 - 5834";
            StorageHelper.DeviceId = deviceId;

            return [null, {
                statusCode: 200,
                data: {
                    deviceId,
                }
            }];

        } catch (e) {
            console.error (e);
            return [{
                statusCode: 500,
                details: {
                    error: e,
                }
            }, null];
        }
    }

    static async setDeviceKeys (connectionId) {
        try {

            //TODO: check, if connectionId is valid with StorageHelper.DeviceId
            StorageHelper.ConnectionId = connectionId;
            //TODO: save fetched api-Key from tangleMesh:api
            StorageHelper.ConnectionSecret = "apiKey";

            return [null, {
                statusCode: 200,
                success: true,
            }];

        } catch (e) {
            console.error (e);
            return [{
                statusCode: 500,
                details: {
                    error: e,
                }
            }, null];
        }
    }

}

module.exports = InitializationController;