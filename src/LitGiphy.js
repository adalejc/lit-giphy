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
      
    `;
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
  }

  render() {
    return html`
      <lit-api-dm @response-giphy="${this.requestGiphyItems}"></lit-api-dm>
      <div class="container-main">
        <h2>LitGighy</h2>
        <div class="container-search">
          <lit-input 
            type="search" 
            placeholder="buscar gif" 
            btnName="Buscar" 
            .btnEnabled="${this.showButton}"
            @btn-click-event="${this.setQuery}"
            @input-blur-event="${this.setQuery}"
          ></lit-input>
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

  genericDispatchEvent(nameEvent = '', detail = {}) {
    if (nameEvent && Object.entries(detail).length) {
      this.dispatchEvent(new CustomEvent(nameEvent, {
        bubbles: true,
        composed: true,
        detail: detail
      }));
    }
  }

}
