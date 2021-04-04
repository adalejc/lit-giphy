import { LitElement, html, css } from 'lit-element';
import './components/lit-input';

export class LitGiphy extends LitElement {

  static get styles() {
    return css`
      :host {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .container-search {
        width: 500px;
        display: inline-block;
      }
    `;
  }

  static get properties() {
    return {
      showButton: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.showButton = true;
  }

  render() {
    return html`

      <div class="container-main">
        <h2>LitGighy</h2>
        <div class="container-search">
          <lit-input type="search" placeholder="buscar gif" btnName="Buscar" .btnEnabled="${this.showButton}" ></lit-input>
        </div>
      </div>
    `;
  }
}
