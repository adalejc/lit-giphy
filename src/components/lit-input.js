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

    render() {
        return html`
        <div class="lit-imput-container">
            <input name="lit-input" .placeholder="${this.placeholder}" .type="${this.type}">
            <button ?disabled="${this.btnEnabled}">${this.btnName}</button>
        </div>
        `;
    }


}
customElements.define(LitInput.is, LitInput);