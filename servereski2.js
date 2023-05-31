var express = require(`express`);
var app = express();
var sqlite3 = require(`sqlite3`);
var db = new sqlite3.Database(`db/imalat.db`);
var alertflag = 0
var bodyParser = require(`body-parser`);
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fetch = require("node-fetch");
const siteUrl = "https://ndk.org.tr/tr/services-en/app-of-manufac-for-nuclear-facilities/272-nukleer-tesislerin-yetkilendirilmesi/1970-approved-manufacturer-organization-list.html";
// const axios = require("axios");
// const fetchData = async () => {
//   const result = await axios.get(siteUrl);
//   console.log(result)
//   return cheerio.load(result.data);
// };
// axios(fetchData)

var nodemailer = require('nodemailer');

app.use (express.static(__dirname + `/proje`));
app.use (bodyParser.urlencoded({extended : false}));

// var today = new Date();
// var yıl = today.getFullYear()
// var ay = today.getMonth()+1
var sayac=0;



const sfolder2 = "\\\\10.243.22.20\\Birimler\\ngd\\ANS\\Yazışmalar\\120.03[ANS.93] İMALAT DENETİMLERİ\\";
const ifolder = "\\\\10.243.22.16\\Birimler\\Nükleer Tesisler Daire Bsk\\BELGELENDİRME\\2_İmalatçı\\01_İmalatçı Onayı\\"
const dfolder = "\\\\10.243.22.16\\Birimler\\Nükleer Tesisler Daire Bsk\\IMALAT_GRUBU\\İBOP Yedek\\Özgün Yedek\\tümyıllar\\"
const sdatabase = "C:\\Users\\1720.NDK\\Desktop\\imalatprogrami\\db\\imalat.db"
const tusesource = "C:\\Users\\1720.NDK\\Desktop\\imalatprogrami\\upload\\"
// const ddatabase = "\\\\192.168.0.140\\Birimler\\Nükleer Tesisler Daire Bsk\\IMALAT_GRUBU\\İBOP Yedek\\Özgün Yedek\\Veritabanı\\"
const ddatabase = "\\\\10.243.22.20\\Birimler\\ngd\\Özgün Güngör\\veritabanı\\";
const fs = require('fs');
const {COPYFILE_EXCL} = fs.constants


// databasekopyala();
// pdfkopyala();
console.log("server is running");
// db.all(`SELECT eposta FROM kullanici WHERE sicil = '0142'`, function(err, rows){
//   console.log(rows[0].eposta)
// })

trypdfkopyala ()
listele()
linkekle()
setInterval(trypdfkopyala, 10*60*1000);
setInterval(trydatabasekopyala, 24*60*60*1000);
setInterval(hashsifirla, 10*1000);
setInterval(listele, 2*60*1000);
setInterval(sertifikahatirlat, 50*60*1000);
setInterval(denetimcagrisi, 10*60*1000);
denetimcagrisi()
sertifikahatirlat()

trydatabasekopyala()




function denetimcagrisi() {


  db.all(`SELECT * FROM denetimcagrisi`, function(err, books){

    eskicagrilar = books[0].denetim
  try {
    fs.readdirSync("\\\\10.243.22.20\\Birimler\\ngd\\ANS\\Yazışmalar\\120.03[ANS.93] İMALAT DENETİMLERİ\\İMALAT DENETİMLERİ-2022\\").forEach(dfile => {
      if (dfile.includes("ÇAĞRISI") && !eskicagrilar.includes(dfile)) {
        eskicagrilar = eskicagrilar + dfile
        var mailOptions = {
          from: 'imalat@bilgi.ndk.org.tr',
          to: 'ozgun.gungor@ndk.gov.tr',
          subject:  "Denetim Çağrısı",
          text: dfile
        };
      
        var transporter = nodemailer.createTransport({
          host: "10.243.30.40",
          port: 25,
          secureConnection: false,
          tls: {rejectUnauthorized: false},
        });

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            response.send("Başarısız")
          } else {
            console.log('Email sent: ' + info.response);
            response.send("Başarılı")
          }
        });
      }

    })
    }
    catch (err) {
      console.log(err)
    }
    db.run(`UPDATE denetimcagrisi SET denetim= ? WHERE id = 1;`,
    [eskicagrilar], 
    );
  })

}

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

