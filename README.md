# iota-terminal
A payment-terminal application for payments made with IOTA.

## ToDo

### Graphical Interface

- Startup-Screen / Splash ?
- Initial explanations (more details on web-interface!)
- Show Device-Id with "Next" button (device-id should be read from the raspberri pi device) [https://www.npmjs.com/package/node-machine-id]
- Type in Registration code (which you can view in the web-interface at registration process)
- Loading screen (with dynamic text!)(maybe we can use the iota-icon loading animation)
- Success screen for device setup
- No internet screen (if the device is disconnected from internet) (with link for wifi setup)
- Entering IOTA payment amount (with check button to start creating deposit address)
- Display payment details with QR-code + amount
- Success screen for payment
- Error screen for failed payment or wrong amount, …
- Screen for selecting wifi-network
- Screen for entering wifi-password
- Success screen for wifi setup
- Screen for loading software update

### Local API

- [GET] `/wifi` - return available wifi-networks [https://www.npmjs.com/package/rpi-wifi-connection]
- [POST] `/wifi` - send selected ssid + password to establish wifi connection
- [GET] `/status` - get software-version, internet-connection, server-connection, registration-status, …
- [POST] `/deposit` - create new deposit
- [GET] `/deposit/:depositId` - check if deposit has changed it's status or payment received
- [GET] `/device` - get device-informations like the device-id
- [POST] `/register` - set registrationCode and register on tangleMesh:api

### Local Businesslogic

- automatic software update
    - check for new github release
    - download of new release
    - copy to new folder
    - shutdown old application
    - start up new release

## Open Questions

- how to connect through wifi (how to input ssid and password?)