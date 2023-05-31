//class names
// localStorage.clear();

// const YES ="fa-check-circle"
// const NO ="fa-times-circle"
// global değişkenler
var listeleflag
var filtreflag = 0
var anasayfaflag = 0
var yetkiliisim 
var yetkilisoyisim 
var yetkilieposta 
var yetkilisicil 
var yetkiver 
var yetki
var isim
var soyisim
var sicil
var eposta
var no 
var k = 0
var link =""
var kullanici = ""
var sifre = ""
var excelekranı =0
var duzenle = 0
var kayma = 0
var kaydir = 0
var returnflag
var yazisma
// var kullaniciflag = 0
var epostaflag = 0
var yetkilieposta = ""
var notificationflag = 0
var gönderildiflag = 0
// var yetkiflag = 0
// var yetki = 0
var yetkiflag1 = 0
var alertflag = 0
// var eskiscroll = 0
var satir
var sutun1
var sutun2
var sutun3
var sutun4
var sutun5
var sutun6
var sutun7
var sutun8
var sutun9
var sutun10
var sutun11
var sutun12
var sutun13
var sutun14
var yenileflag = 0
var sayfapozisyonu = 0
var lastone = 0
var yetkilendirmelaert = 0

// yetki = localStorage.getItem("yetki");

function ekler(yol){
  yıl = yol.substring(0, 2);
  yıl = "20"+yıl
  $.post("pdf",  {yol: `${yol}`, yıl: `${yıl}`
})
}

function pdf(yol){
  yıl = yol.substring(0, 2);
  yıl = "20"+yıl
  $.post("pdf",  {yol: `${yol}`, yıl: `${yıl}`
})
}

function toplamekle(dbrows, tamamlanan, kosultamamlanan, cevapbekleyen, değerlendirilen){
if (document.getElementById("toplamkayit")) {
  document.getElementById("toplamkayit").remove()
}
  const list = document.querySelector('#liste');
  const div = document.createElement('div'); 
  div.id = 'toplamkayit';
  div.className = `unselectable toplamkayit`;
  div.innerHTML = `  
    <div>
    <div id="like_button_container">dene</div>
    <div style="font-size:12px;">Toplam kayıt: ${dbrows}  | <span style = "color :#008000; cursor: pointer" onclick = "tamamlanan()"> Tamamlanan: ${tamamlanan}  </span> | <span style = "color :#9a9a00; cursor: pointer" onclick = "kosultamamlanan()"> Koşullu tamamlanan: ${kosultamamlanan}  </span> | <span style = "color :#FF0000; cursor: pointer" onclick = "cevapbekleyen()"> Cevap bekleyen: ${cevapbekleyen}  </span> | <span style = "color :#FFA500; cursor: pointer" onclick = "değerlendirilen()"> Değerlendirme aşamasında: ${değerlendirilen}</span></div>
    
    </div>`
  list.appendChild(div); 
}
function divekle(){
if (localStorage.getItem("userkapat") == 0){
document.querySelector('#cıkıs').style.display = "block" 
document.querySelector('#giris').style.display = "none" 
donusturbtn.style.display = "block"
findbtn.style.display = "block"

const list = document.querySelector('#liste');
const div = document.createElement('div');
$.post("kullanici", function (bilgi){
  if (yetkilisicil == sicil || duzenle==1 || sicil=="0106"){

    yenikayitbtn.style.display= "block";
  }

if (document.getElementById("kullaniciadi")) {
  document.getElementById("kullaniciadi").remove()
}
div.id = 'kullaniciadi';
div.className = `unselectable kullaniciadi`;
if (sicil == "0106"){
  div.innerHTML = `  
  <div>
  <div id="yisimsoyisim" style="font-size:14px;">${isim} ${soyisim}</div>
  <div id="yetkiver" onclick= "yetkiekrani()" style="font-size:14px; ">${yetkiver}</div>
  </div>`
  list.appendChild(div);
  document.querySelector('#bilgi').style.display = "block" 
  const bilgibtn = document.querySelector('#bilgi')
  bilgibtn.addEventListener("click", duyuruekrani)
}
else {
  div.innerHTML = `  
  <div>
  <div id="yisimsoyisim" style="font-size:14px;">${yetkiliisim} ${yetkilisoyisim}</div>
  <div id="isimsoyisim" onclick= "gorevlerim()" style="font-size:14px; ">${isim} ${soyisim}</div>
  </div>`
  list.appendChild(div);
  document.querySelector('#bilgi').style.display = "block"
  const bilgibtn = document.querySelector('#bilgi')
  bilgibtn.addEventListener("click", duyuruekrani)
}
})
}

duyurusoyad=soyisim
document.getElementById("duyurular").innerHTML = `<p>Duyurular</p>
`
$.post("duyurular", function (books){
  if (!books) {
    alert("Bağlantı hatası!")
  }
  else {
  let length = books.length;
  okunmamismesaj = 0
  for (let i=length-1; i>-1; i--){
   if (books[i][duyurusoyad]==1){
     duyurucolor= "color: red"
     okunmamismesaj = okunmamismesaj + 1;
   } 
   else {
     duyurucolor=""
   }

  //  if (yetkilisicil==sicil ||  sicil=="0142" ||  sicil=="0106"){
    document.getElementById("duyurular").innerHTML += `<p id="duyurudegistir${i+1}" class="duyurudegistir" onclick="duyurudegistir(this.id)">${i+1}---------------------------------------------------------</p><p 
    style= 'overflow-wrap: break-word;
    word-break:break-word;
    word-wrap:break-word;
    line-break: strict; ${duyurucolor}'>${books[i].duyuru}</p>`
  // }
  // else {
  //   document.getElementById("duyurular").innerHTML += `<p>${i+1}---------------------------------------------------------</p><p 
  //   style= 'overflow-wrap: break-word;
  //   word-break:break-word;
  //   word-wrap:break-word;
  //   line-break: strict; ${duyurucolor}'>${books[i].duyuru}</p>`
  // }
  }
  if (okunmamismesaj !== 0){
    const list = document.querySelector('#book-list');
    const divmesaj = document.createElement('div');
    divmesaj.id = 'mesajsayisi';
    divmesaj.className = `mesajsay`;

    
    divmesaj.innerHTML = `
    <p align="center">${okunmamismesaj}</p>
  `;
    list.appendChild(divmesaj);
   }
  }
})




}



function gorevlerim() {
  document.getElementById("myInput").value="";
  document.getElementById("myInput1").value="";
  document.getElementById("myInput2").value="";
  document.getElementById("myInput3").value=soyisim;
  document.getElementById("myInput4").value="";
  document.getElementById("myInput5").value="";
  document.getElementById("myInput6").value="";
  document.getElementById("myInput7").value="";
  document.getElementById("myInput8").value="";
  document.getElementById("myInput8").value="";
  document.getElementById("myInput9").value="";
  document.getElementById("myInput10").value="";
  document.getElementById("myInput11").value="";
  document.getElementById("myInput12").value="";
  document.getElementById("myInput13").value="";
  myFunction();
}

function tamamlanan() {
  document.getElementById("myInput1").value="Completed";
  myFunction();
}

function kosultamamlanan() {
  document.getElementById("myInput1").value="Conditions";
  myFunction();
}

function cevapbekleyen() {
  document.getElementById("myInput1").value="Waiting";
  myFunction();
}

function değerlendirilen() {
  document.getElementById("myInput1").value="Under";
  myFunction();
}


$(function() {
	var startX,
		 startWidth,
		 $handle,
		 $table,
		 pressed = false;
	
	$(document).on({
		mousemove: function(event) {
			if (pressed) {
				$handle.width(startWidth + (event.pageX - startX));
			}
		},
		mouseup: function() {
			if (pressed) {
				$table.removeClass('resizing');
				pressed = false;
			}
		}
	}).on('mousedown', '.table-resizable th', function(event) {
		$handle = $(this);
		pressed = true;
		startX = event.pageX;
		startWidth = $handle.width();
		
		$table = $handle.closest('.table-resizable').addClass('resizing');
	}).on('dblclick', '.table-resizable thead', function() {
		// Reset column sizes on double click
		$(this).find('th[style]').css('width', '');
	});
});



function duyuruekrani () {
  duyurusoyad=soyisim
  if (document.getElementById("duyurular").style.display=="block") {
    document.getElementById("duyurular").style.display="none"
    document.getElementById("duyuruekle").style.display="none";
  if (document.getElementById("mesajsayisi")) {
    document.getElementById("mesajsayisi").style.display="none";
  }
  }
  else {
    // document.getElementById("duyurular").innerHTML = `<p>Duyurular</p>
    // `
    // $.post("duyurular", function (books){
    //   let length = books.length;
    //   okunmamismesaj = 0
    //   for (let i=length-1; i>-1; i--){
    //    if (books[i][duyurusoyad]==1){
    //      duyurucolor= "color: red"
    //    } 
    //    else {
    //      duyurucolor=""
    //    }
    //     document.getElementById("duyurular").innerHTML += `<p>----------------------------------------------------------------</p><p 
    //     style= 'overflow-wrap: break-word;
    //     word-break:break-word;
    //     word-wrap:break-word;
    //     line-break: strict; ${duyurucolor}'>${books[i].duyuru}</p>`
    //   }
      if (document.getElementById("mesajsayisi")){
        document.getElementById("mesajsayisi").remove()
      }
    // })
    document.getElementById("duyurular").style.display="block"
    // if (yetkilisicil==sicil ||  sicil=="0142" ||  sicil=="0106") {
      document.getElementById("duyuruekle").style.display="block";
    // } 
    $.post("okundu",  {duyurusoyad: `${duyurusoyad}`
    })
  }
}

function yetkiekrani () {
  if (!(document.getElementById("yetkiekran"))){
   
    document.getElementById("notekran").style.display="none"
    duzenleek.style.display = "none";
    bulgularek.style.display = "none";
    baslik.style.display = "block";
    kayitek.style.display = "none";
    if (yetkilisicil == sicil || duzenle==1 || sicil=="0106"){
      yenikayitbtn.style.display= "block";
      }
    // yenikayitbtn.style.display= "block";
    kapatbtn.style.display="none";
    document.getElementById("formlar").style.display="none"  


  const list = document.querySelector('#book-list');
  const div = document.createElement('div');
  // kullaniciflag=1;
  // yetkiflag = 0;
  div.id = 'yetkiekran';
  div.className = `unselectable yetkiekran`;
  div.innerHTML = `
  
  <div align = "center" style="margin-top:5px; margin-bottom:10px; font-family: 'Open Sans', sans-serif; font-weight: bold;">
  <p style="font-size:16px; color:white">Yetki Ver</p>
  </div>
  <div align= "center" style="margin-top:5px; margin-bottom:10px; font-family: 'Open Sans', sans-serif; font-weight: bold;" class="unselectable">
    <input type="date" id="myDate">
    <select class="form-control" id="yetkiler" style = "width:  270px;" required>
      <option>Yetki Kaldır</option>
      <option>İsmail Dinç</option>
      <option>Mehmet Mercimek</option>
      <option>Mehmet Kemal Öztaş</option>
      <option>Merve Çiğdem</option>
      <option>Merve Berat Sarıgüzel</option>
      <option>Miraç Bahadır Öztemiz</option>
      <option>Özgün Güngör</option>
      <option>Uğur Taşkın</option>
  </select>
  </div>
<div align= "center" style="margin-top:10px; margin-bottom:10px; font-family: 'Open Sans', sans-serif; font-weight: bold;" class="unselectable">
<tr>
  <input type="submit" value="Yetki Ver" onclick="yetkigonder()" id="yetkigonder" style = "width:  100px "class="btn btn-primary">
</tr>
<tr>
  <input type="submit" value="Kapat" onclick="yetkikapat()" id="yetkikapat" style = "width:  100px "class="btn btn-secondary">
</tr>
</div>
`;
list.appendChild(div);
}
}

function yetkigonder(){
  $.post("kullanici", function (bilgi){
    var today = new Date();
    if (today.getDate() <10) {
      var y = "0" + today.getDate()
    }
    else {
      var y = today.getDate()
    }
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+y;
    var x = document.getElementById("myDate").value;
    var yetkiverilen = document.getElementById("yetkiler").value;
    let bilgih = bilgi.length

    

    if (yetkiverilen=="Yetki Kaldır"){
        $.post("yetkikayit", {yetki: 0, id: 1
        });
        alert("Yetki kaldırıldı!")
        yetkilendirmelaert = 1;
    }
    else {
      if (x<date) {
        alert("Lütfen ileri bir tarih seçiniz!")
        yetkilendirmelaert = 1;
      }
      else {
      for (let i = 1; i < bilgih; i++){
        if (yetkiverilen.includes(bilgi[i].soyad)){
          $.post("yetkikayit", {yetki: x, id: `${bilgi[i].id}`
          });
          alert("Yetki verildi!")
          yetkilendirmelaert = 1;
        }
      }
    }
  }
  if (yetkilendirmelaert = 1){
    document.querySelector('#yetkiekran').remove() 
    if (document.getElementById("kullaniciadi")) {
      document.getElementById("kullaniciadi").remove()
    }

    donusturbtn.style.display = "none"
    indirbtn.style.display = "none"
    findbtn.style.display = "none"
    bulgubtn.style.display = "none"
    document.querySelector('#cıkıs').style.display = "none" 
    document.querySelector('#giris').style.display = "block" 
    // yetkiflag = 1
    // kullaniciflag = 0
    loginhash()
    divekle() 
  }
  })
}

function yetkikapat() {
  document.querySelector('#yetkiekran').remove() 
}
function kullanicigiris () {
  const list = document.querySelector('#navbar');
  const div = document.createElement('div');
  // kullaniciflag=1;
  // yetkiflag = 0;
  div.id = 'user';
  div.className = `unselectable user`;
  div.innerHTML = `
  
  <div align = "center" style="margin-top:5px; margin-bottom:0px; font-family: 'Open Sans', sans-serif; font-weight: bold;">
  <p style="font-size:16px; color:white">Giriş Yap</p>
  </div>
  <div align= "center" style="margin-top:5px; margin-bottom:10px; font-family: 'Open Sans', sans-serif; font-weight: bold;" class="unselectable">
    <input 
      class="form-control" id="usernamee" input type="text" style = "width:  350px;" name="usernamee" placeholder="Kullanıcı adı" required>
    </input>
  </div>
  <div align= "center" style="margin-top:5px; margin-bottom:10px; font-family: 'Open Sans', sans-serif; font-weight: bold;" class="unselectable">
    <input 
      class="form-control" id="passwordd" input type="password" style = "width:  350px;" name="passwordd" placeholder="Şifre" required>
    </input>
  </div>

<div align= "center" style="margin-top:10px; margin-bottom:0px; font-family: 'Open Sans', sans-serif; font-weight: bold;" class="unselectable">
<tr>
  <input type="submit" value="Giriş" onclick="usergonder()" id="usergonder" style = "width:  100px "class="btn btn-primary">
</tr>
<tr>
  <input type="submit" value="Şifre Değiştir" onclick="sifredegistir()" id="sifredegistir" style = "width:  100px "class="btn btn-secondary">
</tr>

</div>
<div align= "right" style="margin-bottom:0px; font-family: 'Open Sans', sans-serif; font-weight: bold;" class="unselectable">
<input type="submit" value="Şifremi Unuttum" onclick="sifregonder()" id="sifregonder" style = "width:  110px; color:white"class="btn btn-link">
</div>
`;
{/* <p onclick="sifregonder()" align = "right" style="margin-top:0px; margin-bottom:5px; margin-right:40px; cursor: pointer; font-family: 'Open Sans', sans-serif; font-size:10px; color:white">Şifremi unuttum</p> */}
{/* geçici olarak yukarıdaki kapat butonu kaldırıldı 
   <tr>
  <input type="submit" value="Kapat" onclick="userkapat()" id="userkapat" style = "width:  100px "class="btn btn-secondary">
</tr>*/}
list.appendChild(div);
document.getElementById("usernamee").focus();
document.getElementById("karart3").style.display="block";
}

function sifredegistir() {
  const list = document.querySelector('#book-list');
  const div = document.createElement('div');

  div.id = 'sifre1';
  div.className = `unselectable sifre`;
  div.innerHTML = `
  
  <div align = "center" style="margin-top:5px; margin-bottom:10px; font-family: 'Open Sans', sans-serif; font-weight: bold;">
  <p style="font-size:16px; color:white">Şifre Değiştir</p>
  </div>
  <div align= "center" style="margin-top:5px; margin-bottom:10px; font-family: 'Open Sans', sans-serif; font-weight: bold;" class="unselectable">
    <input 
      class="form-control" id="username1" input type="text" style = "width:  350px;" name="username1" placeholder="Kullanıcı adı" required>
    </input>
  </div>
  <div align= "center" style="margin-top:5px; margin-bottom:10px; font-family: 'Open Sans', sans-serif; font-weight: bold;" class="unselectable">
    <input 
      class="form-control" id="eskisifre" input type="password" style = "width:  350px;" name="eskisifre" placeholder="Eski şifre" required>
    </input>
  </div>
  <div align= "center" style="margin-top:5px; margin-bottom:10px; font-family: 'Open Sans', sans-serif; font-weight: bold;" class="unselectable">
    <input 
      class="form-control" id="yenisifre" input type="password" style = "width:  350px;" name="yenisifre" placeholder="Yeni şifre" required>
    </input>
  </div>
  <div align= "center" style="margin-top:5px; margin-bottom:10px; font-family: 'Open Sans', sans-serif; font-weight: bold;" class="unselectable">
  <input 
    class="form-control" id="yenisifre1" input type="password" style = "width:  350px;" name="yenisifre1" placeholder="Yeni şifre tekrar" required>
  </input>
  </div>

<div align= "center" style="margin-top:5px; margin-bottom:10px; font-family: 'Open Sans', sans-serif; font-weight: bold;" class="unselectable">
<tr>
  <input type="submit" value="Değiştir" onclick="degistir()" id="degistir" style = "width:  100px "class="btn btn-primary">
</tr>
<tr>
  <input type="submit" value="Vazgeç" onclick="vazgec()" id="vazgec" style = "width:  100px "class="btn btn-secondary">
</tr>
</div>`;
document.getElementById("user").remove()
list.appendChild(div);
}

function sifregonder(){
  alertflag = 0
  kullanici = document.getElementById("usernamee").value;

  if (kullanici==0) {
    alert("Lütfen geçerli bir kullanıcı adı giriniz!")
    document.getElementById("usernamee").focus();
  }
  else {
  $.post("kullanici", function (bilgi){
  let bilgih = bilgi.length

  for (let i = 0; i < bilgih; i++){
    if (kullanici == bilgi[i].sicil){
      $.post("sifreposta", {sifre:bilgi[i].sifre, eposta:bilgi[i].eposta},
      function(data){
        if (data=="Başarılı"){
          alert("Şifreniz kayıtlı eposta adresinize gönderildi!")
        }
      });
      alertflag = 1;
    }
  }
  if (alertflag == 0) {
  alert("Bu kullanıcıya ait bilgi bulunamadı!");
  document.getElementById("usernamee").focus();
  }
  })
  }  
}

