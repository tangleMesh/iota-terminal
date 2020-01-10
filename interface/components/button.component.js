import { LitElement, html, css } from 'lit-element';

class ButtonComponent extends LitElement {

    static get properties() {
        return { 
            link: { 
                type: String 
            },
        };
      }

    static get styles() {
        return css`
            a,
            button {
                background-color: #03A678;
                font-size: 80px;
                color: #FFF;
                padding: 20px 40px;
                text-decoration: none;
            }
            a:hover,
            a:active,
            button:hover,
            button:active {
                background-color: #65A688;
            }
        `;
    }


    render() {
        if (this.link) {
            return html`<a href="${this.link}"><slot></slot></a>`;
        } else {
            return html`<button><slot></slot></button>`;
        }
    }
}

customElements.define('button-component', ButtonComponent);