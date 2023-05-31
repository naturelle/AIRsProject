import AbstractView from "./AbstractView.js";
import { router } from "../index.js"

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle(this.postId+" Sınavı Soruları");
    }

    async getHtml() {

        var ebtler
        var secilenegitim = this.postId
        if (document.getElementById("ebtler")) {
            document.getElementById("ebtler").remove();
        }

        await $.post("/secilenegitim", {secilenegitim:`${secilenegitim}`, sicil:`${localStorage.getItem("sicil")}`, kullanici: `${localStorage.getItem("isim") + " " + localStorage.getItem("soyisim")}`,
        sicil: `${localStorage.getItem("sicil")}`, grup:`${localStorage.getItem("grup")}`}, function (books){
            ebtler= books
        }) 
        if (ebtler == "failure") {
            alert("Bu sınav daha önceden tamamlanmıştır!")
            const navigateTo = url => {
                history.pushState(null, null, url);
                router();
            };
            navigateTo("/exams")
        }
        else if (ebtler == "odakdegil") {
            alert("Bu sınavı yapmaya yetkiniz bulunmamaktadır!")
            const navigateTo = url => {
                history.pushState(null, null, url);
                router();
            };
            navigateTo("/exams")
        }
        else if (ebtler == "") {
            alert("Bu sınava ait soru bulunamamıştır!")
            const navigateTo = url => {
                history.pushState(null, null, url);
                router();
            };
            navigateTo("/exams")
        }
        else if (ebtler ==  "Sayfa bulunamadı!") {
            alert("Sayfa bulunamadı!")
            const navigateTo = url => {
                history.pushState(null, null, url);
                router();
            };
            navigateTo("/exams")
        }
        else {
            var satirlar = ""
            for (let k = 0; k < ebtler.length; k++){
    
                
                satirlar += `
                <div>
                    Soru ${k+1}: ${ebtler[k].soru}
                </div>
                <label>A) ${ebtler[k].a}
                    <input type="radio" id = "${secilenegitim}_${ebtler[k].no}_A" name="radio${k}" value="A">
                    <span class="checkmark"></span>
                </label><br>
                <label>B) ${ebtler[k].b}
                    <input type="radio" id = "${secilenegitim}_${ebtler[k].no}_B" name="radio${k}" value="B">
                    <span class="checkmark"></span>
                </label><br>
                <label>C) ${ebtler[k].c}
                    <input type="radio" id = "${secilenegitim}_${ebtler[k].no}_C" name="radio${k}" value="C">
                    <span class="checkmark"></span>
                </label><br>
                <label>D) ${ebtler[k].d}
                    <input type="radio" id = "${secilenegitim}_${ebtler[k].no}_D" name="radio${k}" value="D">
                    <span class="checkmark"></span>
                </label><br>
                <label>E) ${ebtler[k].e}
                    <input type="radio" id = "${secilenegitim}_${ebtler[k].no}_E" name="radio${k}" value="E">
                    <span class="checkmark"></span>
                </label><br><br>
                
    
    
    
              `;
    
            }
    
            var x = `
            <h1>
                ${ebtler[0].egitimadi} test soruları
            </h1>
                ${satirlar}
            <button gonder class="btn btn-primary">Gönder</button>
        `
            return x;
        }

    }
}