function degistir(){
  alertflag = 0
  kullanici = document.getElementById("username1").value;
  eskisifre = document.getElementById("eskisifre").value;
  yenisifre = document.getElementById("yenisifre").value;
  yenisifre1 = document.getElementById("yenisifre1").value;

  $.post("kullanici", function (bilgi){
  let bilgih = bilgi.length

  for (let i = 0; i < bilgih; i++){
    if (kullanici == bilgi[i].sicil){
      if (eskisifre==bilgi[i].sifre){
        if (yenisifre == yenisifre1){
          if (yenisifre.length<6){
            alert("Şifre en az altı karakterden oluşmalıdır!");
            alertflag = 1;
          }
          else {
            $.post("kullanici", {sifre: `${yenisifre}`, id: `${bilgi[i].id}`
            });
            document.querySelector('#sifre1').remove()
            alert("Şifre başarıyla değiştirildi!")
            alertflag = 1;
          }
        }
        else {
          alert("Girilen şifreler birbiriyle eşleşmiyor!")
          alertflag = 1;
        }
      }
      else{
        alert("Lütfen şifrenizi kontrol ediniz!");
        document.getElementById("passwordd").focus();
        alertflag = 1;
      }
    }
  }
  if (alertflag == 0) {
  alert("Bu kullanıcıya ait bilgi bulunamadı");
  document.getElementById("usernamee").focus();
  }
  })
  
}

function vazgec(){
  document.querySelector('#sifre1').remove();
  kullanicigiris();
}

function usergonder(){
  localStorage.setItem("userkapat", "0");
  document.getElementById("karart2").style.display="block";
  document.getElementById("loading").style.display="block";
  alertflag = 0
  kullanici = document.getElementById("usernamee").value;
  sifre = document.getElementById("passwordd").value;

  if (kullanici==0) {
    alert("Lütfen geçerli bir kullanıcı adı giriniz!")
    document.getElementById("karart2").style.display="none";
    document.getElementById("loading").style.display="none";
    document.getElementById("usernamee").focus();
  }
  else {
  $.post("login",  {kullanici: `${kullanici}`, sifre: `${sifre}`},
  function(data){
    if (data.includes("$2b$")){
      document.getElementById('user').remove();
      document.getElementById("karart3").style.display="none";
      document.getElementById("karart2").style.display="none";
      document.getElementById("loading").style.display="none";
      backToDown()
      localStorage.setItem("hash", data);
      alertflag = 1;
      loginhash();
    }
    if (data=="sifrekontrol"){
      alert("Lütfen şifrenizi kontrol ediniz!");
      document.getElementById("karart2").style.display="none";
      document.getElementById("loading").style.display="none";
      document.getElementById("passwordd").focus();
      alertflag = 1;
    }
    if (data=="bilgiyok"){
      alert("Bu kullanıcıya ait bilgi bulunamadı");
      document.getElementById("karart2").style.display="none";
      document.getElementById("loading").style.display="none";
      document.getElementById("usernamee").focus();
    }
  })
  
  }
}
function userkapat(){
  document.getElementById("karart").style.display="none";
  document.getElementById('user').remove()
  localStorage.setItem("userkapat", "1");
}



// window.addEventListener('click', function(e){  
// if (kullaniciflag == 0){
//   if (document.getElementById('user').contains(e.target)){
//     alert("tıkladın")
//   } else{
//     alert("tıklamadın")
//   }
// }
// });

// var $table = $('#table');
//     $(function () {
//         $('#toolbar').find('select').change(function () {
//             $table.bootstrapTable('refreshOptions', {
//                 exportDataType: $(this).val()
//             });
//         });
//     })

// 		var trBoldBlue = $("table");

// 	$(trBoldBlue).on("click", "tr", function (){
// 			$(this).toggleClass("bold-blue");
// 	});


  // Event: Display Books
  document.addEventListener('DOMContentLoaded', function(){
    
    loginhash()

  
  
})

