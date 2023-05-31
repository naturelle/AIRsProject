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
var mv = require('mv');


const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");



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

    const {id} = request.params
  
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
        // response.sendFile(path.join(__dirname + '/login.html'));
        response.send("bilgiyok")
      }
    
    })
      
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

        if (rows[0].hash == request.body.hash) {

          db.all(`SELECT * FROM ebtler WHERE no=?`,
          [request.body.ebtno],
          function(err, rows2){
            if (rows[0].yetki >= 1) {
              response.send(rows2);
            }
            else if (rows[0].grup == request.body.grup && request.body.grup == rows2[0].grup) {
              response.send(rows2);
            }
            else {
              response.send("Failure");
            }
          })
    
        }
        else{
          response.send("Failure");
        }

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
        db.all(`SELECT * FROM taslaklar WHERE status LIKE '%Waiting%' OR status LIKE '%Checked%' OR  ((status LIKE '%Rejected%' OR status LIKE '%Waiting%' OR status LIKE '%Checked%' OR status LIKE '%Draft%') AND grup = ?)`,
        [request.body.sicil],
          function(err, rows){
        response.send(rows);
      })
      }
      else {
        db.all(`SELECT * FROM taslaklar WHERE (status LIKE '%Rejected%' OR status LIKE '%Waiting%' OR status LIKE '%Checked%' OR status LIKE '%Draft%') AND grup = ?`,
        [request.body.sicil],
          function(err, rows){
        response.send(rows);
      })
      }

    });

    app.post(`/aircode`, function(request, response){

      db.all(`SELECT * FROM taslaklar WHERE no  = ?`,
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
      db.all(`SELECT * FROM ebtler WHERE no = ? AND responsible = ?` , 
        [request.body.ebtno, request.body.sicil],
        function(err, rows){
          response.send(rows);
        })
    });

    app.post(`/gerigonder`, function(request, response){
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
      db.all(`SELECT * FROM taslaklar WHERE no = ?` , 
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
          var statusyeni = "<li><a href= 'file://///10.243.22.20\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\Draft\\"+rows[0].aircode+".docx' target='_blank'>"+rev+" (Rejected) ["+date+"]</a></li>" 
          var statusyeni = "<li>"+rev+" (Rejected) ["+date+"]</li>" 
          var tarihce = statusyeni + rows[0].history
          db.run(`UPDATE taslaklar SET status = ?, history =?
          WHERE no = ?`,
          [ `${rev+" (Rejected)"}`, `${tarihce}`, request.body.ebtno], 
            function(err, rows){
                
            }
          );
          response.send("Başarılı");
        })
    });

    app.post(`/onayagonder`, function(request, response){
      var today = new Date();
      var date = today.getFullYear()+'_'+(today.getMonth()+1)+'_'+today.getDate()
      db.all(`SELECT * FROM taslaklar WHERE no = ?` , 
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

          var statusyeni = "<li><a href= 'file://///10.243.22.20\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\Draft\\"+rows[0].aircode+".docx' target='_blank'>"+rev+" (Checked) ["+date+"]</a></li>" 
          var statusyeni = "<li>"+rev+" (Checked) ["+date+"]</li>" 
          var tarihce = statusyeni + rows[0].history
          db.run(`UPDATE taslaklar SET status = ?, history =?
          WHERE no = ?`,
          [ `${rev + " (Checked)"}`, `${tarihce}`, request.body.ebtno], 
            function(err, rows){
                
            }
          );
          response.send("Başarılı");
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
      var tarihce = "<li><a href= 'file://///10.243.22.20\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\Draft\\"+date+"_"+request.body.sicil+".docx' target='_blank'>"+giri+"</a></li>"

          db.run(`INSERT INTO taslaklar VALUES (null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
          [date+"_"+request.body.sicil, request.body.unitno, request.body.category, request.body.relevantto, request.body.expecteddate, request.body.projectgroup, 
          request.body.sicil, request.body.chapter, `${tarihce}`, `${"Draft"}`, yenifollow, request.body.airtitle, request.body.documentname, request.body.relatedsection, request.body.note], 
            function(err, rows){

                const content = fs.readFileSync(
                  path.resolve("\\\\10.243.22.20\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\taslak.docx"),
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


                fs.writeFileSync(path.resolve("\\\\10.243.22.20\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\Draft\\"+date+"_"+request.body.sicil+".docx"), buf);



            }
          );

        response.send("Başarılı")
    
    });

    app.post(`/ebtupdate`, function(request, response){
  
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+'-'+today.getHours()+'-'+today.getUTCMinutes()+'-'+today.getSeconds();
    
      tarihce = request.body.isimsoyisim + " " + date + " yeni kayıt"

          // Load the docx file as binary content
          const content = fs.readFileSync(
            path.resolve("\\\\10.243.22.20\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\taslak.docx"),
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
          try {
            fs.writeFileSync(path.resolve("\\\\10.243.22.20\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\"+request.body.aircode+".docx"), buf);
            db.run(`UPDATE ebtler SET uniteno = ?, 
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
            [request.body.unitno, request.body.category, request.body.relevantto, request.body.expecteddate, 
            request.body.sicil, request.body.chapter, request.body.airtitle, request.body.documentname, request.body.relatedsection, request.body.followup, request.body.note, request.body.no], 
              function(err, rows){
                  
              }
            );
            response.send("Başarılı")
          } catch (error) {
            response.send("Failure")
          }

      // })
    
        
    
    });


    app.post(`/onayla`, function(request, response){
  

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()






        
        db.all(`SELECT * FROM taslaklar WHERE no = ?` , 
          [request.body.ebtno],
          function(err, rows){
            db.all(`SELECT * FROM taslaklar` , 
            function(err, rows2){
          // Load the docx file as binary content
          const content = fs.readFileSync(
            path.resolve("\\\\10.243.22.20\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\Draft\\"+rows[0].aircode+".docx"),
            "binary"
          );

          const zip = new PizZip(content);

          const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
          });
          var yeniebtno = rows2.length + 1


          if (yeniebtno.length <= 5 ) {
            for (var i = 0; i < (5-yeniebtno.length); i++) {
              yeniebtno = "0" + yeniebtno
            }
          }
          var aircode = "ANS"+rows[0].uniteno+".A.1.C.A"+yeniebtno
          // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
          doc.render({
            category: rows[0].category,
            relevantto: rows[0].relevant,
            projectgroup: rows[0].grup,
            expecteddate: rows[0].expecteddate,
            airtitle: rows[0].subject,
            documentname: rows[0].documentname,
            relatedsection: rows[0].relatedsection,
            aircode: aircode,
            date: date,
          });

          const buf = doc.getZip().generate({
            type: "nodebuffer",
            // compression: DEFLATE adds a compression step.
            // For a 50MB output document, expect 500ms additional CPU time
            compression: "DEFLATE",
          });

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
              var followarray = rows[0].letters.split("<br>")
      
              for (let i = 0; i<followarray.length; i++) {
                db.all(`SELECT * FROM taslaklar where aircode = ?`, 
                [followarray[i]],
                function(err, rows){
                  if (rows[0]!==undefined) {
                    if (!rows[0].letters.includes(aircode)) {
                      yenifollow2 = rows[0].letters + "<br>" + aircode + "(Followed By)"


                          db.run(`UPDATE taslaklar SET letters = ?
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
              if (historyarray[i].includes("Sent [") || historyarray[i].includes("Received [") || historyarray[i].includes("Cancelled [")) {
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
            console.log(count)
            destination = "\\\\10.243.22.20\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\"+rev.replace("Rev","")+"\\"+aircode+""+count+".docx"
            fs.writeFileSync(path.resolve(destination), buf);
            var statusyeni = `<li><a href = "file:\\\\\\${destination}">${rev} [${date}]</a></li>`
            var history = statusyeni + historyyeni

            db.run(`INSERT INTO ebtler VALUES (null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
            [aircode, request.body.category, rows[0].relevantto, rows[0].expecteddate, rows[0].projectgroup, 
            rows[0].sicil, rows[0].chapter, `${history}`, `${rev}`, rows[0].letters, rows[0].airtitle, rows[0].documentname, rows[0].relatedsection, rows[0].note], 

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
            path.resolve("\\\\10.243.22.20\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\taslak.docx"),
            "binary"
          );

          const zip = new PizZip(content);

          const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
          });

          // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
          doc.render({
            category: request.body.category,
            relevantto: request.body.relevantto,
            projectgroup: request.body.projectgroup,
            expecteddate: request.body.expecteddate,
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
            fs.writeFileSync(path.resolve("\\\\10.243.22.20\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\"+request.body.aircode+".docx"), buf);
            db.run(`UPDATE ebtler SET status = ?
            WHERE aircode = ?`,
            [ `${"<li><a href= 'file://///10.243.22.20\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\"+request.body.aircode+".docx' target='_blank'>Initial Draft</a></li>"}`, request.body.aircode], 
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

    
          var charMap = {Ç:'C',Ö:'O',Ş:'S',İ:'I',I:'i',Ü:'U',Ğ:'G',ç:'c',ö:'o',ş:'s',ı:'i',ü:'u',ğ:'g'};
    
    
          var str_array1 = link1.split('');

    
          var str1 = str_array1.join('');
          
          
          // var newpath1 = 'C:/Users/1720.NDK/Desktop/airsapp/upload/' + link1;
          var newpath1 = '\\\\10.243.22.16\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\Draft\\' + link1;

          mv(oldpath1, newpath1, function (err) {
            if (err) throw err;
            console.log(link1.replace(".docx", ""))
            db.all(`SELECT * FROM taslaklar WHERE aircode = ?` , 
            [link1.replace(".docx", "")],
            function(err, rows){



              if (rows[0].history.includes("Sent [")) {
                var rev = "RevSent"
              } 
              else {
                var rev = "Sent"
              }
              if (link4.includes("Closed")) {
                var rev = link4
              }
          

            var historyarray = rows[0].history.split("</li><li>")
            var historyyeni = ""
            for (let i=0; i<historyarray.length; i++) {
            if (!historyarray[i].includes("Draft")) {
                var historyitem = historyarray[i].replace("<li>", "")
                historyitem = historyitem.replace("</li>", "")
                historyyeni = historyyeni + "<li>" + historyitem + "</li>"
              }
            }
              var statusyeni = "<li><a href= 'file://///10.243.22.20\\Birimler\\ngd\\NGD ORTAK\\Kişiler\\Ebru\\İşletmeye Alma İzni Ek Bilgi Talepleri\\NDK\\Draft\\"+link1+"' target='_blank'>"+rev + " (Waiting) ["+date+"]</a></li>" 
              var tarihce = statusyeni + historyyeni
            db.run(`UPDATE taslaklar SET status = ?, history = ?
            WHERE aircode = ?`,
            [ `${rev + " (Waiting)"}`, `${tarihce}`, link1.replace(".docx", "")], 
              function(err, rows){
                  
              }
            );
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
    

        

          db.run(`UPDATE kullanici SET sifre = ? WHERE sicil = ?;`,
          [request.body.sifre, request.body.sicil], 
          );
      
    

        response.send("Başarılı")
    
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
      );
  


    response.send("Başarılı")

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