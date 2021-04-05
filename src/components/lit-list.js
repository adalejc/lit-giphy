import { html, LitElement, css } from 'lit-element';
import './lit-card';

export class LitList extends LitElement {
    static get is() {
        return 'lit-list';
    }

    createRenderRoot() {
        return this;
    }

    static get properties() {
        return {
            list: { type: Array }
        };
    }

    constructor() {
        super();
        this.list = null;
    }

    static get styles() {
        return css`
        .list-container {
            margin: 1rem 0;
        }
        `;
    }

    render() {
        return html`
            <div class="row align-items-center ">
                ${this.listTemplate}
            </div>
        `;
    }

    get listTemplate() {
        return html`
            ${this.list? 
                html`${this.list.map(card => html`
                    <lit-card class="col-xs-12 col-sm-6 col-md-4" 
                        title="${card.title}" 
                        img="${card.url}"
                    ></lit-card>
                `)}`
            :html`<div class="text-center">Sin busquedas</div>`}
        `;
    }
}
customElements.define(LitList.is, LitList);
