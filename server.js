const express = require("express");
const path = require("path");

const app = express();
var sqlite3 = require(`sqlite3`);
var db = new sqlite3.Database(`db/imalat.db`);
var alertflag = 0
var bodyParser = require(`body-parser`);
const bcrypt = require('bcrypt');
const saltRounds = 10;



const formidable = require('formidable');
const fs = require('fs')
var fse = require('fs-extra');
var mv = require('mv');


const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  host: "10.243.48.40",
  port: 25,
  secureConnection: false,
  tls: {rejectUnauthorized: false},
});

app.get('/allair', function (req, res) {
  db.all(`SELECT * FROM imalat`, function(err, rows){
    response.send(rows);
  }) 
})  

app.use(express.static('public'))
app.use(express.static('files'))
app.post('/gerial', function(req, res){
  res.sendFile(path.join(__dirname, "upload", "nazar.png"));
});


app.use (express.static(__dirname + `/proje`));
app.use (bodyParser.urlencoded({extended : false}));



app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));


app.get("/upload/*", (req, res) => {
  res.sendFile(path.join(__dirname, req.url));
});


app.get("/*", (req, res) => {
    // res.sendFile(path.join(__dirname, "upload", "nazar.png"));
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.post(`/login`, function(request, response){

  if (request.body.kullanici == "") {
    response.send("$2b$")
  }
  else {
    

        let alertflag = 0
    const {id} = request.params
  
      db.all(`SELECT * FROM kullanici`, async function(err, rows){
        kullanici = request.body.kullanici
        sifre = request.body.sifre

        let bilgih = rows.length
        
        

    
      for (let i = 0; i < bilgih; i++){
        if (kullanici == rows[i].sicil){
          var result = false
          if (rows[i].hash) {
            result = bcrypt.compareSync(sifre, rows[i].hash)
          }
 
            if (result==true || rows[i].sifre==sifre) {
              const salt = bcrypt.genSaltSync(saltRounds)
              const hash = bcrypt.hashSync(sifre, salt)
              db.run(`UPDATE kullanici SET  hash= ? WHERE sicil = ?;`,
                [hash, kullanici], 
              );
              alertflag = 1;
              response.send(hash)
              

            }
            else{
              alertflag = 1;
              response.send("sifrekontrol")
            }


          
          
        }


      }
      if (alertflag == 0) {
          response.send("bilgiyok")
      }

    })

    
  }
    })

    app.post(`/loginhash`, function(request, response){

      db.all(`SELECT * FROM kullanici`, function(err, rows){
        hash = request.body.hash
        let bilgih = rows.length
        let alertflag = 0
              for (let i = 0; i < bilgih; i++){
                      //  if (bcrypt.compareSync(rows[i].sifre, hash)) {
                        if (rows[i].hash == hash && hash !=="") { 
                        let veriler = [] 
                        veriler[0] = "1"
                        veriler[1] = rows[i].ad
                        veriler[2] = rows[i].soyad
                        veriler[3] = rows[i].sicil
                        veriler[4] = rows[i].eposta
                        veriler[5] = rows[i].yetki
                        veriler[6] = rows[i].grup
                        response.send(veriler)
                        alertflag = 1
                       };
              }
           
    
           if (alertflag==0) {
               response.send("0")
          }
    
    })
      
    })

    app.post(`/notiste`, function(request, response){

      db.all(`SELECT * FROM kullanici WHERE sicil=?`,
      [request.body.sicil],
      function(err, rows){
        if (request.body.hash == rows[0].hash) {
          db.all(`SELECT * FROM ebtler WHERE no=?`,
          [request.body.ebtno],
          function(err, rows2){
            if (rows[0].yetki >= 1) {
              response.send(rows2);
            }
            else if (request.body.grup.includes(rows[0].grup) && request.body.grup.includes(rows2[0].grup)) {
              response.send(rows2);
            }
            else {
              response.send("Failure");
            }
          })
    
        }
        else{
          console.log("false")
          response.send("Failure");
        }
    })
    });

    app.post(`/statusiste`, function(request, response){


          db.all(`SELECT * FROM ebtler WHERE no=?`,
          [request.body.ebtno],
          function(err, rows){

              response.send(rows);

          })
    
    });

    app.post(`/ebtler`, function(request, response){

      db.all(`SELECT * FROM ebtler WHERE aircode LIKE '%ANS%'`,
      function(err, rows){
        response.send(rows);
      })
    });

    app.post(`/taslaklar`, function(request, response){
      if (request.body.yetki>=1) {
        let gruparray = request.body.sicil.split(";")
        let grupyazi =  "grup LIKE '%" +gruparray[0] + "%'"
        for (let i = 1; i<gruparray.length; i++) {
          grupyazi =  "grup LIKE '%" + gruparray[i] +"%' OR " + grupyazi
        }
        
        db.all(`SELECT * FROM ebtler WHERE status LIKE '%Waiting%' OR status LIKE '%Checked%' OR  ((status LIKE '%Rejected%' OR status LIKE '%Waiting%' OR status LIKE '%Checked%' OR status LIKE '%Draft%') AND (${grupyazi}))`,
          function(err, rows){
            response.send(rows);
        })
        // db.all(`SELECT * FROM ebtler WHERE status LIKE '%Waiting%' OR status LIKE '%Checked%' OR  ((status LIKE '%Rejected%' OR status LIKE '%Waiting%' OR status LIKE '%Checked%' OR status LIKE '%Draft%') AND grup = ?)`,
        // [request.body.sicil],
        //   function(err, rows){
        // response.send(rows);
      // })
      }
      else {
        let gruparray = request.body.sicil.split(";")
        let grupyazi =  "grup LIKE '%" +gruparray[0] + "%'"
        for (let i = 1; i<gruparray.length; i++) {
          grupyazi =  "grup LIKE '%" + gruparray[i] +"%' OR " + grupyazi
        }
        db.all(`SELECT * FROM ebtler WHERE (status LIKE '%Rejected%' OR status LIKE '%Waiting%' OR status LIKE '%Checked%' OR status LIKE '%Draft%') AND (${grupyazi})`,
          function(err, rows){
        response.send(rows);
      })
      }

    });

    app.post(`/aircode`, function(request, response){

      db.all(`SELECT * FROM ebtler WHERE no  = ?`,
        [request.body.ebtno],
      function(err, rows){
        response.send(rows);
      })
    });

    app.post(`/tumsorular`, function(request, response){

      db.all(`SELECT * FROM sorular`, function(err, rows){
        response.send(rows);
      })
    });

    app.post(`/ebtduzenle`, function(request, response){
      let gruparray = request.body.grup.split(";")
      let grupyazi =  "grup LIKE '%" +gruparray[0] + "%'"
      for (let i = 1; i<gruparray.length; i++) {
        grupyazi =  "grup LIKE '%" + gruparray[i] +"%' OR " + grupyazi
      }
      if(request.body.yetki==0) 
      {
        db.all(`SELECT * FROM ebtler WHERE no = ? AND (${grupyazi})` , 
        [request.body.ebtno],
        function(err, rows){
          response.send(rows);
        })
      }
      else {
        
        db.all(`SELECT * FROM ebtler WHERE no = ?` , 
        [request.body.ebtno],
        function(err, rows){
          response.send(rows);
        })
      }
      
    });

    app.post(`/gerigonder`, function(request, response){
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()



      db.all(`SELECT * FROM ebtler WHERE no = ?` , 
        [request.body.ebtno],
        function(err, rows){
          if (err) {
            console.log(err)
          }
          else {
            if (rows[0].status.includes("Rev")) {
              var rev = "RevSent"
            } 
            else {
              var rev = "Sent"
            }
            if (rows[0].status.includes("Closed+")) {
              var rev = "Closed+"
            } 
            if (rows[0].status.includes("Closed-")) {
              var rev = "Closed-"
            } 
            var statusyeni = "<li><a href= 'file://///sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ rows[0].uniteno + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\1 SUGGESTED Öneriler (Yinelenmesi Beklenenler)\\"+rows[0].aircode+".docx' target='_blank'>"+rev+" (Rejected) ["+date+"]</a></li>" 
            var statusyeni = "<li>"+rev+" (Rejected) ["+date+"]</li>" 
            var tarihce = statusyeni + rows[0].history
            let yeninot
            if (rows[0].notes=="") {
              yeninot = "[İade notu: "+request.body.note+"]"
            }
            else {
              yeninot = 
  `${rows[0].notes}
  [iade notu: ${request.body.note}]`   
            }
            var sicilstirng = rows[0].history.substring(
              rows[0].history.indexOf("]-") + 2, 
              rows[0].history.indexOf("</a>")
            );
            console.log(sicilstirng)
            db.all(`SELECT * FROM kullanici WHERE sicil=?`,
            [sicilstirng],
            function(err, rows1){                         
                var mailOptions = {
                from: 'ansprojeyonetimi@bilgi.ndk.gov.tr',
                to: rows1[0].eposta,
                subject: rows[0].aircode + " nolu EBT iade edilmiştir.",
                html: "iade notu: " + request.body.note,
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  response.send("Başarılı");
                }
              });
                 
            })            

            db.run(`UPDATE ebtler SET status = ?, history =?, notes=?
            WHERE no = ?`,
            [ `${rev+" (Rejected)"}`, `${tarihce}`, yeninot, request.body.ebtno ], 
              function(err, rows){
                  if (err) {
                    console.log(err)
                  }
                  else {
                    response.send("Başarılı");
                  }
              }
            );

          }

        })
    });

    app.post(`/onayagonder`, function(request, response){
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
      db.all(`SELECT * FROM ebtler WHERE no = ?` , 
        [request.body.ebtno],
        function(err, rows){
          if (rows[0].status.includes("Rev")) {
            var rev = "RevSent"
          } 
          else {
            var rev = "Sent"
          }

          if (rows[0].status.includes("Closed+")) {
            var rev = "Closed+"
          } 
          if (rows[0].status.includes("Closed-")) {
            var rev = "Closed-"
          } 

          var statusyeni = "<li><a href= 'file://///sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ rows[0].uniteno + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\1 SUGGESTED Öneriler (Yinelenmesi Beklenenler)\\"+rows[0].aircode+".docx' target='_blank'>"+rev+" (Checked) ["+date+"]</a></li>" 
          var statusyeni = "<li>"+rev+" (Checked) ["+date+"]</li>" 
          var tarihce = statusyeni + rows[0].history
          db.run(`UPDATE ebtler SET status = ?, history =?
          WHERE no = ?`,
          [ `${rev + " (Checked)"}`, `${tarihce}`, request.body.ebtno], 
            function(err, rows1){
            if (err) {
              console.log(err);
            }
            else {                            
              var mailOptions = {
              from: 'ansprojeyonetimi@bilgi.ndk.gov.tr',
              to: "ebru.ekici@ndk.org.tr",
              subject: rows[0].aircode + " nolu EBT onay için beklemektedir.",
              html: rows[0].history,
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
                response.send("Başarılı");
              }
            });
              
            }    
            }
          );

          
        })
    });



    app.post(`/secilenegitim`, function(request, response){
      db.all(`SELECT sorular, tarih FROM sinavdurumu WHERE sicil = ? AND sinavid = ?` , 
      [request.body.sicil, request.body.secilenegitim],
      function(err, rows){

        db.all(`SELECT sahibi FROM egitimler WHERE no = ?` , 
        [request.body.secilenegitim],
          function(err1, rows1){
            if (rows1[0].sahibi == "NTD" || rows1[0].sahibi == request.body.grup) {   
      if (rows[0] !== undefined) {
        rowsarray = rows[0].sorular.split(' ');
        l = rowsarray.length
        var rowsyeni = []
        if (rows[0].tarih == null) {
          let sorular = "no = "+rowsarray[0]
          for (let i = 1; i < l; i++){
            sorular = sorular + " OR no = "+rowsarray[i]
          } 
          db.all(`SELECT soru, a, b, c, d, e, egitimadi, no FROM sorular WHERE ${sorular}`,
          function(err, rows){
              response.send(rows);           
          })

        }
        else {
          response.send("failure");
        }
        
        
      }  
      else {
        db.all(`SELECT * FROM egitimler WHERE no = ?` , 
        [request.body.secilenegitim],
        function(err, rows){
        try {
          var sorusayisi = rows[0].sorusayisi

          db.all(`SELECT soru, a, b, c, d, e, egitimadi, no FROM sorular WHERE sinavid = ? ORDER BY RANDOM() LIMIT ?`,
          [request.body.secilenegitim, sorusayisi],
          function(err, rows){
            if (rows[0] !== undefined) {
              var sorulansorular = []
              for (let i = 0; i < rows.length; i++){
                sorulansorular[i] = rows[i].no
              }
              var sorulansorularstring = sorulansorular.join(" ")
              db.run(`INSERT INTO sinavdurumu VALUES (null,?,?,?,?,?,?,null,null,null);`,
              [rows[0].egitimadi, request.body.secilenegitim, request.body.kullanici, request.body.sicil, 
              request.body.grup, sorulansorularstring], 
              );

              // db.run(`UPDATE sinavdurumu SET soru = ?, a = ?, b = ?, c = ?, d = ?, e = ?, cevap = ?, egitimadi = ?, sinavid = ? WHERE no =?;`,
              // [request.body.soru, request.body.a, request.body.b, request.body.c, 
              // request.body.d, request.body.e, request.body.cevap, request.body.egitimadi, rows[0].no, request.body.secilensoru], 
              // );

            }
              response.send(rows);



          })
        }
        catch (err) {
          console.log(err)
          response.send("Sayfa bulunamadı!");
        }
      });

      }

      if (err) {
        res.status(404).send("Sorry can't find that!")
      }
      }
      else {
        response.send("odakdegil");
      }
      })
      })
    })

    app.post(`/sinavedit`, function(request, response){
      db.all(`SELECT * FROM egitimler WHERE no = ?` , 
        [request.body.secilensinav],
        function(err, rows){
        response.send(rows);

      })
    });

    app.post(`/egitimler`, function(request, response){

      db.all(`SELECT * FROM egitimler`, function(err, rows){
        response.send(rows);
      })
    });

    app.post(`/yetkilikullanici`, function(request, response){

      db.all(`SELECT ad, soyad FROM kullanici WHERE yetki = 1`, function(err, rows){
        response.send(rows);
      })
    });

    app.post(`/tumkullanici`, function(request, response){

      db.all(`SELECT ad, soyad FROM kullanici`, function(err, rows){
        response.send(rows);
      })
    });

    app.post(`/imalat`, function(request, response){
      db.all(`SELECT * FROM imalat ORDER BY RANDOM() LIMIT 10`, function(err, rows){
        for (let i = 0; i < rows.length; i++){
          console.log(rows[i].no)
        }
      response.send(rows);
      })
    });

    app.post(`/ebtkaydet`, function(request, response){
  
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'-'+today.getHours()+'-'+today.getUTCMinutes()+'-'+today.getSeconds();


      var date2 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

      var yenifollow = request.body.followup.replace(/ /g,"").replace(/;/g,"<br>")



      var giri =  "Draft [" + date2 + "]"
      var tarihce = "<li><a href= 'file://///sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ request.body.unitno + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\1 SUGGESTED Öneriler (Yinelenmesi Beklenenler)\\"+date+"_"+request.body.sicil+".docx' target='_blank'>"+giri+"</a></li>"

          db.run(`INSERT INTO ebtler VALUES (null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
          [date+"_"+request.body.sicil, request.body.unitno, request.body.documentcode, request.body.category, request.body.relevantto, request.body.expecteddate, request.body.projectgroup, 
          request.body.sicil, request.body.chapter, `${tarihce}`, `${"Draft"}`, yenifollow, request.body.airtitle, request.body.documentname, request.body.relatedsection, request.body.note], 
            function(err, rows){
              if (err) {
                console.log(err);
              }
              else { 
                const content = fs.readFileSync(
                  path.resolve("\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\taslak.docx"),
                  "binary"
                );

                const zip = new PizZip(content);

                const doc = new Docxtemplater(zip, {
                  paragraphLoop: true,
                  linebreaks: true,
                });

                // doc.render({
                  // category: request.body.category,
                  // relevantto: request.body.relevantto,
                  // projectgroup: request.body.projectgroup,
                  // expecteddate: request.body.expecteddate,
                  // airtitle: request.body.airtitle,
                  // documentname: request.body.documentname,
                  // relatedsection: request.body.relatedsection,
                // });

                const buf = doc.getZip().generate({
                  type: "nodebuffer",
                  compression: "DEFLATE",
                });

                fs.writeFileSync(path.resolve("\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ request.body.unitno + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\1 SUGGESTED Öneriler (Yinelenmesi Beklenenler)\\"+date+"_"+request.body.sicil+".docx"), buf);

                
                
                
     


            var sicilstirng = request.body.sicil

            db.all(`select altgrup from kullanici WHERE sicil = ?`,
            // db.all(`SELECT * FROM kullanici WHERE sicil=?`,
            [sicilstirng],
            function(err, rows3){ 
              if (rows3[0]!==undefined) {
                var rows3array = rows3[0].altgrup.split(";")
                for (let i=0;i<rows3array.length;i++) {
                  if (rows3array[i].includes(request.body.projectgroup)) {
                    var gercekaltgrup = "altgrup LIKE '%" + rows3array[i] +"%'"
                  }
                }
              }
              console.log(gercekaltgrup)
            db.all(`select eposta from kullanici WHERE ${gercekaltgrup}`,
            function(err, rows1){ 
                if (rows1==undefined) {
                  db.all(`SELECT * FROM kullanici WHERE sicil=?`,
                  [sicilstirng],
                  function(err, rows1){ 
                    var mailOptions = {
                      from: 'ansprojeyonetimi@bilgi.ndk.gov.tr',
                      to: rows1[0].eposta,
                      cc: "ebru.ekici@ndk.gov.tr",
                      subject: date+"_"+request.body.sicil + " nolu EBT, "+request.body.sicil +" tarafından kaydedilmiştir.",
                      html: "",
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        console.log(error);
                      } else {
                        console.log('Email sent: ' + info.response);
                        response.send("Başarılı");
                      }
                    });
                  
                  })
                }
                else {
                  let towhom = ""
                  for (let i=0; i<rows1.length;i++) {
                    towhom = rows1[i].eposta + ";" + towhom
                  }
                  var mailOptions = {
                    from: 'ansprojeyonetimi@bilgi.ndk.gov.tr',
                    to: towhom,
                    cc: "ebru.ekici@ndk.gov.tr",
                    subject: date+"_"+request.body.sicil + " nolu EBT, "+request.body.sicil +" tarafından kaydedilmiştir.",
                    html: "",
                  };
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                      response.send("Başarılı");
                    }
                  });
                }                  

                 
            })    
                
             })    
                response.send("Başarılı")
              }


            }
          );


    
    });

    app.post(`/ebtupdate`, function(request, response){
  
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+'-'+today.getHours()+'-'+today.getUTCMinutes()+'-'+today.getSeconds();
    
      tarihce = request.body.isimsoyisim + " " + date + " yeni kayıt"

          // Load the docx file as binary content
          const content = fs.readFileSync(
            path.resolve("\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\taslak.docx"),
            "binary"
          );

          const zip = new PizZip(content);

          const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
          });

          // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
          // doc.render({
          //   category: request.body.category,
          //   relevantto: request.body.relevantto,
          //   projectgroup: request.body.projectgroup,
          //   expecteddate: request.body.expecteddate,
          //   airtitle: request.body.airtitle,
          //   documentname: request.body.documentname,
          //   relatedsection: request.body.relatedsection,
          // });

          const buf = doc.getZip().generate({
            type: "nodebuffer",
            // compression: DEFLATE adds a compression step.
            // For a 50MB output document, expect 500ms additional CPU time
            compression: "DEFLATE",
          });

          // buf is a nodejs Buffer, you can either write it to a file or res.send it with express for example.
          if (request.body.yetki == 1) {
            try {
              fs.writeFileSync(path.resolve("\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\"+request.body.aircode+".docx"), buf);
              db.run(`UPDATE ebtler SET uniteno = ?, 
              documentcode = ?,
              category = ?, 
              relevant = ?, 
              expecteddate = ?,  
              chapter = ?,   
              subject = ?, 
              documentname = ?,
              relatedsection = ?,
              letters = ?,
              notes = ? 
              WHERE no = ?`,
              [request.body.unitno, request.body.documentcode, request.body.category, request.body.relevantto, request.body.expecteddate, 
              request.body.chapter, request.body.airtitle, request.body.documentname, request.body.relatedsection, request.body.followup, request.body.note, request.body.no], 
                function(err, rows){
                    
                }
              );
              response.send("Başarılı")
            } catch (error) {
              response.send("Failure")
            }
          }
          else {
            try {
              fs.writeFileSync(path.resolve("\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\"+request.body.aircode+".docx"), buf);
              db.run(`UPDATE ebtler SET uniteno = ?, 
              documentcode = ?,
              category = ?, 
              relevant = ?, 
              expecteddate = ?, 
              responsible = ?, 
              chapter = ?,   
              subject = ?, 
              documentname = ?,
              relatedsection = ?,
              letters = ?,
              notes = ? 
              WHERE no = ?`,
              [request.body.unitno, request.body.documentcode, request.body.category, request.body.relevantto, request.body.expecteddate, 
              request.body.sicil, request.body.chapter, request.body.airtitle, request.body.documentname, request.body.relatedsection, request.body.followup, request.body.note, request.body.no], 
                function(err, rows){
                    
                }
              );
              response.send("Başarılı")
            } catch (error) {
              response.send("Failure")
            }
          }


      // })
    
        
    
    });


    app.post(`/onayla`, function(request, response){
  

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

        //date formatlama
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
        var date2 =y+"."+z+"."+today.getFullYear();


        db.all(`SELECT * FROM ebtler WHERE no = ?` , 
          [request.body.ebtno],
          function(err, rows){
            db.all(`SELECT * FROM ebtler WHERE uniteno = ? AND aircode LIKE '%ANS%'`, 
            [rows[0].uniteno],
            function(err, rows2){
              let maxaircode = 0
              for (let i = 0; i <rows2.length; i++) {
                if (rows2[i].aircode.slice(-5) > maxaircode) {
                  maxaircode = rows2[i].aircode.slice(-5)
                }
              }
              var count = maxaircode
              // var count = (rows2.length+1).toString()
          // Load the docx file as binary content
          const content = fs.readFileSync(
            path.resolve("\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ rows[0].uniteno + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\1 SUGGESTED Öneriler (Yinelenmesi Beklenenler)\\"+rows[0].aircode+".docx"),
            "binary"
          );
         

     
    

          var yeniebtno = parseInt(count) + 1
          // if (count.length <= 4 ) {
          //   for (var i = 0; i < (4-count.length); i++) {
          //     yeniebtno = "0" + yeniebtno
          //   }
          // }
          // if (rows[0].relevant.includes("CL")) {
          //   yeniebtno = "2" + yeniebtno
          // }
          // else {
          //   yeniebtno = "3" + yeniebtno
          // }
          if (rows[0].aircode.includes("ANS")) {
            console.log(rows[0].aircode)
            var aircode = rows[0].aircode
            var aircodeeski = aircode
            let airno = aircode.slice(aircode.length-7, aircode.length)
            aircode = aircode.replace(airno, "")
            airno = airno.replace(".", "")
            aircode = airno + "." + aircode + "-" + rows[0].grup
          }
          else {
            const zip = new PizZip(content);
            // try {
              const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
              });

            if (rows[0].relevant == "CL") {
              var kategori = "C"
            }
            else if (rows[0].relevant == "CP") {
              var kategori = "H"
            }
            else {
              var kategori = "C"
            }
            var aircode = "A"+yeniebtno + ".ANS"+rows[0].uniteno+"."+kategori+"."+ rows[0].documentcode + "-" + rows[0].grup
            var aircodeeski = "ANS"+rows[0].uniteno+"."+kategori+"."+ rows[0].documentcode + ".A"+yeniebtno 

                //date formatlama

// Split the input date by '-' and store it in an array
let dateArray = rows[0].expecteddate.split("-");
// check if day is single digit
if(dateArray[2].length < 2) {
  dateArray[2] = '0'+dateArray[2];
}
// check if month is single digit
if(dateArray[1].length < 2) {
  dateArray[1] = '0'+dateArray[1];
}
// Rearrange the date array to be in 'dd.mm.yyyy' format
let newDate = dateArray[2] + "." + dateArray[1] + "." + dateArray[0]; 

        // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)       
          doc.render({
            category: rows[0].category,
            relevantto: rows[0].relevant,
            projectgroup: rows[0].grup,
            expecteddate: newDate,
            airtitle: rows[0].subject,
            documentname: rows[0].documentname,
            relatedsection: rows[0].relatedsection,
            aircode: aircodeeski,
            date: date2,
          });
        
          
            const buf =  doc.getZip().generate({
              type: "nodebuffer",
              // compression: DEFLATE adds a compression step.
              // For a 50MB output document, expect 500ms additional CPU time
              compression: "DEFLATE",
            });
          }
          console.log(aircode)
          
         

/* }
catch(error)
{
  console.log("Hatamız3"+error)
} */
        
          // buf is a nodejs Buffer, you can either write it to a file or res.send it with express for example.
          try {
            if (rows[0].history.includes("Sent [")) {
              var rev = "RevSent"
            } 
            else {
              var rev = "Sent"
            }

            if (rows[0].status.includes("Closed+")) {
              var rev = "Closed+"
            } 
            if (rows[0].status.includes("Closed-")) {
              var rev = "Closed-"
            } 
            if (rev.includes("Closed+")) {
              var revyeni = "6 CLOSED + Olumlu kapatılanlar"
            } 
            if (rev.includes("Closed-")) {
              var revyeni = "5 CLOSED - Olumsuz kapatılanlar"
            } 
            if (rev.includes("Sent")) {
              var revyeni = "3 SENT APŞ'ye Gönderilenler"
            } 

            
              var followarray = rows[0].letters.split("<br>")
      
              for (let i = 0; i<followarray.length; i++) {
                db.all(`SELECT * FROM ebtler where aircode = ?`, 
                [followarray[i]],
                function(err, rows){
                  if (rows[0]!==undefined) {
                    if (!rows[0].letters.includes(aircode)) {
                      yenifollow2 = rows[0].letters + "<br>" + aircode + "(Followed By)"
                      db.run(`UPDATE ebtler SET letters = ?
                      WHERE aircode = ?`,
                      [yenifollow2, followarray[i]], 
                        function(err, rows){
                            
                        }
                      );
                    }
                  }
                  else {
                    yenifollow2 = ""
                  }

                })
              }
          


            var historyarray = rows[0].history.split("</li><li>")
            var historyyeni = ""
            for (let i=0; i<historyarray.length; i++) {
          //    if (historyarray[i].includes("Sent [") || historyarray[i].includes("Received [") || historyarray[i].includes("Cancelled [") || historyarray[i].includes("CLOSED") || historyarray[i].includes("Closed- [") || historyarray[i].includes("Closed+ [") || historyarray[i].includes("Waiting")) {
              if (!historyarray[i].includes("Rejected") && !historyarray[i].includes("Checked") ) {
                var historyitem = historyarray[i].replace("<li>", "")
                historyitem = historyitem.replace("</li>", "")
                historyyeni = historyyeni + "<li>" + historyitem + "</li>"
              }
            }
  
            var count = historyyeni.split(rev+" [").length - 1
            // var count = (historyyeni.match(/Sent/g) || []).length; 
            if (count == 0) {
              count = ""
            }  
            else {
              count = ".rev"+count
            }
            var today = new Date()
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
            var datetiresiz = today.getFullYear().toString().slice(2,4)+''+z+''+y
            var unitnumberyeni = aircode.slice(10,11)
            var destination = "\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ unitnumberyeni + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\"+revyeni.replace("Rev","")+"\\"+aircode+""+count+".docx"
            var destination2 = "\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\Ebru Ekici\\AIRs\\APŞ'ye gidecek\\"+datetiresiz+"\\"
            var destinationson = aircode+""+count+".docx"
            var destinationikinci 
  
  
            if(destination.includes("MS-WG08"))
            {
              destinationikinci = destination.replace("MS-WG08", "SM-WG08")
            }



            if (!fs.existsSync(destination) && !fs.existsSync(destinationikinci)){
              if (rows[0].aircode.includes("ANS")) {
                // fs.writeFileSync(path.resolve(destination), "\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ rows[0].uniteno + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\1 SUGGESTED Öneriler (Yinelenmesi Beklenenler)\\"+rows[0].aircode+".docx");
                fs.copyFileSync("\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ rows[0].uniteno + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\1 SUGGESTED Öneriler (Yinelenmesi Beklenenler)\\"+rows[0].aircode+".docx", destination);
              }
              else {
                const content = fs.readFileSync(
                  path.resolve("\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ rows[0].uniteno + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\1 SUGGESTED Öneriler (Yinelenmesi Beklenenler)\\"+rows[0].aircode+".docx"),
                  "binary"
                );
                const zip = new PizZip(content);
                  const doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                  });

                //date formatlama

// Split the input date by '-' and store it in an array
let dateArray = rows[0].expecteddate.split("-");
// check if day is single digit
if(dateArray[2].length < 2) {
  dateArray[2] = '0'+dateArray[2];
}
// check if month is single digit
if(dateArray[1].length < 2) {
  dateArray[1] = '0'+dateArray[1];
}
// Rearrange the date array to be in 'dd.mm.yyyy' format
let newDate = dateArray[2] + "." + dateArray[1] + "." + dateArray[0]; 

                doc.render({
                  category: rows[0].category,
                  relevantto: rows[0].relevant,
                  projectgroup: rows[0].grup,
                  expecteddate: newDate,
                  airtitle: rows[0].subject,
                  documentname: rows[0].documentname,
                  relatedsection: rows[0].relatedsection,
                  aircode: aircodeeski,
                  date: date2,
                });
                const buf =  doc.getZip().generate({
                  type: "nodebuffer",
                  // compression: DEFLATE adds a compression step.
                  // For a 50MB output document, expect 500ms additional CPU time
                  compression: "DEFLATE",
                });
                fs.writeFileSync(path.resolve(destination), buf);
                // fs.copyFileSync(buf, destination);
              }
             
            }
          
            else {
              for (let i = 1; i < 100; i++) {
              
               destination = "\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ unitnumberyeni + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\"+revyeni.replace("Rev","")+"\\"+aircode+""+count+".rev"+ i +".docx"
               destinationson = aircode+""+count+".rev"+ i +".docx"
               
               if(destination.includes("MS-WG08"))
               {
                 destinationikinci = destination.replace("MS-WG08", "SM-WG08")
               }
   
   
               if (!fs.existsSync(destination) && !fs.existsSync(destinationikinci)){
                  fs.copyFileSync("\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ rows[0].uniteno + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\1 SUGGESTED Öneriler (Yinelenmesi Beklenenler)\\"+rows[0].aircode+".docx", destination);

                  // fs.copyFileSync(buf, destination);
                  // fs.writeFileSync(path.resolve(destination), buf);
                  break
                }
              }
            }
// APŞye gidecek kklasöre kopyalama yeni yapıldı denenmedi


            if (!fs.existsSync(destination2)){
              fs.mkdirSync(destination2, { recursive: true });
            }

            if (destinationson.includes("ANS1")) {
              var destination22 = destination2+"UnitI\\"
              if (!fs.existsSync(destination22)){
                fs.mkdirSync(destination22, { recursive: true });
              }
              if (rev=="Sent") {
                destination22 =  destination22+"New\\"
                if (!fs.existsSync(destination22)){
                  fs.mkdirSync(destination22, { recursive: true });
                }
              }
              if (rev=="RevSent") {
                destination22 =  destination22+"RevSent\\"
                if (!fs.existsSync(destination22)){
                  fs.mkdirSync(destination22, { recursive: true });
                }
              }
              if (rev=="Closed+") {
                destination22 =  destination22+"Closed+\\"
                if (!fs.existsSync(destination22)){
                  fs.mkdirSync(destination22, { recursive: true });
                }
              }
              if (rev=="Closed-") {
                destination22 =  destination22+"Closed-\\"
                if (!fs.existsSync(destination22)){
                  fs.mkdirSync(destination22, { recursive: true });
                }
              }
              fse.copy(destination,  destination22+destinationson) 
            }
            if (destinationson.includes("ANS2")) {
              var destination22 = destination2+"UnitII\\"
              if (!fs.existsSync(destination22)){
                fs.mkdirSync(destination22, { recursive: true });
              }
              if (rev=="Sent") {
                destination22 =  destination22+"New\\"
                if (!fs.existsSync(destination22)){
                  fs.mkdirSync(destination22, { recursive: true });
                }
              }
              if (rev=="RevSent") {
                destination22 =  destination22+"RevSent\\"
                if (!fs.existsSync(destination22)){
                  fs.mkdirSync(destination22, { recursive: true });
                }
              }
              if (rev=="Closed+") {
                destination22 =  destination22+"Closed+\\"
                if (!fs.existsSync(destination22)){
                  fs.mkdirSync(destination22, { recursive: true });
                }
              }
              if (rev=="Closed-") {
                destination22 =  destination22+"Closed-\\"
                if (!fs.existsSync(destination22)){
                  fs.mkdirSync(destination22, { recursive: true });
                }
              }
              fse.copy(destination,  destination22+destinationson) 
            }
            if (destinationson.includes("ANS3")) {
              var destination22 = destination2+"UnitIII\\"
              if (!fs.existsSync(destination22)){
                fs.mkdirSync(destination22, { recursive: true });
              }
              if (rev=="Sent") {
                destination22 =  destination22+"New\\"
                if (!fs.existsSync(destination22)){
                  fs.mkdirSync(destination22, { recursive: true });
                }
              }
              if (rev=="RevSent") {
                destination22 =  destination22+"RevSent\\"
                if (!fs.existsSync(destination22)){
                  fs.mkdirSync(destination22, { recursive: true });
                }
              }
              if (rev=="Closed+") {
                destination22 =  destination22+"Closed+\\"
                if (!fs.existsSync(destination22)){
                  fs.mkdirSync(destination22, { recursive: true });
                }
              }
              if (rev=="Closed-") {
                destination22 =  destination22+"Closed-\\"
                if (!fs.existsSync(destination22)){
                  fs.mkdirSync(destination22, { recursive: true });
                }
              }
              fse.copy(destination,  destination22+destinationson) 
            }
            if (destinationson.includes("ANS4")) {
              var destination22 = destination2+"UnitIV\\"
              if (!fs.existsSync(destination22)){
                fs.mkdirSync(destination22, { recursive: true });
              }
              if (rev=="Sent") {
                destination22 =  destination22+"New\\"
                if (!fs.existsSync(destination22)){
                  fs.mkdirSync(destination22, { recursive: true });
                }
              }
              if (rev=="RevSent") {
                destination22 =  destination22+"RevSent\\"
                if (!fs.existsSync(destination22)){
                  fs.mkdirSync(destination22, { recursive: true });
                }
              }
              if (rev=="Closed+") {
                destination22 =  destination22+"Closed+\\"
                if (!fs.existsSync(destination22)){
                  fs.mkdirSync(destination22, { recursive: true });
                }
              }
              if (rev=="Closed-") {
                destination22 =  destination22+"Closed-\\"
                if (!fs.existsSync(destination22)){
                  fs.mkdirSync(destination22, { recursive: true });
                }
              }
              fse.copy(destination,  destination22+destinationson) 
            }

     //       




            var statusyeni = `<li><a href = "file:\\\\\\${destination}">${rev} [${date}]</a></li>`
            var history = statusyeni + historyyeni


            var sicilstirng = rows[0].history.substring(
              rows[0].history.indexOf("]-") + 2, 
              rows[0].history.indexOf("</a>")
            );
            console.log(sicilstirng)

// altgruplara mail atma. hata verirse buraya bak.
            db.all(`select altgrup from kullanici WHERE sicil = ?`,
            // db.all(`SELECT * FROM kullanici WHERE sicil=?`,
            [sicilstirng],
            function(err, rows3){ 
              if (rows3[0]!==undefined) {
                var rows3array = rows3[0].altgrup.split(";")
                for (let i=0;i<rows3array.length;i++) {
                  if (rows3array[i].includes(request.body.projectgroup)) {
                    var gercekaltgrup = "altgrup LIKE '%" + rows3array[i] +"%'"
                  }
                }
              }
              console.log(gercekaltgrup)
            db.all(`select eposta from kullanici WHERE ${gercekaltgrup}`,
            function(err, rows1){ 
                if (rows1==undefined) {
                  db.all(`SELECT * FROM kullanici WHERE sicil=?`,
                  [sicilstirng],
                  function(err, rows1){ 
                    var mailOptions = {
                      from: 'ansprojeyonetimi@bilgi.ndk.gov.tr',
                      to: rows1[0].eposta,
                      cc: "ebru.ekici@ndk.gov.tr",
                      subject: aircodeeski + " nolu EBT onaylanmıştır.",
                      html: statusyeni,
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        console.log(error);
                      } else {
                        console.log('Email sent: ' + info.response);
                        response.send("Başarılı");
                      }
                    });
                  
                  })
                }
                else {
                  let towhom = ""
                  for (let i=0; i<rows1.length;i++) {
                    towhom = rows1[i].eposta + ";" + towhom
                  }
                  var mailOptions = {
                    from: 'ansprojeyonetimi@bilgi.ndk.gov.tr',
                    to: towhom,
                    cc: "ebru.ekici@ndk.gov.tr",
                    subject: aircodeeski + " nolu EBT onaylanmıştır.",
                    html: statusyeni,
                  };
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                      response.send("Başarılı");
                    }
                  });
                }                  

                 
            })    
                
             })  
            // db.all(`select eposta from kullanici WHERE altgrup= (select altgrup from kullanici WHERE sicil= ?  AND altgrup!='')`,
            // [sicilstirng],
            // function(err, rows1){ 
            //     if (rows1[0]==undefined) {
            //       console.log("2 "+rows1.join(';'))
            //       db.all(`SELECT * FROM kullanici WHERE sicil=?`,
            //       [sicilstirng],
            //       function(err, rows1){ 
            //         var mailOptions = {
            //           from: 'ansprojeyonetimi@bilgi.ndk.gov.tr',
            //           to: rows1[0].eposta,
            //           cc: "ebru.ekici@ndk.gov.tr",
            //           subject: aircodeeski + " nolu EBT onaylanmıştır.",
            //           html: statusyeni,
            //         };
            //         transporter.sendMail(mailOptions, function(error, info){
            //           if (error) {
            //             console.log(error);
            //           } else {
            //             console.log('Email sent: ' + info.response);
            //             response.send("Başarılı");
            //           }
            //         });
                  
            //       })
            //     }
            //     else {
            //       let towhom = ""
            //       for (let i=0; i<rows1.length;i++) {
            //         towhom = rows1[i].eposta + ";" + towhom
            //       }
            //       var mailOptions = {
            //         from: 'ansprojeyonetimi@bilgi.ndk.gov.tr',
            //         to: towhom,
            //         cc: "ebru.ekici@ndk.gov.tr",
            //         subject: aircodeeski + " nolu EBT onaylanmıştır.",
            //         html: statusyeni,
            //       };
            //       transporter.sendMail(mailOptions, function(error, info){
            //         if (error) {
            //           console.log(error);
            //         } else {
            //           console.log('Email sent: ' + info.response);
            //           response.send("Başarılı");
            //         }
            //       });
            //     }   
                              
            // })    

            db.run(`UPDATE ebtler SET status = ?, history =?, aircode = ?
            WHERE no = ?`,
            [ `${rev}`, `${history}`, `${aircodeeski}`, request.body.ebtno], 
              function(err, rows){
                  
              }
            );
            response.send("Başarılı")
          } catch (error) {
            response.send("Failure")
            console.log(error)
          }

          })
        })
      });




    app.post(`/initialdraft`, function(request, response){
  
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+'-'+today.getHours()+'-'+today.getUTCMinutes()+'-'+today.getSeconds();
    
      tarihce = request.body.isimsoyisim + " " + date + " yeni kayıt"


      
          // Load the docx file as binary content
          const content = fs.readFileSync(
            path.resolve("\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\taslak.docx"),
            "binary"
          );

          const zip = new PizZip(content);

          const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
          });

                //date formatlama

// Split the input date by '-' and store it in an array
let dateArray = request.body.expecteddate.split("-");
// check if day is single digit
if(dateArray[2].length < 2) {
  dateArray[2] = '0'+dateArray[2];
}
// check if month is single digit
if(dateArray[1].length < 2) {
  dateArray[1] = '0'+dateArray[1];
}
// Rearrange the date array to be in 'dd.mm.yyyy' format
let newDate = dateArray[2] + "." + dateArray[1] + "." + dateArray[0]; 

          // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
          doc.render({
            category: request.body.category,
            relevantto: request.body.relevantto,
            projectgroup: request.body.projectgroup,
            expecteddate: newDate,
            airtitle: request.body.airtitle,
            documentname: request.body.documentname,
            relatedsection: request.body.relatedsection,
          });

          const buf = doc.getZip().generate({
            type: "nodebuffer",
            // compression: DEFLATE adds a compression step.
            // For a 50MB output document, expect 500ms additional CPU time
            compression: "DEFLATE",
          });

          // buf is a nodejs Buffer, you can either write it to a file or res.send it with express for example.
          try {
            fs.writeFileSync(path.resolve("\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\"+request.body.aircode+".docx"), buf);
            db.run(`UPDATE ebtler SET status = ?
            WHERE aircode = ?`,
            [ `${"<li><a href= 'file://///sp000dfs04.ndk.local\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\"+request.body.aircode+".docx' target='_blank'>Initial Draft</a></li>"}`, request.body.aircode], 
              function(err, rows){
                  
              }
            );
            response.send("Başarılı")
          } catch (error) {
            response.send("Failure")
          }

      // })
    
        
    
    });

    app.post('/yukleme', function (request, res) {

        var form = formidable({ multiples: true });
    
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    
        form.parse(request, function (err, fields, files) {
    
    
          if (files) {
          var oldpath1 = files.file.path;
          var link = files.file.name
          var link1 = link.split(",")[0]+".docx"
          var link2 = link.split(",")[1]
          var link3 = link.split(",")[2]
          var link4 = link.split(",")[3]
          var link5 = link.split(",")[4]

    
          var charMap = {Ç:'C',Ö:'O',Ş:'S',İ:'I',I:'i',Ü:'U',Ğ:'G',ç:'c',ö:'o',ş:'s',ı:'i',ü:'u',ğ:'g'};
    
    
          var str_array1 = link1.split('');

    
          var str1 = str_array1.join('');
          
          db.all(`SELECT * FROM ebtler WHERE aircode = ?` , 
          [link1.replace(".docx", "")],
          function(err, rows){          
          // var newpath1 = 'C:/Users/1720.NDK/Desktop/airsapp/upload/' + link1;
          var newpath1 = "\\\\sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ rows[0].uniteno + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\1 SUGGESTED Öneriler (Yinelenmesi Beklenenler)\\" + link1;

          mv(oldpath1, newpath1, function (err) {
            if (err) throw err;




              if (rows[0].history.includes("Sent [")) {
                var rev = "RevSent"
              } 
              else {
                var rev = "Sent"
              }
              if (link4.includes("Closed")) {
                var rev = link4
              }
          




            var noteyeni = rows[0].notes.replace(/ *\[[^\]]*]/, '').replace("[]", "")
            var historyarray = rows[0].history.split("</li><li>")
            var historyyeni = ""
            for (let i=0; i<historyarray.length; i++) {
            if (!historyarray[i].includes("Draft")) {
                var historyitem = historyarray[i].replace("<li>", "")
                historyitem = historyitem.replace("</li>", "")
                historyyeni = historyyeni + "<li>" + historyitem + "</li>"
              }
          
            }
              var statusyeni = "<li><a href= 'file://///sp000dfs04.ndk.local\\Birimler\\ngd\\ANS\\Dokümanlar\\Kurum Dokümanları\\"+ rows[0].uniteno + ". Ünite İnşaat Lisansı Değerlendirme Raporları\\Ek Bilgi Talepleri (EBT)\\NDK\\1 SUGGESTED Öneriler (Yinelenmesi Beklenenler)\\"+link1+"' target='_blank'>"+rev + " (Waiting) ["+date+"]-"+link2+"</a></li>" 
              var tarihce = statusyeni + historyyeni

              if (link5!=="") {
                db.run(`UPDATE ebtler SET status = ?, history = ?, notes = ?, expecteddate = ?
                WHERE aircode = ?`,
                [ `${rev + " (Waiting)"}`, `${tarihce}`, noteyeni, link5, link1.replace(".docx", "")], 
                  function(err, rows1){
                    if (err) {
                      console.log(err);
                    }
                    else {                            
                      var mailOptions = {
                      from: 'ansprojeyonetimi@bilgi.ndk.gov.tr',
                      to: "oya.ozdere@ndk.gov.tr", 
                      cc: "ebru.ekici@ndk.gov.tr", 
                      subject: rows[0].aircode + " nolu EBT kontrol için beklemektedir.",
                      html: rows[0].history,
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        console.log(error);
                      } else {
                        console.log('Email sent: ' + info.response);
                        // response.send("Başarılı");
                      }
                    });
                      
                    }   
                  }
                );
              }
              else {
                db.run(`UPDATE ebtler SET status = ?, history = ?, notes = ?
                WHERE aircode = ?`,
                [ `${rev + " (Waiting)"}`, `${tarihce}`, noteyeni, link1.replace(".docx", "")], 
                  function(err, rows1){
                    if (err) {
                      console.log(err);
                    }
                    else {                            
                      var mailOptions = {
                      from: 'ansprojeyonetimi@bilgi.ndk.gov.tr',
                      to: "oya.ozdere@ndk.gov.tr", 
                      cc: "ebru.ekici@ndk.gov.tr", 
                      subject: rows[0].aircode + " nolu EBT kontrol için beklemektedir.",
                      html: rows[0].history,
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        console.log(error);
                      } else {
                        console.log('Email sent: ' + info.response);
                        // response.send("Başarılı");
                      }
                    });
                      
                    }   
                  }
                );
              }

            })
            res.write('File uploaded and moved!');
            res.end();
          });
          }
        });
    
    });

    app.post(`/sonuckaydet`, async function (request, response) {
      db.all(`SELECT no, cevap FROM sorular` , 
      function(err, rows){
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+'-'+today.getHours()+':'+today.getUTCMinutes()+':'+today.getSeconds();
    
      sonucarray = request.body.sinavsonucu.split(",")
      let sinavid = ""
      let soruid = []
      let cevap = []
      let dogrucevap = []
      let sonuc = []
      let c = 0


      for(var i=0, len = sonucarray.length; i < len; i++) {
        sonucarraysinav = sonucarray[i].split("_")
        sinavid = sonucarraysinav[0]
        soruid[i] = sonucarraysinav[1]
        cevap[i] = sonucarraysinav[2]

        const result = rows.find( ({ no }) => no == sonucarraysinav[1]);
        dogrucevap[i] =  result.cevap

        if (cevap[i] == dogrucevap[i]) {
          sonuc[i] = "doğru"
          c = c + 1
        }
        else {
          sonuc[i] = "yanlış"
        }

          // db.run(`INSERT INTO sinavdurumu VALUES (null,?,?,?,?,?,?,?,?);`,
          // [rows[0].cevap, sinavid, request.body.kullanici, request.body.sicil, 
          // soruidstring, cevapstring, date, date], 
          // );
          

      }
      not = Math.round(c / (sonucarray.length) * 100)



      soruidstring = soruid.join(" ")
      cevapstring = cevap.join(" ")
      dogrucevapstring = dogrucevap.join(" ")
      sonucstring = sonuc.join(" ")

        
      db.all(`SELECT egitimadi FROM egitimler WHERE no = ?` , 
        [sinavid],
        function(err, rows){
          db.run(`UPDATE sinavdurumu SET yanitlar = ?, tarih = ?, notlar = ? WHERE katilimci = ? AND sinavadi = ?;`,
          [cevapstring, date, not, request.body.kullanici, rows[0].egitimadi],
          );
      })
    

        response.send("Başarılı")
      })
    });

    

    app.post(`/soruduzenle`, function(request, response){
  
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+'-'+today.getHours()+':'+today.getUTCMinutes()+':'+today.getSeconds();
    
      tarihce = request.body.isimsoyisim + " " + date + " yeni kayıt"
        
      db.all(`SELECT * FROM egitimler WHERE egitimadi = ?` , 
      [request.body.egitimadi],
      function(err, rows){
        db.run(`UPDATE sorular SET soru = ?, a = ?, b = ?, c = ?, d = ?, e = ?, cevap = ?, egitimadi = ?, sinavid = ? WHERE no =?;`,
        [request.body.soru, request.body.a, request.body.b, request.body.c, 
        request.body.d, request.body.e, request.body.cevap, request.body.egitimadi, rows[0].no, request.body.secilensoru], 
        );
      })

      
    

        response.send("Başarılı")
    
    });

    app.post(`/sinavkaydet`, function(request, response){
  
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+'-'+today.getHours()+':'+today.getUTCMinutes()+':'+today.getSeconds();
    
      tarihce = request.body.isimsoyisim + " " + date + " yeni kayıt"
        

          db.run(`INSERT INTO egitimler VALUES (null,?,?,?);`,
          [request.body.sinavkonusu, request.body.sorusayisi, request.body.sahibi], 
          );
      
    

        response.send("Başarılı")
    
    });

    app.post(`/yenisifrekaydet`, function(request, response){

      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+'-'+today.getHours()+':'+today.getUTCMinutes()+':'+today.getSeconds();
    

        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(request.body.sifre, salt, (err, hash) => {
            // if (err) {
            //   console.log(err)
            //   response.send("Failure")
            // }
            // else {

              db.all(`SELECT * FROM kullanici WHERE hash=?`,
              [request.body.hash],
              function(err, rows){
              if (rows[0] !== undefined) {
                db.run(`UPDATE kullanici SET hash= ?, sifre= ? WHERE hash = ?;`,
                [hash, hash, request.body.hash], 
                function(err) {
                  if (err) {
                    response.send(err)
                  }
                  else {
                    response.send("Başarılı")
                  }
                }
                );
              }
              else {
                response.send("Failure");
              }
        
                
              })

              
            // }
          });
        });

          // db.run(`UPDATE kullanici SET sifre = ? WHERE sicil = ?;`,
          // [request.body.sifre, request.body.sicil], 
          // );
      
    
    });
    
    app.post(`/unuttum`, function(request, response){
  

        

      db.all(`SELECT * FROM kullanici WHERE sicil=?`,
      [request.body.sicil],
      function(err, rows){
      if (rows[0] !== undefined) {
        var mailOptions = {
          from: 'ansprojeyonetimi@bilgi.ndk.gov.tr',
          to: rows[0].eposta,
          subject: "Şifre linki",
          html: '<a href="https://ansproje.ndk.gov.tr/password/'+ rows[0].hash + '">Linke Tıklayın</a>'
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            response.send("Başarılı");
            console.log('Email sent: ' + info.response);
          }
        })
      }
      else {
        response.send("Failure");
      }

        
      })
    
    });

    app.post(`/sinavduzenle`, function(request, response){
  
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+'-'+today.getHours()+':'+today.getUTCMinutes()+':'+today.getSeconds();
    
      tarihce = request.body.isimsoyisim + " " + date + " yeni kayıt"
        

          db.run(`UPDATE egitimler SET egitimadi = ?, sorusayisi = ?, sahibi = ? WHERE no = ?;`,
          [request.body.sinavkonusu, request.body.sorusayisi, request.body.sahibi, request.body.secilensinav], 
          );
      
    

        response.send("Başarılı")
    
    });

    app.post(`/sinavsil`, function(request, response){
  
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+'-'+today.getHours()+':'+today.getUTCMinutes()+':'+today.getSeconds();
    
      tarihce = request.body.isimsoyisim + " " + date + " yeni kayıt"
        

          db.run(`DELETE FROM egitimler WHERE no = ?;`,
          [request.body.secilensinav], 
          );
      
    

        response.send("Başarılı")
    
    });

    app.post(`/ebtsil`, function(request, response){
  

          db.run(`DELETE FROM ebtler WHERE no = ?;`,
          [request.body.ebtno], 
          );
      
    

        response.send("Başarılı")
    
    });

    app.post(`/ebtiptal`, function(request, response){

      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

      db.all(`SELECT * FROM ebtler where no = ?`, 
      [request.body.ebtno],
      function(err, rows){
            yenihistory = "<li>Cancelled [" + date + "]</li>" + rows[0].history
            yenistatus = "Cancelled"
            db.run(`UPDATE ebtler SET status = ?, history = ?
            WHERE no = ?`,
            [yenistatus, yenihistory, request.body.ebtno], 
              function(err, rows){
                response.send("Başarılı") 
              }
            );
          
      })
  




});

    app.post(`/notekaydet`, function(request, response){

      db.run(`UPDATE ebtler SET notes=? WHERE no=?;`,
      [request.body.note, request.body.no], 
      function(err, rows){
        if (err) {
          console.log(err)
        }
        else {
          response.send("Başarılı")
        }
      }
      );
  



    });

    app.post(`/statuskaydet`, function(request, response){
      if (request.body.yetki == 1) {
        var yenistatus = request.body.status + " (Waiting)"
        db.run(`UPDATE ebtler SET status=?, expecteddate=? WHERE no=?;`,
        [yenistatus, request.body.expecteddate, request.body.no], 
        function(err, rows){
          if (err) {
            console.log(err)
          }
          else {
            response.send("Başarılı")
          }
        }
        );
      }
      else if (request.body.yetki == 2) {
        var yenistatus = request.body.status + " (Checked)"
        db.run(`UPDATE ebtler SET status=?, expecteddate=? WHERE no=?;`,
        [yenistatus, request.body.expecteddate, request.body.no], 
        function(err, rows){
          if (err) {
            console.log(err)
          }
          else {
            response.send("Başarılı")
          }
        }
        );
      }
      else {
        response.send("Failure")
      }

    });

    app.post(`/iadenot`, function(request, response){

      db.all(`SELECT * FROM ebtler WHERE no=?`,
          [request.body.no],
          function(err, rows){
            let yeninot = rows[0].notes + "<br>[İade notu: "+request.body.note+"]"
          db.run(`UPDATE ebtler SET notes=? WHERE no=?;`,
          [yeninot, request.body.no], 
          );
  


    response.send("Başarılı")

    });
  });

    app.post(`/sorusil`, function(request, response){
  
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+'-'+today.getHours()+':'+today.getUTCMinutes()+':'+today.getSeconds();
    
      tarihce = request.body.isimsoyisim + " " + date + " yeni kayıt"
        

          db.run(`DELETE FROM sorular WHERE no = ?;`,
          [request.body.secilensoru], 
          );
      
    

        response.send("Başarılı")
    
    });

app.listen(process.env.PORT || 5000, () => console.log("Server running..."));