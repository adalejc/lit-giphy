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
        this.url = 'https://api.giphy.com/v1/gifs';
        this.method = 'GET';
        this.history = JSON.parse(localStorage.getItem('history')) || [];
        this.result =  JSON.parse(localStorage.getItem('result')) || [];
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
        }
        
    }


    /**
     * this function request to api giphy query
     * @param {*} query 
     */
    search(query = '') {
        query = query.trim().toLocaleLowerCase();

        if (!this.history.includes(query)) {
            this.history.unshift(query);
            this.history = this.history.splice(0,10);
            localStorage.setItem('history', JSON.stringify(this.history));
        }

        fetch(this.url, {method: this.method})
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
    _sendResponse(customEvent = '', data = []) {
        if (customEvent && data.length) {
            //localStorage.setItem('result', JSON.stringify(data));
            this.dispatchEvent(new CustomEvent(customEvent, {
                detail: data ,
                bubbles: true,
                composed: true
            }));
        }
    }
}
customElements.define(LitApiDm.is, LitApiDm);
