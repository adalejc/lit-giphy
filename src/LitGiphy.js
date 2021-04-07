import { LitElement, html, css } from 'lit-element';
import './components/lit-input';
import './components/lit-api-dm';
import './components/lit-list';

export class LitGiphy extends LitElement {

  static get styles() {
    return css`
      :host {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .container-cards {
       max-width: 1200px; 
      }
      .btn-item {
        margin: 5px;
      }
      
    `;
  }

  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      showButton: { type: Boolean },
      query: { type: String },
      history: { type: Array },
      result: { type: Array },
    };
  }

  constructor() {
    super();
    this.showButton = true;
    this.query = '';
    this.history = [];
  }

  render() {
    return html`
      <lit-api-dm 
        @response-giphy="${this.requestGiphyItems}"
        @history-updated="${this.setHistory}"
      ></lit-api-dm>
      <div class="container">
        <div class="text-center m-3">
          <h2>LitGighy</h2>
        </div>
        <div class="text-center">
          <lit-input 
            type="search" 
            placeholder="buscar gif" 
            button-text="Buscar"
            .btnEnabled="${this.showButton}"
            @btn-click-event="${this.setQuery}"
            @input-blur-event="${this.setQuery}"
            @input-keyup-event="${this.setQuery}"
          ></lit-input>
        </div>
        <div class="text-center m-2">
          ${this.historyTemplate}
        </div>
        <div class="container-cards">
          <lit-list .list="${this.result}"></lit-list>
        </div>
      </div>
    `;
  }

  setQuery(event) {
    const { detail } = event;
    this.query = detail;

    this.genericDispatchEvent('request-api-giphy', this.query);
  }

  requestGiphyItems(event) {
    const { detail } = event;
    this.result = detail;
  }

  setHistory(event) {
    const { detail } = event;
    this.history = detail;
  }

  get historyTemplate() {
    return html`
      ${this.history? 
      html`${this.history.map(item => html`
        <button 
          type="button" class="btn btn-light m-1"
          @click="${() => { this.setQuery({detail: item}) }}"
        >${item}</button>`)}`
      :html``}
    `;
  }

  genericDispatchEvent(nameEvent = '', detail = {}) {
    if (!!nameEvent && !!detail) {
      this.dispatchEvent(new CustomEvent(nameEvent, {
        bubbles: true,
        composed: true,
        detail: detail
      }));
    }
  }

}
