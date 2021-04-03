import { LitElement, html, css } from 'lit-element';
import './components/lit-input';

export class LitGiphy extends LitElement {

  static get styles() {
    return css`
    :host {
      display: inline-block;
    }

    `;
  }
  static get properties() {
    return {
      btnEnable: { type: Boolean },
    };
  }



  constructor() {
    super();
    this.btnEnable = true;
  }

  render() {
    return html`

      <div class="container-main">
        <h2>LitGighy</h2>
        <lit-input type="search" placeholder="buscar gif" btnName="Buscar" ></lit-input>
        
      </div>
      
    `;
  }
}
