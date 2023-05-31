var express = require(`express`);
var app = express();
var sqlite3 = require(`sqlite3`);
var db = new sqlite3.Database(`db/imalat.db`);
var alertflag = 0
var bodyParser = require(`body-parser`);
const bcrypt = require('bcrypt');
const saltRounds = 10;

var nodemailer = require('nodemailer');

app.use (express.static(__dirname + `/proje`));
app.use (bodyParser.urlencoded({extended : false}));


db.all(`select * from ebtler`, function(err, rows){
    for(let i=0; i<rows.length; i++) {
      var docx = ".docx"
      if (rows[i].history=="") {
        if (rows[i].status.includes("Closed-") || rows[i].status.includes("CLOSED -")) {
          var statusfolder = "5 CLOSED - Olumsuz kapatılanlar"
        }
        if (rows[i].status.includes("Closed+") || rows[i].status.includes("CLOSED +")) {
          var statusfolder = "6 CLOSED + Olumlu kapatılanlar"
        }
        if (rows[i].status.includes("Sent") || rows[i].status.includes("SENT")) {
          var statusfolder = "3 SENT APŞ'ye Gönderilenler"
        }
        if (rows[i].status.includes("Received") || rows[i].status.includes("RECEIVED")) {
          var statusfolder = "4 RECEIVED Yanıt Alınanlar"
          docx = "" 
        }
        statusfolder = statusfolder.replace("'",'&apos;');
  
    
      var aircode = rows[i].aircode
       /*  Link verme 
        var aircodeeski = aircode
        let airno = aircode.slice(aircode.length-7, aircode.length)
        aircode = aircode.replace(airno, "")
        airno = airno.replace(".", "")
        aircode = airno + "." + aircode + "-" + rows[i].grup.split("<br>")[0] */
  
  
        if (rows[i].group == "UJV") {
          var historyyeni = `<li><a href= 'file://///sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\${rows[i].uniteno}. Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\UJV\\${statusfolder}\\' target='_blank'>${rows[i].status}</a></li>` 
         /*  if (fs.existsSync(historyyeni)){
            for (let m=1; m<10; m++) {
              var historyyeni = `<li><a href= 'file://///sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\${rows[i].uniteno}. Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\UJV\\${statusfolder}\\${aircode}${docx}.rev${m}\\' target='_blank'>${aircode}.rev${m}</a></li>` 
              if (!fs.existsSync(historyyeni)){
                break
              }
            }
          }  */      
        }
        else {
          var historyfolder = `\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\${rows[i].uniteno}. Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\${statusfolder}\\` 
        /*   if (fs.existsSync(historyfolder)){
           
            for (let m=1; m<10; m++) {
              var historyfolder = `\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\${rows[i].uniteno}. Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\${statusfolder}\\${aircode}${docx}.rev${m}\\`
              if (!fs.existsSync(historyfolder)){
                if (m == 1) {
                  var historyfolder = `\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\${rows[i].uniteno}. Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\${statusfolder}\\${aircode}${docx}\\`
                }
                else {
                  var historyfolder = `\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\${rows[i].uniteno}. Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\${statusfolder}\\${aircode}${docx}.rev${m-1}\\`
                }
                break
              }
            }
          }  */ 
          var historyyeni = `<li><a href= 'file:///${historyfolder}' target='_blank'>${rows[i].status}</a></li>`
  
        }
        db.run(`UPDATE ebtler SET history = ?
        WHERE aircode = ?`,
        [historyyeni, rows[i].aircode], 
          function(err, rows){
              
          }
        );
      }
      else if (rows[i].history.match("\\d{2}.\\d{2}.\\d{4}")) {
        if (rows[i].status.includes("Closed-") || rows[i].status.includes("CLOSED -")) {
          var statusfolder = "5 CLOSED - Olumsuz kapatılanlar"
        }
        if (rows[i].status.includes("Closed+") || rows[i].status.includes("CLOSED +")) {
          var statusfolder = "6 CLOSED + Olumlu kapatılanlar"
        }
        if (rows[i].status.includes("Sent") || rows[i].status.includes("SENT")) {
          var statusfolder = "3 SENT APŞ'ye Gönderilenler"
        }
        if (rows[i].status.includes("Received") || rows[i].status.includes("RECEIVED")) {
          var statusfolder = "4 RECEIVED Yanıt Alınanlar"
          docx = "" 
        }
        statusfolder = statusfolder.replace("'",'&apos;');
  
    
      var aircode = rows[i].aircode
   
  
        if (rows[i].group == "UJV") {
          var historyyeni = `<li><a href= 'file://///sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\${rows[i].uniteno}. Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\UJV\\${statusfolder}\\' target='_blank'>${rows[i].status}}</a></li>${rows[i].history}`  
           
        }
        else {
          var historyfolder = `\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\${rows[i].uniteno}. Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\${statusfolder}\\` 
       
          var historyyeni = `<li><a href= 'file:///${historyfolder}' target='_blank'>${rows[i].status}</a></li>${rows[i].history}`
  
        }
        db.run(`UPDATE ebtler SET history = ?
        WHERE aircode = ?`,
        [historyyeni, rows[i].aircode], 
          function(err, rows){
              
          }
        );
        
      }
    }
  }) 