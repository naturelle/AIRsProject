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



const sfolder2 = "\\\\10.243.22.20\\Birimler\\ngd\\ANS\\Yazışmalar\\120.03[ANS.93] İMALAT DENETİMLERİ\\";
const ifolder = "\\\\10.243.22.16\\Birimler\\Nükleer Tesisler Daire Bsk\\BELGELENDİRME\\2_İmalatçı\\01_İmalatçı Onayı\\"

const sdatabase = "C:\\Users\\1720.NDK\\Desktop\\imalatprogrami\\db\\imalat.db"
const tusesource = "C:\\Users\\1720.NDK\\Desktop\\imalatprogrami\\upload\\"
// const ddatabase = "\\\\192.168.0.140\\Birimler\\Nükleer Tesisler Daire Bsk\\IMALAT_GRUBU\\İBOP Yedek\\Özgün Yedek\\Veritabanı\\"
const ddatabase = "\\\\10.243.22.20\\Birimler\\ngd\\Özgün Güngör\\veritabanı\\";
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
  const sfolder = "\\\\10.243.22.20\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\Vault\\";

  var transporter = nodemailer.createTransport({
    host: "10.243.30.40",
    port: 25,
    secureConnection: false,
    tls: {rejectUnauthorized: false},
  });

  fs.readdirSync(sfolder).forEach(sfile => {
    if (sfile.includes("ANS")) {
      let unitnumber = sfile.slice(10,11)
      let airno = sfile.slice(0,17)
      let aircode = airno.slice(0, 7)
      airno = airno.replace(aircode, "")
      aircode = aircode.replace(".", "")
      airno = airno + "." + aircode

      console.log(unitnumber)
    // let airfolder = "unit"+unitnumber

    // let dfolder = "\\\\10.243.22.20\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\Received\\"+sfile+"\\";
    let dfolder = "\\\\10.243.22.20\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ unitnumber + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\4 RECEIVED Yanıt Alınanlar\\"+sfile+"\\";

    let rev = ""
    if (!fs.existsSync(dfolder)){
      fs.mkdirSync(dfolder, { recursive: true });
    }
    else {
      for (let i = 1; i < 100; i++) {
        dfolder = "\\\\10.243.22.20\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ unitnumber + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\4 RECEIVED Yanıt Alınanlar\\"+sfile+".rev"+i+"\\";
        if (!fs.existsSync(dfolder)){
          fs.mkdirSync(dfolder, { recursive: true });
          rev = "Rev"
          break
        }
      }
    }
    let kopyalama = 0
    if (sfile.includes("Kopyalandı")) {
      kopyalama = 1
    }
    fs.readdirSync(dfolder).forEach(dfile => {
      
      if (sfile == dfile || sfile.includes("Kopyalandı")) {
        kopyalama = 1
      }

  })
  if (kopyalama==0) {
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
          db.all(`SELECT eposta FROM kullanicibos WHERE ${gruplike}`,  
            function(err, rows2){
              let alici = ""
              for (let i = 0; i<rows2.length; i++) {
                alici = rows2[i].eposta + "; " + alici
              }
              var linktikla = "<a href= 'file:///"+dfolder+"' target='_blank'>buraya</a>" 
              var mailOptions = {
                from: 'ansprojeyonetimi@bilgi.ndk.gov.tr',
                to: alici,
                subject: rows[0].grup + " grubuna ait " + airno +" No'lu EBT'ye cevap gelmiştir.",
                html: "<div style='font-family: Calibri, sans-serif'>EBT'ye " + linktikla + " tıklayarak ulaşabilirsiniz.</div>" 
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            })
          }
          else {
            console.log(airno + " numaralı ebt bulunamamıştır!")
          }

      })
      }
    });
    // fs.copyFileSync(sfolder+sfile+"\\",  dfolder) 

    // console.log(sfile + "kopyalandı")
  }
}
  });

 
  // fs.readdirSync(tusesource).forEach(sfile2 => {
  //   let ikincitire2 = sfile2.split("-", 2).join("-").length+1
  //   let ilkbosluk2 = sfile2.slice(ikincitire2, sfile2.length).split(" ", 1).join("").length
  //   let ilktire2 = sfile2.slice(ikincitire2, sfile2.length).split("-", 1).join("").length
  //   var submatch2 
  //   if (ilktire2<ilkbosluk2) {
  //     tirebosluk2=ilktire2
  //   }
  //   else {
  //     tirebosluk2=ilkbosluk2
  //   }
  //   sonuc2 = ikincitire2 + tirebosluk2
  //   sonucfile2 = sfile2.slice(0, sonuc2)
  //   var kopyalama2 = 0;
  //   var matches = sfile2.match(/\((.*?)\)/);
  //   var eslesti = 0
  //   if (sfile2.includes("_Bildirim_") && matches) {
  //       var submatch = matches[1];
  //       var eslesen = sonucfile2
  //       submatch2 = submatch 
  //       eslesti = 1
  //   }
  //   else {
  //       var submatch = sfile2.substring(0,6);
  //       var eslesen = sfile2
  //   }
  //   if (books[0].letters.includes(sonucfile2) || books[0].letters.includes(submatch2)) {
  //   var yıls = submatch.substring(0,2);
  //   yıls = "20" + yıls
  //   var ays = submatch.substring(2,4);
  //   var guns = submatch.substring(4,6);

  //   if (ays == "01" || ays == "02" || ays == "03") {
  //     donem = 1
  //   }
  //   if (ays == "04" || ays == "05" || ays == "06") {
  //     donem = 2
  //   }
  //   if (ays == "07" || ays == "08" || ays == "09") {
  //     donem = 3
  //   }
  //   if (ays == "10" || ays == "11" || ays == "12") {
  //     donem = 4
  //   }
  //   yıldonem = yıls + "-" + donem
  //   if (!tusedest.includes(yıldonem)) {
  //     kopyalama2 = 1
  //   }
  //   fs.readdirSync(tusedest).forEach(dfile2 => {

  //     if (eslesen == dfile2) {
  //       kopyalama2 = 1   
  //     }

  // })
  // if (!eslesen.includes("Kopyalandı") && eslesen.includes(".pdf") && kopyalama2==0) {
  //   if (eslesti == 0) {
  //     fs.copyFileSync(tusesource+"\\"+eslesen,  tusedest+"\\"+eslesen) 
  //     console.log(eslesen + " kopyalandı")
  //     fs.rename(tusesource+"\\"+eslesen, tusesource+"\\Kopyalandı-"+eslesen, function (err) {
  //       if (err) throw err;
  //     });
  //   }
  //   if (eslesti == 1) {
  //     if (!fs.existsSync(tusedest+submatch.replace(".pdf", "").replace("E.", "")+"-EKLERİ\\")){
  //       fs.mkdirSync(tusedest+submatch.replace(".pdf", "").replace("E.", "")+"-EKLERİ\\");
  //       fs.copyFileSync(tusesource+"\\"+eslesen,  tusedest+submatch.replace(".pdf", "").replace("E.", "")+"-EKLERİ\\"+eslesen) 
  //       console.log(eslesen + " kopyalandı")
  //       fs.rename(tusesource+"\\"+eslesen, tusesource+"\\Kopyalandı-"+eslesen, function (err) {
  //         if (err) throw err;
  //       });
  //     }
  //   }
    
  // }
  // }
  // });





  // fs.readdirSync(sfolder2).forEach(sfile => {
  //   let ikincitire = sfile.split("-", 2).join("-").length+1
  //   let ilkbosluk = sfile.slice(ikincitire, sfile.length).split(" ", 1).join("").length
  //   let ilktire = sfile.slice(ikincitire, sfile.length).split("-", 1).join("").length
  //   var kopyalama = 0;
  //   if (ilktire<ilkbosluk) {
  //     tirebosluk=ilktire
  //   }
  //   else {
  //     tirebosluk=ilkbosluk
  //   }
  //   sonuc = ikincitire + tirebosluk
  //   sonucfile = sfile.slice(0, sonuc)
  //   sonucfile = sonucfile + ".pdf"
  //   fs.readdirSync(dfolder).forEach(dfile => {
  //     if (sonucfile == dfile) {
  //       kopyalama =1
  //     }
  // })
  // if (sfile.includes(".pdf") && kopyalama==0) {
  //   fs.copyFileSync(sfolder2+"\\"+sfile,  dfolder+"\\"+sonucfile) 
  // }
  // });

  // let rows = ""
  // try {
  // fs.readdirSync(dfolder).forEach(dfile => {
  //   rows = rows + dfile;
  // })
  // }
  // catch (err) {
  //   console.log(err)
  // }

  // let rows2 = ""
  // try {
  //   fs.readdirSync(ifolder).forEach(dfile => {
  //     if (dfile.includes("TR-İMO")) {
  //       rows2 = rows2 + dfile + ",";
  //     }
  //   })
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }








  // console.log("server is ready")
  // })
}

