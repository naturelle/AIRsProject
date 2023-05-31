var express = require(`express`);
var app = express();
var sqlite3 = require(`sqlite3`);
var db = new sqlite3.Database(`db/imalat.db`);
var alertflag = 0
var bodyParser = require(`body-parser`);
const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use (express.static(__dirname + `/proje`));
app.use (bodyParser.urlencoded({extended : false}));

var today = new Date();
var yıl = today.getFullYear()
const sfolder = "\\\\192.168.0.13\\Birimler\\ngd\\ANS\\Yazışmalar\\120.02[ANS.45] TUSE\\"+yıl+"\\";
const sfolder2 = "\\\\192.168.0.13\\Birimler\\ngd\\ANS\\Yazışmalar\\120.03[ANS.93] İMALAT DENETİMLERİ\\";
const ifolder = "\\\\192.168.0.140\\Birimler\\Nükleer Tesisler Daire Bsk\\BELGELENDİRME\\2_İmalatçı Firmalar\\01_İmalatçı Onayı\\"
const dfolder = "\\\\192.168.0.140\\Birimler\\Nükleer Tesisler Daire Bsk\\IMALAT_GRUBU\\İBOP Yedek\\Özgün Yedek\\tümyıllar\\"
const sdatabase = "C:\\Users\\1720\\Desktop\\imalatprogrami\\db\\imalat.db"
// const ddatabase = "\\\\192.168.0.140\\Birimler\\Nükleer Tesisler Daire Bsk\\IMALAT_GRUBU\\İBOP Yedek\\Özgün Yedek\\Veritabanı\\"
const ddatabase = "\\\\192.168.0.13\\Birimler\\ngd\\Özgün Güngör\\veritabanı\\";
const fs = require('fs');
const {COPYFILE_EXCL} = fs.constants




// setInterval(trypdfkopyala, 12*60*1000);
// setInterval(trydatabasekopyala, 24*60*60*1000);
// setInterval(hashsifirla, 10*60*1000);

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
  if (day == 0 && hours == 23 && minutes > 49) {
  for (let i = 1; i < 10; i++){
      db.run(`UPDATE kullanici SET hash= ? WHERE id = ?;`,
      ["", i], 
      );
  }
  console.log("hash silindi")
  }
}

function databasekopyala(){
  var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+today.getUTCMinutes()+today.getSeconds();
  fs.copyFileSync(sdatabase,  ddatabase+"("+date+")_imalat.db") 
}



function pdfkopyala() {
  console.log("server is busy")
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
    sonucfile = sonucfile + ".pdf"
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
  console.log("server is ready")
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
}

app.post(`/linkkontrol`, function(request, response){
  let rows = ""
  fs.readdirSync(dfolder).forEach(dfile => {
    rows = rows + dfile;
  })
  response.send(rows);
});

app.post(`/imalatcilar`, function(request, response){
  let rows = ""
  fs.readdirSync(ifolder).forEach(dfile => {
    if (dfile.includes("TR-İMO")) {
      n = dfile.lastIndexOf("_")
      dfile = dfile.slice(n+1)
      rows = rows + dfile + ",";
    }
  })
  response.send(rows);
});

app.post(`/cors`, function(request, response){
  let rows = ""
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
  targetUrl = 'https://ndk.org.tr/tr/services-en/app-of-manufac-for-nuclear-facilities/272-nukleer-tesislerin-yetkilendirilmesi/1970-approved-manufacturer-organization-list.html/'
  fetch(proxyUrl + targetUrl)
  .then(blob => blob.json())
  .then(data => {
    console.table(data);
    document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
    return data;
  })
  .catch(e => {
    console.log(e);
    return e;
  });
  response.send(data);
});




app.post(`/imalatcilarlink`, function(request, response){
  let rows = ""
  fs.readdirSync(ifolder).forEach(dfile => {
    if (dfile.includes("TR-İMO")) {
      rows = rows + dfile + ",";
    }
  })
  response.send(rows);
});

app.post(`/ekler`, function(request, response){
  let yıl = request.body.yıl;
  const yol = request.body.yol;
  // let command = "start  C:/Users/özgün/Documents/JS_Projeler/BookListTraversery/"+yol
  // let command = 'start "" "\\\\192.168.0.140\\Birimler\\Nükleer Tesisler Daire Bsk\\IMALAT_GRUBU\\IMALAT_GRUBU\\İBOP Yedek\\Özgün Yedek\\2020\\"'+yol
  let command = 'start "" "\\\\192.168.0.13\\Birimler\\ngd\\ANS\\Yazışmalar\\120.02[ANS.45] TUSE\\"'+yıl+"\\"+yol
  require('child_process').exec(command);
  
});

