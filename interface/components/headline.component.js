import { LitElement, html, css } from 'lit-element';

class HeadlineComponent extends LitElement {

    static get properties() {
        return { 
        };
      }

    static get styles() {
        return css`
            h1 {
                font-family: 'Ubuntu', sans-serif;
                font-size: 18px;
                line-height: 1.4;
                margin: 0;
                margin-bottom: 8px;
            }
        `;
    }


    render() {
        return html`
            <h1><slot></slot></h1>
        `;
    }
}

customElements.define('headline-component', HeadlineComponent);