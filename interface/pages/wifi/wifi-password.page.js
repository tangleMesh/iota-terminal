import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';
import sharedStyle from '../../shared.style';
import '../../components/headline.component';
import '../../components/paragraph.component';
import '../../components/button.component';
import '../../components/input.component';

class WifiPasswordPage extends LitElement {

    constructor () {
        super ();
    }

    firstUpdated () {
        this.ssid = router.location.params.ssid;
        if (!this.ssid) {
            Router.go ("/wifi-selection");
        }
        this.loading = false;
        this.password = "";
        this.requestUpdate ();
    }

    static get styles() {
        return css`
            ${sharedStyle}
            
        `;
    }

    async submitPassword () {
        this.loading = true;
        this.requestUpdate ();

        // /networks/:ssid
        const result = await axios.post('/api/wifi/networks/' + encodeURIComponent (this.ssid), {
            password: this.password, 
        }, {
            validateStatus: () => true,
        });
        if (result.status !== 200 || result.data.success !== true) {
            return Router.go ("/message/" + encodeURIComponent ("Error happened connection to your wi-fi network. Please try it again!") + "/" + encodeURIComponent ("/wifi-selection") + "/" + encodeURIComponent ("wifi-error"));
        }
        this.loading = false;
        this.requestUpdate ();
        return Router.go ("/message/" + encodeURIComponent ("You've been successfully connected to the internet!") + "/" + encodeURIComponent ("/") + "/" + encodeURIComponent ("wifi-success"));
    }

    passwordChanged (value) {
        this.password = value;
    }

    render() {
        return html`
            <headline-component>Internet connection</headline-component>
            <paragraph-component style="margin-bottom: 20px; display: block;">You are connection with the Wi-fi network <strong>${this.ssid}</strong>. Please enter your password:</paragraph-component>
            
            <input-component style="margin-bottom: 10px; display: block;" type="text" placeholder="wi-fi password" value="${this.password}" @change="${(e) => this.passwordChanged (e.detail.value)}"></input-component>
            
            <button-component ?loading=${this.loading} secondary link="/wifi-selection">Back</button-component>
            <button-component ?loading=${this.loading} @clicked=${this.submitPassword}>Connect</button-component>
        `;
    }
}

customElements.define('wifi-password-page', WifiPasswordPage);