app.post(`/pdf`, function(request, response){
  let yıl = request.body.yıl;
  const yol = request.body.yol;
  // let command = "start  C:/Users/özgün/Documents/JS_Projeler/BookListTraversery/"+yol
  let command = 'start "" "\\\\192.168.0.140\\Birimler\\Nükleer Tesisler Daire Bsk\\IMALAT_GRUBU\\İBOP Yedek\\Özgün Yedek\\"'+yıl+"\\"+yol
  // let command = 'start "" "\\\\192.168.0.13\\Birimler\\ngd\\ANS\\Yazışmalar\\120.02[ANS.45] TUSE\\"'+yıl+"\\"+yol
  require('child_process').exec(command);
  
});

app.post(`/bulgular`, function(request, response){
  db.all(`SELECT * FROM bulgular`, function(err, rows){
  response.send(rows);
  })
});

app.post(`/imalat`, function(request, response){
  db.all(`SELECT * FROM imalat`, function(err, rows){
  response.send(rows);
  })
});


app.post(`/kullanici`, function(request, response){
  db.all(`SELECT * FROM kullanici`, function(err, rows){
  response.send(rows);
  })
});

app.post(`/duyurular`, function(request, response){
  db.all(`SELECT * FROM duyurular`, function(err, rows){
  response.send(rows);
  })
});

app.post(`/login`, function(request, response){

  db.all(`SELECT * FROM kullanici`, function(err, rows){
    kullanici = request.body.kullanici
    sifre = request.body.sifre
    let bilgih = rows.length
    let alertflag = 0
    

  for (let i = 0; i < bilgih; i++){
    if (kullanici == rows[i].sicil){
      if (sifre==rows[i].sifre){
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(sifre, salt, (err, hash) => {
            db.run(`UPDATE kullanici SET  hash= ? WHERE sicil = ?;`,
              [hash, kullanici], 
            );
              response.send(hash)
          });
      });

      alertflag = 1;
        // response.send(rows[i])
        // alertflag = 1;
      }
      else{
        // alert("Lütfen şifrenizi kontrol ediniz!");
        response.send("sifrekontrol")
        alertflag = 1;
      }
    }
  }
  if (alertflag == 0) {
  // alert("Bu kullanıcıya ait bilgi bulunamadı");
  response.send("bilgiyok")
  }

})
  
})

app.post(`/loginhash`, function(request, response){

  db.all(`SELECT * FROM kullanici`, function(err, rows){
    hash = request.body.kullanici
    let bilgih = rows.length
    alertflag = 0
    alertflag2 = 0
    yetkialertflag = 0

    
    var today = new Date();
    if (today.getDate() <10) {
      var y = "0" + today.getDate()
    }
    else {
      var y = today.getDate()
    }
    if (today.getMonth()+1 <10) {
      var z = "0" +(today.getMonth()+1)
    }
    else {
      var z = today.getMonth()+1
    }
    var date = today.getFullYear()+'-'+z+'-'+y;
   
   


        for (let i = 0; i < bilgih; i++){
          if (rows[i].yetki >= date && i!==0) {
            var yetkiliisim = rows[i].ad
            var yetkilisoyisim = rows[i].soyad+" (Yetkili)"
            var yetkilieposta = rows[i].eposta
            var yetkilisicil = rows[i].sicil
            var yetkiver = yetkiliisim +" "+ yetkilisoyisim
            yetkialertflag = 1

          }
        }
          if (yetkialertflag == 0){
            var yetkiliisim = rows[0].ad
            var yetkilisoyisim = rows[0].soyad
            var yetkilieposta = rows[0].eposta
            var yetkilisicil = rows[0].sicil
            var yetkiver = "Yetki Ver"
          }
          for (let i = 0; i < bilgih; i++){
                  //  if (bcrypt.compareSync(rows[i].sifre, hash)) {
                    if (rows[i].hash == hash && hash !=="") { 
                    let veriler = [] 
                    veriler[0] = yetkiliisim
                    veriler[1] = yetkilisoyisim
                    veriler[2] = yetkilieposta
                    veriler[3] = yetkilisicil
                    veriler[4] = yetkiver
                    veriler[5] = "1"
                    veriler[6] = rows[i].ad
                    veriler[7] = rows[i].soyad
                    veriler[8] = rows[i].sicil
                    veriler[9] = rows[i].eposta
                    response.send(veriler)
                    alertflag = 1
                   };
                  }
       

       if (alertflag==0) {
           response.send("0")
      }

})
  
})

    app.post(`/kullanicisifre`, function(request, response){
        db.run(`UPDATE kullanici SET  sifre= ? WHERE id = ?;`,
        [request.body.sifre, request.body.id], 
        );
        response.send("Başarılı")
      });

      app.post(`/yetkikayit`, function(request, response){
        for (let i = 2; i < 10; i++){
          if (i==request.body.id){
            db.run(`UPDATE kullanici SET  yetki= ? WHERE id = ?;`,
            [request.body.yetki, request.body.id], 
            );
          }
          else {
            db.run(`UPDATE kullanici SET  yetki= ? WHERE id = ?;`,
            [0, i], 
            );
          }
        }
        response.send("Başarılı")
      });

