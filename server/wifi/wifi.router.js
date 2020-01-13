const express = require ("express");
const ResponseHelper = require ("../helpers/response.helper");
const WifiController = require ("./wifi.controller");

const router = express.Router();


//Get all the available networks
router.get (
    "/networks", 
    ResponseHelper.requestHandler (
        WifiController.resolveGetNetworks
    )
);

//Set up a new wifi-connection
router.post (
    "/networks/:ssid", 
    ResponseHelper.requestHandler (
        WifiController.resolveSetUpNetwork, 
        "params.ssid", 
        "body.password"
    )
);



module.exports = router;