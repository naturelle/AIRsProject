import AbstractView from "./AbstractView.js";


export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Şifre Değiştir");
      }


    async getHtml() {
        return `
        <form class="form_ebt" >
            <h1 id = "login">Şifre Değiştir</h1>
            <div>
                <label  class="loginlabel" for="sifre1">Yeni şifre</label>
                <input  id="sifre1" type="password"></input><br><br>
            </div>
            <div>
                <label  class="loginlabel" for="sifre2">Yeni şifre tekrar</label>
                <input id="sifre2" type="password"></input><br><br>
            </div>
            <button class="button"  degistir>Değiştir</button>
        </form>
        `;
    }
}