app.post(`/duzenle`, function(request, response){
  db.all(`SELECT * FROM imalat`, function(err, rows){
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+'-'+today.getHours()+':'+today.getUTCMinutes()+':'+today.getSeconds();
    if (rows[request.body.no].status !== request.body.status) {
      if (rows[request.body.no].history !== null) {
        tarihce = rows[request.body.no].history + "<br>" + request.body.sicil + " " + date + " " + rows[request.body.no].status + " >>> " + request.body.status
      }
      else {
        tarihce = request.body.sicil + " " + date + " " + rows[request.body.no].status + " >>> " + request.body.status
      }
    }
    else {
      tarihce = rows[request.body.no].history
    }
     
    db.run(`UPDATE imalat SET  status= ?,  notificationletter = ?, reviewer = ?, manufacturer = ?, 
    unit = ?, equipmentname = ?, safetyclass = ?, qualityplan = ?, notificationtype = ?, 
    air = ?, airstatus = ?, letters = ?, remarks = ?, history = ? WHERE no = ?;`,
    [request.body.status, request.body.notificationletter, request.body.reviewer, request.body.manufacturer, 
    request.body.unit, request.body.equipmentname, request.body.safetyclass, request.body.qualityplan, request.body.notificationtype, 
    request.body.air, request.body.airstatus, request.body.letters, request.body.remarks, tarihce, request.body.no], 
    );
    
    db.run(`INSERT INTO log VALUES (null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,null,?,?);`,
    [request.body.no, request.body.status, request.body.notificationletter, request.body.reviewer, request.body.manufacturer, 
    request.body.unit, request.body.equipmentname, request.body.safetyclass, request.body.qualityplan, request.body.notificationtype, 
    request.body.air, request.body.airstatus, request.body.letters, request.body.remarks, request.body.sicil, date], 
    );
    response.send("Başarılı")
  });
});

app.post(`/yenikayit`, function(request, response){
  
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+'-'+today.getHours()+':'+today.getUTCMinutes()+':'+today.getSeconds();

  tarihce = request.body.isimsoyisim + " " + date + " yeni kayıt"
    
  

    db.run(`INSERT INTO imalat VALUES (null,?,?,?,?,?,?,?,?,?,?,?,?,?,null,?);`,
    [request.body.status, request.body.notificationletter, request.body.reviewer, request.body.manufacturer, 
    request.body.unit, request.body.equipmentname, request.body.safetyclass, request.body.qualityplan, request.body.notificationtype, 
    request.body.air, request.body.airstatus, request.body.letters, request.body.remarks, tarihce], 
    );
    response.send("Başarılı")

});

app.post(`/dyenikayit`, function(request, response){
  db.run(`INSERT INTO bulgular VALUES (null,?,?,?,?,?,?,?,?,?,?,?,?);`,
  [request.body.status, request.body.inspectionletter, request.body.qualityplan, request.body.recordno, 
  request.body.findings, request.body.responsible, request.body.manufacturer, request.body.unit, request.body.equipmentname, 
  request.body.safetyclass, request.body.letters, request.body.remarks], 
  );
  response.send("Başarılı")
});

app.post(`/dduzenle`, function(request, response){
  db.run(`UPDATE bulgular SET  status= ?,  inspectionletter = ?, qualityplan = ?, recordno = ?, 
  findings = ?, responsible = ?, manufacturer = ?, unit = ?, equipmentname = ?, 
  safetyclass = ?, letters = ?, remarks = ? WHERE no = ?;`,
  [request.body.status, request.body.inspectionletter, request.body.qualityplan, request.body.recordno, 
  request.body.findings, request.body.responsible, request.body.manufacturer, request.body.unit, request.body.equipmentname, 
  request.body.safetyclass, request.body.letters, request.body.remarks, request.body.dno,], 
  );
  response.send("Başarılı")
});

app.post(`/notekle`, function(request, response){
  db.run(`UPDATE imalat SET notes = ? WHERE no = ?;`,
  [request.body.not, request.body.no], 
  );
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+'-'+today.getHours()+':'+today.getUTCMinutes()+':'+today.getSeconds();
  db.run(`INSERT INTO log VALUES (null,?,null,null,null,null,null,null,null,null,null,null,null,null,null,?,?,?);`,
  [request.body.no, request.body.not, request.body.sicil, date], 
  );
  response.send("Başarılı")
});


