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

        var projegrubu = localStorage.getItem("grup")

        return `
        <form class="form_ebt">
        <h2 class="teal darken-3 white-text center-align"  id="yeniebtekle">Yeni EBT</h2>
        <div class="container">
        
            <div  class="input-field">
            <label for="unitno">Unit No</label><br>
                <select style="width:500px" id="unitno">
                    <option></option>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
            </div><br><br>
            <div>
            <div>
            <label for="chapter">Chapter</label><br>
                <select style="width:500px" id="chapter">
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
                    <option>E</option>
                    <option>A</option>
                    <option>B</option>
                    <option>Y</option>
                    <option>O</option>
                </select>
            </div><br><br>
            <div>
                <label for="relevantto">Relevant to</label><br>
                <select style="width:500px" id="relevantto">
                    <option></option>
                    <option>CP</option>
                    <option>BUK</option>
                </select>
            </div><br><br>
            <div>
            <label for="expecteddate">Expected Response Date</label><br>
                <input type="date" style="width:500px" id="expecteddate" required></input>
            </div><br><br>
            <div>
                <label for="projectgroup">Project Group</label><br>
                <input style="width:500px" id="projectgroup" value= "${projegrubu}" disabled>
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
                <textarea style="width:500px" id="note" rows="5"></textarea>
            </div><br><br>
            <button class="button" ebtkaydet>Kaydet</button>
        </div>
        </div>
        </form>
    `  
        }
        
}

