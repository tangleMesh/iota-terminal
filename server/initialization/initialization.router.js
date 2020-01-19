const express = require ("express");
const ResponseHelper = require ("../helpers/response.helper");
const InitializationController = require ("./initialization.controller");

const router = express.Router();


//Get all the available networks
router.get (
    "/device", 
    ResponseHelper.requestHandler (
        InitializationController.getDeviceInformation
    )
);

//Set up a new device-connection with the tangleMesh:api
router.post (
    "/device", 
    ResponseHelper.requestHandler (
        InitializationController.setDeviceKeys, 
        "body.connectionId"
    )
);


module.exports = router;