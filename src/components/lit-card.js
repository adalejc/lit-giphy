import {LitElement, html, css} from 'lit-element';

export class LitCard extends LitElement {
    static get is() {
        return 'lit-card';
    }

    static get properties() {
        return {
            title: { type: String },
            img: { type: String }
        };
    }

    constructor() {
        super();
        this.title = '';
        this.img = '';
    }

    static get styles() {
        return css``;
    }

    render() {
        return html`
            <div class="card-container">
                <div class="card-title">${this.title}</div>
                <div class="card-image">
                    <img src="${this.img}" alt="${this.title}" width="100%">
                </div>
            </div>
        `;
    }
}
customElements.define(LitCard.is, LitCard);
