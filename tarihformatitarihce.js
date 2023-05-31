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
      const inputString = rows[i].history // Buraya dönüştürülecek string'i girin

      // Köşeli parantezler içindeki tarih string'ini elde etmek için bir regex kullanın
      const dateRegex = /\[(\d{2})\.(\d{2})\.(\d{4})\]/;
      const match = inputString.match(dateRegex);

      if (match) {
        const day = match[1];
        const month = match[2];
        const year = match[3];

        // Yeni tarih stringini oluşturun ve yyyy-mm-dd formatına uygun şekilde gün, ay ve yıl değerlerini yerleştirin
        const newDateString = `[${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}]`;

        // Köşeli parantezler içindeki tarih string'ini yeni tarih string'i ile değiştirin
        const outputString = inputString.replace(dateRegex, newDateString);


        db.run(`UPDATE ebtler SET history = ?
        WHERE aircode = ?`,
        [outputString, rows[i].aircode], 
          function(err, rows){
              
          }
        );
      }



      }

}) 