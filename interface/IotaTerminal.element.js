import { LitElement, html, css } from 'lit-element';

class IotaTerminalElement extends LitElement {

    getElement (elementId) {
        return this.shadowRoot.getElementById (elementId);
    }

}

export default IotaTerminalElement;