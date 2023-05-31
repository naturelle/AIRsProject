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




console.log("dongu is running");

// verigir()


let veriler = `ANS4.C.B05.A00001;closed(+)
ANS4.C.B05.A00002;closed(+)
ANS4.C.B05.A00003;closed(+)
ANS4.C.B05.A00004;closed(+)
ANS4.C.B05.A00005;closed(+)
ANS4.C.B05.A00006;closed(+)
ANS4.C.B05.A00007;closed(+)
ANS4.C.B05.A00008;closed(+)
ANS4.C.B05.A00009;Rev response under preparation
ANS4.C.B05.A00010;closed(+)
ANS4.C.B05.A00011;closed(+)
ANS4.C.B05.A00012;closed(+)
ANS4.C.B05.A00013;closed(+)
ANS4.C.B05.A00014;closed(+)
ANS4.C.B05.A00015;Rev response under preparation
ANS4.C.B05.A00016;closed(+)
ANS4.C.B05.A00017;closed(+)
ANS4.C.B05.A00018;response under preparation
ANS4.C.B05.A00019;closed(+)
ANS4.C.B05.A00020;closed(+)
ANS4.C.B05.A00021;under NDK review
ANS4.C.B05.A00022;closed(+)
ANS4.C.B05.A00023;closed(+)
ANS4.C.B05.A00024;under NDK review
ANS4.C.B05.A00025;under NDK review
ANS4.C.B05.00026;under NDK review
ANS4.C.B05.00027;under NDK review
ANS4.C.B05.A00028;closed(+)
ANS4.C.B05.A00029;closed(+)
ANS4.C.B05.A00030;closed(+)
ANS4.C.B05.A00031;Rev under NDK review
ANS4.C.B05.00032;under NDK review
ANS4.C.B05.A00033;Rev response under preparation
ANS4.C.B05.A00034;closed(+)
ANS4.C.B05.A00035;Rev response under preparation
ANS4.C.B05.A00036;Rev response under preparation
ANS4.C.B05.A00037;closed(+)
ANS4.C.B05.A00038;closed(+)
ANS4.C.B05.A00039;under NDK review
ANS4.C.B05.A00040;under NDK review
ANS4.C.B05.A00041;closed(+)
ANS4.C.B05.A00042;closed(+)
ANS4.C.B05.A00043;closed(+)
ANS4.C.B05.A00044;under NDK review
ANS4.C.B05.A00045;closed(+)
ANS4.C.B05.A00046;Rev under NDK review
ANS4.C.B05.A00047;closed(+)
ANS4.C.B05.A00048;response under preparation
ANS4.C.B05.A00049;Rev under NDK review
ANS4.C.B05.A00050;closed(+)
ANS4.C.B05.A00051;closed(+)
ANS4.C.B05.A00052 ;closed(+)
ANS4.C.B05.A00053 ;closed(+)
ANS4.C.B05.A00054 ;closed(+)
ANS4.C.B05.A20055;under NDK review
ANS4.C.B05.A20056;under NDK review
ANS4.C.B06.A20057;under NDK review
ANS4.C.B06.A20058;closed(+)
ANS4.C.B06.A20059;under NDK review
ANS4.C.B06.A20060;Rev under NDK review
ANS4.C.B06.A20061;Rev under NDK review
ANS4.C.B06.A20062;Rev under NDK review
ANS4.C.B06.A20063;Rev under NDK review
ANS4.C.B06.A20064;closed(+)
ANS4.C.B06.A20065;closed(+)
ANS4.C.B06.A20066 ;Rev under NDK review
ANS4.C.B06.A20067;Rev under NDK review
ANS4.C.B06.A20068;Rev under NDK review
ANS4.C.B06.A20069;Rev under NDK review
ANS4.C.B05.A20070;under NDK review
ANS4.C.B05.A20071;under NDK review
ANS4.C.B05.A20072;under NDK review
ANS4.C.B05.A20073;under NDK review
ANS4.C.B05.A20074;under NDK review
ANS4.C.B05.A20075;under NDK review
ANS4.C.B05.A20076;under NDK review
ANS4.C.B05.A20077;response under preparation
ANS4.C.B05.A20078;response under preparation
ANS4.C.B05.A20079;response under preparation
ANS4.C.B05.A20080;response under preparation
ANS4.C.B05.A20081;response under preparation
ANS4.C.B05.A20082;closed(+)
ANS4.C.B05.A20083;response under preparation
ANS4.C.B05.A20084;under NDK review
ANS4.C.B13.A20085;response under preparation
ANS4.C.B06.A20086;response under preparation
`
  
  veriler = veriler.replace(/ /g,"").split("\n")


db.all(`SELECT * FROM ebtler`, function(err, rows1){
// db.all(`SELECT * FROM unit1excel`, function(err, rows2){

  for (let i = 0; i<veriler.length;i++) {
    var bulundu = false
    for (let j = 0; j<rows1.length;j++) {
      if (rows1[j].uniteno == veriler[i].split(";")[0].charAt(3) && rows1[j].aircode.slice(-5)==veriler[i].split(";")[0].slice(-5)) {
        if (veriler[i].split(";")[1].includes("+")) {
          if (rows1[j].status !== "Closed+") {
            console.log(veriler[i].split(";")[0] + " " + veriler[i].split(";")[1]  + " " + rows1[j].status)
          }
        }
        if (veriler[i].split(";")[1].includes("-")) {
          if (rows1[j].status !== "Closed-" && rows1[j].status !== "Closed-F") {
            console.log(veriler[i].split(";")[0] + " " + veriler[i].split(";")[1]  + " " + rows1[j].status)
          }
        }
        if (veriler[i].split(";")[1].includes("NDK review")) {
          if (!rows1[j].status.includes("Received")) {
            console.log(veriler[i].split(";")[0] + " " + veriler[i].split(";")[1]  + " " + rows1[j].status)
          }
        }
        if (veriler[i].split(";")[1].includes("preparation")) {
          if (!rows1[j].status.includes("Sent")) {
            console.log(veriler[i].split(";")[0] + " " + veriler[i].split(";")[1]  + " " + rows1[j].status)
          }
        }
        if (veriler[i].split(";")[1].includes("cancelled")) {
          if (!rows1[j].status.includes("Cancel")) {
            console.log(veriler[i].split(";")[0] + " " + veriler[i].split(";")[1]  + " " + rows1[j].status)
          }
        }
        bulundu = true
        break
      }
      
    }
    if (bulundu==false) {
     console.log (veriler[i].split(";")[0] + " tabloda bulunamadı")
    }
  }
// })
})

function verigir () {
  
  let veriler = ``
  
  veriler =veriler.replace(/ /g,"").split("\n")
  
  console.log (veriler)
  


  db.serialize(function() {
    veriler.forEach(function(veri) {
      db.run(`INSERT INTO unit1excel VALUES (?,?);`,
      [veri.split(";")[0],veri.split(";")[1]]
      );
    });
  });


}