function loginhash() {
  $.post("loginhash",  {kullanici: `${localStorage.getItem("hash")}`},
  function(data){
  if (data[5] == "1"){
    yetkiliisim = data[0]
    yetkilisoyisim = data[1]
    yetkilieposta = data[2]
    yetkilisicil = data[3]
    yetkiver = data[4]
    yetki = data[5]
    isim = data[6]
    soyisim = data[7]
    sicil = data[8]
    displaybooks()
    listele()
    listele1()
    // listele2()
    // listele3()
    // listele4()
    // listele5()
  }
  else {
    listeleflag = 0
    kullanicigiris();
  }
  })
}
 
  setInterval(sayfayenile, 6*10*1000);
  
  function sayfayenile () {
      if (filtreflag == 0 && anasayfaflag == 0 && yetki == "1" && !document.getElementById("user") && document.getElementById("formlar").style.display !== "block") {
        displaybooks();
        yenileflag = 1 ;
        sayfapozisyonu  = window.pageYOffset
      }
  }

  function duyurudegistir(duyuruno){
    document.getElementById("duyurular").style.display="none"
    document.getElementById("duyuruekle").style.display="none";
    duyuruno=duyuruno.slice(14);
    const div = document.createElement('div');
    div.id = 'duydegistir';
    div.innerHTML = `
  
    <div align = "center">
    <br><p style="font-size:16px; color:white">Duyuru Değiştir</p>
    
    <div align= "center" class="unselectable">
    <textarea class="form-control" id="duyurumetni" name="duyurumetni" rows="10" style = "width:  350px;"></textarea>
  <tr><br>
    <input type="button" value="Kaydet" onclick="yeniduyurudegistir(${duyuruno})" style = "width:  100px "class="btn btn-primary">
    <input type="button" value="Vazgeç" onclick="yeniduyurukapat()" style = "width:  100px "class="btn btn-secondary">
  </tr>
  </div><br>
  `
    var list = document.getElementById("book-form");
    list.insertBefore(div, list.childNodes[0]);
    $.post("duyurular", function (books){
      document.getElementById("duyurumetni").value = books[duyuruno-1].duyuru.replace(/<br>/g, '\n').replace(/"/g, '')
    
    })
  }  

function yeniduyurudegistir(duyuruno) {
  document.getElementById("karart2").style.display="block";
  document.getElementById("loading").style.display="block";
  duyuru = document.getElementById("duyurumetni").value.replace(/\r\n|\r|\n/g,"<br>").trim()
  $.post("duyurudegistir",  {duyuru: `${duyuru}`, no: `${duyuruno}`},
  function(data){
    if (data=="Başarılı"){
      document.getElementById("karart2").style.display="none";
      document.getElementById("loading").style.display="none";
      document.getElementById("duydegistir").remove();
      alert("Duyuru değiştirildi!")
      divekle();
      duyuruekrani();
    }
  })
}

function satiragit1(satir) {
  gidileceksatir = "row" + satir
  if (document.getElementById(gidileceksatir)){
  document.getElementById(gidileceksatir).scrollIntoView();
  }
}

  function displaybooks() {
    // if (document.getElementById("formlar").style.display !== "block") {
    $.post("imalat", function (books){
      // $.post("kullanici", function (bilgi){
        $.post("linkkontrol", function (links){
          $.post("imalatcilarlink", function (manus){
        // bil=bilgi.length
        // yetkiflag1 = 0
        // for (let i=0; i<bil; i++) {
        //   if (bilgi[i].sicil==localStorage.getItem("sicil")) {
        //     yetkiflag1 = bilgi[i].yetki
        //   }
        // }

      $.post("loginhash",  {kullanici: `${localStorage.getItem("hash")}`},
        function(data){
   
        if (!data.includes("1")){
          cık();
          // kullanicigiris();
          
        }
        else {
          divekle()
          document.querySelector('#display').style.display = "block" 
      
      
    

      let table= document.querySelector('#book-list');
      let rowsNumber = table.rows.length;
      
      //delete old table
      for (let n=rowsNumber-1; n>=0; n--){
          table.deleteRow(n);
        }

      //veritabanından tabloya işleme

      let dbrows = books.length;
      bolum = parseInt(dbrows / 6);
      bolum2 = 2*bolum;
      bolum3 = 3*bolum;
      bolum4 = 4*bolum;
      bolum5 = 5*bolum;
      
      if (document.getElementById("bolum1")) {
        document.getElementById("bolum1").remove()
      }
      if (document.getElementById("bolum2")) {
        document.getElementById("bolum2").remove()
      }
      if (document.getElementById("bolum3")) {
        document.getElementById("bolum3").remove()
      }
      if (document.getElementById("bolum4")) {
        document.getElementById("bolum4").remove()
      }
      if (document.getElementById("bolum5")) {
        document.getElementById("bolum5").remove()
      }
      var bolumegit = document.createElement("div");
      bolumegit.innerHTML = bolum;
      bolumegit.onclick = function () {
        dbrows = books.length;
        bolum = parseInt(dbrows / 6);
        gidileceksatir = "row" + bolum
        if (document.getElementById(gidileceksatir)){
        document.getElementById(gidileceksatir).scrollIntoView();
        window.scrollBy(0, -85)
        }
      };
      bolumegit.id = "bolum1"
      document.body.appendChild(bolumegit);


      var bolumegit1 = document.createElement("div");
      bolumegit1.innerHTML = bolum2 ;
      bolumegit1.onclick = function () {
        dbrows = books.length;
        bolum = parseInt(dbrows / 6);
        bolum2 = 2*bolum;
        gidileceksatir = "row" + bolum2
        if (document.getElementById(gidileceksatir)){
        document.getElementById(gidileceksatir).scrollIntoView();
        window.scrollBy(0, -85)
        }
      };
      bolumegit1.id = "bolum2"
      document.body.appendChild(bolumegit1);

      var bolumegit2 = document.createElement("div");
      bolumegit2.innerHTML = bolum3 ;
      bolumegit2.onclick = function () {
        dbrows = books.length;
        bolum = parseInt(dbrows / 6);
        bolum3 = 3*bolum;
        gidileceksatir = "row" + bolum3
        if (document.getElementById(gidileceksatir)){
        document.getElementById(gidileceksatir).scrollIntoView();
        window.scrollBy(0, -85)
        }
      };
      bolumegit2.id = "bolum3"
      document.body.appendChild(bolumegit2);

      var bolumegit3 = document.createElement("div");
      bolumegit3.innerHTML = bolum4 ;
      bolumegit3.onclick = function () {
        dbrows = books.length;
        bolum = parseInt(dbrows / 6);
        bolum4 = 4*bolum;
        gidileceksatir = "row" + bolum4
        if (document.getElementById(gidileceksatir)){
        document.getElementById(gidileceksatir).scrollIntoView();
        window.scrollBy(0, -85)
        }
      };
      bolumegit3.id = "bolum4"
      document.body.appendChild(bolumegit3);

      var bolumegit4 = document.createElement("div");
      bolumegit4.innerHTML = bolum5 ;
      bolumegit4.onclick = function () {
        dbrows = books.length;
        bolum = parseInt(dbrows / 6);
        bolum5 = 5*bolum;
        gidileceksatir = "row" + bolum5
        if (document.getElementById(gidileceksatir)){
        document.getElementById(gidileceksatir).scrollIntoView();
        window.scrollBy(0, -85)
        }
      };
      bolumegit4.id = "bolum5"
      document.body.appendChild(bolumegit4);



      let tamamlanan = 0
      let kosultamamlanan = 0
      let cevapbekleyen = 0
      let değerlendirilen = 0
      for (let k = 0; k < dbrows; k++){

        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.id="row"+k

        if (books[k].status.includes('Under')) {
          var renk2 = "#ffbe61"
          var renk1 = "#fdfd96";
          değerlendirilen = değerlendirilen + 1
        }
        else {
          var renk2 = ""
          var renk1 = "#fdfd96";
        }
        if (books[k].status.includes('Completed')) {
          var renk2 = "#77dd77";
          var renk1 = "#77dd77";
          tamamlanan = tamamlanan + 1
        }
        if (books[k].status.includes('Conditions')) {
          var renk2 = "#fdfd96";
          var renk1 = "#77dd77";
          kosultamamlanan = kosultamamlanan + 1
        } 
        if (books[k].status.includes('Waiting')) {
          var renk2 = "#ff6961";
          var renk1 = "#fdfd96";
          cevapbekleyen = cevapbekleyen + 1
        } 

        var statusclass = `style='background-color:${renk2}'`

        if (yetki==1){

          // var statusclass = "";
          // if ((books[k].status.includes('Conditions')) && (books[k].letters.lastIndexOf("APŞ") > books[k].letters.lastIndexOf("NDK"))){
          //   statusclass = `class = "değerlendirmebekleniyor"`
          // }
          // else {
          //   statusclass = `style='background-color:${renk2}'`
          // }
        if (books[k].status.includes('Email')) {
          if (books[k].letters.includes("bildirildi") == true)  {
            
            var renk1 = "#77dd77";
            var lettersclass = "";
            var posta = "";
  
          }
          
          else if (books[k].letters.includes("Eposta") == false) {
            if (yetkilisicil==sicil || sicil=="0106"){
            var renk1 = "#fdfd96";
            var lettersclass =  `class = "eposta"`
            var posta = "Eposta gönder!"
            }
            else {
              var renk1 = "#fdfd96";
              var lettersclass =  ``
              var posta = "Eposta gönderimi bekleniyor!"
            }
   
          }
        }
        else {
            var lettersclass = "";
            var posta = "";
        }

        if (books[k].status.includes('Email with Conditions')) {
          if (books[k].letters.includes("NDK") == false){
            var lettersclassresmi =  `class = "resmi"`
            var resmi = "Resmi yazı yazılması bekleniyor!"
          }
          else {
            var lettersclassresmi = "";
            var resmi = "";
          }
        }
        else {
          var lettersclassresmi = "";
          var resmi = "";
        }
      }
      else {
        var lettersclass = "";
        var posta = "";
        var lettersclassresmi = "";
        var resmi = "";
        // statusclass = `style='background-color:${renk2}'`
      }


        if (books[k].notes!==null){
          notlar=books[k].notes.trim() 
          if (notlar.length !== 0) {
            var deco="Not Oku/Değiştir<br>";
            // var deco = "underline";
          }
          else {
            var deco = "Not Ekle<br>";
          }
  
        }
        else {
          var deco = "Not Ekle<br>";
        }

// link ekleme

      //qualityplan
 

      var qpstr = ""
      let myString0 = books[k].qualityplan;
      if (myString0 !== "") {
        let veri5 = myString0.split("<br>")
        veri5=veri5.sort();
        var l = veri5.length;
        for (let i=0; i<l; i++){
        
            if (veri5[i].includes("cnl")){
              qpstr += `<div style='text-decoration: line-through;'>${veri5[i]}</div>
              ` 
            }
            else if (veri5[i].includes("-od-")){
              veri5[i]=veri5[i].slice(0, -4);
              qpstr += `<div style='background-color: #fdfd96;'>${veri5[i]}</div>
              ` 
            }
            else {
              qpstr += `<div>${veri5[i]}</div>`
            }

      // }
          // else {
          //   notstr += `<div>${veri3[i]}</div>`
          // }
        }
      }

      //manufacturers
 

      var manustr = ""
      let myStringmanu = books[k].manufacturer;
      if (myStringmanu !== "") {
        let manuayir = myStringmanu.split("<br>")
        let manusarray = manus.split(",");
        var l = manusarray.length;
        var m = manuayir.length;
        var manubulundu = 0;
        var today = new Date();
        if (today.getDate() <10) {
          var y = "0" + today.getDate()
        }
        else {
          var y = today.getDate()
        }

        if ((today.getMonth()+1) < 10) {
          
          var z = "0" +(today.getMonth()+1)
        }
        else {
          var z = today.getMonth()+1
        }
        var date = today.getFullYear()+'-'+z+'-'+y;
        

        for (let j=0; j<m; j++){
          manubulundu = 0;
          for (let i=0; i<l; i++){
        
            

 
          
            if (manusarray[i]!=="" && manusarray[i].includes(manuayir[j]) && manuayir[j]!=="-"){
              var n =  manusarray[i].lastIndexOf("_")
              var yil = manusarray[i].slice(n-4, n);
              if (yil.includes("20")) {
              yilint = parseInt(yil)
              var yilbes = yilint + 5
              yil  = yilbes.toString()
              var ay = manusarray[i].slice(n-7, n-5);
              var gun = manusarray[i].slice(n-10, n-8);

              sertifika = yil +'-'+ay+'-'+gun;

              // if (sertifika >= date) {
              manustr += `<div ><a href="\\\\192.168.0.140\\Birimler\\Nükleer Tesisler Daire Bsk\\BELGELENDİRME\\2_İmalatçı Firmalar\\01_İmalatçı Onayı\\${manusarray[i]}" style='background-color: #A9FFF2; color: black'>${manuayir[j]}</a></div>
              `
              // }
              // else {
              //   manustr += `<div><a href="\\\\192.168.0.140\\Birimler\\Nükleer Tesisler Daire Bsk\\BELGELENDİRME\\2_İmalatçı Firmalar\\01_İmalatçı Onayı\\${manusarray[i]}" style='background-color: #ff6961'>${manuayir[j]}</a></div>
              //   `
              // } 
              manubulundu = 1;
            }
            else {
              manustr += `<div><a href="\\\\192.168.0.140\\Birimler\\Nükleer Tesisler Daire Bsk\\BELGELENDİRME\\2_İmalatçı Firmalar\\01_İmalatçı Onayı\\${manusarray[i]}">${manuayir[j]}</a></div>
                `
                manubulundu = 1;
              }
              
            }



          }
          if (manubulundu == 0) {
            manustr += `<div>${manuayir[j]}</div>`
            manubulundu = 1;
          }
        }
      }

      //notificationletter
 

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
            
              if (veri3[i]!=="" && links.includes(veri3[i])){
                notstr += `<div><a href="\\\\192.168.0.140\\Birimler\\Nükleer Tesisler Daire Bsk\\IMALAT_GRUBU\\İBOP Yedek\\Özgün Yedek\\tümyıllar\\${veri3[i]}.pdf">${veri3[i]}.pdf</a><br>
                <a href="\\\\192.168.0.13\\Birimler\\ngd\\ANS\\Yazışmalar\\120.02[ANS.45] TUSE\\${yıl}\\${veri3[i]}-EKLERİ">${veri3[i]}-EKLERİ</a></div>
                ` 
              }
              else {
                notstr += `<div>${veri3[i]}</div>`
              }

        // }
            // else {
            //   notstr += `<div>${veri3[i]}</div>`
            // }
          }
        }

        //letters
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

                if (veri13[i].includes("-son-")){
                  veri13[i]=veri13[i].slice(0, -5);
                  if (veri13[i].includes("-ek-")){
                    ekvarsa=veri13[i].slice(0, -4);
                  }
                  else {
                    ekvarsa=veri13[i]
                  }
                  if (links.includes(ekvarsa)){
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
                  else if (links.includes(veri13[i])){
      
                    var renkhref2 = "chocolate";
                    // document.getElementById('finalletter'+i+'').checked=True
                    notstr += `<div><a href="\\\\192.168.0.13\\Birimler\\ngd\\ANS\\Yazışmalar\\120.02[ANS.45] TUSE\\${yıl}\\${veri13[i]}-EKLERİ" style='color:${renkhref2}'>${veri13[i]}-EKLERİ</a></div>
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
                if (veri13[i]!=="" && links.includes(veri13[i])){
                  letstr += `<div><a href="\\\\192.168.0.140\\Birimler\\Nükleer Tesisler Daire Bsk\\IMALAT_GRUBU\\İBOP Yedek\\Özgün Yedek\\tümyıllar\\${veri13[i]}.pdf" style='color:${renkhref1}'>${veri13[i]}.pdf</a></div>
                  `
                  if (ndkekvarsa!==""){
                    letstr += `<div><a href="\\\\192.168.0.13\\Birimler\\ngd\\ANS\\Yazışmalar\\120.02[ANS.45] TUSE\\${yıl}\\${ndkekvarsa}-EKLERİ">${ndkekvarsa}-EKLERİ</a></div>
                  `
                    ndkekvarsa="";
                  }
                }
                else {
                  letstr += `<div>${veri13[i]}</div>
                `
                }
              // }

            // else {
            //   letstr += `<div>${veri13[i]}</div>
            // `
            // }
          }
        }

        toplamekle(dbrows, tamamlanan, kosultamamlanan, cevapbekleyen, değerlendirilen);
        // <td style='background-color:${renk1}'>${books[k].qualityplan}</td>

        row.innerHTML = `

          <td class = "sticky align-top edit" style='z-index: ${books[k].no}'>${books[k].no}</td>
          <td class= "history" ${statusclass}>${books[k].status}</td>
          <td>${notstr}</td>
          <td>${books[k].reviewer}</td>
          <td>${manustr}</td>
          <td>${books[k].unit}</td>
          <td>${books[k].equipmentname}</td>
          <td>${books[k].safetyclass}</td>

          <td style='background-color:${renk1}'>${qpstr}</td>
          <td>${books[k].notificationtype}</td>
          <td>${books[k].air}</td>
          <td>${books[k].airstatus}</td>
          <td ${lettersclass} ${lettersclassresmi} id=letters${k}>${letstr} ${posta} ${resmi}</td>
          <td><span class= "note" style="font-weight:bold; color:#007bff" >${deco}</span>${books[k].remarks}</td>

        `;
        list.appendChild(row);
        if (yenileflag == 0) {
          window.scrollTo(0,document.body.scrollHeight)
        }
      
          
        
      }   
      window.pageYOffset = sayfapozisyonu 
      yenileflag= 0
    }
    })
    })
    })
    });
  
  // })
  // }


  
  }
  

  function vazgecfunction() {
    duzenle = 0;
    kayitkapat();
    temizleyenile();
  }

  function slide_up(icerik){
    rakam = icerik.id.replace(/\D/g, "");
    ustrakam= parseInt(rakam, 10) - 1
    yazi= icerik.id.replace(/[^a-zA-Z]+/g, '');
    if (rakam!=="0"){
      gecici= icerik.value
      icerik.value = document.getElementById(yazi+ustrakam).value
      document.getElementById(yazi+ustrakam).value = gecici
      if (yazi=="yazismalar"){
        gecicie=document.getElementById("ekvar"+rakam).checked
        document.getElementById("ekvar"+rakam).checked=document.getElementById("ekvar"+ustrakam).checked
        document.getElementById("ekvar"+ustrakam).checked=gecicie
        gecicie=document.getElementById("finalletter"+rakam).checked
        document.getElementById("finalletter"+rakam).checked=document.getElementById("finalletter"+ustrakam).checked
        document.getElementById("finalletter"+ustrakam).checked=gecicie
      }
      if (yazi=="qualityplan"){
        gecicie=document.getElementById("onayqp"+rakam).checked
        document.getElementById("onayqp"+rakam).checked=document.getElementById("onayqp"+ustrakam).checked
        document.getElementById("onayqp"+ustrakam).checked=gecicie
      }
    }
  }

  function slide_down(icerik){
    rakam = icerik.id.replace(/\D/g, "");
    ustrakam= parseInt(rakam, 10) + 1
    yazi= icerik.id.replace(/[^a-zA-Z]+/g, '');
    if (document.getElementById(yazi+ustrakam)!==null){
      gecici= icerik.value
      icerik.value = document.getElementById(yazi+ustrakam).value
      document.getElementById(yazi+ustrakam).value = gecici
      if (yazi=="yazismalar"){
        gecicie=document.getElementById("ekvar"+rakam).checked
        document.getElementById("ekvar"+rakam).checked=document.getElementById("ekvar"+ustrakam).checked
        document.getElementById("ekvar"+ustrakam).checked=gecicie
        gecicie=document.getElementById("finalletter"+rakam).checked
        document.getElementById("finalletter"+rakam).checked=document.getElementById("finalletter"+ustrakam).checked
        document.getElementById("finalletter"+ustrakam).checked=gecicie
      }
      if (yazi=="qualityplan"){
        gecicie=document.getElementById("onayqp"+rakam).checked
        document.getElementById("onayqp"+rakam).checked=document.getElementById("onayqp"+ustrakam).checked
        document.getElementById("onayqp"+ustrakam).checked=gecicie
      }
    }
  }

  function temizleyenile(){

    // kaydettikten sonra kutuların yeniden oluşturulması için silme
    
    //notificationletter
    document.getElementById("notificationletters").innerHTML = ""

    // c = $('span.counter1').length
          
    // for (let i=0; i<c; i++){
    //   var select1 = document.getElementById('notificationletters');
    //   select1.removeChild(select1.lastChild);
    //   select1.removeChild(select1.lastChild);
    // }
    
    //manufacturer
    document.getElementById("manufacturers").innerHTML = ""
    
    // c = $('span.counter2').length
    
    // for (let i=0; i<c; i++){
    //   var select2 = document.getElementById('manufacturers');
    //   select2.removeChild(select2.lastChild);
    //   select2.removeChild(select2.lastChild);
    // }
    
    //equipmentname
    document.getElementById("equipmentnames").innerHTML = ""
    
    // c = $('span.counter3').length
    
    // for (let i=0; i<c; i++){
    //   var select3 = document.getElementById('equipmentnames');
    //   select3.removeChild(select3.lastChild);
    //   select3.removeChild(select3.lastChild);
    // }
    
    //qualityplan
    document.getElementById("qualityplans").innerHTML = ""
    
    // c = $('span.counter4').length
    
    // for (let i=0; i<c; i++){
    //   var select4 = document.getElementById('qualityplans');
    //   select4.removeChild(select4.lastChild);
    //   select4.removeChild(select4.lastChild);
    // }
    
    //air
    document.getElementById("airs").innerHTML = ""

    // c = $('span.counter5').length
    
    // for (let i=0; i<c; i++){
    //   var select5 = document.getElementById('airs');
    //   select5.removeChild(select5.lastChild);
    //   select5.removeChild(select5.lastChild);
    // }
    
    //letters
    document.getElementById("letterss").innerHTML = ""


    // c = $('span.counter6').length
    
    // for (let i=0; i<c; i++){
    //   var select6 = document.getElementById('letterss');
    //   select6.removeChild(select6.lastChild);
    //   select6.removeChild(select6.lastChild);
    // }
    
    
    
    
      //notificationletter
    
            document.getElementById("notificationletters").innerHTML = 
            "<div>"+
            "<span class = counter1>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up0' onclick='slide_up(notificationletter0);'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down0'  onclick='slide_down(notificationletter0);'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='notificationletter0'  style = 'width:  350px;' input type='text' list='datalist1' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
            "</span>"+
            "</div>"+
            "<div></div>";   
    
    
      //manufacturer
    
    
            document.getElementById("manufacturers").innerHTML = 
            "<div>"+
            "<span class = counter2>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields1();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields1();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up0' onclick='slide_up(manufacturer0);'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down0'  onclick='slide_down(manufacturer0);'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='manufacturer0'  style = 'width:  350px;' input type='text' list='datalist2' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
            "</span>"+
            "</div>"+
            "<div></div>";   
    
      
      //equipmentname
    
    
            document.getElementById("equipmentnames").innerHTML = 
            "<div>"+
            "<span class = counter3>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields2();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields2();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up0' onclick='slide_up(equipmentname0);'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down0'  onclick='slide_down(equipmentname0);'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='equipmentname0'  style = 'width:  350px;' input type='text' list='datalist3' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
            "</span>"+
            "</div>"+
            "<div></div>";     
    
      
      //qualityplan
    
    
            document.getElementById("qualityplans").innerHTML = 
            "<div>"+
            "<span class = counter4>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields3();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields3();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up0' onclick='slide_up(qualityplan0);'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down0'  onclick='slide_down(qualityplan0);'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='qualityplan0'  style = 'width:  350px;' input type='text' list='datalist4' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
              "<label for='onayqp0'>O:</label>"+
              "<input class='onayqp' type='checkbox' id='onayqp0' name='onayqp0' value='1' checked>"+
            "</span>"+
            "</div>"+
            "<div></div>";    
    
      
    
      //air
    
    
            document.getElementById("airs").innerHTML += 
            "<div>"+
            "<span class = counter5>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields4();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields4();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up0' onclick='slide_up(air0);'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down0'  onclick='slide_down(air0);'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='air0'  style = 'width:  350px;' input type='text' list='datalist5' name='notificationletter' rows='1' autocomplete='off' disabled>"+
              "</input>"+
            "</span>"+
            "</div>"+
            "<div></div>";   
    
       
      //letters
    
    
            document.getElementById("letterss").innerHTML += 
            "<div>"+
            "<span class = counter6>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields5();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields5();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up0' onclick='slide_up(yazismalar0);'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down0'  onclick='slide_down(yazismalar0);'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='yazismalar0'  style = 'width:  350px;' input type='text' list='datalist6' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
              "<label for='ekvar0'>E:</label>"+
              "<input class='ekvar' type='checkbox' id='ekvar0' name='ekvar0' value='1'>"+
              "<label for='finalletter0'>S:</label>"+
              "<input class='finalletter' type='checkbox' id='finalletter0' name='finalletter0'value='1'></input>"+
            "</span>"+
            "</div>"+
            "<div></div>";     
    
    
    
    
          document.getElementById('status').options[0].selected= true;
          document.getElementById('status').disabled=false;
            document.getElementById('notificationletter0').value="";
            document.getElementById("reviewer").options[0].selected= false;
            document.getElementById("reviewer").options[1].selected= false;
            document.getElementById("reviewer").options[2].selected= false;
            document.getElementById("reviewer").options[3].selected= false;
            document.getElementById("reviewer").options[4].selected= false;
            document.getElementById("reviewer").options[5].selected= false;
            document.getElementById("reviewer").options[6].selected= false;
            document.getElementById("reviewer").options[7].selected= false;
            document.getElementById("reviewer").options[8].selected= false;
            document.getElementById('reviewer').disabled=false;
            document.getElementById('manufacturer0').value="";
            document.getElementById("unit").options[0].selected= false;
            document.getElementById("unit").options[1].selected= false;
            document.getElementById("unit").options[2].selected= false;
            document.getElementById("unit").options[3].selected= false;
            document.getElementById("unit").options[4].selected= false;
            document.getElementById('unit').disabled=false;
            document.getElementById('equipmentname0').value="";
            document.getElementById("safetyclass").options[0].selected= false;
            document.getElementById("safetyclass").options[1].selected= false;
            document.getElementById("safetyclass").options[2].selected= false;
            document.getElementById('safetyclass').disabled=false;
            document.getElementById('qualityplan0').value="";
            document.getElementById('notificationtype').value="";
            document.getElementById('notificationtype').disabled=false;
            document.getElementById('air0').value="";
            document.getElementById('airstatus').disabled = true;
            document.getElementById('airstatus').value="";
            document.getElementById('yazismalar0').value="";
            // document.getElementById('remarks').value="";
            CKEDITOR.instances.remarks.setData("");
            document.getElementById('remarks').disabled=false;



    
    }

  // Event: Add a Book
  // document.querySelector('#book-form').addEventListener('submit', (e) => {
  //   e.preventDefault();  
  //   kayitekle()
  // });


  function kayitekle() {
    document.getElementById("karart2").style.display="block";
    document.getElementById("loading").style.display="block";
    $.post("imalat", function (books){
    
    
    // Prevent actual submit
    // e.preventDefault();

    
    // Get form values

  
    const status=document.getElementById("status");
    // const notificationletter=document.getElementById("notificationletter");
    const reviewer=document.getElementById("reviewer");
    // const manufacturer=document.getElementById("manufacturer");
    const unit=document.getElementById("unit");
    // const equipmentname=document.getElementById("equipmentname");
    const safetyclass=document.getElementById("safetyclass");
    // const qualityplan=document.getElementById("qualityplan");
    const notificationtype=document.getElementById("notificationtype");
    // const air=document.getElementById("air");
    const airstatus=document.getElementById("airstatus");
    // const letters=document.getElementById("letters");
    // const remarks=document.getElementById("remarks");
    const remarks=CKEDITOR.instances.remarks.getData();
  
    returnflag=0;
// notificationletter
    var c = $('span.counter1').length
    let eskiveri = []
    for (i = 0; i < c; i++) {
      eskiveri[i] = document.getElementById('notificationletter'+i+'').value;
      eskiveri[i] = eskiveri[i].trim()
    }
    eskiveri = eskiveri.filter(x=> x!='');
    var notificationletter = eskiveri.toString();
    var gelenyazi = notificationletter.replace(/,/g, '<br>');

// manufacturer
    var c = $('span.counter2').length
    eskiveri = []
    for (i = 0; i < c; i++) {
      eskiveri[i] = document.getElementById('manufacturer'+i+'').value;
      eskiveri[i] = eskiveri[i].trim()
    }
    eskiveri = eskiveri.filter(x=> x!='');

    var manufacturer = eskiveri.toString();
    var uretici = manufacturer.replace(/,/g, '<br>');

// equipmentname
var c = $('span.counter3').length
eskiveri = []
for (i = 0; i < c; i++) {
  eskiveri[i] = document.getElementById('equipmentname'+i+'').value;
  eskiveri[i] = eskiveri[i].trim()
}
eskiveri = eskiveri.filter(x=> x!='');

var equipmentname = eskiveri.toString();
var ekipmanadi = equipmentname.replace(/,/g, '<br>');

// qualityplan için

// kalite planlarının tekrar girilmemesi için kontrol etme

// formdan veri çekme
var c = $('span.counter4').length
eskiveri = []
for (i = 0; i < c; i++) {

  eskiveri[i] = document.getElementById('qualityplan'+i+'').value.split(" ").join("");;
  eskiveri[i] = eskiveri[i].trim()
  if (document.getElementById('onayqp'+i+'').checked==false) {
      eskiveri[i] = eskiveri[i]+"-od-"
  }
}
eskiveri = eskiveri.filter(x=> x!='');

var qualityplan = eskiveri.toString();
var kaliteplani = qualityplan.replace(/,/g, '<br>');



// air için
var c = $('span.counter5').length
eskiveri = []
for (i = 0; i < c; i++) {
  eskiveri[i] = document.getElementById('air'+i+'').value;
  eskiveri[i] = eskiveri[i].trim()
}
eskiveri = eskiveri.filter(x=> x!='');

var air = eskiveri.toString();
var ebt = air.replace(/,/g, '<br>');

// letters için
var c = $('span.counter6').length
eskiveri = []
for (i = 0; i < c; i++) {
  eskiveri[i] = document.getElementById('yazismalar'+i+'').value;
  eskiveri[i] = eskiveri[i].trim()
  if (eskiveri[i]!=="") {
  if (document.getElementById('ekvar'+i+'').checked==true) {
    eskiveri[i] = eskiveri[i]+"-ek-"
  }
  if (document.getElementById('finalletter'+i+'').checked==true) {
    if (eskiveri[i].includes("APŞ")) {
        alert(eskiveri[i]+" no'lu APŞ'ye ait resmi yazı 'final letter' olarak seçilemez!")
        returnflag = 1;
    }
    else {
      eskiveri[i] = eskiveri[i]+"-son-"
    }
  }
  }
}
eskiveri = eskiveri.filter(x=> x!='');

var letters = eskiveri.toString();
var yazisma = letters.replace(/,/g, '<br>');




    var kisiler = $('#reviewer').val();
    if (kisiler) {
      kisiler = kisiler.filter(x=> x!='');
      var kisi = kisiler.toString();
      kisi = kisi.replace(/,/g, '<br>')
    }
    else {
      kisi =''
    }

    var uniteler = $('#unit').val();
    if (uniteler) {
      uniteler = uniteler.filter(x=> x!='');
      var unite = uniteler.toString();
      unite = unite.replace(/,/g, '<br>')
    }
    else {
      unite =''
    }

    var siniflar = $('#safetyclass').val();
    if (siniflar) {
      siniflar = siniflar.filter(x=> x!='');
      var sinif = siniflar.toString();
      sinif = sinif.replace(/,/g, '<br>')
    }
    else {
      sinif =''
    }


// doğrula
if (gelenyazi == "") {
  document.getElementById("notificationletter0").scrollIntoView(false);
  // document.getElementById("notificationletter0").style.borderColor = "red"
  document.getElementById("notificationletter0").focus()
  alert("Lütfen başvuru yazısını giriniz!")
  returnflag = 1;
}
else if (kisi == "") {
  document.getElementById("reviewer").scrollIntoView(false);
  // document.getElementById("reviewer").style.borderColor = "red"
  document.getElementById("reviewer").focus()
  alert("Lütfen kişi seçiniz!")
  returnflag = 1;
}
else if (unite == "") {
  alert("Lütfen ünite numarası seçiniz!");
  document.getElementById("unit").scrollIntoView();
  // document.getElementById("air0").style.borderColor = "red"
  document.getElementById("unit").focus()
  returnflag = 1;
}
else if (ekipmanadi == "") {
  alert("Lütfen ekipman adı ekleyiniz!");
  document.getElementById("equipmentname0").scrollIntoView();
  // document.getElementById("air0").style.borderColor = "red"
  document.getElementById("equipmentname0").focus()
  returnflag = 1;
}
else if (kaliteplani !== "") {
var c = $('span.counter4').length
var yeniveri = ""
var focusflag = 0;
for (k = 0; k < c; k++) {
  if  (status.value.includes("Completed") && status.value.includes("Partially")==false) {
    if (focusflag==0) {
      if (document.getElementById('onayqp'+k+'').checked==false) {
        alert("Tüm kalite planları onaylı olmalıdır.")
        document.getElementById("qualityplan"+k).focus()
        document.getElementById("qualityplan"+k).scrollIntoView();
        returnflag = 1
        focusflag=1
      }
    }
  }

  yeniveri = document.getElementById('qualityplan'+k+'').value;
  if (yeniveri !== "") {
    let length = books.length;
    for (let i=0; i<length; i++){
      myString = books[i].qualityplan;
      if (myString !== null) {
        let myArray = myString.split("<br>")
        var l = myArray.length;
        for (let j=0; j<l; j++){
          if (duzenle==1){
            if (i!==parseInt(satir)){
              if (JSON.stringify(myArray[j]) == JSON.stringify(yeniveri)) {
                y = i

                
                alert(myArray[j]+" no'lu kalite planı "+y+" no'lu kayıtta yer almakadır.")
                returnflag = 1;
                document.getElementById("qualityplan"+k).style.backgroundColor = "pink"
                if (focusflag==0) {
                  document.getElementById("qualityplan"+k).focus()
                  document.getElementById("qualityplan"+k).scrollIntoView();
                  focusflag=1
                }
              } 
            }
          }
          else if (duzenle==0){
            if (JSON.stringify(myArray[j]) == JSON.stringify(yeniveri)) {
              y = i
              alert(myArray[j]+" no'lu kalite planı "+y+" no'lu kayıtta yer almakadır.")
              returnflag = 1;
              document.getElementById("qualityplan"+k).style.backgroundColor = "pink" 
              if (focusflag==0) {
                document.getElementById("qualityplan"+k).focus()
                document.getElementById("qualityplan"+k).scrollIntoView();
                focusflag=1
              }
            } 
          }
        }  
      }
    }
  }
}

}


if (status.value.includes("Completed")) {

  if (kisi == "") {
    alert("Lütfen kişi seçiniz!");
    document.getElementById("reviewer").scrollIntoView();
    // document.getElementById("air0").style.borderColor = "red"
    document.getElementById("reviewer").focus()
    returnflag = 1;
  }
  if (uretici == "") {
    alert("Lütfen imalatçı adı ekleyiniz!");
    document.getElementById("manufacturer0").scrollIntoView();
    // document.getElementById("air0").style.borderColor = "red"
    document.getElementById("manufacturer0").focus()
    returnflag = 1;
  }
  if (unite == "") {
    alert("Lütfen ünite numarası seçiniz!");
    document.getElementById("unit").scrollIntoView();
    // document.getElementById("air0").style.borderColor = "red"
    document.getElementById("unit").focus()
    returnflag = 1;
  }
  if (ekipmanadi == "") {
    alert("Lütfen ekipman adı ekleyiniz!");
    document.getElementById("equipmentname0").scrollIntoView();
    // document.getElementById("air0").style.borderColor = "red"
    document.getElementById("equipmentname0").focus()
    returnflag = 1;
  }
  if (safetyclass.value == "") {
    alert("Lütfen güvenlik sınıfı seçiniz!");
    document.getElementById("safetyclass").scrollIntoView();
    // document.getElementById("air0").style.borderColor = "red"
    document.getElementById("safetyclass").focus()
    returnflag = 1;
  }
  if (kaliteplani == "") {
    alert("Lütfen kalite planı ekleyiniz!");
    document.getElementById("qualityplan0").scrollIntoView();
    // document.getElementById("air0").style.borderColor = "red"
    document.getElementById("qualityplan0").focus()
    returnflag = 1;
  }
  if (notificationtype.value == "") {
    alert("Lütfen barşvuru tipi seçiniz!");
    document.getElementById("notificationtype").scrollIntoView();
    // document.getElementById("air0").style.borderColor = "red"
    document.getElementById("notificationtype").focus()
    returnflag = 1;
  }

  if (status.value.includes("Email")==false) {
    if (yazisma == "") {
      alert("Lütfen resmi yazı numarasını ekleyiniz!");
      document.getElementById("yazismalar0").scrollIntoView();
      // document.getElementById("air0").style.borderColor = "red"
      document.getElementById("yazismalar0").focus()
      returnflag = 1;
    }
    else if  (yazisma.includes("E.")==false) {
      alert("Lütfen resmi yazı formatında 'E.' kullanınız!");
      document.getElementById("yazismalar0").scrollIntoView();
      document.getElementById("yazismalar0").focus()
      returnflag = 1;
    }
  }
  else {
    if ((notificationtype.value.includes("Bildirimi") && notificationtype.value.includes("Değil"))==false) {
      alert("Sadece 'İmalat Bildirimi (49 Ekipman Değil)' seçildiğinde eposta gönderilebilir!");
      returnflag = 1;
    }
  }

}

if (status.value.includes("Waiting")==true) {
  if (yazisma == "") {
    alert("Lütfen resmi yazı numarasını ekleyiniz!");
    document.getElementById("yazismalar0").scrollIntoView();
    // document.getElementById("air0").style.borderColor = "red"
    document.getElementById("yazismalar0").focus()
    returnflag = 1;
  }
  else if  (yazisma.includes("E.")==false) {
    alert("Lütfen resmi yazı formatında 'E.' kullanınız!");
    document.getElementById("yazismalar0").scrollIntoView();
    document.getElementById("yazismalar0").focus()
    returnflag = 1;
  }
}

if (notificationtype.value !== "" && notificationtype.value.includes("Değil") == false && notificationtype.value.includes("Yapı") == false) {
  if (ebt == "") {
    alert("Lütfen EBT numarasını giriniz!");
    document.getElementById("air0").scrollIntoView();
    // document.getElementById("air0").style.borderColor = "red"
    document.getElementById("air0").focus()
    returnflag = 1;
  }
  if (airstatus.value == "") {
    alert("Lütfen EBT durumunu seçiniz!");
    document.getElementById("airstatus").scrollIntoView();
    // document.getElementById("airstatus").style.borderColor = "red"
    document.getElementById("airstatus").focus()
    returnflag = 1;
  }

}
document.getElementById("karart2").style.display="none";
document.getElementById("loading").style.display="none";

if (returnflag == 0) {
      document.getElementById("loading").style.display="block";
      // $('#formlar').collapse('hide');

      document.getElementById("formlar").classList.remove("mystyle1");
      document.getElementById("formlar").classList.add("mystyle");
      setTimeout(function(){document.getElementById("formlar").style.display = "none";; }, 490);
      document.getElementById("karart").style.display="none";
      // if (yetkiflag1==1 || duzenle==1){
      //   yenikayitbtn.style.display= "block";
      //   alert("4")
      //   }
      // yenikayitbtn.style.display= "block";
      kapatbtn.style.display= "none";
      // Instatiate book
    
      // $.post("imalat", function (books){
        
        if (duzenle == 1) {
            duzenle = 0;
            no = sutun1
            kayitkapat();
            document.getElementById("karart").style.display = "block"
            if (yazisma.includes("gönderildi") == false && epostaflag == 1){
              qualityplan = qualityplan.replace(/,/g, ', ')
              sayi = gelenyazi.split("-son-").join("");
              sayi = gelenyazi.split("-ek-").join("");
              sayi=gelenyazi.substring(11, gelenyazi.length);
              let message = (
                "<p style='font-family: Arial'>Merhabalar <br> Aşağıdaki "+sayi+" numaralı bildiriminiz ANS 1. ve 2. Ünite sınırlı çalışma izni koşulları Tablo 2'de yer alan ekipman içerisinde yer almadığından, aşağıda yer alan kalite planları kapsamında imalata başlayabilir ve Denetim için başvuruda bulunabilirsiniz. Varsa eksik evrakları size bildireceğiz, imalat sürecinde bu evrakları tamamlamanızı bekliyoruz, <br> İyi Çalışmalar."+ 
                // "<p>"+no+" No'lu imalat bildirimine yönelik başvuru uygunluk kontrolü ve imalatçı kuruluşun yeterliliklerini belirleyen belgelerin mevzuata uygunluk kontrolü gerçekleştirilmiş olup imalata "+qualityplan+" numaralı kalite planı/planları kapsamında başlanabileceği değerlendirilmektedir."+
                "</p>"+
                "<table style='font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>"+
                "<thead>"+
                "<tr>"+
                  "<th id='ust' class='align-top' style='width: 55px; background-color:pink; color:black; font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>No</th>"+
                  "<th id='ust1' class='align-top' style='width: 176px; background-color:pink; color:black; font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>Status</th>"+
                  "<th id='ust2' class='align-top' style='width: 176px; background-color:pink; color:black; font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>Notification/Application Letter</th>"+
                  "<th id='ust4' class='align-top' style='width: 176px; background-color:pink; color:black; font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>Manufacturer</th>"+
                  "<th id='ust5' class='align-top' style='width: 55px; background-color:pink; color:black; font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>Unit</th>"+
                  "<th id='ust6' class='align-top' style='width: 176px; background-color:pink; color:black; font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>Eq Name</th>"+
                  "<th id='ust7' class='align-top' style='width: 65px; background-color:pink; color:black; font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>Safety Class</th>"+
                  "<th id='ust8' class='align-top' style='width: 220px; background-color:pink; color:black; font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>Quality Plan</th>"+
                  "<th id='ust9' class='align-top' style='width: 176px; background-color:pink; color:black; font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>Type</th>"+
                "</tr>"+
                "</thead>"+
                "<tr>"+
                "<td style='font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>"+no+"</td>"+
                "<td style='font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>"+status.value+"</td>"+
                "<td style='font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>"+gelenyazi+"</td>"+
                "<td style='font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>"+uretici+"</td>"+
                "<td style='font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>"+unite+"</td>"+
                "<td style='font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>"+ekipmanadi+"</td>"+
                "<td style='font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>"+sinif+"</td>"+
                "<td style='font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>"+kaliteplani+"</td>"+
                "<td style='font-family: Arial; border: 1px solid #000000; border-collapse: collapse'>"+notificationtype.value+"</td>"+
                "</tr>"+
                "</table>"
              ); 
              // yetkilieposta =  localStorage.getItem("eposta");
              $.post("ikincieposta", {no:no, qualityplan: `${qualityplan}`, eposta:yetkilieposta, message:message, sayi:sayi}, function(data){
                if (data=="Başarılı"){
                  popup(no+" no'lu kayıt için E-posta gönderildi!")
                  document.getElementById("karart2").style.display="none";
                  document.getElementById("loading").style.display="none";
                }
                displaybooks();
              });
              var today = new Date();
              var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
              if (yazisma !== "") {
                yazisma = yazisma + "<br>" +date+" tarihinde Denetim Dairesine eposta ile bildirildi."
              }
              else {
                yazisma = date+" tarihinde Denetim Dairesine eposta ile bildirildi."
              }
              epostaflag = 0
              gönderildiflag = 1
              kayma = 1
            }
            
            $.post("duzenle", { no: no, status: `${status.value}`, notificationletter: `${gelenyazi}`, reviewer: `${kisi}`, manufacturer: `${uretici}`,
            unit: `${unite}`, equipmentname: `${ekipmanadi}`, safetyclass: `${sinif}`, qualityplan: `${kaliteplani}`, notificationtype: `${notificationtype.value}`,
            air: `${ebt}`, airstatus: `${airstatus.value}`, letters: `${yazisma}`, remarks: `${remarks}`, sicil:`${isim} ${soyisim}`
            }, function(data){
              if (data=="Başarılı"){
                if (gönderildiflag!==1){
                  
                  popup(no+" no'lu kayıt düzenlendi!")
                  document.getElementById("karart2").style.display="none";
                  document.getElementById("loading").style.display="none";
                  displaybooks();


                }
              }
            });
            
            kayma = 1;
            // if (gönderildiflag==1) {
            //   mesaj=(no+" no'lu kayıt için E-posta gönderildi!")
            // }
            // else {
            //   mesaj=no+" no'lu kayıt düzenlendi!";
            // }    
        }
      
        else if (duzenle == 0) {   
          $.post("yenikayit", {status: `${status.value}`, notificationletter: `${gelenyazi}`, reviewer: `${kisi}`, manufacturer: `${uretici}`,
          unit: `${unite}`, equipmentname: `${ekipmanadi}`, safetyclass: `${sinif}`, qualityplan: `${kaliteplani}`, notificationtype: `${notificationtype.value}`,
          air: `${ebt}`, airstatus: `${airstatus.value}`, letters: `${yazisma}`, remarks: `${remarks}`, isimsoyisim: `${isim} ${soyisim}`,
          }, function(data){
            if (data=="Başarılı"){
              popup("Yeni kayıt eklendi!")
              document.getElementById("karart2").style.display="none";
              document.getElementById("loading").style.display="none";
              displaybooks();
            }
          });

          sayi = gelenyazi.split("-son-").join("");
          sayi = gelenyazi.split("-ek-").join("");
          sayi = gelenyazi.substring(11, gelenyazi.lenght);
          gun = gelenyazi.substring(4, 6);
          ay = gelenyazi.substring(2, 4);
          yil = "20"+gelenyazi.substring(0, 2);
          tarih = gun+"/"+ay+"/"+yil
          yeniekipmanadi = equipmentname.replace(/,/g, ', ')
          yeniunite = unite.split("<br>").join(", ")
          console.log(yeniunite)
          let message = (

            `<p style='font-family: Arial'>Merhabalar,</p>

            <p style='font-family: Arial'>Akkuyu Nükleer A. Ş. ${sayi} sayılı ve ${tarih} tarihli yazı ile "${yeniunite}" No'lu ünite/ünitelere ait "${yeniekipmanadi}" için imalat bildiriminde/imalat onayı başvurusunda bulunmuştur. Varsa ekipmanın imalatını etkileyebilecek görüşlerinizi imalattan sorumlu kişiye en kısa sürede bildirmenizi rica ediyoruz.</p>
            
            <p style='font-family: Arial'>Ekipmandan ${kisi} adlı personel sorumludur.</p>
            
            <p style='font-family: Arial'>İyi çalışmalar</p>`
            
          ); 
          // yetkilieposta =  localStorage.getItem("eposta");
          $.post("yenikayiteposta", {eposta:yetkilieposta, message:message, sayi:sayi, ekipmanadi:yeniekipmanadi, unite: yeniunite});
          kayma = 0;
          // mesaj="Yeni kayıt eklendi!";
        }
  
        // vekileposta = localStorage.getItem("yetkilieposta");
        // yetkilieposta =  localStorage.getItem("eposta");
        if (eposta !== yetkilieposta) {
          yetkilieposta == yetkilieposta + "; " + eposta 
        }
        if (status.value.includes('Email') && gönderildiflag == 0 && notificationflag == 0) {
          $.post("birincieposta", {no:no, eposta:yetkilieposta})
        }
      
        temizleyenile()

        // $.post("imalat", function (books){
        
          
          // popup(mesaj);
          let table= document.querySelector('#book-list');
          let rowsNumber = table.rows.length;
        // });
      // });

}

  })
  
  
    }
  

  // yeni kayıt tuşuna basıldığında formların options kısımlarının veritabanından dolu gelmesi için
  // document.getElementById("kayit").addEventListener("click", listele);
  // document.getElementById("kayit").addEventListener("click", listele1);
  // document.getElementById("kayit").addEventListener("click", listele2);
  // document.getElementById("kayit").addEventListener("click", listele3);
  // document.getElementById("kayit").addEventListener("click", listele4);
  // document.getElementById("kayit").addEventListener("click", listele5);

  // notificationletter
  function listele() {
    var options = '';
    var options1 = '';
    var options2 = '';
    var options3 = '';
    $.post("imalat", function (books){
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
    document.getElementById("datalist1").innerHTML = options;
   
    // equipmentname
      myString1 = books[i].equipmentname;
      if (myString1 !== null) {
      let myArray1 = myString1.split("<br>")
      var l = myArray1.length;
        for (let j=0; j<l; j++){
          if (options1.includes(myArray1[j]) == false) {
            if (myArray1[j].includes("-son-")){
              myArray1[j]=myArray1[j].slice(0, -5);
            }
            if (myArray1[j].includes("-ek-")){
              myArray1[j]=myArray1[j].slice(0, -4);
            }
          options1 += '<option value="'+myArray1[j]+'" />';
          }
        }  
    }
    document.getElementById("datalist3").innerHTML = options1;

    // air
      myString2 = books[i].air;
      if (myString2 !== null) {
      let myArray2 = myString2.split("<br>")
      var l = myArray2.length;
        for (let j=0; j<l; j++){
          if (options2.includes(myArray2[j]) == false) {
            if (myArray2[j].includes("-son-")){
              myArray2[j]=myArray2[j].slice(0, -5);
            }
            if (myArray2[j].includes("-ek-")){
              myArray2[j]=myArray2[j].slice(0, -4);
            }
          options2 += '<option value="'+myArray2[j]+'" />';
          }
        }  
    }
    document.getElementById("datalist5").innerHTML = options2; 
    
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
    document.getElementById("datalist6").innerHTML = options3;

  }
  })
}

  // manufacturer
  function listele1() {
    var options = '';
    $.post("imalatcilar", function (books){

      let myArray = books.split(",")
      var l = myArray.length;
      var alfabe = [];
      var alfasayi = 0;
        for (let j=0; j<l; j++){
          if (options.includes(myArray[j]) == false) {  
            myArray[j]=myArray[j].trim()
            alfabe[alfasayi] = myArray[j]
            alfasayi = alfasayi + 1
            // options += '<option value="'+myArray[j]+'" />';
          }
        }
        alfabe.sort();
        for (alfac=0; alfac<alfasayi; alfac++) {
          options += '<option value="'+alfabe[alfac]+'" />';
        }
        document.getElementById("datalist2").innerHTML = options;
    })

    
    // fetch('http://ngduygulama.taek.intra:5000/https://ndk.org.tr/tr/services-en/app-of-manufac-for-nuclear-facilities/272-nukleer-tesislerin-yetkilendirilmesi/1970-approved-manufacturer-organization-list.html', {
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    // headers: 'x-requested-with'
    // });



}

  // equipmentname
  function listele2() {
    var options = '';
    $.post("imalat", function (books){
    let length = books.length;
    for (let i=0; i<length; i++){
      myString = books[i].equipmentname;
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
    document.getElementById("datalist3").innerHTML = options;
  }
})
}

  // qualityplan
  function listele3() {
    var options = '';
    $.post("imalat", function (books){
    let length = books.length;
    for (let i=0; i<length; i++){
      myString = books[i].qualityplan;
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
    document.getElementById("datalist4").innerHTML = options;
  }
})
}

  // air
  function listele4() {
    var options = '';
    $.post("imalat", function (books){
    let length = books.length;
    for (let i=0; i<length; i++){
      myString = books[i].air;
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
    document.getElementById("datalist5").innerHTML = options;
  }  
})
}

  // letters
  function listele5() {
    var options = '';
    $.post("imalat", function (books){
    let length = books.length;
    for (let i=0; i<length; i++){
      myString = books[i].letters;
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
    document.getElementById("datalist6").innerHTML = options;
  } 
})
} 


  



  // Event: Edit a Book,

  // formun dışına tıklanınca kapanması için ama çalışmadı
