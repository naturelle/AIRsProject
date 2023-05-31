import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("EBT'ler");
    }

    async getHtml() {

        document.getElementById("airs").className += "active";

        var ebtler
  
        await $.post("/ebtler", function (books){
            ebtler = books
        }) 


        var satirlar = ""
        for (let k = 0; k < ebtler.length; k++){
            if (localStorage.getItem("yetki")==0) {
                if ((ebtler[k].status.includes("Rejected") || ebtler[k].status.includes("Received") || ebtler[k].status.includes("RECEIVED") || ebtler[k].status.includes("CLOSED - F")) &&  localStorage.getItem("grup").includes(ebtler[k].grup)) {
                    var butonlar = `
                        <a id= "upebt${ebtler[k].no}" class="taslaklarbutton upebt" title="EBT Yükle">&#x21e7;
                        </a> 
                        <a id= "notekle${ebtler[k].no}" class="taslaklarbutton notekle" title="Not Ekle/Değiştir">&#10063;
                        </a> 
                    `
                }
                else if (localStorage.getItem("grup").includes(ebtler[k].grup)) {
                    var butonlar = `
                        <a id= "notekle${ebtler[k].no}" class="taslaklarbutton notekle" title="Not Ekle/Değiştir">&#10063;
                        </a> 
                    `
                } 
                // else if (ebtler[k].notes !== "") {
                //     var butonlar = `
                //         <a id= "notoku${ebtler[k].no}" class="taslaklarbutton" title="Not Oku" style="background-color:#CDB699;">&#9737;
                //         </a> 
                //     `
                // } 
                else {
                    var butonlar = ""
                }
            }
            else if (localStorage.getItem("yetki")>=1) {
                if ((ebtler[k].status.includes("Received") || ebtler[k].status.includes("RECEIVED") || ebtler[k].status.includes("CLOSED - F")|| ebtler[k].status.includes("Closed-") || ebtler[k].letters.includes("Followed By")) && localStorage.getItem("grup").includes(ebtler[k].grup)) {
                    var butonlar = `
                        <a id= "upebt${ebtler[k].no}" class="taslaklarbutton upebt" title="EBT Yükle">&#x21e7;
                        </a> 
                        <a id= "notekle${ebtler[k].no}" class="taslaklarbutton notekle" title="Not Ekle/Değiştir">&#10063;
                        </a> 
                    `
                }
 
                else {
                    var butonlar = `
                        <a id= "notekle${ebtler[k].no}" class="taslaklarbutton notekle" title="Not Ekle/Değiştir">&#10063;
                        </a> 
                    `
                } 
                
            }
            else {
                var butonlar = `

            `
            }

         
           /* iptal et butonu yukarda olacak şimdilik pasif  
           <a id= "cancelebt${ebtler[k].no}" class="taslaklarbutton cancelebt" title="İptal Et" data-link>&#10006;
            </a> */ 

            var statusclass = ""
            if (ebtler[k].status.includes("Waiting") || ebtler[k].status.includes("Checked")) {
                statusclass = "waiting"
            }
            else if (ebtler[k].status.includes("Sent") || ebtler[k].status.includes("SENT")) {
                statusclass = "sent"
            }
            else if (ebtler[k].status.includes("Waiting") || ebtler[k].status.includes("WAITING")) {
                statusclass = "waiting"
            }
            else if (ebtler[k].status.includes("Received")|| ebtler[k].status.includes("RECEIVED")) {
                statusclass = "received"
            }
            else if (ebtler[k].status.includes("Closed+") || ebtler[k].status.includes("CLOSED +")) {
                statusclass = "closedp"
            }
            else if (ebtler[k].status.includes("Closed-") || ebtler[k].status.includes("CLOSED -")) {
                statusclass = "closedn"
            }
            else if (ebtler[k].status.includes("Cancelled") || ebtler[k].status.includes("CANCELLED")) {
                statusclass = "cancelled"
            }
            if (location.pathname.includes("waiting")) {
                // location.pathname.replace("/waiting/", "")
                if (location.pathname.includes(ebtler[k].aircode)) {
                    satirlar += `
                    <tr id='air${ebtler[k].no}'>
                      <td z-index: ${ebtler[k].no}>${k+1}</td>
                      <td z-index: ${ebtler[k].no}>${ebtler[k].aircode}</td>
                      <td z-index: ${ebtler[k].no}>${ebtler[k].uniteno}</td> 
                      <td z-index: ${ebtler[k].no}>${ebtler[k].documentcode}</td> 
                      <td z-index: ${ebtler[k].no}>${ebtler[k].category}</td>
                      <td z-index: ${ebtler[k].no}>${ebtler[k].relevant}</td>
                      <td z-index: ${ebtler[k].no}>${ebtler[k].grup}</td>
                      <td z-index: ${ebtler[k].no}>${ebtler[k].chapter}</td>
                      <td z-index: ${ebtler[k].no}><div class='statusid'>${ebtler[k].history}</div></td>
                      <td z-index: ${ebtler[k].no}>${ebtler[k].expecteddate}</td>
                      <td z-index: ${ebtler[k].no}><span class =${statusclass}>${ebtler[k].status}</span></td> 
                      <td z-index: ${ebtler[k].no}>${ebtler[k].responsible}</td>
                      <td z-index: ${ebtler[k].no} style="width: 200px; text-overflow: ellipsis;" title="${ebtler[k].letters}">${ebtler[k].letters}</td> 
                      <td z-index: ${ebtler[k].no} style="width: 200px; text-overflow: ellipsis;" title="${ebtler[k].subject}">${ebtler[k].subject}</td>
                      <td z-index: ${ebtler[k].no} style="width: 200px; text-overflow: ellipsis;" title="${ebtler[k].documentname}">${ebtler[k].documentname}</td>
                      <td z-index: ${ebtler[k].no} style="width: 200px; text-overflow: ellipsis;" title="${ebtler[k].relatedsection}">${ebtler[k].relatedsection}</td>
                      <td z-index: ${ebtler[k].no} style="width: 200px; text-overflow: ellipsis;" title="${ebtler[k].notes}" class='notesid'>${ebtler[k].notes}</td> 
                      <td z-index: ${ebtler[k].no}>
          
                      <div class="flex-container">
                          ${butonlar}   
                      </td> 
                    
                  </tr>
                    `;
                }

            }
            else {
                satirlar += `
                <tr id='air${ebtler[k].no}'>
                  <td z-index: ${ebtler[k].no}>${k+1}</td>
                  <td z-index: ${ebtler[k].no}>${ebtler[k].aircode}</td>
                  <td z-index: ${ebtler[k].no}>${ebtler[k].uniteno}</td> 
                  <td z-index: ${ebtler[k].no}>${ebtler[k].documentcode}</td> 
                  <td z-index: ${ebtler[k].no}>${ebtler[k].category}</td>
                  <td z-index: ${ebtler[k].no}>${ebtler[k].relevant}</td>
                  <td z-index: ${ebtler[k].no}>${ebtler[k].grup}</td>
                  <td z-index: ${ebtler[k].no}>${ebtler[k].chapter}</td>
                  <td z-index: ${ebtler[k].no}><div class='statusid'>${ebtler[k].history}</div></td>
                  <td z-index: ${ebtler[k].no}>${ebtler[k].expecteddate}</td>
                  <td z-index: ${ebtler[k].no}><span class =${statusclass}>${ebtler[k].status}</span></td> 
                  <td z-index: ${ebtler[k].no}>${ebtler[k].responsible}</td>
                  <td z-index: ${ebtler[k].no} style="width: 200px; text-overflow: ellipsis;" title="${ebtler[k].letters}">${ebtler[k].letters}</td> 
                  <td z-index: ${ebtler[k].no} style="width: 200px; text-overflow: ellipsis;" title="${ebtler[k].subject}">${ebtler[k].subject}</td>
                  <td z-index: ${ebtler[k].no} style="width: 200px; text-overflow: ellipsis;" title="${ebtler[k].documentname}">${ebtler[k].documentname}</td>
                  <td z-index: ${ebtler[k].no} style="width: 200px; text-overflow: ellipsis;" title="${ebtler[k].relatedsection}">${ebtler[k].relatedsection}</td>
                  <td z-index: ${ebtler[k].no} style="width: 200px; text-overflow: ellipsis;" title="${ebtler[k].notes}" class='notesid'>${ebtler[k].notes}</td> 
                  <td z-index: ${ebtler[k].no}>
      
                  <div class="flex-container">
                      ${butonlar}   
                  </td> 
                
              </tr>
                `;
            }



        }

        var x = `
         <table class="display" id="ebtler">
            <thead >
            <tr>
                <th><input type="text" style="width: 30px;" id="myInput" myFunction placeholder="Ara" autocomplete="off"><br>No</th>
                <th><input type="text" style="width: 170px;" id="myInput1" myFunction placeholder="Ara" autocomplete="off"><br>Air Code</th>
                <th><input type="text" style="width: 30px;" id="myInput2" myFunction placeholder="Ara" autocomplete="off"><br>U.No</th>
                <th><input type="text" style="width: 40px;" id="myInput3" myFunction placeholder="Ara" autocomplete="off"><br>D.Code</th>
                <th><input type="text" style="width: 30px;" id="myInput4" myFunction placeholder="Ara" autocomplete="off"><br>Ctgry</th>
                <th><input type="text" style="width: 30px;" id="myInput5" myFunction placeholder="Ara" autocomplete="off"><br>Rlvnt</th>
                <th><input type="text" style="width: 60px;" id="myInput6" myFunction placeholder="Ara" autocomplete="off"><br>Grp</th>
                <th><input type="text" style="width: 30px;" id="myInput7" myFunction placeholder="Ara" autocomplete="off"><br>Chptr</th>
                <th><input type="text" style="width: 200px;" id="myInput8" myFunction placeholder="Ara" autocomplete="off"><br>
                <span style="cursor:pointer" title="Tarihe göre sırala" id="aust8"">History<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                  </svg></th>
            
                <th><input type="text" style="width: 80px;" id="myInput9" myFunction placeholder="Ara" autocomplete="off"><br>E. Date</th>
                <th><input type="text" style="width: 110px;" id="myInput10" myFunction placeholder="Ara" autocomplete="off"><br>Status</th>
                <th><input type="text" style="width: 40px;" id="myInput11" myFunction placeholder="Ara" autocomplete="off"><br>Owner</th>
                <th><input type="text" style="width: 220px;" id="myInput12" myFunction placeholder="Ara" autocomplete="off"><br>Follow Up</th>
                <th><input type="text" style="width: 220px;" id="myInput13" myFunction placeholder="Ara" autocomplete="off"><br>Subject</th>
                <th><input type="text" style="width: 220px;" id="myInput14" myFunction placeholder="Ara" autocomplete="off"><br>Document Name</th>
                <th><input type="text" style="width: 220px;" id="myInput15" myFunction placeholder="Ara" autocomplete="off"><br>Related Section</th>
                <th><input type="text" style="width: 220px;" id="myInput16" myFunction placeholder="Ara" autocomplete="off"><br>Notes</th>
                <th></th>
            </tr>
            </thead>
            <tbody id="unit1body">
            ${satirlar}
            </tbody>
            
        </table>
    `
        return x;
    }
}