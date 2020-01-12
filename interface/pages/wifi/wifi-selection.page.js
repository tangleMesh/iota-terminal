import { LitElement, html } from 'lit-element';
import '../../components/headline.component';
import '../../components/paragraph.component';
import '../../components/list.component';

class WifiSelectionPage extends LitElement {

    constructor () {
        super ();
        this.networks = [];
        this.loadWifiNetworks ();
    }

    async loadWifiNetworks () {
        try {
            const result = await axios.get('/api/wifi/networks');
            this.networks = result.data.data.ssids;
            this.requestUpdate ();
        } catch (e) {
            console.log (e);
        }
    }

    render() {
        return html`
            <headline-component>Internet connection</headline-component>
            <paragraph-component>To make the IOTA terminal ready for operation, you must connect the device to the Internet either with a LAN cable or with one of the following WLAN networks.</paragraph-component>

            <hr />

            <button @click="${this.loadWifiNetworks}">Reload</button>

            <list-component title="Wi-fi networks">
                ${this.networks.map (network => {
                    return html`
                        <list-item-component link="/wifi-password/${encodeURIComponent (network)}">${network}</list-item-component>
                    `;
                })}
            </list-component>
        `;
    }
}

customElements.define('wifi-selection-page', WifiSelectionPage);