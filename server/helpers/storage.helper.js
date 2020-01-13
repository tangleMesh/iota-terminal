const low = require("lowdb");
const path = require ("path");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(path.resolve (__dirname, "../storage.json"));
const db = low(adapter);

class StorageHelper {

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

}

module.exports = StorageHelper;