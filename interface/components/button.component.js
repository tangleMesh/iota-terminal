import { LitElement, html, css } from 'lit-element';

class ButtonComponent extends LitElement {

    static get properties() {
        return { 
            link: { 
                type: String 
            },
            secondary: {
                type: Boolean
            },
            loading: {
                type: Boolean,
            }
        };
      }

      static get loadingStyles () {
          return css`
            .spinner {
                width: 70px;
                display: inline-block;
                text-align: center;
            }
            
            .spinner > div {
                width: 12px;
                height: 12px;
                background-color: #FFF;
            
                border-radius: 100%;
                display: inline-block;
                -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
                animation: sk-bouncedelay 1.4s infinite ease-in-out both;
            }

            .secondary > .spinner > div {
                background-color: #03A678;
            }
            
            .spinner .bounce1 {
                -webkit-animation-delay: -0.32s;
                animation-delay: -0.32s;
            }
            
            .spinner .bounce2 {
                -webkit-animation-delay: -0.16s;
                animation-delay: -0.16s;
            }
            
            @-webkit-keyframes sk-bouncedelay {
                0%, 80%, 100% { -webkit-transform: scale(0) }
                40% { -webkit-transform: scale(1.0) }
            }
            
            @keyframes sk-bouncedelay {
                0%, 80%, 100% { 
                -webkit-transform: scale(0);
                transform: scale(0);
                } 40% { 
                -webkit-transform: scale(1.0);
                transform: scale(1.0);
                }
            }
          `;
      }

    static get styles() {
        return css`
            :host {
                display: inline-block;
            }
            a,
            button {
                font-family: 'Ubuntu', sans-serif;
                font-size: 16px;
                padding: 10px 15px;
                text-decoration: none;
                border: 2px solid #03A678;
            }
            a.disabled,
            button.disabled {
                pointer-events: none;
            }
            a:hover,
            a:active,
            button:hover,
            button:active {
                background-color: #65A688;
                color: #FFF;
            }
            .primary {
                background-color: #03A678;
                color: #FFF;
            }
            .secondary {
                color: #03A678;
                background-color: transparent;
            }
            ${this.loadingStyles}
        `;
    }

    buttonClick (event) {
        if (this.loading) {
            event.stopPropagation ();
            return;
        }
        let clickEvent = new CustomEvent('clicked', { 
            detail: { 
                event
            },
            bubbles: true, 
            composed: true 
        });
        this.dispatchEvent(clickEvent);
    }


    render() {
        const loadingHTML = html`
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
        `;
        if (this.link) {
            return html`
                <a @click=${this.buttonClick} class="${this.secondary ? "secondary" : "primary"} ${this.loading ? "disabled" : ""}" href="${this.loading ? "#" : this.link}" ?disabled=${this.loading}>${this.loading ? loadingHTML : html`<slot></slot>`}</a>
            `;
        } else {
            return html`
                <button @click=${this.buttonClick} class="${this.secondary ? "secondary" : "primary"} ${this.loading ? "disabled" : ""}" ?disabled=${this.loading}>${this.loading ? loadingHTML : html`<slot></slot>`}</button>
            `;
        }
    }
}

customElements.define('button-component', ButtonComponent);