import { html, css } from 'lit-element';
import { Router } from '@vaadin/router';
import IotaTerminalElement from "../../IotaTerminal.element";
import sharedStyle from '../../shared.style';
import '../../components/headline.component';
import '../../components/paragraph.component';
import '../../components/button.component';
import '../../components/input.component';

class PaymentAmountPage extends IotaTerminalElement {

    constructor () {
        super ();
        this.resetAmount ();
        this.amount = "0.00";
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

    async amountChanged (amount) {

        if (amount.length === 0) {
            this.resetAmount ();
            return;
        }

        // Get last character that was input, if one was removed = "-"
        let lastInputCharacter = amount.substr (amount.length - 1);
        if (amount.length < this.previousAmount.length) {
            lastInputCharacter = "-";
        } 

        // Remove .00 from amount, if we are not in decmials
        if (!this.inDecimals && lastInputCharacter !== "-") {
            // Remove .00 from amount, because we are not in decimals
            amount = amount.substr (0, amount.length - 4) + lastInputCharacter;
        } else if (!this.inDecimals && amount.substr (amount.length - 2) === ".0") {
            amount = amount.substr (0, amount.length - 3);
        }

        // Check if we are in decimals
        if (lastInputCharacter === ".") {
            this.inDecimals = true;
        }
        if (amount.indexOf ('.') < 0) {
            this.inDecimals = false;
        }

        // Add the trailing .00 again at the end of the input
        if (!this.inDecimals && amount.length > 0) {
            // If last input was a number, simply add the .00 at the end
            if (lastInputCharacter !== "." && lastInputCharacter !== ",") {
                amount += ".00";
            }
        }

        // Remove all "." and "," characters from string, that are in decimal-part
        if (this.inDecimals) {
            let amountDecimals = amount.split (".");
            amount = amountDecimals.shift () + "." + (amountDecimals.join ("").split (",")).join("");
        }

        this.previousAmount = this.amount;
        this.amount = amount;        
        this.requestUpdate ();
    }

    async amountReset () {
        if (this.amount === "0.00") {
            this.resetAmount ();
            this.requestUpdate ();
        }
    }

    resetAmount () {
        this.amount = "";
        this.previousAmount = "";
        this.inDecimals = false;
    }

    async createDepositAddress () {
        this.loading = true;
        this.requestUpdate ();

        // /networks/:ssid
        const result = await axios.post('/api/payment/generate-address', {
            amount: this.amount,
        }, {
            validateStatus: () => true,
        });

        if (result.status !== 200 || result.data.success !== true) {
            return Router.go ("/message/" + encodeURIComponent ("Error happened creating a deposit address. Please try it again!") + "/" + encodeURIComponent ("/payment/amount") + "/" + encodeURIComponent ("error"));
        }
        this.loading = false;
        this.requestUpdate ();
        return Router.go ("/payment/address");
    }

    render() {
        return html`
            <headline-component>IOTA payment</headline-component>
            <paragraph-component>Simply input the amount in <strong>Mi</strong> you want to receive in order to create a deposit address.</paragraph-component>

            <input-component 
                style="margin-bottom: 10px; display: block;" 
                type="text" 
                layout="number"
                placeholder="IOTA amount (Mi)" 
                value="${this.amount}" 
                @click=${(e => this.amountReset ())}
                @change="${(e) => this.amountChanged (e.detail.value)}"
            ></input-component>
            <button-component ?loading=${this.loading} @clicked=${this.createDepositAddress}>Create address</button-component>
        `;
    }
}

customElements.define('payment-amount-page', PaymentAmountPage);