const express = require ("express");
const rpiWifi = require ("rpi-wifi-connection");
const ResponseHelper = require ("../helpers/response.helper");

const router = express.Router();
const wifi = new rpiWifi ();


router.get ("/networks", async (req, res) => {
    try {
        //TODO: test on rpi
        // const ssids = await wifi.scan();
        let nr = 1;
        const ssids = [
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
        
        return ResponseHelper.success (res, {
            ssids,
        });
    } catch (e) {
        console.error (e);
        return ResponseHelper.UnknownError (res);
    }
});



module.exports = router;