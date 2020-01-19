import { LitElement, html, css } from 'lit-element';
import sharedStyle from '../../shared.style';
import '../../components/headline.component';
import '../../components/paragraph.component';
import '../../components/list.component';

class InitializationDeviceIdPage extends LitElement {

    constructor () {
        super ();
        this.deviceId = "";
        this.loadDeviceInformation ();
    }

    async loadDeviceInformation () {
        try {
            const result = await axios.get('/api/initialization/device');
            this.deviceId = result.data.data.deviceId;
            this.requestUpdate ();
        } catch (e) {
            console.log (e);
        }
    }

    static get styles() {
        return css`
            ${sharedStyle}
            pre {
                font-family: 'Ubuntu', sans-serif;
                font-weight: 700;
                font-size: 22px;
                text-align: center;
                line-height: 60px;
                background-color: #F2F2F2;
            }
            i {
                font-family: 'Ubuntu', sans-serif;
                font-size: 12px;
                font-weight: 300;
                text-align: center;
                display: block;
                font-size: 10px;
            }
        `;
    }

    render() {
        return html`
            <headline-component>Device initialization</headline-component>
            <paragraph-component>In order to initialize your IOTA-Terminal, you have to connect this device with the tangleMesh:api. Therefore log into your tangleMesh dashboard and add a new terminal. Afterwards you are asked to enter the following code:</paragraph-component>

            <pre>${this.deviceId}</pre>

            <i>You will be automatically be redirected to the next step.</i>
        `;
    }
}

customElements.define('initialization-device-id-page', InitializationDeviceIdPage);