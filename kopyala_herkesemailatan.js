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


var sayac=0;
let linktikla = []


const sfolder2 = "\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Yazışmalar\\120.03[ANS.93] İMALAT DENETİMLERİ\\";
const ifolder = "\\\\sp000dfs04.ndk.local\\Birimler\\Nükleer Tesisler Daire Bsk\\BELGELENDİRME\\2_İmalatçı\\01_İmalatçı Onayı\\"

const sdatabase = "C:\\Users\\1720.NDK\\Desktop\\imalatprogrami\\db\\imalat.db"
const tusesource = "C:\\Users\\1720.NDK\\Desktop\\imalatprogrami\\upload\\"
// const ddatabase = "\\\\192.168.0.140\\Birimler\\Nükleer Tesisler Daire Bsk\\IMALAT_GRUBU\\İBOP Yedek\\Özgün Yedek\\Veritabanı\\"
const ddatabase = "\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\Özgün Güngör\\veritabanı\\";
const fs = require('fs');
var fse = require('fs-extra');
const {COPYFILE_EXCL} = fs.constants


// databasekopyala();
// pdfkopyala();
console.log("server is running");
// db.all(`SELECT eposta FROM kullanici WHERE sicil = '0142'`, function(err, rows){
//   console.log(rows[0].eposta)
// })

trypdfkopyala ()
// setInterval(trypdfkopyala, 10*60*1000);
// setInterval(trydatabasekopyala, 24*60*60*1000);
// setInterval(hashsifirla, 10*1000);

// trydatabasekopyala()


function trypdfkopyala() {
  
  try {
    pdfkopyala()
  }
  catch (e) {
    console.log(e)
}
}

function trydatabasekopyala() {
  try {
    databasekopyala()
  }
  catch (e) {
    console.log(e)
}
}

function hashsifirla() {
  var today = new Date();
  var day = today.getDay()
  var hours = today.getHours()
  var minutes = today.getUTCMinutes()
  // console.log(day +" "+ hours +" "+ minutes)
  db.all(`SELECT * FROM kullanici`, function(err, rows){
    let bilgih = rows.length
  if (day == 0) {
    if (sayac==0) {
      sayac = 1
      for (let i = 1; i < bilgih; i++){
          db.run(`UPDATE kullanici SET hash= ? WHERE id = ?;`,
          ["", i], 
          );
      }
      console.log("hash silindi")
    }
  }
  else {
    sayac = 0;
  }
  })
}



function databasekopyala(){
  var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+today.getUTCMinutes()+today.getSeconds();
  fs.copyFileSync(sdatabase,  ddatabase+"("+date+")_imalat1.db") 
}

