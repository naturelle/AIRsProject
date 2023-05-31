import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Sınavlar");
    }

    async getHtml() {


        var ebtler
        await $.post("/egitimler", function (books){
            ebtler= books
        }) 
        var satirlar = ""
        for (let k = 0; k < ebtler.length; k++){

            
            satirlar += `
          <tr id='soru${ebtler[k].no}'>
            <td z-index: ${ebtler[k].no}><a href= "examedit/${ebtler[k].no}" data-link>${k+1}</a></td>
            <td z-index: ${ebtler[k].no}><a href= "exams/${ebtler[k].no}" data-link>${ebtler[k].egitimadi}</a></td>
            <td z-index: ${ebtler[k].no}>${ebtler[k].sahibi}</td>  
        </tr>
          `;

        }

        var x = `
         <table class="display" style="width:100%" id="ebtler">
            <thead >
            <tr>
                <th>No</th>
                <th>Sınav Konusu</th>
                <th>Hedef Kitle</th>
            </tr>
            </thead>
            <tbody id="ebtlertbody">
            ${satirlar}
            </tbody>
            
        </table>
    `
        return x;
    }
}