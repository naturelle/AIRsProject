import AbstractView from "./AbstractView.js";


export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Giriş");
      }


    async getHtml() {
        return `
        <div>
        <form class="form_ebt" >
            <div>
                <label class="loginlabel" for="kullanici">Sicil No</label>
                <input id="kullanici" type="text" placeholder="Sicil No (dört rakam)"></input><br><br>
            </div>
            <div>
                <label class="loginlabel"  for="sifre">Şifre</label>
                <input id="sifre" type="password"></input><br><br>
            </div>
            <div class="loginbuton" >
            <button id = "girisbutonu" class="button_login"  postlogin>misafir girişi</button>
            <button class="button-sifre" sifredegistir>ŞİFRE DEĞİŞTİR</button>
            <button class="button-unuttum" unuttum>Şifremi Unuttum</button>
            </div>
        </form>
        </div>
        `;
    }
}