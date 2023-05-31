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
let gruparray = []
let ebtarray = []


const sfolder2 = "\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Yazışmalar\\120.03[ANS.93] İMALAT DENETİMLERİ\\";
const ifolder = "\\\\sp000dfs04.ndk.local\\Birimler\\Nükleer Tesisler Daire Bsk\\BELGELENDİRME\\2_İmalatçı\\01_İmalatçı Onayı\\"

const sdatabase = "C:\\Users\\1866.NDK\\Desktop\\airsapp\\db\\imalat.db"
const tusesource = "C:\\Users\\1720.NDK\\Desktop\\imalatprogrami\\upload\\"
// const ddatabase = "\\\\192.168.0.140\\Birimler\\Nükleer Tesisler Daire Bsk\\IMALAT_GRUBU\\İBOP Yedek\\Özgün Yedek\\Veritabanı\\"
const ddatabase = "\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\Ebru Ekici\\veritabanı\\";
const fs = require('fs');
var fse = require('fs-extra');
const {COPYFILE_EXCL} = fs.constants
var transporter = nodemailer.createTransport({
  host: "10.243.30.40",
  port: 25,
  secureConnection: false,
  tls: {rejectUnauthorized: false},
});

console.log("dongu is running");


// setInterval(trypdfkopyala, 10*60*1000);
// setInterval(trydatabasekopyala, 24*60*60*1000);
setInterval(bekleyenebt, 10*1000);

let dayreferans = ""
bekleyenebt()



function bekleyenebt(){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+today.getUTCMinutes()+today.getSeconds();
  // fs.copyFileSync(sdatabase,  ddatabase+"("+date+")_imalat.db") 
  const d = new Date();
  let day = d.getDay()
  let hour = d.getHours();
if (day !== dayreferans && 9 <= hour) {

  db.all(`SELECT history, grup, aircode, subject FROM ebtler WHERE status LIKE '%Received%'`, 
  function(err, rows){
    db.all(`SELECT eposta, grup FROM kullanici`, 
    function(err, rows2){

      for (i=0; i<rows2.length; i++) {

        let ilgiliebt = ""
        let ilgiligrup = ""
        for (j=0; j<rows.length; j++) {

          var currentDate = new Date();
          var selectedDate = rows[j].history.match(/\[(.*?)\]/);

          // bu kod 30 gün süreyle yanında tarih bulunmayan eski ebtler için çalıştırılmalıdır.
          // if (selectedDate == null) {
          //   if ( rows[j].grup == rows2[i].grup.split(";")[0]) {
          //     // if (diffDays % 30 === 0 && rows[j].grup == rows2[i].grup.split(";")[0]) {
          //       ilgiliebt = rows[j].aircode + ";" + ilgiliebt
                
          //     }
          // }

          if (!selectedDate == null) {
            selectedDate = selectedDate[1]
            var timeDiff = Math.abs(currentDate.getTime() - new Date(selectedDate));
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));


              // if (diffDays >= 30 && rows2[i].grup.includes(rows[j].grup)) {
              if (diffDays % 30 === 0 && rows2[i].grup.includes(rows[j].grup)) {
                ilgiliebt = rows[j].aircode + ";" + ilgiliebt
                if (!ilgiligrup.includes(rows[j].grup)) {
                  ilgiligrup = rows[j].grup + ", " + ilgiligrup
                }

              }


          }
          dayreferans = day

        }


        if (ilgiliebt.endsWith(";")) {
          ilgiliebt = ilgiliebt.slice(0, -1);
        }
        if (ilgiligrup.endsWith(", ")) {
          ilgiligrup = ilgiligrup.slice(0, -2);
        }


        if (ilgiliebt !== "" && rows2[i].eposta !== "") {
                  var mailOptions = {
                    from: 'ansprojeyonetimi@bilgi.ndk.gov.tr',
                    to: rows2[i].eposta,
                    // to: "ozgun.gungor@ndk.gov.tr",
                    subject: "İşlem bekleyen EBT listesi",
                    html: `
                    <div style='font-family: Calibri, sans-serif'> Bu bir hatırlatma mailidir. ${ilgiligrup} grubuna/gruplarına ait aşağıdaki linkte yer alan EBT'ye/EBT'lere 30 günden fazla süreyle işlem yapılmamıştır. EBT cevaplarının ilgili kişiler tarafından en kısa sürede değerlendirilmesi rica olunur.<br><br>
                    Linkler Firefox tarayıcısyla ve programa giriş yaptıktan sonra açılabilmektedir. <br><br>
                    <a href= 'http://10.243.22.15:5000/waiting/${ilgiliebt}' target='_blank'>EBT Listesi</a></div>
                    
                    `

                  };
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    } 
                  })
        }

      }
    })
  })
}
else {
  console.log("Bugünlük paydos!")
}
}







































 
//   if (linksayi == (array.length - arraysayi)) {
//   for (let j = 0; j<rows2.length; j++) {
//     // alici = rows2[j].eposta + "; " + alici
//     alici = rows2[j].eposta 
//     ebtarray = []
//     for (let k = 0; k<linktikla.length; k++) {
//       if (rows2[j].grup.includes(gruparray[k])) {
//         ebtarray.push(linktikla[k])
//       }

//       if (k == linktikla.length-1 && ebtarray.length !== 0) {
//         if (ebtarray.length>1) {
//           var linktiklastring = ebtarray.toString().replace(/,/g, "<br>")
//           var ebt = "EBT'lere"
//         }
//         else {
//           var linktiklastring = ebtarray.toString()
//           var ebt = "EBT'ye"
//         }
//         var today = new Date();
//         var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
//         var mailOptions = {
//           from: 'ansprojeyonetimi@bilgi.ndk.gov.tr',
//           to: alici,
//           subject: date + " tarihli APŞ cevap listesi",
//           html: "<div style='font-family: Calibri, sans-serif'> "+ ebt + " üzerine tıklayarak ulaşabilirsiniz. <br><br> EBT takip programı için <a href= 'http://10.243.22.15:5000/' target='_blank'>Buraya</a> tıklayabilirsiniz. <br><br>" + linktiklastring + " </div>" 
//         };
//         console.log(mailOptions)
//         transporter.sendMail(mailOptions, function(error, info){
//           if (error) {
//             console.log(error);
//           } else {
//             console.log('Email sent: ' + info.response);
//           }
//         });

//       }




//     }

//   }
  
// }    

// })





// }
