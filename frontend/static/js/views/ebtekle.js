import AbstractView from "./AbstractView.js";
import { loginhash } from "../index.js";
export default class extends AbstractView {

    constructor(params) {
        super(params);
        this.setTitle("Yeni EBT");
        this.postId = params.id;
    }
 
    async getHtml() {
        document.getElementById("ebtekle").className += "active";
        var x

        var projectgroup = ""

        var projegrubu = localStorage.getItem("grup").split(";")

        for (let i = 0; i<projegrubu.length; i++) {
            projectgroup = projectgroup + "<option>"+projegrubu[i]+"</option>"   
        }


        return `
        <form class="form_ebt">
        <h2 class="teal darken-3 white-text center-align"  id="yeniebtekle">Yeni EBT</h2>
        <div class="container">
         
            <div  class="input-field">
            <label for="unitno">Unit No</label><br>
                <select style="width:500px" id="unitno">
                    <option></option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
            </div><br><br>

            <div>
            <label for="relevantto">Relevant to</label><br>
                <select style="width:500px" id="relevantto">
                    <option></option>
                    <option>CL</option>
                    <option>CP</option>
                </select>
            </div><br><br>
            <div  class="input-field">
            <label for="documentcode">Document Code</label><br>
                <select style="width:500px" id="documentcode">
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
                </select>
            </div><br><br>
            <div>
            <label for="chapter">Chapter</label><br>
                <select style="width:500px" id="chapter" disabled>
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
                </select>
            </div><br><br>
            <div>
            <label for="category">Category of Issue</label><br>
                <select style="width:500px" id="category">
                    <option></option>
                    <option>E (Eksik Bilgi)</option>
                    <option>A (Düzenleme Gerektiren (Zorunlu))</option>
                    <option>B (Düzenleme Gerektirmeyen (Zorunlu Değil))</option>
                    <option>Y (Yazınsal Hata)</option>
                    <option>O</option>
                </select>
            </div><br><br>
           
            <div>
            <label for="expecteddate">Expected Response Date</label><br>
                <input type="date" style="width:500px" id="expecteddate" required></input>
            </div><br><br>
            <div>
                <label for="projectgroup">Project Group</label><br>
                <select style="width:500px" id="projectgroup">
                    ${projectgroup}
                </select>
                </input>
            </div><br><br>
            <div>
                <label for="airtitle">AIR Title</label><br>
                <textarea style="width:500px" id="airtitle" placeholder="(Brief but concise title for the AIR)" rows="5"></textarea>
            </div><br><br>
            <div>
                <label for="documentname">Document Name</label><br>
                <textarea style="width:500px" id="documentname" placeholder="(Title of document for which the information is requested, including its code and revision number)" rows="5"></textarea>
            </div><br><br>
            <div>
                <label for="relatedsection">Related Section</label><br>
                <textarea style="width:500px" id="relatedsection" placeholder="(The exact address of the text in the document on which the AIR is raised, such as the lowest level heading or paragraph number, etc.)" rows="5"></textarea>
            </div><br><br>
            <div>
                <label for="note">Note</label><br>
                <textarea style="width:500px" id="note" placeholder="(Eklemek istediğiniz bir şey varsa buraya not alabilirsiniz)" rows="5"></textarea>
            </div><br><br>
            <div  class="input-field">
                <label for="partiallycheck">Follow Up</label>
                <input type="checkbox" id="followupcheck" value="1">
                </input>
            </div><br><br> 
            <div>
                <label for="projectgroup">Follow Up AIR</label><br>
                <input style="width:500px" id="followupair" disabled>
                </input>
            </div><br><br> 
            <button class="button" ebtkaydet>Kaydet</button>
        </div>
        </div>
        </form>
    `  
        }
       
        
}

