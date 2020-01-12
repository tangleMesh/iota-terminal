const express = require ("express");
const rpiWifi = require ("rpi-wifi-connection");
const ResponseHelper = require ("../helpers/response.helper");

const router = express.Router();
const wifi = new rpiWifi ();


router.get ("/networks", async (req, res) => {
    try {
        //TODO: test on rpi
        // const ssids = await wifi.scan();
        const ssids = [
            "Ehnle_Oben",
            "Ehnle_Erdgeschoss",
            "Ehnle_Keller",
            "test_" + Math.random (),
        ];
        
        return ResponseHelper.success (res, {
            ssids,
        });
    } catch (e) {
        console.error (e);
        return ResponseHelper.UnknownError (res);
    }
});



module.exports = router;