app.post(`/duyuruekle`, function(request, response){
  db.run(`INSERT INTO duyurular VALUES (null,?,1,1,1,1,1,1,1,1,1);`,
  [request.body.duyuru], 
  );
  var mailOptions = {
    from: 'imalatgrubu@gmail.com',
    to: 'aysen.tongal@ndk.gov.tr; ismail.dinc@ndk.gov.tr; mehmet.mercimek@ndk.gov.tr; mkemal.oztas@ndk.gov.tr; merve.yuksel@ndk.gov.tr; merveberat.sariguzel@ndk.gov.tr; mirac.oztemiz@ndk.gov.tr; ozgun.gungor@ndk.gov.tr; ugur.taskin@ndk.gov.tr',
    subject: "Yeni Duyuru Eklendi",
    text: request.body.duyuru
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  response.send("Başarılı")
});

app.post(`/okundu`, function(request, response){
  db.all(`SELECT * FROM duyurular`, function(err, rows){
    j= rows.length+1
    for (let i = 1; i < j; i++){
      db.run(`UPDATE duyurular SET  ${request.body.duyurusoyad}= 0 WHERE no = ${i};`, 
      );
    }
  })
    response.send("Başarılı")
 
});

app.post(`/duyurudegistir`, function(request, response){

      db.run(`UPDATE duyurular SET duyuru = ?, Mercimek = 1,  Öztaş = 1,  Öztemiz = 1, Sarıgüzel = 1, Çiğdem = 1, Tongal = 1, Dinç = 1, Güngör = 1, Taşkın = 1 WHERE no = ?;`, 
      [request.body.duyuru, request.body.no], 
      );

    response.send("Başarılı")
    // , Tongal = 1, Dinç = 1,  Öztaş = 1; Öztemiz = 1, Sarıgüzel = 1, Yüksel = 1, Güngör = 1, Taşkın = 1
});
  
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'imalatgrubu@gmail.com',
    pass: 'Imalat2019'
  }
  
});

var exchange = nodemailer.createTransport({
  host: "enerjirelay.enerji.gov.tr",
  port: 25,
  auth: {
    user: "enerji\\imalat",
    pass: "Zz123456"
  }
});

app.post(`/birincieposta`, function(request, response){
  if (request.body.eposta == "aysen.tongal@ndk.gov.tr"){
    kime = request.body.eposta
  }
  else {
    kime = 'aysen.tongal@ndk.gov.tr;'+ request.body.eposta
  }
  var mailOptions = {
    from: 'imalatgrubu@gmail.com',
    to: kime,
    subject: request.body.no+" No'lu Eposta Gönderimi Bekleyen Bildirim Hakkında",
    text: request.body.no+" No'lu kaydın tamamlanabilmesi için Eposta gönderimi gerekmektedir."
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  response.send("Başarılı")
});

app.post(`/ikincieposta`, function(request, response){
  if (request.body.eposta == "aysen.tongal@ndk.gov.tr"){
    kime = request.body.eposta
  }
  else {
    kime = 'aysen.tongal@ndk.gov.tr;'+ request.body.eposta
  }
  var mailOptions = {
    from: 'imalatgrubu@gmail.com',
    to: kime,
    // subject: request.body.no+" No'lu Bildirim Hakkında",
    subject: "8366-c) Tablo 2 de yer almayan imalat bildirimleri ("+request.body.sayi+")",
    html: request.body.message,
    // text: request.body.no+" No'lu imalat bildirimine yönelik başvuru uygunluk kontrolü ve imalatçı kuruluşun yeterliliklerini belirleyen belgelerin mevzuata uygunluk kontrolü gerçekleştirilmiş olup imalata "+request.body.qualityplan+" numaralı kalite planı/planları kapsamında başlanabileceği değerlendirilmektedir."
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  response.send("Başarılı")
});

app.post(`/yenikayiteposta`, function(request, response){
  if (request.body.eposta == "aysen.tongal@ndk.gov.tr"){
    kime = request.body.eposta
  }
  else {
    kime = 'aysen.tongal@ndk.gov.tr;'+ request.body.eposta
  }
  var mailOptions = {
    from: 'imalatgrubu@gmail.com',
    to: kime,
    subject: "ANS " + request.body.unite + " No'lu ünite/ünitelere ait " + request.body.ekipmanadi + " için imalat bildirimi/imalat onayı başvurusu",
    html: request.body.message,
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  response.send("Başarılı")
});

app.post(`/sifreposta`, function(request, response){
    
  kime = request.body.eposta

  var mailOptions = {
    from: 'imalatgrubu@gmail.com',
    to: kime,
    // subject: request.body.no+" No'lu Bildirim Hakkında",
    subject: "İBOP Kullanıcı Şifresi Hk.",
    text: "Kullanıcı şifreniz: "+request.body.sifre
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  response.send("Başarılı")
});





app.listen(3000, function(){
  console.log("server is running");
});



