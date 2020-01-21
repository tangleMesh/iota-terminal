import { html, css } from 'lit-element';
import IotaTerminalElement from "../IotaTerminal.element";

class InputComponent extends IotaTerminalElement {

    static get properties() {
        return { 
            value: { 
                type: String,
                hasChanged (newVal, oldVal) {
                    if (window.keyboardObject && window.keyboardObject.getInput () != newVal) {
                        window.keyboardObject.setInput (newVal);
                        return true;
                    }
                    return false;
                }
            },
            placeholder: { 
                type: String 
            },
            type: { 
                type: String 
            },
            focus: {
                type: Boolean,
            },
            layout: {
                type: String,
            }
        };
    }

    initializeKeyboard () {
        this.keyboard = window.addKeyboard (
            input => this.keyboardChange (input),
            button => this.keyboardPress (button),
            this.layout || "text",
        );
        this.keyboard.setInput (this.value);
    }

    deconstructKeyboard () {
        window.removeKeyboard (this.keyboard);
        this.keyboard = null;
    }

    keyboardChange (input) {
        this.value = input;
        // this.shiftLayout = false;
        this.inputChanged ();
        this.requestUpdate ();
    }

    keyboardPress (button) {
        if (button === "{shift}") {
            this.shiftLayout = !this.shiftLayout;
        } else if (button === "{clear}") {
            this.keyboard.clearInput ();
            this.value = "";
            this.requestUpdate ();
            this.inputChanged ();
        } else if (button === "{x}") {
            this.inputLosesFocus ();
        } else if (button === "{enter}") {
            this.inputFinished ();
        }

        if (this.keyboard) {
            this.keyboard.setOptions ({
                layoutName: this.shiftLayout ? "shift" : "default",
            });
        }
    }

    inputGetsFocus (e) {
        this.focus = true;
        this.initializeKeyboard ();
        let clickEvent = new CustomEvent('click', { 
            detail: { 
                e,
            },
            bubbles: true, 
            composed: true 
        });
        this.dispatchEvent(clickEvent);
    }

    inputLosesFocus () {
        this.deconstructKeyboard ();
        this.focus = false;
        let enterEvent = new CustomEvent('close', { 
            detail: { 
                value: this.value,
            },
            bubbles: true, 
            composed: true 
        });
        this.dispatchEvent(enterEvent);
    }

    inputFinished () {
        this.deconstructKeyboard ();
        this.focus = false;
        let enterEvent = new CustomEvent('enter', { 
            detail: { 
                value: this.value,
            },
            bubbles: true, 
            composed: true 
        });
        this.dispatchEvent(enterEvent);
    }

    inputChanged () {
        let changeEvent = new CustomEvent('change', { 
            detail: { 
                value: this.value,
            },
            bubbles: true, 
            composed: true 
        });
        this.dispatchEvent(changeEvent);
    }

    static get styles() {
        return css`
            input {
                width: calc(100% - 25px);
                font-family: 'Ubuntu', sans-serif;
                border: 2px solid #03A678;
                padding: 10px;
            }
            .has-focus {
                position: fixed;
                display: block;
                top: 30px;
                left: 20px;
                right: 20px;
                width: calc(100vw - 60px);
                z-index: 80;
                outline: 600px solid rgba(255,255,255,.8);
            }
        `;
    }

    render() {
        return html`
            <input 
                type="${this.type}" 
                placeholder="${this.placeholder}" 
                value="${this.value}" 
                @click=${this.inputGetsFocus} 
                class="${this.focus ? "has-focus" : ""}" 
            />
        `;
    }
}

customElements.define('input-component', InputComponent);