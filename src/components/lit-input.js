import { LitElement, html, css } from 'lit-element';

export class LitInput extends LitElement {
    static get is() {
        return 'lit-input';
    }

    static get styles() {
        return css`
            :host {
                display: inline-block;
                width: 100%;
            }
            .lit-input-container {
                width: 100%
            }
        `;
    }

    static get properties() {
        return {
            type: { type: String },
            placeholder: { type: String },
            btnName: { type: String },
            btnEnabled: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.type = '';
        this.placeholder = '';
        this.btnName = '';
        this.btnEnabled = false;
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('keyup', event => { this._keyUpEnter(event) });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('keyup', event => { this._keyUpEnter(event) });
    }

    render() {
        return html`
        <div class="lit-input-container">
            <input name="lit-input" 
                .placeholder="${this.placeholder}" 
                .type="${this.type}" 
                @blur="${this._inputBlur}">
            <button 
                ?hidden="${!this.btnEnabled}" 
                @click="${this._btnClicked}"
            >${this.btnName}</button>
        </div>
        `;
    }

    /**
     * btn-event event fire when user clicked in button search input
     */
    _btnClicked() {
        let value = this.shadowRoot.querySelector('input').value;
        
        this.dispatchEvent(new CustomEvent('btn-click-event', {
            bubbles: true,
            composed: true,
            detail: value,
        }));
        this.shadowRoot.querySelector('input').value = '';
    }

    /**
     * input-blur-event fire when the user leaves input field
     */
    _inputBlur() {
        let value = this.shadowRoot.querySelector('input').value;
        this.dispatchEvent(new CustomEvent('input-blur-event', {
            bubbles: true,
            composed: true,
            detail: value,
        }));
        this.shadowRoot.querySelector('input').value = '';
    }

    _keyUpEnter(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            let value = this.shadowRoot.querySelector('input').value;
            
            this.dispatchEvent(new CustomEvent('input-keyup-event', {
                bubbles: true,
                composed: true,
                detail: value,
            }));
        }
    }


}
customElements.define(LitInput.is, LitInput);