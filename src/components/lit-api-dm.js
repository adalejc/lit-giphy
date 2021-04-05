import {html, LitElement} from 'lit-element';
import './lit-local-storage';

export class LitApiDm extends LitElement {
    static get is() {
        return 'lit-api-dm';
    }

    static get properties() {
        return {
            apiKey: { type: String },
            url: { type: String },
            history: { type: Array },
            method: { type: String },
            result: { type: Array },
        };
    }

    constructor() {
        super();
        this.apiKey = 'S2DkVDLQtwGbMYUFs19R9e4IfquN6qOU';
        this.url = 'https://api.giphy.com/v1/gifs/search';
        this.method = 'GET';
        this.history = [];
        this.result = [];
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('request-api-giphy', event => { this.search(event) });
        setTimeout(() => { this._requestLocalStorage() }, 500);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('request-api-giphy', event => { this.search(event) });
    }

    render() {
        return html`
            <lit-local-storage 
            id="giphy"
            @local-storage-get-sucess-result="${this._getLocalStorageResult}"
            @local-storage-get-sucess-history="${this._getLocalStorageHistory}"
            ></lit-local-storage>
        `;
    }

    _getLocalStorageResult(event) {
        const { detail } = event;
        this.result = detail;
        this._sendResponse('response-giphy', this.result);
    }

    _getLocalStorageHistory(event) {
        const { detail } = event;
        this.history = detail;
        this._sendResponse('history-updated', this.history);
    }

    _requestLocalStorage() {
        this._sendResponse('get-local-storage-giphy', 'history');
        this._sendResponse('get-local-storage-giphy', 'result');
    }

    _saveLocalStorage(id = '', data = {}) {
        this._sendResponse('save-local-storage-giphy', {id, data });
    }

    /**
     * this function request to api giphy query
     * @param {*} query 
     */
    search(event) {
        let { detail: query } = event;
        query = query.trim().toLocaleLowerCase();

        if (!this.history.includes(query)) {
            this.history.unshift(query);
            this.history = this.history.splice(0,10);
            this._saveLocalStorage('history', this.history);
            this._sendResponse('history-updated', this.history);
        }

        const myUrl = new URL(this.url);
        myUrl.searchParams.append('api_key', this.apiKey);
        myUrl.searchParams.append('limit', 10);
        myUrl.searchParams.append('q', query);

        fetch(myUrl.href, { method: this.method })
            .then(response => {
                if (response.ok) return response.json();
                return Promise.reject(response);
            })
            .then(data => this.normalize(data))
            .catch(error => console.warn('Something went wront: ', error));
    }

    normalize(response) {
        const { data } = response;
        
        this.result = data.map(item => {
            const { title, images: { downsized_medium: { url } } } = item;
            return {
                title,
                url
            };
        });

        this._sendResponse('response-giphy', this.result);
        this._saveLocalStorage('result', this.result);
        
    }

    /**
     * this event send dispatchEvent with response
     * @param {*} customEvent 
     * @param {*} data 
     */
    _sendResponse(customEvent = '', detail) {
        if (customEvent && detail) {
            this.dispatchEvent(new CustomEvent(customEvent, {
                detail: detail,
                bubbles: true,
                composed: true
            }));
        }
    }
}
customElements.define(LitApiDm.is, LitApiDm);
