import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Soru Havuzu");
    }

    async getHtml() {


        var ebtler
  
        await $.post("/tumsorular", function (books){
            ebtler= books
        }) 


        var satirlar = ""
        for (let k = 0; k < ebtler.length; k++){

            
            satirlar += `
          <tr id='soru${ebtler[k].no}'>
            <td z-index: ${ebtler[k].no}><a href= /examquestion/${ebtler[k].sinavid}_${ebtler[k].no} data-link>${k+1}</a></td>
            <td z-index: ${ebtler[k].no}>${ebtler[k].no}</td>
            <td z-index: ${ebtler[k].no}>${ebtler[k].soru}</td>
            <td z-index: ${ebtler[k].no}>${ebtler[k].a}</td>  
            <td z-index: ${ebtler[k].no}>${ebtler[k].b}</td>
            <td z-index: ${ebtler[k].no}>${ebtler[k].c}</td>
            <td z-index: ${ebtler[k].no}>${ebtler[k].d}</td> 
            <td z-index: ${ebtler[k].no}>${ebtler[k].e}</td>
            <td z-index: ${ebtler[k].no}>${ebtler[k].cevap}</td>
            <td z-index: ${ebtler[k].no}>${ebtler[k].egitimadi}</td>
        </tr>
          `;

        }

        var x = `
         <table class="display" style="width:100%" id="ebtler">
            <thead >
            <tr>
                <th>No</th>
                <th>Soru Id.</th>
                <th>Soru</th>
                <th>A Şıkkı</th>
                <th>B Şıkkı</th>
                <th>C Şıkkı</th>
                <th>D Şıkkı</th>
                <th>E Şıkkı</th>
                <th>Cevap</th>
                <th>Eğitim Adı</th>
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