function sertifikahatirlat() {
  var today = new Date();
  var day = today.getDay()
  var hours = today.getHours()
  var minutes = today.getUTCMinutes()
  // console.log(day +" "+ hours +" "+ minutes)
  db.all(`SELECT * FROM sertifikalar`, function(err, rows){
    let bilgih = rows.length
  if (9<hours<11) {
    if (sayac==0) {
      sayac = 1
      for (let i = 0; i < bilgih; i++){
          if (rows[i].step == "-" && rows[i].remarks== "") {
            console.log("sicil= " + rows[i].reviewer)
          }
      }
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
  fs.copyFileSync(sdatabase,  ddatabase+"("+date+")_imalat.db") 
}


function linkekle() {
  db.all(`SELECT * FROM imalat`, function(err, books){
  let dbrows = books.length;
  const dfolder = "\\\\10.243.22.16\\Birimler\\Nükleer Tesisler Daire Bsk\\IMALAT_GRUBU\\İBOP Yedek\\Özgün Yedek\\tümyıllar\\"
  let rows = ""
  try {
  fs.readdirSync(dfolder).forEach(dfile => {
    rows = rows + dfile;
  })
  }
  catch (err) {
    console.log(err)
  }
  for (let k = 0; k < dbrows; k++){

    var notstr = ""
    let myString1 = books[k].notificationletter;
    if (myString1 !== "") {
      let veri3 = myString1.split("<br>")
      var l = veri3.length;
      for (let i=0; i<l; i++){
        // if (veri3[i].includes("-")) {
        yıl = veri3[i].substring(0, 2);
        yılint = parseInt(yıl)
        yıl = "20"+yıl
        ay = veri3[i].substring(2, 4);

        if  (yılint > 20) {

          if (ay == "01" || ay == "02" || ay == "03") {
            yıl = yıl  +"\\" + yıl + "-1"
          }
          if (ay == "04" || ay == "05" || ay == "06") {
            yıl = yıl  +"\\" + yıl + "-2"
          }
          if (ay == "07" || ay == "08" || ay == "09") {
            yıl = yıl  +"\\" + yıl + "-3"
          }
          if (ay == "10" || ay == "11" || ay == "12") {
            yıl = yıl  +"\\" + yıl + "-4"
          }
        }

          if (veri3[i]!=="" && rows.includes(veri3[i])){
            notstr += `<div><a href="\\\\10.243.22.16\\Birimler\\Nükleer Tesisler Daire Bsk\\IMALAT_GRUBU\\İBOP Yedek\\Özgün Yedek\\tümyıllar\\${veri3[i]}.pdf">${veri3[i]}.pdf</a><br>
            <a href="\\\\10.243.22.20\\Birimler\\ngd\\ANS\\Yazışmalar\\120.02[ANS.45] TUSE\\${yıl}\\${veri3[i]}-EKLERİ">${veri3[i]}-EKLERİ</a></div>
            `
          }
          else {
            notstr += `<div>${veri3[i]}</div>`
          }
      }
    }
  var letstr = ""
  let myString2 = books[k].letters;
  if (myString2 !== "") {
    let veri13 = myString2.split("<br>")
    var m = veri13.length;
  for (let i=0; i<m; i++){
    // if (veri13[i].includes('eposta') == false) {
        yıl = veri13[i].substring(0, 2);
        yılint = parseInt(yıl)
        yıl = "20"+yıl
        ay = veri13[i].substring(2, 4);



        if  (yılint > 20) {

        if (ay == "01" || ay == "02" || ay == "03") {
          yıl = yıl  +"\\" + yıl + "-1"
        }
        if (ay == "04" || ay == "05" || ay == "06") {
          yıl = yıl  +"\\" + yıl + "-2"
        }
        if (ay == "07" || ay == "08" || ay == "09") {
          yıl = yıl  +"\\" + yıl + "-3"
        }
        if (ay == "10" || ay == "11" || ay == "12") {
          yıl = yıl  +"\\" + yıl + "-4"
        }
      }
      
      if (veri13[i].includes("eposta")){
        if (veri13[i].includes("-")){
        dateString=veri13[i]
        xx = veri13[i].indexOf("-");
        yy = veri13[i].indexOf("-", xx+1);
        var year        = dateString.substring(yy+1,yy+5);
        var month       = dateString.substring(xx+1,yy);
        var day         = dateString.substring(0,xx);
        var date        = new Date(year, month-1, day);
        }
        else {
          dateString=veri13[i]
          xx = veri13[i].indexOf(".");
          yy = veri13[i].indexOf(".", xx+1);
          var year        = dateString.substring(yy+1,yy+5);
          var month       = dateString.substring(xx+1,yy);
          var day         = dateString.substring(0,xx);
          var date        = new Date(year, month-1, day);
        }
        dateString1=books[k].notificationletter.slice(0, 6);
        var year1        = 20+dateString1.substring(0,2);
        var month1       = dateString1.substring(2,4);
        var day1         = dateString1.substring(4,6);
        var date1        = new Date(year1, month1-1, day1);

      }
        else if (veri13[i].includes("-son-")){
          
          veri13[i]=veri13[i].slice(0, -5);
          dateString=veri13[i].slice(0, 6);
          var year        = 20+dateString.substring(0,2);
          var month       = dateString.substring(2,4);
          var day         = dateString.substring(4,6);
          var date        = new Date(year, month-1, day);
          dateString1=books[k].notificationletter.slice(0, 6);
          var year1        = 20+dateString1.substring(0,2);
          var month1       = dateString1.substring(2,4);
          var day1         = dateString1.substring(4,6);
          var date1        = new Date(year1, month1-1, day1);

          
          if (veri13[i].includes("-ek-")){
            ekvarsa=veri13[i].slice(0, -4);
          }
          else {
            ekvarsa=veri13[i]
          }
          if (rows.includes(ekvarsa)){
            var renkhref1 = "chocolate";
          }
          else {
            var renkhref1 = "";
          }
        }
        else {
          var renkhref1 = "";
        }
        if (veri13[i].includes("-ek-")){
          veri13[i]=veri13[i].slice(0, -4);
          ndkekvarsa = ""
          if (veri13[i].includes("E.")) {
            ndkekvarsa = veri13[i].replace("E.", "")
          }
          else if (rows.includes(veri13[i])){

            var renkhref2 = "chocolate";
            // document.getElementById('finalletter'+i+'').checked=True
            notstr += `<div><a href="\\\\10.243.22.20\\Birimler\\ngd\\ANS\\Yazışmalar\\120.02[ANS.45] TUSE\\${yıl}\\${veri13[i]}-EKLERİ" style='color:${renkhref2}'>${veri13[i]}-EKLERİ</a></div>
          `
          }
          else{
            var renkhref2 = "";
            notstr += `<div>${veri13[i]}</div>`
          }
        }
        else{
          var renkhref2 = "";
        }
        if (veri13[i]!=="" && rows.includes(veri13[i])){
          letstr += `<div><a href="\\\\10.243.22.16\\Birimler\\Nükleer Tesisler Daire Bsk\\IMALAT_GRUBU\\İBOP Yedek\\Özgün Yedek\\tümyıllar\\${veri13[i]}.pdf" style='color:${renkhref1}'>${veri13[i]}.pdf</a></div>
          `
          if (ndkekvarsa!==""){
            letstr += `<div><a href="\\\\10.243.22.20\\Birimler\\ngd\\ANS\\Yazışmalar\\120.02[ANS.45] TUSE\\${yıl}\\${ndkekvarsa}-EKLERİ">${ndkekvarsa}-EKLERİ</a></div>
          `
            ndkekvarsa="";
          }
        }
        else {
          letstr += `<div>${veri13[i]}</div>
        `
        }
  }
}

db.run(`UPDATE imalat SET linkler1 = ? WHERE no = ?;`,
[letstr, k], 
);
}
})
}

function listele() {
  var options = '';
  var options1 = '';
  var options2 = '';
  var options3 = '';
  db.all(`SELECT * FROM imalat`, function(err, books){

  let length = books.length;
  for (let i=0; i<length; i++){

    // notificationletter
    myString = books[i].notificationletter;
    if (myString !== null) {
    let myArray = myString.split("<br>")
    var l = myArray.length;
      for (let j=0; j<l; j++){
        if (options.includes(myArray[j]) == false) {
          if (myArray[j].includes("-son-")){
            myArray[j]=myArray[j].slice(0, -5);
          }
          if (myArray[j].includes("-ek-")){
            myArray[j]=myArray[j].slice(0, -4);
          }
          options += '<option value="'+myArray[j]+'" />';
        }
      }
  }
  // document.getElementById("datalist1").innerHTML = options;

  // equipmentname
    myString1 = books[i].equipmentname;
    if (myString1 !== null) {
    let myArray1 = myString1.split("<br>")
    var l = myArray1.length;
      for (let j=0; j<l; j++){
        if (options1.includes(myArray1[j]) == false) {
        options1 += '<option value="'+myArray1[j]+'" />';
        }
      }
  }
  // document.getElementById("datalist3").innerHTML = options1;

  // air
    myString2 = books[i].air;
    if (myString2 !== null) {
    let myArray2 = myString2.split("<br>")
    var l = myArray2.length;
      for (let j=0; j<l; j++){
        if (options2.includes(myArray2[j]) == false) {
        options2 += '<option value="'+myArray2[j]+'" />';
        }
      }
      
  }
  // document.getElementById("datalist5").innerHTML = options2;

  // letters

    myString3 = books[i].letters;
    if (myString3 !== null) {
    let myArray3 = myString3.split("<br>")
    var l = myArray3.length;
      for (let j=0; j<l; j++){
        if (options3.includes(myArray3[j]) == false) {
          if (myArray3[j].includes("-son-")){
            myArray3[j]=myArray3[j].slice(0, -5);
          }
          if (myArray3[j].includes("-ek-")){
            myArray3[j]=myArray3[j].slice(0, -4);
          }
        options3 += '<option value="'+myArray3[j]+'" />';
        }
      }
  }

  var options4 = '';
  let rows = ""
  const ifolder = "\\\\10.243.22.16\\Birimler\\Nükleer Tesisler Daire Bsk\\BELGELENDİRME\\2_İmalatçı\\01_İmalatçı Onayı\\"
  try {
  fs.readdirSync(ifolder).forEach(dfile => {
    if (dfile.includes("TR-İMO")) {
      n = dfile.lastIndexOf("_")
      dfile = dfile.slice(n+1)
      rows = rows + dfile + ",";
    }
  
  })
  }
  catch (err) {
    console.log(err)
  }


    let myArray = rows.split(",")
    var l = myArray.length;
    var alfabe = [];
    var alfasayi = 0;
      for (let j=0; j<l; j++){
        if (options4.includes(myArray[j]) == false) {
          myArray[j]=myArray[j].trim()
          alfabe[alfasayi] = myArray[j]
          alfasayi = alfasayi + 1
          // options += '<option value="'+myArray[j]+'" />';
        }
      }
      alfabe.sort();
      for (alfac=0; alfac<alfasayi; alfac++) {
        options4 += '<option value="'+alfabe[alfac]+'" />';
      }
      // document.getElementById("datalist2").innerHTML = options;


  // document.getElementById("datalist6").innerHTML = options3;

}
db.run(`UPDATE listele SET  notificationletter= ?, equipmentnames= ?, airs= ?, letters= ?, manufacturers= ? WHERE no = 1;`,
[options, options1, options2, options3, options4], 
);
})
}

function pdfkopyala() {
  db.all(`SELECT * FROM listele`, function(err, books){
  var today = new Date();
  var yıl = today.getFullYear()
  var ay = today.getMonth()+1
  // console.log("server is busy")
  if (ay == "1" || ay == "2" || ay == "3") {
    yıl1 = 1
  }
  if (ay == "4" || ay == "5" || ay == "6") {
    yıl1 = 2
  }
  if (ay == "7" || ay == "8" || ay == "9") {
    yıl1 = 3
  }
  if (ay == "10" || ay == "11" || ay == "12") {
    yıl1 = 4
  }
  
for (let y = 2021; y <= yıl; y++){
  
  for (let i = 1; i <= 4; i++){
  const sfolder = "\\\\10.243.22.20\\Birimler\\ngd\\ANS\\Yazışmalar\\120.02[ANS.45] TUSE\\"+y+"\\"+y+"-"+i+"\\";
  const tusedest = "\\\\10.243.22.16\\Birimler\\ngd\\ANS\\Yazışmalar\\120.02[ANS.45] TUSE\\"+y+"\\"+y+"-"+i+"\\"
  if (!fs.existsSync(tusedest)){
    fs.mkdirSync(tusedest, { recursive: true });
  }
  fs.readdirSync(sfolder).forEach(sfile => {
    let ikincitire = sfile.split("-", 2).join("-").length+1
    let ilkbosluk = sfile.slice(ikincitire, sfile.length).split(" ", 1).join("").length
    let ilktire = sfile.slice(ikincitire, sfile.length).split("-", 1).join("").length
    var kopyalama = 0;
    if (ilktire<ilkbosluk) {
      tirebosluk=ilktire
    }
    else {
      tirebosluk=ilkbosluk
    }
    sonuc = ikincitire + tirebosluk
    sonucfile = sfile.slice(0, sonuc)
    if (sfile.includes("-k-")){
      sonucfile = sonucfile + "-k-.pdf"
    }
    else {
      sonucfile = sonucfile + ".pdf"
    }
    
    fs.readdirSync(dfolder).forEach(dfile => {
      if (sonucfile == dfile) {
        kopyalama =1
      }
  })
  if (sfile.includes(".pdf") && kopyalama==0) {
    fs.copyFileSync(sfolder+"\\"+sfile,  dfolder+"\\"+sonucfile) 
    console.log(sonucfile + "kopyalandı")
  }
  });

 



  fs.readdirSync(tusesource).forEach(sfile2 => {
    let ikincitire2 = sfile2.split("-", 2).join("-").length+1
    let ilkbosluk2 = sfile2.slice(ikincitire2, sfile2.length).split(" ", 1).join("").length
    let ilktire2 = sfile2.slice(ikincitire2, sfile2.length).split("-", 1).join("").length
    var submatch2 
    if (ilktire2<ilkbosluk2) {
      tirebosluk2=ilktire2
    }
    else {
      tirebosluk2=ilkbosluk2
    }
    sonuc2 = ikincitire2 + tirebosluk2
    sonucfile2 = sfile2.slice(0, sonuc2)
    var kopyalama2 = 0;
    var matches = sfile2.match(/\((.*?)\)/);
    var eslesti = 0
    if (sfile2.includes("_Bildirim_") && matches) {
        var submatch = matches[1];
        var eslesen = sonucfile2
        submatch2 = submatch 
        eslesti = 1
    }
    else {
        var submatch = sfile2.substring(0,6);
        var eslesen = sfile2
    }
    if (books[0].letters.includes(sonucfile2) || books[0].letters.includes(submatch2)) {
    var yıls = submatch.substring(0,2);
    yıls = "20" + yıls
    var ays = submatch.substring(2,4);
    var guns = submatch.substring(4,6);

    if (ays == "01" || ays == "02" || ays == "03") {
      donem = 1
    }
    if (ays == "04" || ays == "05" || ays == "06") {
      donem = 2
    }
    if (ays == "07" || ays == "08" || ays == "09") {
      donem = 3
    }
    if (ays == "10" || ays == "11" || ays == "12") {
      donem = 4
    }
    yıldonem = yıls + "-" + donem
    if (!tusedest.includes(yıldonem)) {
      kopyalama2 = 1
    }
    fs.readdirSync(tusedest).forEach(dfile2 => {

      if (eslesen == dfile2) {
        kopyalama2 = 1   
      }

  })
  if (!eslesen.includes("Kopyalandı") && eslesen.includes(".pdf") && kopyalama2==0) {
    if (eslesti == 0) {
      fs.copyFileSync(tusesource+"\\"+eslesen,  tusedest+"\\"+eslesen) 
      console.log(eslesen + " kopyalandı")
      fs.rename(tusesource+"\\"+eslesen, tusesource+"\\Kopyalandı-"+eslesen, function (err) {
        if (err) throw err;
      });
    }
    if (eslesti == 1) {
      if (!fs.existsSync(tusedest+submatch.replace(".pdf", "").replace("E.", "")+"-EKLERİ\\")){
        fs.mkdirSync(tusedest+submatch.replace(".pdf", "").replace("E.", "")+"-EKLERİ\\");
        fs.copyFileSync(tusesource+"\\"+eslesen,  tusedest+submatch.replace(".pdf", "").replace("E.", "")+"-EKLERİ\\"+eslesen) 
        console.log(eslesen + " kopyalandı")
        fs.rename(tusesource+"\\"+eslesen, tusesource+"\\Kopyalandı-"+eslesen, function (err) {
          if (err) throw err;
        });
      }
    }
    
  }
  }
  });




















}


}



























  fs.readdirSync(sfolder2).forEach(sfile => {
    let ikincitire = sfile.split("-", 2).join("-").length+1
    let ilkbosluk = sfile.slice(ikincitire, sfile.length).split(" ", 1).join("").length
    let ilktire = sfile.slice(ikincitire, sfile.length).split("-", 1).join("").length
    var kopyalama = 0;
    if (ilktire<ilkbosluk) {
      tirebosluk=ilktire
    }
    else {
      tirebosluk=ilkbosluk
    }
    sonuc = ikincitire + tirebosluk
    sonucfile = sfile.slice(0, sonuc)
    sonucfile = sonucfile + ".pdf"
    fs.readdirSync(dfolder).forEach(dfile => {
      if (sonucfile == dfile) {
        kopyalama =1
      }
  })
  if (sfile.includes(".pdf") && kopyalama==0) {
    fs.copyFileSync(sfolder2+"\\"+sfile,  dfolder+"\\"+sonucfile) 
  }
  });

  let rows = ""
  try {
  fs.readdirSync(dfolder).forEach(dfile => {
    rows = rows + dfile;
  })
  }
  catch (err) {
    console.log(err)
  }

  let rows2 = ""
  try {
    fs.readdirSync(ifolder).forEach(dfile => {
      if (dfile.includes("TR-İMO")) {
        rows2 = rows2 + dfile + ",";
      }
    })
    }
    catch (err) {
      console.log(err)
    }






  db.run(`UPDATE listele SET  linkkontrol= ?, imalatcilarlink= ? WHERE no = 1;`,
    [rows, rows2], 
  );

  // console.log("server is ready")
  })
}

