import { html, css } from 'lit-element';
import IotaTerminalElement from "../IotaTerminal.element";
import sharedStyle from '../shared.style';

//TODO: make pagination available because scrolling can not be done!

class ListComponent extends IotaTerminalElement {

    get scrollOffsetPuffer () {
        return 20;
    }

    static get properties() {
        return { 
            type: { 
                type: String 
            },
            title: { 
                type: String 
            },
        };
      }

    static get styles() {
        return css`
            ${sharedStyle}
            b {
                font-family: 'Ubuntu', sans-serif;
                font-weight: 400;
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
            }
            ul,
            ol {
                font-family: 'Ubuntu', sans-serif;
                font-weight: 300;
                font-size: 12px;
                line-height: 1.4;
                margin: 0;
                margin-top: 8px;
                margin-bottom: 8px;
                box-sizing: border-box;
            }            
        `;
    }

    scrollUp () {
        const listEl = this.getElement ("list");
        listEl.scrollTop = listEl.scrollTop - listEl.clientHeight + this.scrollOffsetPuffer;
    }

    scrollDown () {
        const listEl = this.getElement ("list");
        listEl.scrollTop = listEl.scrollTop + listEl.clientHeight - this.scrollOffsetPuffer;
    }


    render() {
        let content = html``;
        if (this.title) {
            content = html`${content}<b>${this.title}</b>`;
        }
        if (this.type === "ordered-list") {
            content = html`
                ${content}<ol id="list"><slot></slot></ol>
            `;
        } else {
            content = html`
                ${content}
                <ul id="list">
                    <button @click="${this.scrollUp}" class="scroll scroll-up">u</button>
                    <button @click="${this.scrollDown}" class="scroll scroll-down">d</button>
                    <slot></slot>
                </ul>
            `;
        }
        return content;
    }
}

customElements.define('list-component', ListComponent);

class ListItemComponent extends IotaTerminalElement {

    static get properties() {
        return { 
            link: { 
                type: String 
            },
        };
      }

    static get styles() {
        return css`
            li {
                font-family: 'Ubuntu', sans-serif;
                font-weight: 300;
                font-size: 12px;
                line-height: 1.4;
                margin: 0;
                margin-bottom: 8px;
                list-style-type: square;
            }
            .link {
                margin-bottom: 16px;
            }
            a {
                text-decoration: inherit;
                color: #03A678;
                padding: 8px;
                border: 1px solid #03A678;
            }
        `;
    }


    render() {
        if (this.link) {
            return html`
                <li class="link"><a href="${this.link}"><slot></slot></a></li>
            `;
        } else {
            return html`
                <li><slot></slot></li>
            `;
        }
    }
}

customElements.define('list-item-component', ListItemComponent);