$(document).click(function(e) {
  if(e.target.id !== "dokumanlar" && e.target.id !== "baslik"){
    document.getElementById("dokumanlar").style.display="none"
  }
  if(e.target.id !== "duyurular" && e.target.id !== "bilgi" && e.target.id !== "bilgi1" && e.target.id !== "bilgi2" && e.target.id !== "mesajsayisi"){
    document.getElementById("duyurular").style.display="none"
    document.getElementById("duyuruekle").style.display="none"
  }
})

$(document).click(function(e) {
  if(e.target.classList.contains('history')){
    $.post("imalat", function (books){
      if (books[e.target.previousElementSibling.textContent].history !== null) {
        popup2(books[e.target.previousElementSibling.textContent].history)
      }
      else {
        popup2("Tarihçe bulunamadı!")
      }
    })
    
  }
})

  document.querySelector('#book-list').addEventListener('click', (e) => {
    
    if(e.target.classList.contains('note')||e.target.parentElement.classList.contains('note')){
      
      if(yetki==1) {
        document.getElementById("karart").style.display = "block"
        document.getElementById("loading").style.display="block";

        $.post("imalat", function (bilgi) {

          if (e.target.classList.contains('note')){
            no= e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            sutun4= e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            kaydir = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.parentElement.id;
          }
          else {
            no= e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            sutun4= e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            kaydir = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.parentElement.id;
          }
          document.getElementById("notbaslik").innerHTML = no +` NO'LU KAYIT NOT EKRANI
          `
          kayma = 1;
          soyisimupper = soyisim.turkishToUpper()
          if (sutun4.includes(soyisimupper)==false){
            document.getElementById("kaydetkapat").style.display="none"
            CKEDITOR.instances.notyaz.readOnly = true;
          }
          else {
            document.getElementById("kaydetkapat").style.display="block"
            CKEDITOR.instances.notyaz.readOnly = false;
          }
          document.getElementById("loading").style.display="none";
          document.getElementById("notekran").style.display="block"
          CKEDITOR.instances.notyaz.focus();
          duzenleek.style.display = "none";
          bulgularek.style.display = "none";
          baslik.style.display = "none";
          kayitek.style.display = "none";
          yenikayitbtn.style.display= "none";
          kapatbtn.style.display="block";
          document.getElementById("formlar").style.display="none"
          if(document.getElementById("duyurular")) {
            document.getElementById("duyurular").style.display="none"
          }
          if(document.getElementById("duyuruekle")) {
            document.getElementById("duyuruekle").style.display="none";
          }
          if(document.getElementById("duyuru")) {
            document.getElementById("duyuru").style.display="none"
          }
          if(document.getElementById("duyurudegistir")) {
            document.getElementById("duyurudegistir").style.display="none";
          }

          if (document.getElementById("yetkiekran")){
            document.getElementById("yetkiekran").remove();
          }
          CKEDITOR.instances.notyaz.setData(bilgi[no].notes);
          
        })
    }

      else{

      
          alert("Giriş yapılması gerekmektedir!")
          if (!(document.getElementById("user"))){
          kullanicigiris();
          }

      }
      
    }

 
    if(e.target.classList.contains('edit') || e.target.classList.contains('eposta')){

      document.getElementById("karart").style.display = "block"
      document.getElementById("loading").style.display="block";
     
      // $.post("kullanici", function (bilgi){

        // var yetkiflag1= 0;
        // var kullaniciflag1 = "";
        // var alertflag1 = 0;
        // k=bilgi.length
        // for (let i=0; i<k; i++) {
        //   if (bilgi[i].sicil==localStorage.getItem("sicil")) {
        //     yetkiflag1 = bilgi[i].yetki
        //     kullaniciflag1 = bilgi[i].soyad
        //     kullaniciflag1 = kullaniciflag1.turkishToUpper()
        //   }
        // }
      


    if(yetki==1){
      
      if(e.target.classList.contains('edit')){

       sutun14= e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
       
  
        sutun14 = sutun14.innerHTML

       sutun13= e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
       sutun12= e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
       sutun11= e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
       sutun10= e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
       sutun9 = e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
       sutun8 = e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
       sutun7 = e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
       sutun6 = e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
       sutun5 = e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
       sutun4 = e.target.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
       sutun3 = e.target.nextElementSibling.nextElementSibling.textContent;
       sutun2 = e.target.nextElementSibling.textContent; 
       sutun1 = e.target.textContent;
       kaydir = e.target.parentElement.id;
       epostaflag = 0;
       gönderildiflag = 0;
      }
      else if(e.target.classList.contains('eposta')) {
        kaydir= e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.parentElement.id;
        sutun1= e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        sutun2= e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        sutun3= e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        sutun4= e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        sutun5 = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        sutun6 = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        sutun7 = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        sutun8 = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        sutun9 = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        sutun10 = e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        sutun11 = e.target.previousElementSibling.previousElementSibling.textContent;
        sutun14 = e.target.nextElementSibling; 

      
          sutun14 = sutun14.innerHTML

        sutun13 = e.target.textContent;
        sutun12 = e.target.previousElementSibling.textContent;
        epostaflag = 1;
        gönderildiflag = 0;
      }

      soyisimupper = soyisim.turkishToUpper()
 
       if ((yetkilisicil !== sicil && sicil !=="0106" && epostaflag==1) || (yetkilisicil !== sicil && sicil !=="0106" && epostaflag==0 && sutun4.includes(soyisimupper)==false) || (sutun4.includes("YÜKSEL")==true && soyisimupper == "ÇİĞDEM" )) {
        if (epostaflag==1){ 
          document.getElementById("loading").style.display="none";
          alert("Eposta gönderimi sadece yetkili kullanıcı tarafından yapılabilir!")
          document.getElementById("karart").style.display = "none"
        }
        else{
          document.getElementById("loading").style.display="none";
          alert("Yetkisiz kullanıcılar sadece kendi kayıtlarını düzenleyebilir!")
          document.getElementById("karart").style.display = "none"
        }
       }
else {
      duzenle = 1
      noduzenle = sutun1;
      if (sutun2.includes("Email") || sutun2.includes("Notification")) {
        notificationflag= 1
      }
      else {
        notificationflag= 0
      }

      document.getElementById('status').value=sutun2;

      if (epostaflag == 1) {
        document.getElementById('status').disabled=true;
      }
      else {
        document.getElementById('status').disabled=false;
      }


// kayıt düzenle butonu ile kutuları yeniden oluşturulması için silme

//notificationletter
      document.getElementById("notificationletters").innerHTML = ""
      // c = $('span.counter1').length
      
      // for (let i=0; i<c; i++){
      //   var select1 = document.getElementById('notificationletters');
      //   select1.removeChild(select1.lastChild);
      //   select1.removeChild(select1.lastChild);
      // }

//manufacturer
      document.getElementById("manufacturers").innerHTML = ""
      // c = $('span.counter2').length
      
      // for (let i=0; i<c; i++){
      //   var select2 = document.getElementById('manufacturers');
      //   select2.removeChild(select2.lastChild);
      //   select2.removeChild(select2.lastChild);
      // }

//equipmentname
document.getElementById("equipmentnames").innerHTML = ""
      // c = $('span.counter3').length
      
      // for (let i=0; i<c; i++){
      //   var select3 = document.getElementById('equipmentnames');
      //   select3.removeChild(select3.lastChild);
      //   select3.removeChild(select3.lastChild);
      // }

//qualityplan
document.getElementById("qualityplans").innerHTML = ""
      // c = $('span.counter4').length
      
      // for (let i=0; i<c; i++){
      //   var select4 = document.getElementById('qualityplans');
      //   select4.removeChild(select4.lastChild);
      //   select4.removeChild(select4.lastChild);
      // }

//air
document.getElementById("airs").innerHTML = ""
      // c = $('span.counter5').length
      
      // for (let i=0; i<c; i++){
      //   var select5 = document.getElementById('airs');
      //   select5.removeChild(select5.lastChild);
      //   select5.removeChild(select5.lastChild);
      // }

//letters
document.getElementById("letterss").innerHTML = ""
      // c = $('span.counter6').length
      
      // for (let i=0; i<c; i++){
      //   var select6 = document.getElementById('letterss');
      //   select6.removeChild(select6.lastChild);
      //   select6.removeChild(select6.lastChild);
      // }




//kayıt düzenle butonu ile verileri veritabanından alıp forma ekleme
$.post("imalat", function (books){

      //notificationletter

      myString1 = books[sutun1].notificationletter;
      if (myString1 == null) {
        myString1 = ""
      }

        let veri3 = myString1.split("<br>")
        var l = veri3.length;
        
        for (let i=0; i<l; i++){
          if (i>l-2) {
            document.getElementById("notificationletters").innerHTML += 
            "<div>"+
            "<span class = counter1>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+i+"' onclick='slide_up(notificationletter"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+i+"'  onclick='slide_down(notificationletter"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='notificationletter"+i+"'  style = 'width:  350px;' input type='text' list='datalist1' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
            "</span>"+
            "</div>"+
            "<div></div>";


          }
          else {
            document.getElementById("notificationletters").innerHTML += 

            "<div>"+
            "<span class = counter1 style = 'padding-left: 50px;'>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+i+"' onclick='slide_up(notificationletter"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+i+"'  onclick='slide_down(notificationletter"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='notificationletter"+i+"'  style = 'width:  350px;' input type='text' list='datalist1' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
            "</span>"+
            "</div>";
              
          }
        }
        for (let i=0; i<l; i++){
          document.getElementById('notificationletter'+i+'').value=veri3[i];
          if (epostaflag == 1) {
            document.getElementById('notificationletter'+i+'').disabled=true;
          }
        }
      //manufacturer

      myString2 = books[sutun1].manufacturer;
      if (myString2 == null) {
        myString2 = ""
      }


        let veri5 = myString2.split("<br>")
        var l = veri5.length;
        
        
        for (let i=0; i<l; i++){
          if (i>l-2) {
            document.getElementById("manufacturers").innerHTML += 
            "<div>"+
            "<span class = counter2>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields1();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields1();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+i+"' onclick='slide_up(manufacturer"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+i+"'  onclick='slide_down(manufacturer"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='manufacturer"+i+"'  style = 'width:  350px;' input type='text' list='datalist2' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
            "</span>"+
            "</div>"+
            "<div></div>";    
          }
          else {
            document.getElementById("manufacturers").innerHTML += 
            "<div>"+
            "<span class = counter2 style = 'padding-left: 50px;'>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+i+"' onclick='slide_up(manufacturer"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+i+"'  onclick='slide_down(manufacturer"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='manufacturer"+i+"'  style = 'width:  350px;' input type='text' list='datalist2' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
            "</span>"+
            "</div>";
              
          }
        }
        for (let i=0; i<l; i++){
          document.getElementById('manufacturer'+i+'').value=veri5[i];
          if (epostaflag == 1) {
            document.getElementById('manufacturer'+i+'').disabled=true;
          }
        }
      
      //equipmentname

      myString3 = books[sutun1].equipmentname;
      if (myString3 == null) {
        myString3 = ""
      }


        let veri7 = myString3.split("<br>")
        var l = veri7.length;
        
        for (let i=0; i<l; i++){
          if (i>l-2) {
            document.getElementById("equipmentnames").innerHTML += 
            "<div>"+
            "<span class = counter3>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields2();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields2();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+i+"' onclick='slide_up(equipmentname"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+i+"'  onclick='slide_down(equipmentname"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='equipmentname"+i+"'  style = 'width:  350px;' input type='text' list='datalist3' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
            "</span>"+
            "</div>"+
            "<div></div>";     
          }
          else {
            document.getElementById("equipmentnames").innerHTML += 
            "<div>"+
            "<span class = counter3 style = 'padding-left: 50px;'>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+i+"' onclick='slide_up(equipmentname"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+i+"'  onclick='slide_down(equipmentname"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='equipmentname"+i+"'  style = 'width:  350px;' input type='text' list='datalist3' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
            "</span>"+
            "</div>";
              
          }
        }
        for (let i=0; i<l; i++){
          document.getElementById('equipmentname'+i+'').value=veri7[i];
          if (epostaflag == 1) {
            document.getElementById('equipmentname'+i+'').disabled=true;
          }
        }
      
      
      //qualityplan

      myString4 = books[sutun1].qualityplan;
      if (myString4 == null) {
        myString4 = ""
      }


        let veri9 = myString4.split("<br>")
        var l = veri9.length;
        
        for (let i=0; i<l; i++){
          if (i>l-2) {
            document.getElementById("qualityplans").innerHTML += 
            "<div>"+
            "<span class = counter4>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields3();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields3();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+i+"' onclick='slide_up(qualityplan"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+i+"'  onclick='slide_down(qualityplan"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='qualityplan"+i+"'  style = 'width:  350px;' input type='text' list='datalist4' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
              "<label for='onayqp"+i+"'>O:</label>"+
              "<input class='onayqp' type='checkbox' id='onayqp"+i+"' name='onayqp"+i+"' value='1' checked>"+
            "</span>"+
            "</div>"+
            "<div></div>";    
          }
          else {
            document.getElementById("qualityplans").innerHTML += 
            "<div>"+
            "<span class = counter4 style = 'padding-left: 50px;'>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+i+"' onclick='slide_up(qualityplan"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+i+"'  onclick='slide_down(qualityplan"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='qualityplan"+i+"'  style = 'width:  350px;' input type='text' list='datalist4' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
              "<label for='onayqp"+i+"'>O:</label>"+
              "<input class='onayqp' type='checkbox' id='onayqp"+i+"' name='onayqp"+i+"' value='1' checked>"+
            "</span>"+
            "</div>"; 
              
          }
        }
        // for (let i=0; i<l; i++){
        //   document.getElementById('qualityplan'+i+'').value=veri9[i];
        //   if (epostaflag == 1) {
        //     document.getElementById('qualityplan'+i+'').disabled=true;
        //   }
        // }
      
        for (let i=0; i<l; i++){
          if (veri9[i].includes("-od-")){
            veri9[i]=veri9[i].slice(0, -4);
            document.getElementById('onayqp'+i+'').checked=false;
          }
          document.getElementById('qualityplan'+i+'').value=veri9[i];
          if (epostaflag == 1) {
            document.getElementById('qualityplan'+i+'').disabled=true;
            document.getElementById('onayqp'+i+'').disabled=true
          }
        }

      //air

      myString5 = books[sutun1].air;
      if (myString5 == null) {
        myString5 = ""
      }


        let veri11 = myString5.split("<br>")
        var l = veri11.length;
        
        for (let i=0; i<l; i++){
          if (i>l-2) {
            document.getElementById("airs").innerHTML += 
            "<div>"+
            "<span class = counter5>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields4();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields4();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+i+"' onclick='slide_up(air"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+i+"'  onclick='slide_down(air"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='air"+i+"'  style = 'width:  350px;' input type='text' list='datalist5' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
            "</span>"+
            "</div>"+
            "<div></div>";     
          }
          else {
            document.getElementById("airs").innerHTML += 
            "<div>"+
            "<span class = counter5 style = 'padding-left: 50px;'>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+i+"' onclick='slide_up(air"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+i+"'  onclick='slide_down(air"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='air"+i+"'  style = 'width:  350px;' input type='text' list='datalist5' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
            "</span>"+
            "</div>";
              
          }
        }
        for (let i=0; i<l; i++){
          document.getElementById('air'+i+'').value=veri11[i];
          if (epostaflag == 1) {
            document.getElementById('air'+i+'').disabled=true;
          }
          else if (sutun10.includes("Değil") == false || sutun10.includes("Yapı") == true){
            document.getElementById('air'+i+'').disabled=false;
          }
          else {
            document.getElementById('air'+i+'').disabled=true;
          }
        }
      
       
      //letters

      myString6 = books[sutun1].letters;
      if (myString6 == null) {
        myString6 = ""
      }


        let veri12 = myString6.split("<br>")
        var l = veri12.length;
        
        for (let i=0; i<l; i++){
          if (i>l-2) {
            document.getElementById("letterss").innerHTML += 
            "<div>"+
            "<span class = counter6>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields5();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields5();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+i+"' onclick='slide_up(yazismalar"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+i+"'  onclick='slide_down(yazismalar"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='yazismalar"+i+"'  style = 'width:  350px;' input type='text' list='datalist6' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
              "<label for='ekvar"+i+"'>E:</label>"+
              "<input class='ekvar' type='checkbox' id='ekvar"+i+"' name='ekvar"+i+"' value='1'>"+
              "<label for='finalletter"+i+"'>S:</label>"+
              "<input class='finalletter' type='checkbox' id='finalletter"+i+"' name='finalletter"+i+"'value='1'></input>"+
            "</span>"+
            "</div>"+
            "<div></div>";     
          }
          else {
            document.getElementById("letterss").innerHTML += 
            "<div>"+
            "<span class = counter6 style = 'padding-left: 50px;'>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+i+"' onclick='slide_up(yazismalar"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+i+"'  onclick='slide_down(yazismalar"+i+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='yazismalar"+i+"'  style = 'width:  350px;' input type='text' list='datalist6' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
              "<label for='ekvar"+i+"'>E:</label>"+
              "<input class='ekvar' type='checkbox' id='ekvar"+i+"' name='ekvar"+i+"' value='1'>"+
              "<label for='finalletter"+i+"'>S:</label>"+
              "<input class='finalletter' type='checkbox' id='finalletter"+i+"' name='finalletter"+i+"' value='1'></input>"+
            "</span>"+
            "</div>";
              
          }
        }
        for (let i=0; i<l; i++){
          if (veri12[i].includes("-son-")){
            veri12[i]=veri12[i].slice(0, -5);
            document.getElementById('finalletter'+i+'').checked=true
          }
          if (veri12[i].includes("-ek-")){
            veri12[i]=veri12[i].slice(0, -4);
            document.getElementById('ekvar'+i+'').checked=true
          }
          document.getElementById('yazismalar'+i+'').value=veri12[i];
          if (epostaflag == 1) {
            document.getElementById('yazismalar'+i+'').disabled=true;
            document.getElementById('ekvar'+i+'').disabled=true
            document.getElementById('finalletter'+i+'').disabled=true
          }
        }
      


      // let veri3 = sutun3.split("<br>")
      // alert (veri3)
      // var l = veri3.length;
      //   for (let i=0; i<l; i++){
      //     if (i=l-1) {
      //       document.getElementById("notificationletters").innerHTML += 
      //       "<span class = counter1><svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/></svg><svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
      //         "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
      //         "</svg><input multiple class='form-control' id='notificationletter"+d+"' style = 'width: 350px;' input type='text' list='datalist1' name='notificationletter' rows='1' autocomplete='off'>"+
      //         "</input></span><br>"; 
      //     }
      //     else {
      //       document.getElementById("notificationletters").innerHTML += 
      //       "<span class = counter1 style = 'padding-left: 50px;'><input multiple class='form-control' id='notificationletter"+c+"'  style='width: 350px;' input type='text' list='datalist1' name='notificationletter' rows='1' autocomplete='off'>"+
      //         "</input></span><br>"; 
      //     }
      //     // document.getElementById('notificationletter'+i+'').value=veri3[i];
      //   }


      
      var secilenler=sutun4;
      for (let i=0; i<9; i++){
          document.getElementById("reviewer").options[i].selected=false;
      }
      
      if (secilenler.includes('A. TONGAL')) {
          document.getElementById("reviewer").options[0].selected="selected";
      } 
      if (secilenler.includes('İ. DİNÇ')) {
          document.getElementById("reviewer").options[1].selected="selected";
      } 
      if (secilenler.includes('K. ÖZTAŞ')) {
          document.getElementById("reviewer").options[2].selected="selected";
      } 
      if (secilenler.includes('M. MERCİMEK')) {
          document.getElementById("reviewer").options[3].selected="selected";
      } 
      if (secilenler.includes('M. ÖZTEMİZ')) {
          document.getElementById("reviewer").options[4].selected="selected";
      } 
      if (secilenler.includes('M. SARIGÜZEL')) {
          document.getElementById("reviewer").options[5].selected="selected";
      } 
      if (secilenler.includes('M. ÇİĞDEM')) {
          document.getElementById("reviewer").options[6].selected="selected";
      } 
      if (secilenler.includes('Ö. GÜNGÖR')) {
          document.getElementById("reviewer").options[7].selected="selected";
      } 

      if (secilenler.includes('U. TAŞKIN')) {
        document.getElementById("reviewer").options[8].selected="selected";
      } 

      if (epostaflag == 1) {
        document.getElementById('reviewer').disabled=true;
      }
      else {
        document.getElementById('reviewer').disabled=false;
      }
      
      var secilenleru=sutun6;

      for (let i=0; i<4; i++){
          document.getElementById("unit").options[i].selected=false;
      }

      if (secilenleru.includes('0')) {
        document.getElementById("unit").options[0].selected="selected";
      } 
      if (secilenleru.includes('1')) {
          document.getElementById("unit").options[1].selected="selected";
      } 
      if (secilenleru.includes('2')) {
          document.getElementById("unit").options[2].selected="selected";
      } 
      if (secilenleru.includes('3')) {
          document.getElementById("unit").options[3].selected="selected";
      }
      if (secilenleru.includes('4')) {
          document.getElementById("unit").options[4].selected="selected";
      }  
      
      if (epostaflag == 1) {
        document.getElementById('unit').disabled=true;
      }
      else {
        document.getElementById('unit').disabled=false;
      }

      // document.getElementById('equipmentname').value=sutun7;
      
      var secilenlers=sutun8;

      for (let i=0; i<3; i++){
          document.getElementById("safetyclass").options[i].selected=false;
      }
      
      if (secilenlers.includes('1')) {
          document.getElementById("safetyclass").options[0].selected="selected";
      } 
      if (secilenlers.includes('2')) {
          document.getElementById("safetyclass").options[1].selected="selected";
      } 
      if (secilenlers.includes('3')) {
          document.getElementById("safetyclass").options[2].selected="selected";
      } 
      
      if (epostaflag == 1) {
        document.getElementById('safetyclass').disabled=true;
      }
      else {
        document.getElementById('safetyclass').disabled=false;
      }

      // document.getElementById('qualityplan').value=sutun9;
      document.getElementById('notificationtype').value=sutun10;

      if (epostaflag == 1) {
        document.getElementById('notificationtype').disabled=true;
      }
      else {
        document.getElementById('notificationtype').disabled=false;
      }

      // document.getElementById('air').value=sutun11;
      document.getElementById('airstatus').value=sutun12;

      if (epostaflag == 1) {
        document.getElementById('airstatus').disabled=true;
      }
      else if (sutun10.includes("Değil") == false || sutun10.includes("Yapı") == true){
        document.getElementById('airstatus').disabled=false;
      }
      else {
        document.getElementById('airstatus').disabled=true;
      }


      // document.getElementById('letters').value=sutun13;
      // document.getElementById('remarks').value=sutun14;
      sutun14 = sutun14.split("Not Ekle<br>").join("").split("Not Oku/Değiştir<br>").join("")
      sutun14 = sutun14.trim()
      CKEDITOR.instances.remarks.setData(sutun14);


      if (epostaflag == 1) {
        CKEDITOR.instances.remarks.readOnly=true
        // document.getElementById('remarks').disabled=true;
      }
      else {
        CKEDITOR.instances.remarks.readOnly=false
        // document.getElementById('remarks').disabled=false;
      }


      satir = sutun1;
      
      // $('#formlar').collapse('show');
      document.getElementById("formlar").style.display = "block";
      document.getElementById("formlar").classList.remove("mystyle");
      document.getElementById("formlar").classList.add("mystyle1");
      document.getElementById("filtretemizle").style.display = "none";
      document.getElementById("karart").style.display="block";
      document.getElementById("loading").style.display="none";
      document.getElementById("duyurular").style.display="none"
      document.getElementById("duyuruekle").style.display="none";
      if ( document.getElementById("duyuru")){
        document.getElementById("duyuru").style.display="none"
        document.getElementById("duyurudegistir").style.display="none";
      }
      document.getElementById("status").scrollIntoView(false);
      document.getElementById("formlar").style.height = window.innerHeight;
      yenikayitbtn.style.display= "none"
      document.getElementById("notekran").style.display="none"
      if (document.getElementById("yetkiekran")){
        document.getElementById("yetkiekran").remove();
      }
      if (epostaflag == 1) {
        document.getElementById("duzenleek").innerHTML = sutun1 +" NO'LU EPOSTA GÖNDERME EKRANI" 
        document.getElementById("kaydet").value = "Gönder"   
      }
      else {
        document.getElementById("duzenleek").innerHTML = sutun1 +" NO'LU KAYIT DÜZENLEME EKRANI"
        document.getElementById("kaydet").value = "Kaydet" 
      }
      
      duzenleek.style.display = "block";
      baslik.style.display = "none";
      kayitek.style.display = "none";
      // downBtn.style.display= "none";
      // topBtn.style.display= "none";
      kapatbtn.style.display= "block";
      // window.scrollTo(0,0)
    }); 
    }
    }
    else {
      document.getElementById("loading").style.display="none";
      alert("Giriş yapılması gerekmektedir!")
      if (!(document.getElementById("user"))){
      kullanicigiris();
      }
    } 
  
    // })
  
  }
});


  const backToTopBtn = document.querySelector('#topBtn')
  const backToDownBtn = document.querySelector('#downBtn')
  const yenikayitbtn = document.querySelector('#kayit')
  const kapatbtn = document.querySelector('#kapat')
  const filtrebtn = document.querySelector('#filtretemizle')
  const cıkısbtn = document.querySelector('#cıkıs')
  const girisbtn = document.querySelector('#giris')
  const donusturbtn = document.querySelector('#donustur')
  const geribtn = document.querySelector('#geridon')
  const indirbtn = document.querySelector('#excel')
  const anasayfabtn = document.querySelector('#resim')
  const mevzuatbtn = document.querySelector('#baslik')
  const duyurubtn = document.querySelector('#duyuruekle')
  


backToTopBtn.addEventListener("click", backToTop)
backToDownBtn.addEventListener("click", backToDown)
yenikayitbtn.addEventListener("click", yenikayit)
kapatbtn.addEventListener("click", kayitkapat)
filtrebtn.addEventListener("click", temizle)
cıkısbtn.addEventListener("click", cık)
girisbtn.addEventListener("click", gir)
donusturbtn.addEventListener("click", akkuyu)
geribtn.addEventListener("click", yenile)
indirbtn.addEventListener("click", indir)
anasayfabtn.addEventListener("click", anasayfa)
mevzuatbtn.addEventListener("click", mevzuat)
duyurubtn.addEventListener("click", duyuru)


function duyuru(){
  document.getElementById("duyurular").style.display="none"
  document.getElementById("duyuruekle").style.display="none";
  const div = document.createElement('div');
  div.id = 'yeniduyuru';
  div.innerHTML = `

  <div align = "center">
  <br><p style="font-size:16px; color:white">Duyuru Ekle</p>
  
  <div align= "center" class="unselectable">
  <textarea class="form-control" id="duyurumetni" name="duyurumetni" rows="10" style = "width:  350px;"></textarea>
<tr><br>
  <input type="button" value="Kaydet" onclick="yeniduyuruekle()" style = "width:  100px "class="btn btn-primary">
  <input type="button" value="Vazgeç" onclick="yeniduyurukapat()" style = "width:  100px "class="btn btn-secondary">
</tr>
</div><br>
`
  var list = document.getElementById("book-form");
  list.insertBefore(div, list.childNodes[0]);
  document.getElementById("karart").style.display="block";
}

function yeniduyuruekle(){
  document.getElementById("karart2").style.display="block";
  document.getElementById("loading").style.display="block";
  duyuru = document.getElementById("duyurumetni").value.replace(/\r\n|\r|\n/g,"<br>").trim()
  $.post("duyuruekle",  {duyuru: `${duyuru}`},
  function(data){
    if (data=="Başarılı"){
      document.getElementById("karart2").style.display="none";
      document.getElementById("loading").style.display="none";
      document.getElementById("yeniduyuru").remove();
      alert("Duyuru eklendi!")
      divekle();
      duyuruekrani();
    }
    document.getElementById("karart").style.display="none";
  })
}

function yeniduyurukapat(){
  if (document.getElementById("yeniduyuru")) {
  document.getElementById("yeniduyuru").remove();
  }
  if (document.getElementById("duydegistir")) {
    document.getElementById("duydegistir").remove();
    }
  document.getElementById("karart").style.display="none";
}

function mevzuat(){
  if (yetki == 1){
  if (document.getElementById("dokumanlar").style.display=="block") {
    document.getElementById("dokumanlar").style.display="none"
  }
  else {
    document.getElementById("dokumanlar").style.display="block"
  }
}
}

function anasayfa(){
  window.open('https://www.ndk.gov.tr', '_blank');
}

function indir(){
  var table1 = document.querySelector("#atable");
  var sheet = XLSX.utils.table_to_sheet(table1);//Convert a table object to a sheet object
  // formatsız excel indirmek için
  // openDownloadDialog(sheet2blob(sheet),'download.xlsx');
  tableToExcel('atable', 'cc')
  // excelindir();
}

function sheet2blob(sheet, sheetName) {
  sheetName = sheetName || 'sheet1';
  var workbook = {
      SheetNames: [sheetName],
      Sheets: {}
  };
  workbook.Sheets[sheetName] = sheet; // Generate excel configuration items

  var wopts = {
      bookType: 'xlsx', // File type to generate
      bookSST: false, // Whether to generate Shared String Table or not, the official explanation is that the build speed will decrease if turned on, but there is better compatibility on lower version IOS devices
      type: 'binary'
  };
  var wbout = XLSX.write(workbook, wopts);
  var blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream"
  }); // String to ArrayBuffer
  function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
  }
  return blob;
}


function openDownloadDialog(url, saveName) {
  if (typeof url == 'object' && url instanceof Blob) {
      url = URL.createObjectURL(url); // Create a blob address
  }
  var aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = saveName || ''; // HTML5 new property, specify save file name, may not suffix, note that file:///mode will not take effect
  var event;
  if (window.MouseEvent) event = new MouseEvent('click');
  else {
      event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  }
  aLink.dispatchEvent(event);
}

function yenile(){
  excelekranı = 0;
  filtreflag = 0;
  anasayfaflag = 0;
  // if (localStorage.getItem("yetkili")==1){
  //   yenikayitbtn.style.display= "block";
  // }
  if (yetkilisicil == sicil || duzenle==1 || sicil=="0106"){
 
    yenikayitbtn.style.display= "block";
    }
  donusturbtn.style.display= "block";
  kapatbtn.style.display= "none";
  geribtn.style.display= "none";
  indirbtn.style.display= "none";
  findbtn.style.display="block";
  bulgubtn.style.display="none";
  document.querySelector('#display').style.display = "block";
  document.getElementById("toplamkayit").style.display="block"
  window.scrollTo(0,document.body.scrollHeight)
  if (filtretemizle.style.display == "none") {
    document.getElementById("bolum1").style.display = "block"
    document.getElementById("bolum2").style.display = "block"
    document.getElementById("bolum3").style.display = "block"
    document.getElementById("bolum4").style.display = "block"
    document.getElementById("bolum5").style.display = "block"
  }
  if (document.querySelector('#dformlar')) {
    document.querySelector('#dformlar').remove();
  }
  if (document.querySelector('#atable')) {
    document.querySelector('#atable').remove();
  }
  if (document.getElementById("datable")) {
    document.getElementById("datable").remove();
  }

  
  duzenleek.style.display = "none";
  bulgularek.style.display = "none";
  baslik.style.display = "block";
  kayitek.style.display = "none";
  excelek.style.display = "none";
  baslangic.style.display = "none";
  bitis.style.display = "none";
  filtrele.style.display = "none";
}

function cık(){
  localStorage.clear();
  // localStorage.setItem("hash", "");
  // localStorage.setItem("yetkili", "0");
  if (document.getElementById("kullaniciadi")) {
    document.getElementById("kullaniciadi").remove()
  }
  document.getElementById("duyurular").style.display="none"
  document.getElementById("duyuruekle").style.display="none";
  if  (document.getElementById("duyuru")) {
    document.getElementById("duyuru").style.display="none"
  }
  if  (document.getElementById("duyurudegistir")) {
    document.getElementById("duyurudegistir").style.display="none";
  }
  donusturbtn.style.display = "none"
  indirbtn.style.display = "none"
  findbtn.style.display = "none"
  bulgubtn.style.display = "none"
  geribtn.style.display= "none";
  document.querySelector('#cıkıs').style.display = "none" 
  
  document.getElementById("formlar").classList.remove("mystyle1");
  document.getElementById("formlar").classList.add("mystyle");
  setTimeout(function(){document.getElementById("formlar").style.display = "none";; }, 490);
  document.getElementById("karart").style.display="none";
  document.getElementById("notekran").style.display="none";
  document.querySelector('#bilgi').style.display = "none"
  document.querySelector('#giris').style.display = "block" 
  document.querySelector('#display').style.display = "none" 

  if (document.querySelector('#dformlar')) {
    document.querySelector('#dformlar').remove();
  }
  if (document.querySelector('#atable')) {
    document.querySelector('#atable').remove();
  }
  if (document.getElementById("datable")) {
    document.getElementById("datable").remove();
  }
  bulgularek.style.display = "none";
  duzenleek.style.display = "none";
  baslik.style.display = "block";
  kayitek.style.display = "none";
  excelek.style.display = "none";
  baslangic.style.display = "none";
  bitis.style.display = "none";
  filtrele.style.display = "none";
  yenikayitbtn.style.display= "none";
  kapatbtn.style.display= "none";
  kullanicigiris();
  // localStorage.setItem("userkapat", "0");
  // displaybooks();
}

function gir(){
  if (!(document.getElementById("user"))){
    kullanicigiris();
    }
}

function temizle(){
  document.getElementById("myInput").value="";
  document.getElementById("myInput1").value="";
  document.getElementById("myInput2").value="";
  document.getElementById("myInput3").value="";
  document.getElementById("myInput4").value="";
  document.getElementById("myInput5").value="";
  document.getElementById("myInput6").value="";
  document.getElementById("myInput7").value="";
  document.getElementById("myInput8").value="";
  document.getElementById("myInput8").value="";
  document.getElementById("myInput9").value="";
  document.getElementById("myInput10").value="";
  document.getElementById("myInput11").value="";
  document.getElementById("myInput12").value="";
  document.getElementById("myInput13").value="";
  myFunction();

}

function backToTop () {
  window.scrollTo(window.scrollX , 0)
}
function backToDown () {
  window.scrollTo(window.scrollX, document.body.scrollHeight)
}

function yenikayit () {
  if (yetki==1){
    if (yetkilisicil == sicil || duzenle==1 || sicil=="0106"){
  // eskiscroll = window.pageYOffset;
  // window.scrollTo(0,0)
  // $('#formlar').collapse('show');
  document.getElementById("formlar").style.display = "block";
  document.getElementById("formlar").classList.remove("mystyle");
  document.getElementById("formlar").classList.add("mystyle1");
  document.getElementById("karart").style.display="block";
  document.getElementById("duyurular").style.display="none"
  document.getElementById("duyuruekle").style.display="none";
  if (document.getElementById("duyuru")) {
    document.getElementById("duyuru").style.display="none"
    document.getElementById("duyurudegistir").style.display="none";
  }
  
  document.getElementById("status").scrollIntoView(false);
  yenikayitbtn.style.display= "none";
  if (document.getElementById("yetkiekran")){
    document.getElementById("yetkiekran").remove();
  }
  document.getElementById("notekran").style.display="none"
  var sonsatir = document.getElementById("display").rows.length-2
  // downBtn.style.display= "none";
  // topBtn.style.display= "none";
  kapatbtn.style.display= "block";
  if (duzenle ==1) {
    duzenleek.style.display = "block";
    bulgularek.style.display = "none";
    baslik.style.display = "none";
    kayitek.style.display = "none";
    document.getElementById("duzenleek").innerHTML = sutun1 +" No'lu Kayıt Düzenleme Ekranı"
  }
  else {
    duzenleek.style.display = "none";
    bulgularek.style.display = "none";
    baslik.style.display = "none";
    kayitek.style.display = "block";
  }
  }
  else{
    alert("Yetkisiz kullanıcılar yeni kayıt ekleyemez!")
  }
  }
  else {
    alert("Giriş yapılması gerekmektedir!")
    if (!(document.getElementById("user"))){
    kullanicigiris();
    }
  }     
}

function notkaydet() {
  not=CKEDITOR.instances.notyaz.getData();
  $.post("notekle",  {not: `${not}`, no: `${no}`, sicil:`${sicil}`
  })
  notkapat()
  displaybooks()
  mesaj="Kayıt başarılı!"
  popup(mesaj)
}

function notkapat () {
  CKEDITOR.instances.notyaz.setData("");
  kayitkapat() 
}

// function notindir () {
//   window.open().document.body.innerHTML = CKEDITOR.instances.notyaz.getData();
//   window.open().focus();
//   window.open().print();
// }

function kayitkapat () {
  // $('#formlar').collapse('hide');
  document.getElementById("formlar").classList.remove("mystyle1");
  document.getElementById("formlar").classList.add("mystyle");
  setTimeout(function(){document.getElementById("formlar").style.display = "none";; }, 490);
  document.getElementById("karart").style.display="none";
  document.getElementById("notekran").style.display="none"
  var input = document.getElementById("myInput").value.turkishToUpper();
  var input1 = document.getElementById("myInput1").value.turkishToUpper();
  var input2 = document.getElementById("myInput2").value.turkishToUpper();
  var input3 = document.getElementById("myInput3").value.turkishToUpper();
  var input4 = document.getElementById("myInput4").value.turkishToUpper();
  var input5 = document.getElementById("myInput5").value.turkishToUpper();
  var input6 = document.getElementById("myInput6").value.turkishToUpper();
  var input7 = document.getElementById("myInput7").value.turkishToUpper();
  var input8 = document.getElementById("myInput8").value.turkishToUpper();
  var input9 = document.getElementById("myInput9").value.turkishToUpper();
  var input10 = document.getElementById("myInput10").value.turkishToUpper();
  var input11 = document.getElementById("myInput11").value.turkishToUpper();
  var input12 = document.getElementById("myInput12").value.turkishToUpper();
  var input13 = document.getElementById("myInput13").value.turkishToUpper();
  if (input !== "" || input1 !== "" || input2 !== "" || input3 !== "" || input4 !== "" || input5 !== "" ||
    input6 !== "" || input7 !== "" || input8 !== "" || input9 !== "" || input10 !== "" || input11 !== ""  ||
    input12 !== "" || input13 !== "") {
  document.getElementById("filtretemizle").style.display = "block";
    }
  if (yetkilisicil == sicil || duzenle==1 || sicil=="0106"){
    yenikayitbtn.style.display= "block";
  }
  // downBtn.style.display= "block";
  // topBtn.style.display= "block";
  kapatbtn.style.display= "none";
  duzenleek.style.display = "none";
  bulgularek.style.display = "none";
  baslik.style.display = "block";
  kayitek.style.display = "none"; 
}

function satiragit () {
  myFunction();
  if (kayma == 1) {
      kayma = 0
      document.querySelector('#popup').remove()
      document.getElementById(kaydir).scrollIntoView();
      window.scrollBy(0, -85)
      document.getElementById(kaydir).style.backgroundColor ="pink";
      setTimeout(function(){document.getElementById(kaydir).removeAttribute("style")}, 3000)     
     }
     else {
      window.scrollTo(0, document.body.scrollHeight)
      document.querySelector('#popup').remove()
      x = document.getElementById("display").rows.length-2
      document.getElementById("row"+x).style.backgroundColor ="pink";
      setTimeout(function(){document.getElementById("row"+x).removeAttribute("style")}, 3000) 

     }
  
     document.getElementById("karart").style.display = "none"

}

function popupkapat(){
  document.querySelector('#popup2').remove()
  document.getElementById("karart").style.display = "none"
}

function popup (message) {

    const div = document.createElement('div');
    div.id = 'popup';
    div.innerHTML = `
  
    <div align = "center">
    <br><p style="font-size:16px; color:white">${message}</p><br><br>
    
  <div align= "center" class="unselectable">
  <tr>
    <input type="button" value="Tamam" onclick="satiragit()" id="denemen" style = "width:  100px "class="btn btn-primary">
  </tr>
  </div><br>
  `
    var list = document.getElementById("book-form");
    list.insertBefore(div, list.childNodes[0]);

    // document.querySelector('#popup').addEventListener('click', (f) => {

    //   if(f.target.classList.contains('alert')){
    //     if (kayma ==1){
    //     document.getElementById(kaydir).scrollIntoView(false);
    //     document.querySelector('.alert').remove()
    //     }
    //     else {
    //     window.scrollTo(0,document.body.scrollHeight);
    //     document.querySelector('.alert').remove()
    //     } 
    // }
    // })

    // // Vanish in 3 seconds
    // setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

function popup2 (message) {
  document.getElementById("karart").style.display = "block"
  const div = document.createElement('div');
  div.id = 'popup2';
  div.innerHTML = `

  <div align = "center">
  <p>${message}</p><br><br>
  
<div align= "center" class="unselectable">
<tr>
  <input type="button" value="Tamam" onclick="popupkapat()" id="denemen" style = "width:  100px "class="btn btn-primary">
</tr>
</div>
`
  var list = document.getElementById("book-form");
  list.insertBefore(div, list.childNodes[0]);

}

// window.addEventListener("scroll", scrollFunction)

// function scrollFunction() {
//   if (yenikayitbtn.style.display == "none" && excelekranı == 0){
//     if (parseInt(document.getElementById("ust").offsetTop) ==  parseInt(window.pageYOffset+40)) {
//       // $('#formlar').collapse('hide');
//       document.getElementById("formlar").style.display = "none";
//       yenikayitbtn.style.display= "block";
//       downBtn.style.display= "block";
//       topBtn.style.display= "block";
//       kapatbtn.style.display= "none";
//       duzenleek.style.display = "none";
//       baslik.style.display = "block";
//       kayitek.style.display = "none";
//     }
//   }
// }

// girilmeyen öğelerin navbarın altında kalmaması için

// var elements = document.querySelectorAll('input,select,textarea');
// var invalidListener = function(){ this.scrollIntoView(false); };

// for(var i = elements.length; i--;)
//     elements[i].addEventListener('invalid', invalidListener);

// formda kutu ekleme ve çıkarma fonksiyonları
    // <!-- notificationletter için -->
  
      function add_fields() {
          var c = $('span.counter1').length
          var d = c + 1;
          var e = c-1;
          let eskiveri = []
          for (i = 0; i < c; i++) {
            eskiveri[i] = document.getElementById('notificationletter'+i+'').value;
          }
    
          var select = document.getElementById('notificationletters');
          select.removeChild(select.lastChild);
          select.removeChild(select.lastChild);

    
          c = $('span.counter1').length
          d = c + 1;
    
    
          document.getElementById("notificationletters").innerHTML += 


          "<div>"+
            "<span class = counter1 style = 'padding-left: 50px;'>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+c+"' onclick='slide_up(notificationletter"+c+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+c+"'  onclick='slide_down(notificationletter"+c+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='notificationletter"+c+"'  style = 'width:  350px;' input type='text' list='datalist1' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
            "</span>"+
            "</div>";
            
          
    
          document.getElementById("notificationletters").innerHTML += 
          "<div>"+
          "<span class = counter1>"+
          "<span class = 'form-inline'>"+
            "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
              "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
            "</svg>"+
            "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
              "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
            "</svg>"+
            "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+d+"' onclick='slide_up(notificationletter"+d+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
              "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
            "</svg>"+
            "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+d+"'  onclick='slide_down(notificationletter"+d+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
              "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
            "</svg>"+
            "<input multiple class='form-control' id='notificationletter"+d+"'  style = 'width:  350px;' input type='text' list='datalist1' name='notificationletter' rows='1' autocomplete='off'>"+
            "</input>"+
          "</span>"+
          "</div>"+
          "<div></div>";
 
    
          for (i = 0; i < d; i++) {
            document.getElementById('notificationletter'+i+'').value = eskiveri[i];
          }
          document.getElementById('notificationletter'+d+'').focus();
    }
    
    function remove_fields(){
      if ($('span.counter1').length > 1) {
        var c = $('span.counter1').length
        var d = c + 1;
        var e = c-2;
        let eskiveri = []
        for (i = 0; i < c; i++) {
          eskiveri[i] = document.getElementById('notificationletter'+i+'').value;
        }
        var select = document.getElementById('notificationletters');
        select.removeChild(select.lastChild);
        select.removeChild(select.lastChild);
        select.removeChild(select.lastChild);
        document.getElementById("notificationletters").innerHTML += 
        "<div>"+
        "<span class = counter1>"+
        "<span class = 'form-inline'>"+
          "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+e+"' onclick='slide_up(notificationletter"+e+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+e+"'  onclick='slide_down(notificationletter"+e+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
          "</svg>"+
          "<input multiple class='form-control' id='notificationletter"+e+"'  style = 'width:  350px;' input type='text' list='datalist1' name='notificationletter' rows='1' autocomplete='off'>"+
          "</input>"+
        "</span>"+
        "</div>"+
        "<div></div>";
          for (i = 0; i < c-1; i++) {
          document.getElementById('notificationletter'+i+'').value = eskiveri[i];
        }
        document.getElementById('notificationletter'+e+'').focus();
    
      }
      else{
        document.getElementById('notificationletter0').value = "";
      }
    }
  
    
        // <!-- manufacturer için -->
  
        function add_fields1() {
          var c = $('span.counter2').length
          var d = c + 1;
          
          var e = c-1;
          let eskiveri = []
          for (i = 0; i < c; i++) {
            eskiveri[i] = document.getElementById('manufacturer'+i+'').value;
          }
    
          var select = document.getElementById('manufacturers');
          select.removeChild(select.lastChild);
          select.removeChild(select.lastChild);
    
          c = $('span.counter2').length
          d = c + 1;
    
    
          document.getElementById("manufacturers").innerHTML += 

            "<div>"+
            "<span class = counter2 style = 'padding-left: 50px;'>"+
            "<span class = 'form-inline'>"+
              "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+c+"' onclick='slide_up(manufacturer"+c+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
              "</svg>"+
              "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+c+"'  onclick='slide_down(manufacturer"+c+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
                "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
              "</svg>"+
              "<input multiple class='form-control' id='manufacturer"+c+"'  style = 'width:  350px;' input type='text' list='datalist2' name='notificationletter' rows='1' autocomplete='off'>"+
              "</input>"+
            "</span>"+
            "</div>";
          
      
          document.getElementById("manufacturers").innerHTML += 
          "<div>"+
          "<span class = counter2>"+
          "<span class = 'form-inline'>"+
            "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields1();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
              "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
            "</svg>"+
            "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields1();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
              "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
            "</svg>"+
            "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+d+"' onclick='slide_up(manufacturer"+d+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
              "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
            "</svg>"+
            "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+d+"'  onclick='slide_down(manufacturer"+d+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
              "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
            "</svg>"+
            "<input multiple class='form-control' id='manufacturer"+d+"'  style = 'width:  350px;' input type='text' list='datalist2' name='notificationletter' rows='1' autocomplete='off'>"+
            "</input>"+
          "</span>"+
          "</div>"+
          "<div></div>"; 
    
          for (i = 0; i < d; i++) {
            document.getElementById('manufacturer'+i+'').value = eskiveri[i];
          }
          document.getElementById('manufacturer'+d+'').focus();
      }
    
      function remove_fields1(){
        if ($('span.counter2').length > 1) {
          var c = $('span.counter2').length
          var d = c + 1;
          var e = c-2;
          let eskiveri = []
          for (i = 0; i < c; i++) {
            eskiveri[i] = document.getElementById('manufacturer'+i+'').value;
          }
          var select = document.getElementById('manufacturers');
          select.removeChild(select.lastChild);
          select.removeChild(select.lastChild);
          select.removeChild(select.lastChild);
          document.getElementById("manufacturers").innerHTML += 
          "<div>"+
          "<span class = counter2>"+
          "<span class = 'form-inline'>"+
            "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields1();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
              "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
            "</svg>"+
            "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields1();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
              "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
            "</svg>"+
            "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+e+"' onclick='slide_up(manufacturer"+e+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
              "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
            "</svg>"+
            "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+e+"'  onclick='slide_down(manufacturer"+e+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
              "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
            "</svg>"+
            "<input multiple class='form-control' id='manufacturer"+e+"'  style = 'width:  350px;' input type='text' list='datalist2' name='notificationletter' rows='1' autocomplete='off'>"+
            "</input>"+
          "</span>"+
          "</div>"+
          "<div></div>";
            for (i = 0; i < c-1; i++) {
            document.getElementById('manufacturer'+i+'').value = eskiveri[i];
          }
          document.getElementById('manufacturer'+e+'').focus();
        }
        else{
          document.getElementById('manufacturer0').value = "";
        }
      }
  
    
    // <!-- equipmentname için -->

      function add_fields2() {
        var c = $('span.counter3').length
        var d = c + 1;
        
        var e = c-1;
        let eskiveri = []
        for (i = 0; i < c; i++) {
          eskiveri[i] = document.getElementById('equipmentname'+i+'').value;
        }
    
        var select = document.getElementById('equipmentnames');
        select.removeChild(select.lastChild);
        select.removeChild(select.lastChild);
    
        c = $('span.counter3').length
        d = c + 1;
    
    
        document.getElementById("equipmentnames").innerHTML += 
        "<div>"+
        "<span class = counter3 style = 'padding-left: 50px;'>"+
        "<span class = 'form-inline'>"+
          "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+c+"' onclick='slide_up(equipmentname"+c+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+c+"'  onclick='slide_down(equipmentname"+c+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
          "</svg>"+
          "<input multiple class='form-control' id='equipmentname"+c+"'  style = 'width:  350px;' input type='text' list='datalist3' name='notificationletter' rows='1' autocomplete='off'>"+
          "</input>"+
        "</span>"+
        "</div>";
        
    
        document.getElementById("equipmentnames").innerHTML += 
        "<div>"+
        "<span class = counter3>"+
        "<span class = 'form-inline'>"+
          "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields2();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields2();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+d+"' onclick='slide_up(equipmentname"+d+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+d+"'  onclick='slide_down(equipmentname"+d+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
          "</svg>"+
          "<input multiple class='form-control' id='equipmentname"+d+"'  style = 'width:  350px;' input type='text' list='datalist3' name='notificationletter' rows='1' autocomplete='off'>"+
          "</input>"+
        "</span>"+
        "</div>"+
        "<div></div>";   
    
        for (i = 0; i < d; i++) {
          document.getElementById('equipmentname'+i+'').value = eskiveri[i];
        }
        document.getElementById('equipmentname'+d+'').focus();
    }
    
    function remove_fields2(){
      if ($('span.counter3').length > 1) {
        var c = $('span.counter3').length
        var d = c + 1;
        var e = c-2;
        let eskiveri = []
        for (i = 0; i < c; i++) {
          eskiveri[i] = document.getElementById('equipmentname'+i+'').value;
        }
        var select = document.getElementById('equipmentnames');
        select.removeChild(select.lastChild);
        select.removeChild(select.lastChild);
        select.removeChild(select.lastChild);
        document.getElementById("equipmentnames").innerHTML += 
        "<div>"+
        "<span class = counter3>"+
        "<span class = 'form-inline'>"+
          "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields2();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields2();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+e+"' onclick='slide_up(equipmentname"+e+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+e+"'  onclick='slide_down(equipmentname"+e+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
          "</svg>"+
          "<input multiple class='form-control' id='equipmentname"+e+"'  style = 'width:  350px;' input type='text' list='datalist3' name='notificationletter' rows='1' autocomplete='off'>"+
          "</input>"+
        "</span>"+
        "</div>"+
        "<div></div>";
          for (i = 0; i < c-1; i++) {
          document.getElementById('equipmentname'+i+'').value = eskiveri[i];
        }
        document.getElementById('equipmentname'+e+'').focus();
      }
      else{
        document.getElementById('equipmentname0').value = "";
      }
    }

    
    // <!-- qualityplan için -->
  
      function add_fields3() {
        var c = $('span.counter4').length
        var d = c + 1;
        

        var e = c-1;
        let eskiveri = []
        let eskiveriqp = []
        for (i = 0; i < c; i++) {
          eskiveriqp[i] = document.getElementById('onayqp'+i+'').checked;
          eskiveri[i] = document.getElementById('qualityplan'+i+'').value;
        }
    
        var select = document.getElementById('qualityplans');
        select.removeChild(select.lastChild);
        select.removeChild(select.lastChild);
    
        c = $('span.counter4').length
        d = c + 1;

    
        document.getElementById("qualityplans").innerHTML += 
        "<div>"+
        "<span class = counter4 style = 'padding-left: 50px;'>"+
        "<span class = 'form-inline'>"+
          "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+c+"' onclick='slide_up(qualityplan"+c+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+c+"'  onclick='slide_down(qualityplan"+c+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
          "</svg>"+
          "<input multiple class='form-control' id='qualityplan"+c+"'  style = 'width:  350px;' input type='text' list='datalist4' name='notificationletter' rows='1' autocomplete='off'>"+
          "</input>"+
          "<label for='onayqp"+c+"'>O:</label>"+
          "<input class='onayqp' type='checkbox' id='onayqp"+c+"' name='onayqp"+c+"' value='1' checked>"+
        "</span>"+
        "</div>"; 
        
    
        document.getElementById("qualityplans").innerHTML += 
        "<div>"+
        "<span class = counter4>"+
        "<span class = 'form-inline'>"+
          "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields3();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields3();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+d+"' onclick='slide_up(qualityplan"+d+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+d+"'  onclick='slide_down(qualityplan"+d+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
          "</svg>"+
          "<input multiple class='form-control' id='qualityplan"+d+"'  style = 'width:  350px;' input type='text' list='datalist4' name='notificationletter' rows='1' autocomplete='off'>"+
          "</input>"+
          "<label for='onayqp"+d+"'>O:</label>"+
          "<input class='onayqp' type='checkbox' id='onayqp"+d+"' name='onayqp"+d+"' value='1' checked>"+
        "</span>"+
        "</div>"+
        "<div></div>";  
    
        for (i = 0; i < d; i++) {
          document.getElementById('qualityplan'+i+'').value = eskiveri[i];
        
          document.getElementById('onayqp'+i+'').checked=eskiveriqp[i];
          
        }
        document.getElementById('qualityplan'+d+'').focus();
    }
    
    function remove_fields3(){
      if ($('span.counter4').length > 1) {
        var c = $('span.counter4').length
        var d = c + 1;
        var e = c-2;
        let eskiveri = []
        let eskiveriqp = []
        for (i = 0; i < c; i++) {
          eskiveriqp[i] = document.getElementById('onayqp'+i+'').checked;
          eskiveri[i] = document.getElementById('qualityplan'+i+'').value;
        }
        var select = document.getElementById('qualityplans');
        select.removeChild(select.lastChild);
        select.removeChild(select.lastChild);
        select.removeChild(select.lastChild);
        document.getElementById("qualityplans").innerHTML += 
        "<div>"+
        "<span class = counter4>"+
        "<span class = 'form-inline'>"+
          "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields3();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields3();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+e+"' onclick='slide_up(qualityplan"+e+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+e+"'  onclick='slide_down(qualityplan"+e+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
          "</svg>"+
          "<input multiple class='form-control' id='qualityplan"+e+"'  style = 'width:  350px;' input type='text' list='datalist4' name='notificationletter' rows='1' autocomplete='off'>"+
          "</input>"+
          "<label for='onayqp"+e+"'>O:</label>"+
          "<input class='onayqp' type='checkbox' id='onayqp"+e+"' name='onayqp"+e+"' value='1' checked>"+
        "</span>"+
        "</div>"+
        "<div></div>";
          for (i = 0; i < c-1; i++) {
          document.getElementById('qualityplan'+i+'').value = eskiveri[i];
          document.getElementById('onayqp'+i+'').checked=eskiveriqp[i];
        }
        document.getElementById('qualityplan'+e+'').focus();
      }
      else{
        document.getElementById('qualityplan0').value = "";
      }
    }

    
    // <!-- air için -->

      function add_fields4() {
      if (document.getElementById("notificationtype").value.includes("Değil") == false || document.getElementById("notificationtype").value.includes("Yapı") == true){
        var c = $('span.counter5').length
        var d = c + 1;
        
        var e = c-1;
        let eskiveri = []
        for (i = 0; i < c; i++) {
          eskiveri[i] = document.getElementById('air'+i+'').value;
        }
    
        var select = document.getElementById('airs');
        select.removeChild(select.lastChild);
        select.removeChild(select.lastChild);
    
        c = $('span.counter5').length
        d = c + 1;
    
    
        document.getElementById("airs").innerHTML += 
        "<div>"+
        "<span class = counter5 style = 'padding-left: 50px;'>"+
        "<span class = 'form-inline'>"+
          "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+c+"' onclick='slide_up(air"+c+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+c+"'  onclick='slide_down(air"+c+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
          "</svg>"+
          "<input multiple class='form-control' id='air"+c+"'  style = 'width:  350px;' input type='text' list='datalist5' name='notificationletter' rows='1' autocomplete='off'>"+
          "</input>"+
        "</span>"+
        "</div>";
        
    
        document.getElementById("airs").innerHTML += 
        "<div>"+
        "<span class = counter5>"+
        "<span class = 'form-inline'>"+
          "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields4();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields4();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+d+"' onclick='slide_up(air"+d+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+d+"'  onclick='slide_down(air"+d+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
          "</svg>"+
          "<input multiple class='form-control' id='air"+d+"'  style = 'width:  350px;' input type='text' list='datalist5' name='notificationletter' rows='1' autocomplete='off'>"+
          "</input>"+
        "</span>"+
        "</div>"+
        "<div></div>";   
    
        for (i = 0; i < d; i++) {
          document.getElementById('air'+i+'').value = eskiveri[i];
        }
        document.getElementById('air'+d+'').focus();
    }
  }
    
    function remove_fields4(){
      if ($('span.counter5').length > 1) {
        var c = $('span.counter5').length
        var d = c + 1;
        var e = c-2;
        let eskiveri = []
        for (i = 0; i < c; i++) {
          eskiveri[i] = document.getElementById('air'+i+'').value;
        }
        var select = document.getElementById('airs');
        select.removeChild(select.lastChild);
        select.removeChild(select.lastChild);
        select.removeChild(select.lastChild);
        document.getElementById("airs").innerHTML += 
        "<div>"+
        "<span class = counter5>"+
        "<span class = 'form-inline'>"+
          "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields4();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields4();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+e+"' onclick='slide_up(air"+e+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+e+"'  onclick='slide_down(air"+e+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
          "</svg>"+
          "<input multiple class='form-control' id='air"+e+"'  style = 'width:  350px;' input type='text' list='datalist5' name='notificationletter' rows='1' autocomplete='off'>"+
          "</input>"+
        "</span>"+
        "</div>"+
        "<div></div>";
          for (i = 0; i < c-1; i++) {
          document.getElementById('air'+i+'').value = eskiveri[i];
        }
        document.getElementById('air'+e+'').focus();
      }
      else{
        document.getElementById('air0').value = "";
      }
    }

    
    // <!-- letters için -->
    
      function add_fields5() {
        var c = $('span.counter6').length
        var d = c + 1;
        
        var e = c-1;
        let eskiveri = []
        let eskiveriek = []
        let eskiverison = []
        for (i = 0; i < c; i++) {
          eskiveri[i] = document.getElementById('yazismalar'+i+'').value;
          eskiveriek[i] = document.getElementById('ekvar'+i+'').checked;
          eskiverison[i] = document.getElementById('finalletter'+i+'').checked;
        }
    
        var select = document.getElementById('letterss');
        select.removeChild(select.lastChild);
        select.removeChild(select.lastChild);
    
        c = $('span.counter6').length
        d = c + 1;
    
    
        document.getElementById("letterss").innerHTML += 

          
          "<div>"+
          "<span class = counter6 style = 'padding-left: 50px;'>"+
          "<span class = 'form-inline'>"+
            "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+c+"' onclick='slide_up(yazismalar"+c+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
              "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
            "</svg>"+
            "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+c+"'  onclick='slide_down(yazismalar"+c+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
              "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
            "</svg>"+
            "<input multiple class='form-control' id='yazismalar"+c+"'  style = 'width:  350px;' input type='text' list='datalist6' name='notificationletter' rows='1' autocomplete='off'>"+
            "</input>"+
            "<label for='ekvar"+c+"'>E:</label>"+
            "<input class='ekvar' type='checkbox' id='ekvar"+c+"' name='ekvar"+c+"' value='1'>"+
            "<label for='finalletter"+c+"'>S:</label>"+
            "<input class='finalletter' type='checkbox' id='finalletter"+c+"' name='finalletter"+c+"' value='1'></input>"+
          "</span>"+
          "</div>";
        
    
        document.getElementById("letterss").innerHTML += 

        "<div>"+
        "<span class = counter6>"+
        "<span class = 'form-inline'>"+
          "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields5();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields5();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+d+"' onclick='slide_up(yazismalar"+d+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+d+"'  onclick='slide_down(yazismalar"+d+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
          "</svg>"+
          "<input multiple class='form-control' id='yazismalar"+d+"'  style = 'width:  350px;' input type='text' list='datalist6' name='notificationletter' rows='1' autocomplete='off'>"+
          "</input>"+
          "<label for='ekvar"+d+"'>E:</label>"+
          "<input class='ekvar' type='checkbox' id='ekvar"+d+"' name='ekvar"+d+"' value='1'>"+
          "<label for='finalletter"+d+"'>S:</label>"+
          "<input class='finalletter' type='checkbox' id='finalletter"+d+"' name='finalletter"+d+"'value='1'></input>"+
        "</span>"+
        "</div>"+
        "<div></div>";  
    
        for (i = 0; i < d; i++) {
          document.getElementById('yazismalar'+i+'').value = eskiveri[i];
          if (eskiveriek[i]==true){
            document.getElementById('ekvar'+i+'').checked=true;
          }
          if (eskiverison[i]==true){
            document.getElementById('finalletter'+i+'').checked=true;
          }
        }
        document.getElementById('yazismalar'+d+'').focus();
    }
    
    function remove_fields5(){
      if ($('span.counter6').length > 1) {
        var c = $('span.counter6').length
        var d = c + 1;
        var e = c-2;
        let eskiveri = []
        let eskiveriek = []
        let eskiverison = []
        for (i = 0; i < c; i++) {
          eskiveri[i] = document.getElementById('yazismalar'+i+'').value;
          eskiveriek[i] = document.getElementById('ekvar'+i+'').checked;
          eskiverison[i] = document.getElementById('finalletter'+i+'').checked;
        }
        var select = document.getElementById('letterss');
        select.removeChild(select.lastChild);
        select.removeChild(select.lastChild);
        select.removeChild(select.lastChild);
        document.getElementById("letterss").innerHTML += 
        "<div>"+
        "<span class = counter6>"+
        "<span class = 'form-inline'>"+
          "<svg class='bi bi-plus-circle-fill' id='more_fields' onclick='add_fields5();'   width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-dash-circle-fill red-text' id='less_fields' onclick='remove_fields5();'  width='25px' height='25px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path fill-rule='evenodd' d='M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z' clip-rule='evenodd'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-up-fill slide_up' id='slide_up"+e+"' onclick='slide_up(yazismalar"+e+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z'/>"+
          "</svg>"+
          "<svg class='bi bi-caret-down-fill slide_down'  id='slide_down"+e+"' onclick='slide_down(yazismalar"+e+");'  width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
            "<path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/>"+
          "</svg>"+
          "<input multiple class='form-control' id='yazismalar"+e+"'  style = 'width:  350px;' input type='text' list='datalist6' name='notificationletter' rows='1' autocomplete='off'>"+
          "</input>"+
          "<label for='ekvar"+e+"'>E:</label>"+
          "<input class='ekvar' type='checkbox' id='ekvar"+e+"' name='ekvar"+e+"'  value='1'>"+
          "<label for='finalletter"+e+"'>S:</label>"+
          "<input class='finalletter' type='checkbox' id='finalletter"+e+"' name='finalletter"+e+"' value='1'></input>"+
        "</span>"+
        "</div>"+
        "<div></div>"; 
          for (i = 0; i < c-1; i++) {
          document.getElementById('yazismalar'+i+'').value = eskiveri[i];
          if (eskiveriek[i]==true){
            document.getElementById('ekvar'+i+'').checked=true;
          }
          if (eskiverison[i]==true){
            document.getElementById('finalletter'+i+'').checked=true;
          }
        }
        document.getElementById('yazismalar'+e+'').focus();
      }
      else{
        document.getElementById('yazismalar0').value = "";
        document.getElementById('ekvar0').checked=false;
        document.getElementById('finalletter0').checked=false;
      }
    }

    var tableToExcel = (function() {

      var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"></meta><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
      return function(table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
        var link = document.createElement('a');
        var today = new Date();
        var date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
        link.download = date+"-akkuyu";
        link.href = uri + base64(format(template, ctx))
        link.click();
        // window.location.href = uri + base64(format(template, ctx))
      }
    })()
    
    function excelindir() {
      var wb = XLSX.utils.table_to_book(document.getElementById("atable"), {sheet:"Sheet JS"});
      var fname = "deneme.xlsx";
      XLSX.writeFile(wb, fname);
    }
    function akkuyu(){
      document.getElementById("karart").style.display="block";
      document.getElementById("loading").style.display="block";
      anasayfaflag = 1;
      $.post("imalat", function (books){
        temizle()
        document.getElementById("bolum1").style.display = "none"
        document.getElementById("bolum2").style.display = "none"
        document.getElementById("bolum3").style.display = "none"
        document.getElementById("bolum4").style.display = "none"
        document.getElementById("bolum5").style.display = "none"

        document.getElementById("toplamkayit").style.display="none"
        //delete old table
        excelekranı = 1
        yenikayitbtn.style.display= "none";
        donusturbtn.style.display= "none";
        kapatbtn.style.display= "none";
        geribtn.style.display= "block";
        indirbtn.style.display= "block";
        // $('#formlar').collapse('hide');
        duzenleek.style.display = "none";
        bulgularek.style.display = "none";
        baslik.style.display = "none";
        kayitek.style.display = "none";
        excelek.style.display = "block";
        baslangic.style.display = "block";
        bitis.style.display = "block";
        filtrele.style.display = "block";
        findbtn.style.display="none";
        document.getElementById("duyurular").style.display="none"
        if (document.getElementById("duyuru")) {
          document.getElementById("duyuru").style.display="none"
          document.getElementById("duyurudegistir").style.display="none";
        }
        if (document.getElementById("yeniduyuru")) {
          document.getElementById("yeniduyuru").remove();
        }
        document.getElementById("duyuruekle").style.display="none";
        document.getElementById("formlar").classList.remove("mystyle1");
        document.getElementById("formlar").classList.add("mystyle");
        setTimeout(function(){document.getElementById("formlar").style.display = "none";; }, 490);
        // document.getElementById("karart").style.display="none";
        document.querySelector('#display').style.display = "none";
        document.getElementById("notekran").style.display="none";
        if (document.getElementById("yetkiekran")){
          document.getElementById("yetkiekran").remove();
        }

        

        //veritabanından tabloya işleme
        
        let dbrows = books.length;

        

        const akkuyutablo = document.createElement('table');
        akkuyutablo.id = "atable"
        akkuyutablo.align = "center"
        akkuyutablo.innerHTML =`
        
        <thead>
                  <tr>
                    <th id="ust" onclick="sortTable(0)" class="align-top" style="width: 45px; background-color:black; color:white; cursor: pointer"><input type="text" style="width: 41px" id="amyInput" onkeyup="amyFunction()" placeholder="Ara" autocomplete="off"><br>No<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                  </svg></th>
                    <th id="ust1" onclick="sortTable(1)" class="align-top" style="width: 90px; background-color:black; color:white; cursor: pointer"><input type="text" style="width: 86px" id="amyInput0" onkeyup="amyFunction()" placeholder="Ara" autocomplete="off"><br>Rcrd. Date<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                  </svg></th>
                    <th id="ust1" onclick="sortTable(2)" class="align-top" style="width: 176px; background-color:black; color:white; cursor: pointer"><input type="text" style="width: 172px" id="amyInput1" onkeyup="amyFunction()" placeholder="Ara" autocomplete="off"><br>Status<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                  </svg></th>
                    <th id="ust2" onclick="sortTable(3)" class="align-top" style="width: 176px; background-color:black; color:white; cursor: pointer"><input type="text" style="width: 172px" id="amyInput2" onkeyup="amyFunction()" placeholder="Ara" autocomplete="off"><br>Notification Letter
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
                    </th>
                    <th id="ust4" onclick="sortTable(4)" class="align-top" style="width: 176px; background-color:black; color:white; cursor: pointer"><input type="text" style="width: 172px" id="amyInput3" onkeyup="amyFunction()" placeholder="Ara" autocomplete="off"><br>Manufacturer
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
                    </th>
                    <th id="ust5" onclick="sortTable(5)" class="align-top" style="width: 55px; background-color:black; color:white; cursor: pointer"><input type="text" style="width: 51px" id="amyInput4" onkeyup="amyFunction()" placeholder="Ara" autocomplete="off"><br>Unit
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
                    </th>
                    <th id="ust6" onclick="sortTable(6)" class="align-top" style="width: 176px; background-color:black; color:white; cursor: pointer"><input type="text" style="width: 172px" id="amyInput5" onkeyup="amyFunction()" placeholder="Ara" autocomplete="off"><br>Eq Name
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
                    </th>
                    <th id="ust7" onclick="sortTable(7)" class="align-top" style="width: 65px; background-color:black; color:white; cursor: pointer"><input type="text" style="width: 61px" id="amyInput6" onkeyup="amyFunction()" placeholder="Ara" autocomplete="off"><br>Sfty C.
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
                    </th>
                    <th id="ust8" onclick="sortTable(8)" class="align-top" style="width: 220px; background-color:black; color:white; cursor: pointer"><input type="text" style="width: 216px" id="amyInput7" onkeyup="amyFunction()" placeholder="Ara" autocomplete="off"><br>Quality Plan
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
                    </th>
                    <th id="ust9" onclick="sortTable(9)" class="align-top" style="width: 176px; background-color:black; color:white; cursor: pointer"><input type="text" style="width: 171px" id="amyInput8" onkeyup="amyFunction()" placeholder="Ara" autocomplete="off"><br>Notification Type
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
                    </th>
                    <th id="ust10" onclick="sortTable(10)" class="align-top" style="width: 150px; background-color:black; color:white; cursor: pointer"><input type="text" style="width: 146px" id="amyInput9" onkeyup="amyFunction()" placeholder="Ara" autocomplete="off"><br>Air
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
                    </th>
                    <th id="ust11" onclick="sortTable(11)" class="align-top" style="widh: 60px; background-color:black; color:white; cursor: pointer"><input type="text" style="width: 56px" id="amyInput10" onkeyup="amyFunction()" placeholder="Ara" autocomplete="off"><br>Air S.
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
                    </th>
                    <th id="ust12" onclick="sortTable(12)" class="align-top" style="width: 176px; background-color:black; color:white; cursor: pointer"><input type="text" style="width: 171px" id="amyInput11" onkeyup="amyFunction()" placeholder="Ara" autocomplete="off"><br>Letters
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
                    </th>
                  </tr>

        </thead>
        <tbody id="akkuyu-list"></tbody>

        `
        document.querySelector('#liste').appendChild(akkuyutablo)

        for (let k = 0; k < dbrows; k++){
  
          const list = document.querySelector('#akkuyu-list');
          const row = document.createElement('tr');
          row.id = "akkuyutablo"
          if (books[k].status.includes('Under')) {
            renk2 = ""
            var renk1 = "#fdfd96";
          }
          else {
            renk2 = ""
            var renk1 = "#FFFF66";
          }
          if (books[k].status.includes('Completed')) {
            var renk2 = "#77dd77";
            var renk1 = "#77dd77";
          }
          if (books[k].status.includes('Conditions')) {
            var renk2 = "#fdfd96";
            var renk1 = "#77dd77";
          } 
          if (books[k].status.includes('Waiting')) {
            var renk2 = "#ff6961";
            var renk1 = "#fdfd96";
          } 

          if (books[k].status.includes('Email')) {
            if (books[k].letters !== "")  {
              
              var renk1 = "#77dd77";
            }
      
            else if (books[k].letters == "") {
              
  
      
                var renk1 = "#fdfd96";
              
     
            }
          }

          books[k].letters = books[k].letters.split("-son-").join("");
          books[k].letters = books[k].letters.split("-ek-").join("");
          books[k].qualityplan = books[k].qualityplan.split("-od-").join("");
          var kayittarihi = books[k].history

          if (kayittarihi !== null) {
            if (kayittarihi.includes("yeni")) {
              yeniyer = kayittarihi.indexOf("yeni")
              yeniyok = kayittarihi.slice(0, yeniyer-1);
              sondash = yeniyok.lastIndexOf("-")
              sonbosluk = yeniyok.lastIndexOf(" ")
              var yenikayittarihi = kayittarihi.slice(sonbosluk, sondash);

            }
          }


          row.innerHTML = `
          
            <td style='border: 1px solid #000000; z-index: ${books[k].no}; top: unset'>${books[k].no}</td>
            <td style='border: 1px solid #000000; z-index: ${books[k].no}'>${yenikayittarihi}</td>
            <td style='background-color:${renk2}; z-index: ${books[k].no}; border: 1px solid #000000'>${books[k].status}</td>
            <td style='border: 1px solid #000000; z-index: ${books[k].no}'>${books[k].notificationletter}</td>
            <td style='border: 1px solid #000000; z-index: ${books[k].no}'>${books[k].manufacturer}</td>
            <td style='border: 1px solid #000000; z-index: ${books[k].no}'>${books[k].unit}</td>
            <td style='border: 1px solid #000000; z-index: ${books[k].no}'>${books[k].equipmentname}</td>
            <td style='border: 1px solid #000000; z-index: ${books[k].no}'>${books[k].safetyclass}</td>
            <td style='background-color:${renk1}; border: 1px solid #000000; z-index: ${books[k].no}'>${books[k].qualityplan}</td>
            <td style='border: 1px solid #000000; z-index: ${books[k].no}'>${books[k].notificationtype}</td>
            <td style='border: 1px solid #000000; z-index: ${books[k].no}'>${books[k].air}</td>
            <td style='border: 1px solid #000000; z-index: ${books[k].no}'>${books[k].airstatus}</td>
            <td style='border: 1px solid #000000; z-index: ${books[k].no}'>${books[k].letters}</td>
  
          `;
          list.appendChild(row);    
          
        }   
  
      //   $(document).ready(function() {
      //     $('#atable').DataTable( {
      //       paging: false,
      //         dom: 'Bfrtip',
      //         buttons: [
      //             'copyHtml5',
      //             'excelHtml5',
      //             'csvHtml5',
      //             'pdfHtml5'
      //         ]
      //     } );
      // } );
        document.getElementById("karart").style.display="none";
        document.getElementById("loading").style.display="none";
      });


      }


      function sortTable(n) {
      

        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("atable");
        switching = true;
        
          
        
        // Set the sorting direction to ascending:
        dir = "asc";
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
          
          // Start by saying: no switching is done:
          switching = false;
          rows = table.rows;
          /* Loop through all table rows (except the
          first, which contains table headers): */
          for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
              if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
              }
            } else if (dir == "desc") {
              if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
              }
            }
          }
          if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
          } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
              dir = "desc";
              switching = true;
            }
          }
          
        }
   
      }
