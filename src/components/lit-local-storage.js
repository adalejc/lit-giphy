import { LitElement } from 'lit-element';

export class LitLocalStorage extends LitElement {
    static get is () {
        return 'lit-local-storage';
    }

    static get properties() {
        return {
            id: { type: String }
        };
    }

    constructor() {
        super();
        this.id = '';
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener(`get-local-storage-${this.id}`, event => { this._getDataLocalStorage(event) }); 
        window.addEventListener(`save-local-storage-${this.id}`, event => { this._saveDataLocalStorage(event) });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener(`get-local-storage-${this.id}`, event => { this._getDataLocalStorage(event) });
        window.removeEventListener(`save-local-storage-${this.id}`, event => { this._saveDataLocalStorage(event) });
    }

    _getDataLocalStorage(event) {
        const { detail } = event;
        if (detail.id) {
            const result = JSON.parse(localStorage.getItem(detail.id));
            this._genericDispatchEvent(`local-storage-get-sucess-${this.id}`, { id: detail.id, data: result });
        }
    }

    _saveDataLocalStorage(event) {
        const { detail } = event;
        if (detail.id) {
            localStorage.setItem(detail.id, JSON.stringify(detail.data));
            this._genericDispatchEvent(`local-storage-save-success-${this.id}`, { status: true, id: detail.id });
        }
    }

    _genericDispatchEvent(eventName = '', detail = {}) {
        if (eventName && Object.entries(detail).length) {
            this.dispatchEvent(new CustomEvent(eventName, {
                bubbles: true,
                composed: true,
                detail: detail
            }));
        }
    }


}
customElements.define(LitLocalStorage.is, LitLocalStorage);