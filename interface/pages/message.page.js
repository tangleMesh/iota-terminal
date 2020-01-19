import { LitElement, html, css } from 'lit-element';
import '../components/button.component';

class MessagePage extends LitElement {

  constructor () {
    super ();
  }

  firstUpdated () {
    console.log (router.location.params);
    this.msg = router.location.params.msg || "An unexpected error occured. Please try your previous action again or contact our support!";
    this.link = router.location.params.link || "/";
    this.icon = router.location.params.icon || "default";
    this.requestUpdate ();
  }

  static get styles () {
    return css`
      .icon {
        fill: #03A678;
        height: 120px;
        width: 120px;
        display: inline-block;
        margin-top: -25px;
      }
      .message {
        position: absolute;
        width: 80%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-family: 'Ubuntu', sans-serif;
      }
      .message-content {
        font-size: 16px;
        margin-bottom: 30px;
        padding: 0 20px;
      }
    `;
  }

  getIcon (iconName) {
    switch (iconName) {
      case 'wifi-error':
        return html`<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M23.64 7c-.45-.34-4.93-4-11.64-4-1.5 0-2.89.19-4.15.48L18.18 13.8 23.64 7zm-6.6 8.22L3.27 1.44 2 2.72l2.05 2.06C1.91 5.76.59 6.82.36 7l11.63 14.49.01.01.01-.01 3.9-4.86 3.32 3.32 1.27-1.27-3.46-3.46z"/></svg>`;
      case 'wifi-success':
        return html`<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M23 16v-1.5c0-1.4-1.1-2.5-2.5-2.5S18 13.1 18 14.5V16c-.5 0-1 .5-1 1v4c0 .5.5 1 1 1h5c.5 0 1-.5 1-1v-4c0-.5-.5-1-1-1zm-1 0h-3v-1.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V16zm-6.5-1.5c0-2.8 2.2-5 5-5 .4 0 .7 0 1 .1L23.6 7c-.4-.3-4.9-4-11.6-4C5.3 3 .8 6.7.4 7L12 21.5l3.5-4.4v-2.6z"/></svg>`;
      case 'device-error':
        return html`<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24"><path d="M2.76 2.49L1.49 3.76 5 7.27V21c0 1.1.9 2 2 2h10c1.02 0 1.85-.77 1.98-1.75l1.72 1.72 1.27-1.27L2.76 2.49zM7 19V9.27L16.73 19H7zM17 5v9.17l2 2V3c0-1.1-.9-2-2-2H7c-.85 0-1.58.54-1.87 1.3L7.83 5H17z"/><path fill="none" d="M0 0h24v24H0z"/></svg>`;
      case 'device-success':
        return html`<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24"><path d="M19 1H9c-1.1 0-2 .9-2 2v3h2V4h10v16H9v-2H7v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zM7.01 13.47l-2.55-2.55-1.27 1.27L7 16l7.19-7.19-1.27-1.27z"/><path fill="none" d="M0 0h24v24H0z"/></svg>`;
      default:
        return html`<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>`;
    }
  }

  render() {
      return html`
        <div class="message">
          ${this.getIcon (this.icon)}
          <p class="message-content">${this.msg}</p>
          <button-component class="message-link" secondary link=${this.link}>Continue</button-component>
          <div style="clear:both;"></div>
    </div>
      `;
  }
}

customElements.define('message-page', MessagePage);