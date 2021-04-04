import { html, LitElement, css } from 'lit-element';
import './lit-card';

export class LitList extends LitElement {
    static get is() {
        return 'lit-list';
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
            <div class="list-container">
                ${this.listTemplate}
            </div>
        `;
    }

    get listTemplate() {
        return html`
            ${this.list? 
                html`${this.list.map(card => html`
                    <lit-card 
                        title="${card.title}" 
                        img="${card.images.downsized_medium.url}"
                    ></lit-card>
                `)}`
            :html`<div>Sin datos</div>`}
        `;
    }
}
customElements.define(LitList.is, LitList);
