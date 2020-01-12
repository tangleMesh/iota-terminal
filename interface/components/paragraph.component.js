import { LitElement, html, css } from 'lit-element';

class ParagraphComponent extends LitElement {

    static get properties() {
        return { 
        };
      }

    static get styles() {
        return css`
            p {
                font-family: 'Ubuntu', sans-serif;
                font-weight: 300;
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
                margin-bottom: 8px;
            }
        `;
    }


    render() {
        return html`
            <p><slot></slot></p>
        `;
    }
}

customElements.define('paragraph-component', ParagraphComponent);