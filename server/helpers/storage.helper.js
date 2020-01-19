const low = require("lowdb");
const path = require ("path");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(path.resolve (__dirname, "../storage.json"));
const db = low(adapter);

class StorageHelper {

    // -- Wifi details --

    static get WifiSSID () {
        return db.get ('wifi.ssid').value ();
    }

    static set WifiSSID (value) {
        db.set ('wifi.ssid', value).write ();
    }

    static get WifiPassword () {
        return db.get ('wifi.password').value ();
    }

    static set WifiPassword (value) {
        db.set ('wifi.password', value).write ();
    }


    // -- Device details --

    static set DeviceId (value) {
        db.set ('device.deviceId', value).write ();
    }

    static get DeviceId () {
        return db.get ('device.deviceId').value ();
    }

    static set ConnectionId (value) {
        db.set ('device.connectionId', value).write ();
    }

    static get ConnectionId () {
        return db.get ('device.connectionId').value ();
    }

    static set ConnectionSecret (value) {
        db.set ('device.connectionSecret', value).write ();
    }

    static get ConnectionSecret () {
        return db.get ('device.connectionSecret').value ();
    }

}

module.exports = StorageHelper;