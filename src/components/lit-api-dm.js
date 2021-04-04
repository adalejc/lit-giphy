import {html, LitElement} from 'lit-element';

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
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('request-api-giphy', event => { this.search(event) });
    }

    render() {
        return html`
            <lit-local-storage 
            id="giphy"
            @local-storage-get-sucess-giphy="${this._getLocalStorange}"
            ></lit-local-storage>
        `;
    }

    _getLocalStorange(event) {
        const { data, id } = event;
        if (id === 'history') {
            this.history = data;
        } else if (id === 'result') {
            this.result = data;
        }
    }

    _requestLocalStorage() {
        this._sendResponse('get-local-storage-giphy', { id: 'history' });
        this._sendResponse('get-local-storage-giphy', { id: 'result' });
    }

    _saveLocalStorage(id = '', data = {}) {
        this._sendResponse('save-local-storage-giphy', {id, data });
    }


    /**
     * this function request to api giphy query
     * @param {*} query 
     */
    search(event) {
        //console.log('search', event);
        let { detail: query } = event;
        query = query.trim().toLocaleLowerCase();

        if (!this.history.includes(query)) {
            this.history.unshift(query);
            this.history = this.history.splice(0,10);
            //localStorage.setItem('history', JSON.stringify(this.history));
            this._saveLocalStorage('history', this.history);
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
            .then(data => this._sendResponse('response-giphy', data))
            .catch(error => console.warn('Something went wront: ', error));
    }

    /**
     * this event send dispatchEvent with response
     * @param {*} customEvent 
     * @param {*} data 
     */
    _sendResponse(customEvent = '', detail) {
        const { data } = detail;
        if (customEvent && data.length) {
            //localStorage.setItem('result', JSON.stringify(data));
            //this._saveLocalStorage('result', data);
            this.dispatchEvent(new CustomEvent(customEvent, {
                detail: data ,
                bubbles: true,
                composed: true
            }));
        }
    }
}
customElements.define(LitApiDm.is, LitApiDm);
