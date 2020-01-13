import { LitElement, html, css } from 'lit-element';
import sharedStyle from '../../shared.style';
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
            this.networks = result.data.data;
            this.requestUpdate ();
        } catch (e) {
            console.log (e);
        }
    }

    static get styles() {
        return css`
            ${sharedStyle}
            .reload-button {
                display: inline-block;
                float: right;
                border: 1px solid #03A678;
                background-color: transparent;
                color: #03A678;
                font-weight: 500;
            }
        `;
    }

    render() {
        return html`
            <headline-component>Internet connection</headline-component>
            <paragraph-component>To make the IOTA terminal ready for operation, you must connect the device to the Internet either with a LAN cable or with one of the following WLAN networks.</paragraph-component>

            <hr />

            
            <button class="reload-button" @click="${this.loadWifiNetworks}">&#8635;</button>
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