var islemebasla = 0
function pdfkopyala() {
  // db.all(`SELECT * FROM listele`, function(err, books){
  // var today = new Date();
  // var yıl = today.getFullYear()
  // var ay = today.getMonth()+1

  // if (ay == "1" || ay == "2" || ay == "3") {
  //   yıl1 = 1
  // }
  // if (ay == "4" || ay == "5" || ay == "6") {
  //   yıl1 = 2
  // }
  // if (ay == "7" || ay == "8" || ay == "9") {
  //   yıl1 = 3
  // }
  // if (ay == "10" || ay == "11" || ay == "12") {
  //   yıl1 = 4
  // }
  
// for (let y = 2021; y <= yıl; y++){
  
  // for (let i = 1; i <= 4; i++){
  const sfolder = "\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\Vault\\";

  var transporter = nodemailer.createTransport({
    host: "10.243.30.40",
    port: 25,
    secureConnection: false,
    tls: {rejectUnauthorized: false},
  });
  var linksayi = 0
  var arraysayi = 0
  var islemebasla = 0
  var n = 0

  fs.readdirSync(sfolder).forEach((sfile, index, array) => {

      let unitnumber = sfile.slice(10,11)
      let airno = sfile.slice(0,17)
      let aircode = airno.slice(0, 7)
      airno = airno.replace(aircode, "")
      aircode = aircode.replace(".", "")
      airno = airno + "." + aircode

    // let airfolder = "unit"+unitnumber

    // let dfolder = "\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\Received\\"+sfile+"\\";
    let dfolder = "\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ unitnumber + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\4 RECEIVED Yanıt Alınanlar\\"+sfile+"\\";
 
    let rev = ""

   
    db.all(`SELECT history, responsible, grup FROM ebtler WHERE aircode=?`, 
      [airno], 
      function(err, rows){
        if (rows[0]==undefined) {
          console.log("işlemebaşla ilk = "+islemebasla) 
          islemebasla = 1
          console.log(airno + " numaralı ebt bulunamamıştır!")
          
        }
        console.log("işlemebaşla son = "+islemebasla)
        n = n+1
        if (n == array.length) {
          if (islemebasla == 0) {
            
              fs.readdirSync(sfolder).forEach((sfile, index, array) => {
                if (sfile.includes("ANS")) {
                  let unitnumber = sfile.slice(10,11)
                  let airno = sfile.slice(0,17)
                  let aircode = airno.slice(0, 7)
                  airno = airno.replace(aircode, "")
                  aircode = aircode.replace(".", "")
                  airno = airno + "." + aircode
            
                // let airfolder = "unit"+unitnumber
            
                // let dfolder = "\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\Received\\"+sfile+"\\";
                let dfolder = "\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ unitnumber + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\4 RECEIVED Yanıt Alınanlar\\"+sfile+"\\";
             
                let rev = ""
             
                let kopyalama = 0
            
            
            
            
                if (sfile.includes("Kopyalandı")) {
                  kopyalama = 1
                  arraysayi = arraysayi + 1
                }
            
              //   fs.readdirSync(dfolder).forEach(dfile => {
                  
              //     if (sfile == dfile || sfile.includes("Kopyalandı")) {
              //       kopyalama = 1
              //     }
            
              // })
              
              if (kopyalama==0) {
                if (!fs.existsSync(dfolder)){
                  fs.mkdirSync(dfolder, { recursive: true });
                }
                else {
                  for (let i = 1; i < 100; i++) {
                    dfolder = "\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ unitnumber + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\4 RECEIVED Yanıt Alınanlar\\"+sfile+".rev"+i+"\\";
                    if (!fs.existsSync(dfolder)){
                      fs.mkdirSync(dfolder, { recursive: true });
                      rev = "Rev"
                      break
                    }
                  }
                }
            
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
                fse.copy(sfolder+sfile+"\\", dfolder, function (err) {
            
                  if (err) {
                    console.error(err);
            
                  } else {
                    db.all(`SELECT history, responsible, grup FROM ebtler WHERE aircode=?`, 
                    [airno], 
                    function(err, rows){
                      if (rows[0]!==undefined) {
                        var historyyeni = rows[0].history
                        var link = "<li><a href= 'file:///"+dfolder+"' target='_blank'>"+rev+"Received ["+date+"]</a></li>" 
                        historyyeni = link + historyyeni
                        db.run(`UPDATE ebtler SET  status= ?, history= ? WHERE aircode = ?;`,
                          [rev+"Received", historyyeni, airno], 
                        );
                        console.log(sfile + " kopyalandı")
                        fs.rename(sfolder+sfile+"\\", sfolder+sfile+"-Kopyalandı\\", function (err) {
                          if (err) {
                            console.error(err);
                          }
                        })
                      let gruplike = "grup LIKE '%" +rows[0].grup + "%'"
                        
                      //   db.all(`SELECT eposta FROM kullanicibos WHERE ${gruplike}`, 
                      db.all(`SELECT eposta FROM kullanicibos`, 
                        function(err, rows2){
                          let alici = ""
                          for (let j = 0; j<rows2.length; j++) {
                            alici = rows2[j].eposta + "; " + alici
                          }
            
                          linktikla.push("<a href= 'file:///"+dfolder+"' target='_blank'>"+airno+"</a>")
                          linksayi = linksayi + 1
                         
            
                          console.log(arraysayi)
                          console.log(linksayi)
                          console.log(array.length)
                          if (linksayi == (array.length - arraysayi)) {
                            if (linktikla.length>1) {
                              var linktiklastring = linktikla.toString().replace(/,/g, "<br>")
                              var ebt = "EBT'lere"
                            }
                            else {
                              var linktiklastring = linktikla.toString()
                              var ebt = "EBT'ye"
                            }
                            var today = new Date();
                            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
                            var mailOptions = {
                              from: 'ansprojeyonetimi@bilgi.ndk.gov.tr',
                              to: alici,
                              subject: date + " tarihli APŞ cevap listesi",
                              html: "<div style='font-family: Calibri, sans-serif'> "+ ebt + " üzerine tıklayarak ulaşabilirsiniz. <br><br> EBT takip programı için <a href= 'http://10.243.22.15:5000/' target='_blank'>Buraya</a> tıklayabilirsiniz. <br><br>" + linktiklastring + " </div>" 
                            };
                            transporter.sendMail(mailOptions, function(error, info){
                              if (error) {
                                console.log(error);
                              } else {
                                console.log('Email sent: ' + info.response);
                              }
                            });
                          }
                          
                          
            
                        })
                      }
                      else {
                        console.log(airno + " numaralı ebt bulunamamıştır!")
                      }
            
                  })
                  }
                });
              }
             
            }
            
            
            
              });
          }
          else {
            console.log("bulamadı bazı ebtleri")
          }
        }

      })
  
  
  })





}

