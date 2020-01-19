const StorageHelper = require ("../helpers/storage.helper");
const ResponseHelper = require ("../helpers/response.helper");
const rpiWifi = require ("rpi-wifi-connection");

const wifi = new rpiWifi ();

class WifiController {

    static async resolveGetNetworks () {
        return [null, await WifiController.getNetworkSSIDs ()];
    }

    static async resolveSetUpNetwork (ssid, password) {
        //Try to connect to the wifi network
        if (!(await WifiController.conenctToNetwork (ssid, password))) {
            return ["Error connecting to the wifi network specified. Please check your password again."];
        }
        //Save wifi-credentials
        StorageHelper.WifiSSID = ssid;
        StorageHelper.WifiPassword = password;
        return [null, {
            ssid,
            message: "Connected successfully",
        }];
    }

    static async getNetworkSSIDs () {
        //TODO: test on rpi
        try {
        // return await wifi.scan();
        let nr = 1;
        return [
            (nr++) + "_" + "Ehnle_Oben",
            (nr++) + "_" +"Ehnle_Erdgeschoss",
            (nr++) + "_" +"Ehnle_Keller",
            (nr++) + "_" +"test_" + Math.random (),
            (nr++) + "_" +"test_" + Math.random (),
            (nr++) + "_" +"test_" + Math.random (),
            (nr++) + "_" +"test_" + Math.random (),
            (nr++) + "_" +"test_" + Math.random (),
            (nr++) + "_" +"test_" + Math.random (),
            (nr++) + "_" +"test_" + Math.random (),
            (nr++) + "_" +"test_" + Math.random (),
            (nr++) + "_" +"test_" + Math.random (),
            (nr++) + "_" +"test_" + Math.random (),
            (nr++) + "_" +"test_" + Math.random (),
            (nr++) + "_" +"test_" + Math.random (),
            (nr++) + "_" +"test_" + Math.random (),
            (nr++) + "_" +"test_" + Math.random (),
            (nr++) + "_" +"test_" + Math.random (),
            (nr++) + "_" +"test_" + Math.random (),
            (nr++) + "_" +"test_" + Math.random (),
        ];
        } catch (e) {
            console.error (e);
            return [];
        }
    }

    static async conenctToNetwork (ssid, password) {
        try {
            //TODO: test on rpi
            // await wifi.connect({
            //     ssid, 
            //     psk: password,
            // });
            return true;
        } catch (e) {
            console.error (e);
            return false;
        }
    }

    static async getNetworkStatus () {
        try {
            // { ssid: 'Julia', ip_address: '10.0.1.189' }
            return await wifi.getStatus ();
        } catch (e) {
            console.error (e);
            return null;
        }
    }

    static async isNetworkConnected () {
        try {
            // true / false
            return await wifi.getState ();
        } catch (e) {
            console.error (e);
            return false;
        }
    }

}

module.exports = WifiController;