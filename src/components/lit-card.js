import {LitElement, html, css} from 'lit-element';

export class LitCard extends LitElement {
    static get is() {
        return 'lit-card';
    }

    createRenderRoot() {
        return this;
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
        return css`
        :host {
            display: flexbox;
        }
        `;
    }

    render() {
        return html`
            <div class="card">
                <!-- <div class="card-title">${this.title}</div> -->
                <div class="card-img-top">
                    <img 
                        class="img-fluid"
                        src="${this.img}" 
                        alt="${this.title}" 
                        width="100%"
                        loading="lazy"
                    >
                </div>
            </div>
        `;
    }
}
customElements.define(LitCard.is, LitCard);
