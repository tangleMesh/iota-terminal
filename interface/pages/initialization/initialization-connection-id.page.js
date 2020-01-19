import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';
import sharedStyle from '../../shared.style';
import '../../components/headline.component';
import '../../components/paragraph.component';
import '../../components/list.component';
import '../../components/button.component';
import '../../components/input.component';

class InitializationConnectionIdPage extends LitElement {

    constructor () {
        super ();
        this.connectionId = "";
        this.loading = false;
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

    async connectionIdChanged (connectionId) {
        this.connectionId = connectionId;
    }

    async setUpConnection () {
        this.loading = true;
        this.requestUpdate ();

        // /networks/:ssid
        const result = await axios.post('/api/initialization/device', {
            connectionId: this.connectionId, 
        }, {
            validateStatus: () => true,
        });

        if (result.status !== 200 || result.data.success !== true) {
            return Router.go ("/message/" + encodeURIComponent ("Error happened connecting your device to the tangleMesh:api. Please try it again!") + "/" + encodeURIComponent ("/initialization/device-id") + "/" + encodeURIComponent ("device-error"));
        }
        this.loading = false;
        this.requestUpdate ();
        return Router.go ("/message/" + encodeURIComponent ("You've been successfully connected to the tangleMesh:api!") + "/" + encodeURIComponent ("/") + "/" + encodeURIComponent ("device-success"));
    }

    render() {
        return html`
            <headline-component>Device initialization</headline-component>
            <paragraph-component>You're nearly done initializing your device. Just type in the code from your tangleMesh dashboard to establish a connection.</paragraph-component>

            <input-component style="margin-bottom: 10px; display: block;" type="text" placeholder="connection-id" value="${this.connectionId}" @change="${(e) => this.connectionIdChanged (e.detail.value)}"></input-component>
            <button-component ?loading=${this.loading} @clicked=${this.setUpConnection}>Initialize</button-component>
        `;
    }
}

customElements.define('initialization-connection-id-page', InitializationConnectionIdPage);