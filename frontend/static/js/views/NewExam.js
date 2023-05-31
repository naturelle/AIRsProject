import AbstractView from "./AbstractView.js";
export default class extends AbstractView {

    constructor(params) {
        super(params);
        this.setTitle("Sınav Ekle");
        this.postId = params.id;
    }


    
    
    async getHtml() {
        // var x
        // await $.post("/yetkilikullanici", function (books){
        //     x= books
        // }) 
        // var yetkililistesi = ""

        // for (let k = 0; k < x.length; k++){  

        //     yetkililistesi += `
        //     <option>${x[k].ad} ${x[k].soyad}</option>
        //   `;

        // }




        return `
        <h1>Sınav Ekle</h1>
        <div style="width:1000px">


            <div style="display:inline-block; width:1000px">
                <label for="yenisinavkonusu">Sınav Konusu</label><br>
                <textarea style="width:500px" id="yenisinavkonusu" rows="3"></textarea>
            </div><br><br>
            <div style="display:inline-block; width:1000px">
                <label for="yenisinavkonusu">Soru Sayısı</label><br>
                <textarea style="width:500px" id="yenisinavsorusayisi" rows="1"></textarea>
            </div><br><br>
            <div style="display:inline-block; width:1000px">
                <label for="sahibi">Hedef Kitle</label><br>
                <select style="width:500px" id="sahibi">
                    <option>NTD</option>
                    <option>BG</option>
                    <option>İYG</option>
                    <option>MG</option>
                </select>
            </div><br><br>            
        </div><br>
        <button sinavkaydet>Kaydet</button>
    `  
        }
        
}

