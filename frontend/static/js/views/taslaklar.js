import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Taslaklar");
    }

    async getHtml() {
        document.getElementById("taslaklar").className += "active";

        var ebtler
        await $.post("/taslaklar",  {sicil: `${localStorage.getItem("grup")}`,yetki: `${localStorage.getItem("yetki")}`},
        function (books){
            ebtler = books
        }) 




        var satirlar = ""
        var statusbuton = ""
        for (let k = 0; k < ebtler.length; k++){

            if (localStorage.getItem("yetki")==0) {
                // if (ebtler[k].status.includes("Draft") || ebtler[k].status.includes("Rejected")) {
                if (ebtler[k].status.includes("Draft")) {
                    if (ebtler[k].responsible.includes(localStorage.getItem("sicil"))) {
                        var butonlar = `
                        <a href= "airedit/${ebtler[k].no}" class="taslaklarbutton airedit" title="Düzenle" data-link>&#x270E
                        </a>
                        <a id= "deleteebt${ebtler[k].no}" class="taslaklarbutton deleteebt" title="Sil" data-link>&#10006;
                        </a> 
                        <a id= "upebt${ebtler[k].no}" class="taslaklarbutton upebt" title="EBT Yükle">&#x21e7;
                        </a> 
                    `
                    }
                    else {
                        var butonlar = `
                        <a href= "airedit/${ebtler[k].no}" class="taslaklarbutton airedit" title="Düzenle" data-link>&#x270E
                        </a>
                        <a id= "upebt${ebtler[k].no}" class="taslaklarbutton upebt" title="EBT Yükle">&#x21e7;
                        </a> 
                    `
                    }

                }
                else if (ebtler[k].status.includes("Rejected")) {
                    if (ebtler[k].responsible.includes(localStorage.getItem("sicil"))) {
                        var butonlar = `
                        <a href= "airedit/${ebtler[k].no}" class="taslaklarbutton airedit" title="Düzenle" data-link>&#x270E
                        </a>
                        <a id= "deleteebt${ebtler[k].no}" class="taslaklarbutton deleteebt" title="Sil" data-link>&#10006;
                        </a> 
                        <a id= "upebt${ebtler[k].no}" class="taslaklarbutton upebt" title="EBT Yükle">&#x21e7;
                        </a> 
                    `
                    }
                    else {
                        var butonlar = `
                        <a href= "airedit/${ebtler[k].no}" class="taslaklarbutton airedit" title="Düzenle" data-link>&#x270E
                        </a>
                        <a id= "upebt${ebtler[k].no}" class="taslaklarbutton upebt" title="EBT Yükle">&#x21e7;
                        </a> 
                    `
                    }

                }
                else {
                    var butonlar = ""
                }
            }
            else if (localStorage.getItem("yetki")==1) {
                if (ebtler[k].status.includes("Draft")) {
                    var draftclass = ""
                    if (ebtler[k].responsible.includes(localStorage.getItem("sicil"))) {
                        var butonlar = `
                        <a href= "airedit/${ebtler[k].no}" class="taslaklarbutton airedit" title="Düzenle" data-link>&#x270E
                        </a>
                        <a id= "deleteebt${ebtler[k].no}" class="taslaklarbutton deleteebt" title="Sil" data-link>&#10006;
                        </a> 
                        <a id= "upebt${ebtler[k].no}" class="taslaklarbutton upebt" title="EBT Yükle">&#x21e7;
                        </a> 
                    `
                    }
                    else {
                        var butonlar = `
                        <a href= "airedit/${ebtler[k].no}" class="taslaklarbutton airedit" title="Düzenle" data-link>&#x270E
                        </a>
                        <a id= "upebt${ebtler[k].no}" class="taslaklarbutton upebt" title="EBT Yükle">&#x21e7;
                        </a> 
                    `
                    }
                }
                else if (ebtler[k].status.includes("Rejected")) {
                    var draftclass = ""
                    if (ebtler[k].responsible.includes(localStorage.getItem("sicil"))) {
                        var butonlar = `
                        <a id= "deleteebt${ebtler[k].no}" class="taslaklarbutton deleteebt" title="Sil" data-link>&#10006;
                        </a> 
                        <a id= "upebt${ebtler[k].no}" class="taslaklarbutton upebt" title="EBT Yükle">&#x21e7;
                        </a> 
                    `
                    }
                    else {
                        var butonlar = `
                        <a id= "upebt${ebtler[k].no}" class="taslaklarbutton upebt" title="EBT Yükle">&#x21e7;
                        </a> 
                    `
                    }
                }
                else if (ebtler[k].status.includes("Waiting")) { 
                    var draftclass = "draftclass"
                    var butonlar =
                    `
                    <a href= "airedit/${ebtler[k].no}" class="taslaklarbutton airedit" title="Düzenle" data-link>&#x270E
                        </a>
                        <a id= "downebt${ebtler[k].no}" class="taslaklarbutton downebt" title="İade Et">&#8617;
                        </a>
                        <a id= "checkebt${ebtler[k].no}" class="taslaklarbutton checkebt" title="Onaya Gönder">&#8618;
                        </a> 
                    `
                    var statusbuton =
                    `
                    <a id= "changestatus${ebtler[k].no}" class="taslaklarbutton airedit" style = "position: relative; float: right;" title="Düzenle">&#x270E
                        </a>
                    `
                }
                else {
                    var butonlar = ""
                    var statusbuton = ""
                } 
                
            }
            else if (localStorage.getItem("yetki")==2) {
                if (ebtler[k].status.includes("Draft")) {
                    var draftclass = ""
                    var butonlar = `
                        <a href= "airedit/${ebtler[k].no}" class="taslaklarbutton airedit" title="Düzenle" data-link>&#x270E
                        </a>
                        <a id= "deleteebt${ebtler[k].no}" class="taslaklarbutton deleteebt" title="Sil" data-link>&#10006;
                        </a> 
                        <a id= "upebt${ebtler[k].no}" class="taslaklarbutton upebt" title="EBT Yükle">&#x21e7;
                        </a> 
                    `
                }
                else if (ebtler[k].status.includes("Rejected")) {
                    var draftclass = ""
                    var butonlar = `
                    <a href= "airedit/${ebtler[k].no}" class="taslaklarbutton airedit" title="Düzenle" data-link>&#x270E
                        </a>
                        <a id= "upebt${ebtler[k].no}" class="taslaklarbutton upebt" title="EBT Yükle">&#x21e7;
                        </a> 
                    `
                }
             /*    
             yukardaydı pasif yapmak için aldım
             <a id= "deleteebt${ebtler[k].no}" class="taslaklarbutton deleteebt" title="Sil" data-link>&#10006;
                </a>  */
                else if (ebtler[k].status.includes("Checked")) { 
                    var draftclass = "draftclass"
                    var butonlar =
                    `
                        <a id= "downebt${ebtler[k].no}" class="taslaklarbutton downebt" title="İade Et">&#8617;
                        </a>
                        <a id= "approveebt${ebtler[k].no}" class="taslaklarbutton approveebt" title="Onayla">&#10004;
                        </a> 
                    `
                    var statusbuton =
                    `
                    <a id= "changestatus${ebtler[k].no}" class="taslaklarbutton airedit" style = "float: right;" title="Düzenle">&#x270E
                        </a>
                    `
                }
                else {
                    var butonlar = ""
                    var statusbuton = ""
                } 
                
            }


            
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
            <td class = ${draftclass} z-index: ${ebtler[k].no}><span>${ebtler[k].status} ${statusbuton}</span></td> 
            <td z-index: ${ebtler[k].no}>${ebtler[k].responsible}</td>
            <td z-index: ${ebtler[k].no}>${ebtler[k].letters}</td> 
            <td z-index: ${ebtler[k].no} style="width: 200px; text-overflow: ellipsis;" title="${ebtler[k].subject}">${ebtler[k].subject}</td>
            <td z-index: ${ebtler[k].no} style="width: 200px; text-overflow: ellipsis;" title="${ebtler[k].documentname}">${ebtler[k].documentname}</td>
            <td z-index: ${ebtler[k].no} style="width: 200px; text-overflow: ellipsis;" title="${ebtler[k].relatedsection}">${ebtler[k].relatedsection}</td>
            <td z-index: ${ebtler[k].no} style="width: 200px; text-overflow: ellipsis;" title="${ebtler[k].notes}">${ebtler[k].notes}</td> 
            <td z-index: ${ebtler[k].no}>

            <div class="flex-container">
                ${butonlar}   
            </td> 
          
        </tr>
          `;

        }

        var x = `
         <table class="display" id="taslaklar">
            <thead >
            <tr>
                <th><input type="text" style="width: 30px;" id="myInput" myFunction placeholder="Ara" autocomplete="off"><br>No</th>
                <th><input type="text" style="width: 170px;" id="myInput1" myFunction placeholder="Ara" autocomplete="off"><br>Air Code</th>
                <th><input type="text" style="width: 30px;" id="myInput2" myFunction placeholder="Ara" autocomplete="off"><br>U.No</th>
                <th><input type="text" style="width: 30px;" id="myInput3" myFunction placeholder="Ara" autocomplete="off"><br>D.Code</th>
                <th><input type="text" style="width: 30px;" id="myInput4" myFunction placeholder="Ara" autocomplete="off"><br>Ctgry</th>
                <th><input type="text" style="width: 30px;" id="myInput5" myFunction placeholder="Ara" autocomplete="off"><br>Rlvnt</th>
                <th><input type="text" style="width: 30px;" id="myInput6" myFunction placeholder="Ara" autocomplete="off"><br>Grp</th>
                <th><input type="text" style="width: 30px;" id="myInput7" myFunction placeholder="Ara" autocomplete="off"><br>Chptr</th>
                <th><input type="text" style="width: 200px;" id="myInput8" myFunction placeholder="Ara" autocomplete="off"><br>History</th>
                <th><input type="text" style="width: 80px;" id="myInput9" myFunction placeholder="Ara" autocomplete="off"><br>E. Date</th>
                <th><input type="text" style="width: 100px;" id="myInput10" myFunction placeholder="Ara" autocomplete="off"><br>Status</th>
                <th><input type="text" style="width: 40px;" id="myInput11" myFunction placeholder="Ara" autocomplete="off"><br>Owner</th>
                <th><input type="text" style="width: 150px;" id="myInput12" myFunction placeholder="Ara" autocomplete="off"><br>Follow Up</th>
                <th><input type="text" style="width: 200px;" id="myInput13" myFunction placeholder="Ara" autocomplete="off"><br>Subject</th>
                <th><input type="text" style="width: 200px;" id="myInput14" myFunction placeholder="Ara" autocomplete="off"><br>Document Name</th>
                <th><input type="text" style="width: 200px;" id="myInput15" myFunction placeholder="Ara" autocomplete="off"><br>Related Section</th>
                <th><input type="text" style="width: 200px;" id="myInput16" myFunction placeholder="Ara" autocomplete="off"><br>Notes</th>
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