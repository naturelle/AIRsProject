import AbstractView from "./AbstractView.js";
import { router } from "../index.js"

export default class extends AbstractView {

    constructor(params) {
        super(params);
        this.setTitle("EBT Görüntüle " + params.id);
        this.postId = params.id;
    }


   
    
    async getHtml() {
        var x
      //  await $.post("/ebtduzenle", {ebtno:`${this.postId}`, sicil:`${localStorage.getItem("sicil")}`}, function (books){
        await $.post("/ebtduzenle", {ebtno:`${this.postId}`,yetki:`${localStorage.getItem("yetki")}`, grup:`${localStorage.getItem("grup")}`}, function (books){
            x = books
        }) 


        if (x == "") {
            return `
                <h2>Bu EBT'yi düzenleme yetkiniz bulunmamaktadır! &#9785;</h2>
            `
        }
        // else if (x[0].status.includes("Waiting")) {
        //     return `
        //         Bu EBT onaya gönderildiği için düzenlenememektedir!
        //     `

        // }
        else {

            var uniteno = `
            <option></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            `
            uniteno = uniteno.replace("<option>"+x[0].uniteno+"</option>", "")

            var uniteno = `
            <option selected>${x[0].uniteno}</option>` + uniteno

            var relevantto = `
            <option></option>
            <option>CL</option>
            <option>CP</option>
            `
            relevantto = relevantto.replace(">"+x[0].relevant, " selected>"+x[0].relevant);

            if (relevantto.includes("CL")) {
                var documentcode = `
                <option></option>
                <option>B05 (Preliminary Safety Analysis Report)</option>
                <option>B06 (Probabilistic Safety Assessment Level 1)</option>
                <option>B07 (Probabilistic Safety Assessment Level 2)</option>
                <option>B08 (Construction Program)</option>
                <option>B09 (Construction Quality Management System Manual)</option>
                <option>B09 (Construction Quality Management System Quality Plan)</option>
                <option>B10 (Configuration Management System Manual)</option>
                <option>B10 (Configuration Management System Plan)</option>
                <option>B11 (Environmental Monitoring Program)</option>
                <option>B12 (Site Parameters Monitoring Program)</option>
                <option>B13 (Personnel Training and Qualification Program)</option>
                <option>B14 (Design Information Questionaire)</option>
                <option>B15 (Report on Differences from Reference Plant)</option>
                <option>B16 (Physical Protection Program)</option>
                <option>B17 (Differences in data between Preliminary Safety Analysis Report of Akkuyu NPP Unit 1 and Unit 2)</option>
                `
                documentcode = documentcode.replace(">"+x[0].documentcode, " selected>"+x[0].documentcode);
            }
            else if (relevantto.includes("CP")) {
                var documentcode = `
                <option></option>
                <option>B05 (Final Design Information of Systems and Components)</option>
                <option>B06 (Quality Assurance Documents)</option>
                <option>B07 (Commissioning Program)</option>
                <option>B08 (Test Results Prior to Commissioning)</option>
                <option>B09 (Commissioning Organisation and Personnel)</option>
                <option>B10 (Operational Limits and Conditions)</option>
                <option>B11 (Operation Procedures of Systems and Components)</option>
                <option>B12 (Maintenance and Repairs Program)</option>
                <option>B13 (Fuel and Core Management Program)</option>
                <option>B14 (Waste Management Program)</option>
                <option>B15 (Ageing Management Program)</option>
                <option>B16 (Equipment Qualification Program)</option>
                <option>B17 (Fire Protection Program)</option>
                <option>B18 (Chemical Control Program)</option>
                <option>B19 (Nuclear Material Accounting and Control Program)</option>
                <option>B20 (Nuclear Security Program)</option>
                <option>B21 (Emergency Plans)</option>
                <option>B22 (Safety Performance Monitoring Program)</option>
                <option>B23 (Surveillance and In-service Inspection Program)</option>
                <option>B24 (Radiation Protection Program)</option>
                <option>B25 (Personnel Training and Qualification Program)</option>
                `
                documentcode = documentcode.replace(">"+x[0].documentcode, " selected>"+x[0].documentcode);
            }

            

            if (x[0].documentcode == "B05") {
                var chapterdisabled = ""
            }
            else {
                var chapterdisabled = "disabled"
            }

            var chapter = `
            <option></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>PSA</option>
            `

            chapter = chapter.replace(">"+x[0].chapter, " selected>"+x[0].chapter);
 
            var category = `
            <option></option>
            <option>E (Eksik Bilgi)</option>
            <option>A (Düzenleme Gerektiren (Zorunlu))</option>
            <option>B (Düzenleme Gerektirmeyen (Zorunlu Değil))</option>
            <option>Y (Yazınsal Hata)</option>
            <option>O</option>
            `
            category = category.replace(">"+x[0].category, " selected>"+x[0].category);



            

            if (x[0].letters == "" || x[0].letters == null) {
                var followupchecked = ""
                var followupdisabled = "disabled"
                var followupvalue = ""
            }
            else {
                var followupchecked = "checked"
                var followupdisabled = ""
                var followupvalue = x[0].letters
            }


        return `
        <form class="form_ebt">
        <h2  id="yeniebtekle">${x[0].aircode} Numaralı EBT Düzenle</h2>

        
        <div>
            <label for="aircode">Air Code</label><br>
            <input style="width:500px" id="aircode" value= "${x[0].aircode}" disabled>
            </input>
        </div><br><br>
        <div>
        <label for="unitno">Unit No</label><br>
            <select style="width:500px" id="unitno">
                ${uniteno}
            </select>
        </div><br><br>
        <div>
        <label for="relevantto">Relevant to</label><br>
            <select style="width:500px" id="relevantto">
                ${relevantto}
            </select>
        </div><br><br>
        <div  class="input-field">
        <label for="documentcode">Document Code</label><br>
            <select style="width:500px" id="documentcode">
                ${documentcode}
            </select>
        </div><br><br>
        <div>
        <label for="chapter">Chapter</label><br>
            <select style="width:500px" id="chapter" ${chapterdisabled}>
                ${chapter}
            </select>
        </div><br><br>
        <div>
        <label for="category">Category of Issue</label><br>
            <select style="width:500px" id="category">
                ${category}
            </select>
        </div><br><br>
      
        <div>
        <label for="expecteddate">Expected Response Date</label><br>
            <input type="date" style="width:500px" id="expecteddate" value ="${x[0].expecteddate}"></input>
        </div><br><br>
        <div>
            <label for="projectgroup">Project Group</label><br>
            <input style="width:500px" id="projectgroup" value= "${x[0].grup}" disabled>
            </input>
        </div><br><br>
        <div>
            <label for="airtitle">AIR Title</label><br>
            <textarea style="width:500px" id="airtitle" placeholder="(Brief but concise title for the AIR)" rows="5">${x[0].subject}</textarea>
        </div><br><br>
        <div>
            <label for="documentname">Document Name</label><br>
            <textarea style="width:500px" id="documentname" placeholder="(Title of document for which the information is requested, including its code and revision number)" rows="5">${x[0].documentname}</textarea>
        </div><br><br>
        <div>
            <label for="relatedsection">Related Section</label><br>
            <textarea style="width:500px" id="relatedsection" placeholder="(The exact address of the text in the document on which the AIR is raised, such as the lowest level heading or paragraph number, etc.)" rows="5">${x[0].relatedsection}</textarea>
        </div><br><br>
        <div>
            <label for="note">Note</label><br>
            <textarea style="width:500px" id="note" rows="5">${x[0].notes}</textarea>
        </div><br><br>
        <div  class="input-field">
            <label for="partiallycheck">Follow Up</label>
            <input type="checkbox" id="followupcheck" ${followupchecked} >
            </input>
        </div><br><br> 
        <div>
            <label for="projectgroup">Follow Up AIR</label><br>
            <input style="width:500px" id="followupair" value = "${followupvalue}"  ${followupdisabled}>
            </input>
        </div><br><br> 
        <button class="button" ebtupdate>Kaydet</button>
        </div>
        </form>

`
        }
    }
}

