import AbstractView from "./AbstractView.js";
export default class extends AbstractView {

    constructor(params) {
        super(params);
        this.setTitle("Sınav Düzenle");
        this.postId = params.id;
    }


    
    
    async getHtml() {

        var y
        var secilensinav = this.postId
        await $.post("/sinavedit", {secilensinav:`${secilensinav}`}, function (books){
            y= books
        }) 

        var x
        await $.post("/yetkilikullanici", function (books){
            x= books
        }) 

        var yetkililistesi = `
        <option>NTD</option>
        <option>BG</option>
        <option>İYG</option>
        <option>MG</option>
        `
        yetkililistesi = yetkililistesi.replace("<option>"+y[0].sahibi+"</option>", "")
        var yetkililistesi = `
        <option selected>${y[0].sahibi}</option>` + yetkililistesi

        var sinavadi = y[0].egitimadi


        return `
        <h1>Sınav Düzenle (${sinavadi})</h1>
        <div style="width:1000px">


            <div style="display:inline-block; width:1000px">
                <label for="yenisinavkonusu">Sınav Konusu</label><br>
                <textarea style="width:500px" id="yenisinavkonusu" rows="3">${y[0].egitimadi}</textarea>
            </div><br><br>
            <div style="display:inline-block; width:1000px">
                <label for="yenisinavkonusu">Soru Sayısı</label><br>
                <textarea style="width:500px" id="yenisinavsorusayisi" rows="1">${y[0].sorusayisi}</textarea>
            </div><br><br>
            <div style="display:inline-block; width:1000px">
                <label for="sahibi">Hedef Kitle</label><br>
                <select style="width:500px" id="sahibi">
                    ${yetkililistesi}
                </select>
            </div><br><br>
            
        </div><br>

            <button id= "${secilensinav}" sinavduzenle>Kaydet</button>
            <button class="sil" id= "${secilensinav}" sinavsil>Kaydı Sil</button>

    `  
        }
        
}

