import Posts from "./views/Posts.js";
import AirView from "./views/ebtduzenle.js";
import Login from "./views/Login.js";
import Sifre from "./views/Sifre.js";
import Ebtler from "./views/ebtler.js";
import Taslaklar from "./views/taslaklar.js";
// import Kisiler from "./views/kisiler.js";
// import Gruplar from "./views/gruplar.js";
import EbtEkle from "./views/ebtekle.js";
import Tablo from "./views/tablo.js";
// import CKEDITOR from '../ckeditor4/ckeditor.js';

var yetkiliisim
var yetkilisoyisim
var yetkilieposta
var yetkilisicil
var yetkiver
var yetki
var isim
var soyisim
var sicil
var grup
var eposta
var table
var ebtno
var pageIndex = 1
localStorage.setItem("pagenumber", 1)
var total = 0
var pagesize = 0
var scrolleski = 0

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    if (document.getElementById("chart_div")) {
        document.getElementById("chart_div").innerHTML = ""
    }
    if (document.getElementById("chart_div1")) {
        document.getElementById("chart_div1").innerHTML = ""
    }
    if (document.getElementById("table_div")) {
        document.getElementById("table_div").innerHTML = ""
    }
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};



const navigateTo = url => {

    history.pushState(null, null, url);
    router();
};

export { router }
export { loginhash }


const giris = (kullanici, sifre, password) => {

    var alertflag = 0;
    $.post("/login/",  {kullanici: `${kullanici}`, sifre: `${sifre}`},
    function(data){
      if (data.includes("$2b$")){
        if (!window.navigator.userAgent.includes("Chrome")) {
                localStorage.setItem("hash", data);
                alertflag = 1;
                if (password == 0) {
                    navigateTo("/")
                }
                else {
                    navigateTo("/password/"+localStorage.getItem("hash"))
                }
        }
        else {
            alert("Lütfen programı Firefox ile kullanınız!")
            navigateTo("/login")
        }
    }

        if (data.includes("sifrekontrol")){
            alert("Lütfen şifrenizi kontrol ediniz!");
            document.getElementById("sifre").focus();
            alertflag = 1;
        }
        if (data.includes("bilgiyok")){
            alert("Bu kullanıcıya ait bilgi bulunamadı");
            document.getElementById("kullanici").focus();
        }
    })
};



async function loginhash() {

    if (location.pathname.includes("$2b$")) {
        return "success"
    }
    else {


    var x


    await $.post("/loginhash",  {hash: `${localStorage.getItem("hash")}`},
    function(data){
        x= data
    })

    if (document.getElementById("airs")) {
        document.getElementById("airs").remove();
    }
    // if (document.getElementById("unite2")) {
    //     document.getElementById("unite2").remove();
    // }
    // if (document.getElementById("unite3")) {
    //     document.getElementById("unite3").remove();
    // }
    // if (document.getElementById("unite4")) {
    //     document.getElementById("unite4").remove();
    // }
    if (document.getElementById("ebtekle")) {
        document.getElementById("ebtekle").remove();
    }
    if (document.getElementById("gruplar")) {
        document.getElementById("gruplar").remove();
    }
    if (document.getElementById("kisiler")) {
        document.getElementById("kisiler").remove();
    }
    if (document.getElementById("taslaklar")) {
        document.getElementById("taslaklar").remove();
    }
    if (document.getElementById("tablo")) {
        document.getElementById("tablo").remove();
    }
    if (document.getElementById("kisi")) {
        document.getElementById("kisi").remove();
    }

    if (x[0] == "1"){
      isim = x[1]
      soyisim = x[2]
      sicil = x[3]
      eposta = x[4]
      yetki = x[5]
      grup = x[6]
      localStorage.setItem("isim", x[1])
      localStorage.setItem("soyisim", x[2])
      localStorage.setItem("sicil", x[3])
      localStorage.setItem("eposta", x[4])
      localStorage.setItem("yetki", x[5])
      localStorage.setItem("grup", x[6])

    if (document.getElementById("login")) {
        document.getElementById("login").remove();
    }
    if (document.getElementById("logout")) {
        document.getElementById("logout").remove();
    }





    if (x[5] == "1" || x[5] == "2"){

        var ebtler
        await $.post("/taslaklar",  {sicil: `${localStorage.getItem("grup")}`,yetki: `${localStorage.getItem("yetki")}`},
        function (books){
            ebtler = books
        }) 

        let li = document.createElement('li');
        li.id = "airs"
        li.innerHTML= "<a href='/' class='nav__link' data-link>EBT'ler</a>"
        document.getElementById("nav").appendChild(li);

        li = document.createElement('li');
        li.id = "ebtekle"
        li.innerHTML= '<a  href="/ebtekle" class="nav__link" data-link>EBT Ekle</a>'
        document.getElementById("nav").appendChild(li);

        li = document.createElement('li');
        li.id = "taslaklar"
        li.innerHTML= '<a href="/taslaklar" class="nav__link" data-link>Taslaklar <span style="color:red">(' + ebtler.length +')</span></a>'
        document.getElementById("nav").appendChild(li);

        li = document.createElement('li');
        li.id = "tablo"
        li.innerHTML= '<a  href="/tablo" class="nav__link" data-link>Tablo</a>'
        document.getElementById("nav").appendChild(li);

        // li = document.createElement('li');
        // li.id = "gruplar"
        // li.innerHTML= '<a href="/gruplar" class="nav__link" data-link>Gruplar</a>'
        // document.getElementById("nav").appendChild(li);

        // li = document.createElement('li');
        // li.id = "kisiler"
        // li.innerHTML= '<a href="/kisiler" class="nav__link" data-link>Kişiler</a>'
        // document.getElementById("nav").appendChild(li);

        li = document.createElement('li');
        li.id = "logout"
        li.innerHTML= '<a  href="/logout" class="nav__link" data-link>Çıkış</a>'
        document.getElementById("nav").appendChild(li);

        li = document.createElement('li');
        li.id = "kisi"
        li.innerHTML= '<a class="nav__link1">'+isim+' '+soyisim+'</a>'
        document.getElementById("nav").appendChild(li);


        return "successyetki"
    }
    else  if (x[5] == "0") {

        var ebtler = []
        await $.post("/taslaklar",  {sicil: `${localStorage.getItem("grup")}`,yetki: `${localStorage.getItem("yetki")}`},
        function (books){
            ebtler = books
        }) 

        let li = document.createElement('li');
        li.id = "airs"
        li.innerHTML= "<a href='/' class='nav__link' data-link>EBT'ler</a>"
        document.getElementById("nav").appendChild(li);




        li = document.createElement('li');
        li.id = "ebtekle"
        li.innerHTML= '<a  href="/ebtekle" class="nav__link" data-link>EBT Ekle</a>'
        document.getElementById("nav").appendChild(li);

        li = document.createElement('li');
        li.id = "taslaklar"
        li.innerHTML= '<a  href="/taslaklar" class="nav__link" data-link>Taslaklar <span style="color:red">(' + ebtler.length +')</span></a>'
        document.getElementById("nav").appendChild(li);

        li = document.createElement('li');
        li.id = "tablo"
        li.innerHTML= '<a  href="/tablo" class="nav__link" data-link>Tablo</a>'
        document.getElementById("nav").appendChild(li);

        li = document.createElement('li');
        li.id = "logout"
        li.innerHTML= '<a href="/logout" class="nav__link" data-link>Çıkış</a>'
        document.getElementById("nav").appendChild(li);

        li = document.createElement('li');
        li.id = "kisi"
        li.innerHTML= '<a  class="nav__link1">'+isim+' '+soyisim+'</a>'
        document.getElementById("nav").appendChild(li);


        return "success"
    }
    else {
        let li = document.createElement('li');
        li.id = "airs"
        li.innerHTML= "<a href='/' class='nav__link' data-link>EBT'ler</a>"
        document.getElementById("nav").appendChild(li);

        li = document.createElement('li');
        li.id = "logout"
        li.innerHTML= '<a href="/logout" class="nav__link" data-link>Çıkış</a>'
        document.getElementById("nav").appendChild(li);

        return "successyetkisiz"
    }

    }
    else {

        if (document.getElementById("logout")) {
            document.getElementById("logout").remove();
        }
        if (document.getElementById("login")) {
            document.getElementById("login").remove();
        }
        // const li = document.createElement('li');
        // li.id = "login"
        // li.innerHTML= '<a  href="/login" class="nav__link" data-link>Giriş</a>'
        // document.getElementById("nav").appendChild(li);
        return "failure"

    }

    }
}

const router = async () => {


    const routes = [
        // { path: "/", view: Dashboard },
        // { path: "/posts", view: Posts },
        { path: "/airedit/:id", view: AirView },
        { path: "/ebtekle", view: EbtEkle },
        { path: "/tablo", view: Tablo },
        // { path: "/kisiler", view: Kisiler },
        { path: "/login", view: Login },
        { path: "/password/:id", view: Sifre },
        // { path: "/logout", view: Dashboard },
        // { path: "/exams/:id", view: Posts },
        { path: "/", view: Ebtler },
        { path: "/waiting/:id", view: Ebtler },
        // { path: "/unite2", view: Unite2 },
        // { path: "/unite3", view: Unite3 },
        // { path: "/unite4", view: Unite4 },
        // { path: "/gruplar", view: Gruplar },
        { path: "/taslaklar", view: Taslaklar },
        // { path: "/examedit/:id", view: ExamEdit },
    ];


    await loginhash().then((value) => {
        if (value == "failure" && location.pathname !== "/login") {
            navigateTo("/login")
        }
        else if (value !== "failure" && location.pathname == "/login") {
            navigateTo("/")
        }
        // if (value == "success" && !location.pathname.includes("/exams")) {
        //     navigateTo("/exams")
        // }
    })


    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));



    document.getElementById("karart").style.visibility="visible";
    document.getElementById("loading").style.visibility="visible";
    document.getElementById("loading").style.opacity="1";
    document.querySelector("#app").innerHTML = await view.getHtml();
    document.getElementById("loading").style.visibility="hidden";
    document.getElementById("loading").style.opacity="0";
    document.getElementById("karart").style.visibility="hidden";



    if(document.getElementById("ebtler")) {
        if (localStorage.getItem("pagenumber")) {
            myFunction(localStorage.getItem("pagenumber"))
        }
        else {
            myFunction(1)
        }
    }
    else {
        document.getElementById("pagearea").innerHTML = ""
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
        document.getElementById("bottombar").innerHTML = ""
        window.scrollTo(0,0)
    }

    if (table) {
        table.destroy();
    }

    if (document.querySelector("#airtext")) {

        CKEDITOR.replace( 'airtext' ,  {height: 500, width: 700});
        // CKEDITOR.instances.airtext.setData(localStorage.getItem("remarks"));
    }
    if (document.querySelector("#rationale")) {

        CKEDITOR.replace( 'rationale' ,  {height: 500, width: 700});
        // CKEDITOR.instances.airtext.setData(localStorage.getItem("remarks"));
    }
    if (document.querySelector("#ebtler")) {

        //alttaki aramalar
        // $('#ebtler tfoot th').each( function () {
        //     $(this).html( '<input type="text" style="width: fit-content;"/>' );
        // } );
        // yorum

        // $('#ebtler thead tr')
        // .clone(true)
        // .addClass('filters')
        // .appendTo('#ebtler thead');
        // $('#ebtler thead tr').attr('id', 'filtre');
        // DataTable
        table = $('#ebtler1').DataTable({
            // "order": [[ 0, 'desc' ]],

            // buttons: [
            //     {
            //         extend: 'print',
            //         text: 'Yazdır',
            //       },
            //      'excel',
            // ],
            // "searching": false,

            "language": {
                "search": "Ara",
                "searchPlaceholder": "Ara",
                "emptyTable": "Veri yok",
                "info": "_TOTAL_ veri içinde _START_ - _END_  arası veriler gösteriliyor",
                "infoEmpty": "0 veri içinde 0 - 0 arası veriler gösteriliyor",
                "infoFiltered":   "(toplam _MAX_ veri içerisinden filtrelenmiştir)",
                "paginate": {
                  "previous": "Önceki",
                  "next": "Sonraki",
                }
              },
            // scrollY: '50vh',
            paging: false,
              orderCellsTop: true,
              fixedHeader: true,
              initComplete: function () {
                  var api = this.api();

                  // For each column
                  api
                      .columns()
                      .eq(0)
                      .each(function (colIdx) {
                          // Set the header cell to contain the input element
                          var cell = $('.filters th').eq(
                              $(api.column(colIdx).header()).index()
                          );
                          var title = $(cell).text();
                          $(cell).html('<input type="text" style="font-size:10px" placeholder="Ara" />');

                          // On every keypress in this input
                          $(
                              'input',
                              $('.filters th').eq($(api.column(colIdx).header()).index())
                          )
                              .off('keyup change')
                              .on('keyup change', function (e) {
                                  e.stopPropagation();

                                  // Get the search value
                                  $(this).attr('title', $(this).val());
                                  var regexr = '({search})'; //$(this).parents('th').find('select').val();

                                  var cursorPosition = this.selectionStart;
                                  // Search the column for that value
                                  api
                                      .column(colIdx)
                                      .search(
                                          this.value != ''
                                              ? regexr.replace('{search}', '(((' + this.value + ')))')
                                              : '',
                                          this.value != '',
                                          this.value == ''
                                      )
                                      .draw();

                                  $(this)
                                      .focus()[0]
                                      .setSelectionRange(cursorPosition, cursorPosition);
                              });
                      });
              },
            autoWidth: false,
            columnDefs: [
                    {
                        targets: ['_all'],
                        className: 'mdc-data-table__cell',
                    },
            ],

        });

    }
    // $( function() {

    //     $("#draggable").draggable();
    // } );
    // $( function() {
    //     $( "#dialog" ).dialog();
    // } );
};

window.addEventListener("popstate", router);



document.addEventListener("DOMContentLoaded", () => {


    document.body.addEventListener("click", async (e) => {




        var eskipageIndex = pageIndex
        pageIndex = Number(e.target.getAttribute("page-index"));
     
        if (pageIndex) {
            localStorage.setItem("pagenumber", parseInt(pageIndex))
            myFunction(pageIndex)
        }
        else {
            pageIndex = eskipageIndex
        }
        // if (e.target.id.includes("topBtn") || e.target.parentElement.id.includes("topBtn")) {
        //     window.scrollTo(window.scrollX , 0)
        // }
        // if (e.target.id.includes("downBtn") || e.target.parentElement.id.includes("downBtn")) {
        //     window.scrollTo(window.scrollX, document.body.scrollHeight)
        // }
        if (e.target.id.includes("excelindir")) {
            // for (let itable = 0 ; itable < document.getElementById("ebtler").rows.length; itable++) {
            //     document.getElementById("ebtler").rows[itable].style.display = "block"
            // }
            tableToExcel('ebtler', 'ebtler')
        }
        if (e.target.id.includes("aust")) {
            sortTable(8)
        }
        if (e.target.id.includes("Toplamk")) {
            document.getElementById("myInput10").value = ""
            myFunction(1)
        }
        if (e.target.id.includes("Waiting")) {
            document.getElementById("myInput10").value = "waiting;checked"
            myFunction(1)
        }
        if (e.target.id.includes("Closedp")) {
            document.getElementById("myInput10").value = "+"
            myFunction(1)
        }
        if (e.target.id.includes("Closedn")) {
            document.getElementById("myInput10").value = "-"
            myFunction(1)
        }
        if (e.target.id.includes("Received")) {
            document.getElementById("myInput10").value = "Received"
            myFunction(1)
        }
        if (e.target.id.includes("Sent")) {
            document.getElementById("myInput10").value = "Sent"
            myFunction(1)
        }
        if (!e.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var dropbtns = document.getElementById("linklerbtn");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
              }
            }
            if (dropbtns.classList.contains('bluecolor')) {
                dropbtns.classList.remove('bluecolor');
            }
        }
        else {
            document.getElementById("myDropdown").classList.toggle("show");
            document.getElementById("linklerbtn").classList.toggle("bluecolor");
        }
        if (e.target.matches("[data-link]")) {
            if (e.target.href.includes("/logout")) {
                localStorage.clear();
            }
            localStorage.setItem("pagenumber", "")
            e.preventDefault();
            navigateTo(e.target.href);
        }
        if (e.target.matches("[postlogin]")) {
            e.preventDefault();
            var user = document.getElementById("kullanici").value
            var password = document.getElementById("sifre").value
            giris(user, password, 0);
        }
        if (e.target.matches("[unuttum]")) {
            if (document.getElementById("kullanici").value !== "") {
                e.preventDefault();
                $.post("/unuttum",  {sicil:`${document.getElementById("kullanici").value}`
                },
                function(data){
                        if (data == "Başarılı") {
                            alert("Eposta gönderildi!")
                        }
                        else {
                            alert("Kullanıcı bulunamadı!")
                        }
                })
            }
            else {
                alert ("Lütfen sicil numaranızı dört rakamlı olarak giriniz!")
            }
            
        }
        
        if (e.target.matches("[degistir]")) {
            e.preventDefault();
            var sifre1 = document.getElementById("sifre1").value
            var sifre2 = document.getElementById("sifre2").value
            if (sifre1.length<6) {
                alert("Yeni şifre en az 6 karakter olmalıdır!")
            }
            else if (sifre1 == sifre2) {
                loginhash().then((value) => {
                    var kullanici = localStorage.getItem("isim") + " " + localStorage.getItem("soyisim")
                    var sicil = localStorage.getItem("sicil")
                    $.post("/yenisifrekaydet",  {sifre: `${sifre1}`, sicil: `${sicil}`, hash:  `${location.pathname.replace("/password/", "")}`
                        },
                    function(data){
                        if (data == "Başarılı") {
                            alert("Şifre başarıyla değiştirildi!")
                            navigateTo("/login") 
                        }
                        else {
                            alert("Bağlantı linkinin geçerliliği bulunmamaktadır. Tekrar şifre linki isteyiniz!")
                            navigateTo("/login")
                        }
                    })

                })

            }
            else {
                alert("Girilen şifreler birbiriyle eşleşmemektedir!")
            }

        }
        if (e.target.matches("[sifredegistir]")) {
            e.preventDefault();
            var user = document.getElementById("kullanici").value
            var password = document.getElementById("sifre").value
            if (user!=="") {
                giris(user, password, 1);
            } 
            else {
                alert("Lütfen kullanıcı adınızı giriniz!")
            }

        }
        if (e.target.id.includes("popupkapat")) {
            e.preventDefault();
            ebtno = e.target.id.replace("popupkapat","")
            if (document.getElementById("popup")) {
                document.getElementById("popup").remove()
            }
            if (document.getElementById("dimScreen")) {
                document.getElementById("dimScreen").remove()
            }
            document.getElementById("air"+ebtno).style.background = ""
        }
        if (e.target.id.includes("upebt")) {
            e.preventDefault();
            if (document.getElementById("popup")) {
                document.getElementById("popup").remove()
            }
            ebtno = e.target.id.replace("upebt","")
            document.getElementById("air"+ebtno).style.background = "pink"
            var x =
            `
                <button style="float:right" id = "popupkapat${ebtno}">X</button>
                <label for="change_status" style="color:white">Air Status</label><br>
                <select id="change_status">
                    <option>Sent</option>
                    <option>Closed+</option>
                    <option>Closed-</option>
                </select><br><br>
                <label for="expecteddate" style="color:white">Expected Response Date</label><br>
                    <input type="date" style="width:120px" id="expecteddate" required></input>
                <br><br>
                <label for="filetoupload" style="color:white">Upload Air</label>
                <form>
                <input id= "filetoupload" style="color:white"  type="file" name="filetoupload" width:  350px;">
                </form><br>
                <form style="text-align:center">
                <input yukle id = "yuklebuton${ebtno}" type="button" value = "Yükle">
                </form>
            `
            var div = document.createElement('div');
            div.id = "popup"
            div.innerHTML= x
            document.body.appendChild(div);

            div = document.createElement('div');
            div.id = "dimScreen"
            document.body.appendChild(div);
            

            // document.getElementById("div"+e.target.id).remove()
        }

        if (e.target.id.includes("changestatus")) {
            e.preventDefault();
            if (document.getElementById("popup")) {
                document.getElementById("popup").remove()
            }
            ebtno = e.target.id.replace("changestatus","")
            document.getElementById("air"+ebtno).style.background = "pink"
            $.post("/statusiste",  {ebtno:`${ebtno}`,
                sicil:`${localStorage.getItem("sicil")}`,
                hash:`${localStorage.getItem("hash")}`,
                grup:`${localStorage.getItem("grup")}`,
            },

            function(data){
                let new_date_string = ""
                if (data[0].expecteddate.includes(".")) {
                    let date_object = new Date(data[0].expecteddate.split(".").reverse().join("-"));
                    new_date_string = date_object.toISOString().slice(0, 10);
                }
                else {
                    new_date_string = data[0].expecteddate
                }


                var x =
                `
                    <button style="float:right" id = "popupkapat${ebtno}">X</button>
                    <label for="change_status" style="color:white">Air Status</label><br>
                    <select id="change_status">
                        <option>Sent</option>
                        <option>Closed+</option>
                        <option>Closed-</option>
                    </select><br><br>
                    <label for="expecteddate" style="color:white">Expected Response Date</label><br>
                        <input type="date" style="width:120px" id="expecteddate" required></input>
                    <br><br>
                    <form style="text-align:center">
                    <input statuskaydet id = "statuskaydet${ebtno}" type="button" value = "Kaydet">
                    </form>
                `
                var div = document.createElement('div');
                div.id = "popup"
                div.innerHTML= x
                document.body.appendChild(div);

                div = document.createElement('div');
                div.id = "dimScreen"
                document.body.appendChild(div);
                document.getElementById("change_status").value = data[0].status.substring(0, data[0].status.indexOf(" "))
                document.getElementById("expecteddate").value = new_date_string
            

            })
        }

        if (e.target.id.includes("notekle")) {
            e.preventDefault();
            if (document.getElementById("popup")) {
                document.getElementById("popup").remove()
            }
            ebtno = e.target.id.replace("notekle","")
            document.getElementById("air"+ebtno).style.background = "pink"
            $.post("/notiste",  {ebtno:`${ebtno}`,
                sicil:`${localStorage.getItem("sicil")}`,
                hash:`${localStorage.getItem("hash")}`,
                grup:`${localStorage.getItem("grup")}`,
            },

            function(data){

                if (data == "Failure") {
                    alert(data)
                }
                else {
                    var istenennot = data[0].notes.replace(/<br\s*[\/]?>/gi, "\n")


                    var x =
                    `
                        <button style="float:right" id = "popupkapat${ebtno}">X</button>
                        <form style = "text-align: center;
                        align-items: center;">
                        <div>
                            <label for="note" style="color:white">Note</label><br>
                            <textarea style="width:500px" id="note" rows="5">${istenennot}</textarea>
                        </div><br>
                        <button class="button" id = "notekaydet${ebtno}">Kaydet</button>
                        </form>
                    `
                    var div = document.createElement('div');
                    div.id = "popup"
                    div.innerHTML= x
                    document.body.appendChild(div);
        
                    div = document.createElement('div');
                    div.id = "dimScreen"
                    document.body.appendChild(div);
                }

            
            })

        }

        if (e.target.id.includes("downebt")) {
            e.preventDefault();
            ebtno = e.target.id.replace("downebt","")
            document.getElementById("air"+ebtno).style.background = "pink"
            
            if (document.getElementById("popup")) {
                document.getElementById("popup").remove()
            }

            var x =
            `
                <button style="float:right" id = "popupkapat${ebtno}">X</button>
                <form style = "text-align: center;
                        align-items: center;">
                <div>
                    <label for="note" style="color:white">Rejection Note</label><br>
                    <textarea style="width:500px" id="note" rows="5"></textarea>
                </div><br><br>
                <button class="button" id = "iadenot${ebtno}">İade Et</button>
                </form>
            `
            var div = document.createElement('div');
            div.id = "popup"
            div.innerHTML= x
            document.body.appendChild(div);

            div = document.createElement('div');
            div.id = "dimScreen"
            document.body.appendChild(div);



            // if(confirm("Bu EBT geri gönderilecek. Emin misiniz?")) {
            //     $.post("/gerigonder",  {ebtno:`${ebtno}`,isim:`${localStorage.getItem("isim")}`,soyisim:`${localStorage.getItem("soyisim")}`},
            //     function(data){
            //         alert("Geri gönderildi!")
            //         navigateTo("/"+window.location.pathname.replace(/^\/([^\/]*).*$/, '$1'))

            //     })
            // }
            // else {
            //     document.getElementById("air"+ebtno).style.background = ""
            // }
        }

        if (e.target.id.includes("checkebt")) {
            e.preventDefault();
            ebtno = e.target.id.replace("checkebt","")
            document.getElementById("air"+ebtno).style.background = "pink"
            if(confirm("Bu EBT onaya gönderilecek. Emin misiniz?")) {
                $.post("/onayagonder",  {ebtno:`${ebtno}`,isim:`${localStorage.getItem("isim")}`,soyisim:`${localStorage.getItem("soyisim")}`},
                function(data){
                    if (data == "Başarılı") {
                        alert("EBT onaya gönderildi!")
                        for (let i = 1; i<=16; i ++) {
                            localStorage.setItem("search"+i, document.getElementById("myInput"+i).value)
                        }
                        localStorage.setItem("navigateto", 1)
                        navigateTo("/"+window.location.pathname.replace(/^\/([^\/]*).*$/, '$1'))
                    }
                    else {
                        alert("Bağlantı sorunu.Tekrar deneyin!")
                    }


                })
            }
            else {
                document.getElementById("air"+ebtno).style.background = ""
            }
        }

        if (e.target.id.includes("approveebt")) {
            e.preventDefault();
            ebtno = e.target.id.replace("approveebt","")
            document.getElementById("air"+ebtno).style.background = "pink"
            if(confirm("Bu EBT onaylanacak. Emin misiniz?")) {
                $.post("/onayla",  {ebtno:`${ebtno}`,isim:`${localStorage.getItem("isim")}`,soyisim:`${localStorage.getItem("soyisim")}`},
                function(data){
                    if (data == "Başarılı") {
                        alert("EBT onaylandı!")
                        for (let i = 1; i<=16; i ++) {
                            localStorage.setItem("search"+i, document.getElementById("myInput"+i).value)
                        }
                        localStorage.setItem("navigateto", 1)
                        navigateTo("/"+window.location.pathname.replace(/^\/([^\/]*).*$/, '$1'))
                    }
                    else {
                        alert("Bağlantı sorunu.Tekrar deneyin!")
                    }
                })
            }
            else {
                document.getElementById("air"+ebtno).style.background = ""
            }
        }

        if (e.target.id.includes("deleteebt")) {
            e.preventDefault();
            ebtno = e.target.id.replace("deleteebt","")
            document.getElementById("air"+ebtno).style.background = "pink"
            if(confirm("Bu EBT silinecek. Emin misiniz?")) {
                $.post("/ebtsil",  {ebtno:`${ebtno}`},
                function(data){   
                    if (data == "Başarılı") {
                        alert("EBT silindi!")
                        for (let i = 1; i<=16; i ++) {
                            localStorage.setItem("search"+i, document.getElementById("myInput"+i).value)
                        }
                        localStorage.setItem("navigateto", 1)
                        navigateTo("/"+window.location.pathname.replace(/^\/([^\/]*).*$/, '$1'))
                    }
                    else {
                        alert("Bağlantı sorunu.Tekrar deneyin!")
                    }


                })
            }
            else {
                document.getElementById("air"+ebtno).style.background = ""
            }
        }

        if (e.target.id.includes("cancelebt")) {
            e.preventDefault();
            ebtno = e.target.id.replace("cancelebt","")
            document.getElementById("air"+ebtno).style.background = "pink"
            if(confirm("Bu EBT iptal edilecek. Emin misiniz?")) {
                $.post("/ebtiptal",  {ebtno:`${ebtno}`},
                function(data){
                    if (data == "Başarılı") {
                        alert("EBT silindi!")
                        for (let i = 1; i<=16; i ++) {
                            localStorage.setItem("search"+i, document.getElementById("myInput"+i).value)
                        }
                        localStorage.setItem("navigateto", 1)
                        navigateTo("/"+window.location.pathname.replace(/^\/([^\/]*).*$/, '$1'))
                    }
                    else {
                        alert("Bağlantı sorunu.Tekrar deneyin!")
                    }


                })
            }
            else {
                document.getElementById("air"+ebtno).style.background = ""
            }
        }

        if (e.target.id.includes("followupcheck")) {
            if (document.getElementById("followupcheck").checked == true) {
                document.getElementById("followupair").disabled = false
            }
            else {
                document.getElementById("followupair").value = ""
                document.getElementById("followupair").disabled = true
            }

        }

        if (e.target.parentElement.id.includes("changestatus")) {
            if (document.getElementById("change_status").value.includes("Closed+")) {
                document.getElementById("expecteddate").disabled = true
            }
            else {
                document.getElementById("expecteddate").value = ""
                document.getElementById("expecteddate").disabled = false
            }

        }

        if (e.target.parentElement.id.includes("documentcode")) {
            if (document.getElementById("documentcode").value.includes("B05")) {
                document.getElementById("chapter").disabled = false
            }
            else {
                document.getElementById("chapter").value = ""
                document.getElementById("chapter").disabled = true
            }

        }
        if (e.target.parentElement.id.includes("relevantto")) {
            if (document.getElementById("relevantto").value.includes("CL")) {
                document.getElementById("chapter").value = ""
                document.getElementById("chapter").disabled = true
                document.getElementById("documentcode").innerHTML = `
                    <option></option>
                    <option>B05 (Preliminary Safety Analysis Report)</option>
                    <option>B06 (Probabilistic Safety Assessment Level 1)</option>
                    <option>B07 (Probabilistic Safety Assessment Level 2)</option>
                    <option>B08 (Construction Program)</option>
                    <option>B09 (Construction Quality Management System Manual)</option>
                    <option>B09 (Construction Quality Management System Quality Plan)</option>
                    <option>B10 (Configuration Management System Manual)</option>
                    <option>B10 (Configuration Management System Plan)</option>
                    <option>B11 (Environmental Monitoring Program)</option>
                    <option>B12 (Site Parameters Monitoring Program)</option>
                    <option>B13 (Personnel Training and Qualification Program)</option>
                    <option>B14 (Design Information Questionaire)</option>
                    <option>B15 (Report on Differences from Reference Plant)</option>
                    <option>B16 (Physical Protection Program)</option>
                    <option>B17 (Differences in data between Preliminary Safety Analysis Report of Akkuyu NPP Unit 1 and Unit 2)</option>

                
                `
            }
            else if (document.getElementById("relevantto").value.includes("CP")) {
                document.getElementById("chapter").value = ""
                document.getElementById("chapter").disabled = true
                document.getElementById("documentcode").innerHTML = `
                    <option></option>
                    <option>B05 (Final Design Information of Systems and Components)</option>
                    <option>B06 (Quality Assurance Documents)</option>
                    <option>B07 (Commissioning Program)</option>
                    <option>B08 (Test Results Prior to Commissioning)</option>
                    <option>B09 (Commissioning Organisation and Personnel)</option>
                    <option>B10 (Operational Limits and Conditions)</option>
                    <option>B11 (Operation Procedures of Systems and Components)</option>
                    <option>B12 (Maintenance and Repairs Program)</option>
                    <option>B13 (Fuel and Core Management Program)</option>
                    <option>B14 (Waste Management Program)</option>
                    <option>B15 (Ageing Management Program)</option>
                    <option>B16 (Equipment Qualification Program)</option>
                    <option>B17 (Fire Protection Program)</option>
                    <option>B18 (Chemical Control Program)</option>
                    <option>B19 (Nuclear Material Accounting and Control Program)</option>
                    <option>B20 (Nuclear Security Program)</option>
                    <option>B21 (Emergency Plans)</option>
                    <option>B22 (Safety Performance Monitoring Program)</option>
                    <option>B23 (Surveillance and In-service Inspection Program)</option>
                    <option>B24 (Radiation Protection Program)</option>
                    <option>B25 (Personnel Training and Qualification Program)</option>
                
                `
            }

        }

        if (e.target.matches("[ebtkaydet]")) {
            e.preventDefault();
           
            if(document.getElementById("unitno").value == "") {
                alert("Lütfen gerekli alanları doldurunuz!")
                document.getElementById("unitno").scrollIntoView(false);
                document.getElementById("unitno").focus()
            }
            else if(document.getElementById("chapter").value == "" && document.getElementById("chapter").disabled == false) {
                alert("Lütfen gerekli alanları doldurunuz!")
                document.getElementById("chapter").scrollIntoView(false);
                document.getElementById("chapter").focus()
            }
            else if(document.getElementById("category").value == "") {
                alert("Lütfen gerekli alanları doldurunuz!")
                document.getElementById("category").scrollIntoView(false);
                document.getElementById("category").focus()
            }
            else if(document.getElementById("relevantto").value == "") {
                alert("Lütfen gerekli alanları doldurunuz!")
                document.getElementById("relevantto").scrollIntoView(false);
                document.getElementById("relevantto").focus()
            }
            else if(document.getElementById("expecteddate").value == "") {
                alert("Lütfen gerekli alanları doldurunuz!")
                document.getElementById("expecteddate").scrollIntoView();
                document.getElementById("expecteddate").focus()
            }
            else if(document.getElementById("projectgroup").value == "") {
                alert("Lütfen gerekli alanları doldurunuz!")
                document.getElementById("projectgroup").scrollIntoView();
                document.getElementById("projectgroup").focus()
            }
            else if(document.getElementById("airtitle").value == "") {
                alert("Lütfen gerekli alanları doldurunuz!")
                document.getElementById("airtitle").scrollIntoView();
                document.getElementById("airtitle").focus()
            }
            else if(document.getElementById("documentname").value == "") {
                alert("Lütfen gerekli alanları doldurunuz!")
                document.getElementById("documentname").scrollIntoView();
                document.getElementById("documentname").focus()
            }
            else if(document.getElementById("relatedsection").value == "") {
                alert("Lütfen gerekli alanları doldurunuz!")
                document.getElementById("relatedsection").scrollIntoView();
                document.getElementById("relatedsection").focus()
            }
            else {
               try{
                $.post("/ebtkaydet",  {unitno:`${document.getElementById("unitno").value}`,
                documentcode:`${document.getElementById("documentcode").value.slice(0,3)}` ,
                chapter:`${document.getElementById("chapter").value}` ,
                category:`${document.getElementById("category").value.slice(0,1)}` ,
                relevantto:`${document.getElementById("relevantto").value}` ,
                expecteddate:`${document.getElementById("expecteddate").value}` ,
                projectgroup:`${document.getElementById("projectgroup").value}`,
                airtitle:`${document.getElementById("airtitle").value}`,
                documentname:`${document.getElementById("documentname").value}`,
                relatedsection:`${document.getElementById("relatedsection").value}`,
                note:`${document.getElementById("note").value}`,
                sicil:`${localStorage.getItem("sicil")}`,
                isim:`${localStorage.getItem("isim")}`,
                followup:`${document.getElementById("followupair").value}`,
                soyisim:`${localStorage.getItem("soyisim")}`},
                function(data){ 
                    if (data == "Başarılı") {
                        alert("Kayıt başarılı!")
                        // for (let i = 1; i<=16; i ++) {
                        //     localStorage.setItem("search"+i, document.getElementById("myInput"+i).value)
                        // }
                        localStorage.setItem("navigateto", 1)
                        navigateTo("/taslaklar")
                    }
                    else {
                        alert("Bağlantı sorunu.Tekrar deneyin!")
                    }
                   // showAlert("Kayıt başarılı!", "success")
                })
               }
               catch {
                alert("Bağlantı")
               }
        
            }
                
        }
        
        if (e.target.id.includes("notekaydet")) {
            e.preventDefault();

                $.post("/notekaydet",  {
                note:`${document.getElementById("note").value}`,
                no:`${ebtno}`,
                },
                function(data){
                    
                    if (data == "Başarılı") {
                        alert("Kayıt başarılı!")
                        if (document.getElementById("popup")) {
                            document.getElementById("popup").remove()
                            }
                          if (document.getElementById("dimScreen")) {
                            document.getElementById("dimScreen").remove()
                        }
                        for (let i = 1; i<=16; i ++) {
                            localStorage.setItem("search"+i, document.getElementById("myInput"+i).value)
                        }
                        localStorage.setItem("navigateto", 1)
                        navigateTo("/")
                    }
                    else {
                        alert("Bağlantı sorunu.Tekrar deneyin!")
                    }


                })
            // }
                
        }

        if (e.target.id.includes("statuskaydet")) {
            e.preventDefault();

                $.post("/statuskaydet",  {
                status:`${document.getElementById("change_status").value}`,
                expecteddate:`${document.getElementById("expecteddate").value}`,
                no:`${ebtno}`,
                yetki:`${localStorage.getItem("yetki")}`,
                },
                function(data){
                    
                    if (data == "Başarılı") {
                        alert("Kayıt başarılı!")
                        if (document.getElementById("popup")) {
                            document.getElementById("popup").remove()
                            }
                          if (document.getElementById("dimScreen")) {
                            document.getElementById("dimScreen").remove()
                        }
                        for (let i = 1; i<=16; i ++) {
                            localStorage.setItem("search"+i, document.getElementById("myInput"+i).value)
                        }
                        localStorage.setItem("navigateto", 1)
                        navigateTo("/taslaklar")
                    }
                    else {
                        alert("Bağlantı sorunu.Tekrar deneyin!")
                    }


                })
            // }
                
        }

        if (e.target.id.includes("iadenot")) {
            e.preventDefault();

            $.post("/gerigonder",  {ebtno:`${ebtno}`, note:`${document.getElementById("note").value}`, isim:`${localStorage.getItem("isim")}`, soyisim:`${localStorage.getItem("soyisim")}`},
            function(data){               
                if (data == "Başarılı") {
                    alert("EBT geri gönderildi!")
                    for (let i = 1; i<=16; i ++) {
                        localStorage.setItem("search"+i, document.getElementById("myInput"+i).value)
                    }
                    localStorage.setItem("navigateto", 1)
                    navigateTo("/"+window.location.pathname.replace(/^\/([^\/]*).*$/, '$1'))
                    if (document.getElementById("popup")) {
                        document.getElementById("popup").remove()
                        }
                      if (document.getElementById("dimScreen")) {
                        document.getElementById("dimScreen").remove()
                    }
                }
                else {
                    alert("Bağlantı sorunu.Tekrar deneyin!")
                }

                // navigateTo("/")

            })

                
        }

        if (e.target.matches("[ebtupdate]")) {
            e.preventDefault();
            if(document.getElementById("unitno").value == "") {
                document.getElementById("unitno").scrollIntoView(false);
                document.getElementById("unitno").focus()
            }
            else if(document.getElementById("chapter").value == "" && document.getElementById("chapter").disabled == false) {
                document.getElementById("chapter").scrollIntoView(false);
                document.getElementById("chapter").focus()
            }
            else if(document.getElementById("category").value == "") {
                document.getElementById("category").scrollIntoView(false);
                document.getElementById("category").focus()
            }
            else if(document.getElementById("relevantto").value == "") {
                document.getElementById("relevantto").scrollIntoView(false);
                document.getElementById("relevantto").focus()
            }
            else if(document.getElementById("expecteddate").value == "") {
                document.getElementById("expecteddate").scrollIntoView();
                document.getElementById("expecteddate").focus()
            }
            else if(document.getElementById("projectgroup").value == "") {
                document.getElementById("projectgroup").scrollIntoView();
                document.getElementById("projectgroup").focus()
            }
            else if(document.getElementById("airtitle").value == "") {
                document.getElementById("airtitle").scrollIntoView();
                document.getElementById("airtitle").focus()
            }
            else if(document.getElementById("documentname").value == "") {
                document.getElementById("documentname").scrollIntoView();
                document.getElementById("documentname").focus()
            }
            else if(document.getElementById("relatedsection").value == "") {
                document.getElementById("relatedsection").scrollIntoView();
                document.getElementById("relatedsection").focus()
            }
            else{
            $.post("/ebtupdate",  {unitno:`${document.getElementById("unitno").value}`,
            documentcode:`${document.getElementById("documentcode").value.slice(0,3)}` ,
            aircode:`${document.getElementById("aircode").value}`,
            chapter:`${document.getElementById("chapter").value}` ,
            category:`${document.getElementById("category").value.slice(0,1)}` ,
            relevantto:`${document.getElementById("relevantto").value}` ,
            expecteddate:`${document.getElementById("expecteddate").value}` ,
            projectgroup:`${document.getElementById("projectgroup").value}`,
            airtitle:`${document.getElementById("airtitle").value}`,
            documentname:`${document.getElementById("documentname").value}`,
            relatedsection:`${document.getElementById("relatedsection").value}`,
            followup:`${document.getElementById("followupair").value}`,
            note:`${document.getElementById("note").value}`,
            sicil:`${localStorage.getItem("sicil")}`,
            yetki:`${localStorage.getItem("yetki")}`,
            no:`${parseInt(window.location.href.slice(window.location.href.lastIndexOf("/")+1, window.location.href.length))}`
        },

            function(data){
                if (data=="Failure") {
                    alert("Lütfen taslak EBT'yi kapatıp daha sonra tekrar deneyiniz!")

                }
                else {
                    // window.open("file:////C:\\Users\\ozgun\\Desktop\\projeler\\airsapp\\"+document.getElementById("aircode").value+".docx")
                    alert("EBT Düzenlendi!")
                    // showAlert("Kayıt başarılı!", "success")
                    navigateTo("/taslaklar")
                }

                // navigateTo("/questionpool")
            })

        }


        }

        if (e.target.id.includes("yuklebuton")) {

            ebtno = e.target.id.replace("yuklebuton","")
            var dokumanadi

            await $.post("/aircode",  {ebtno: `${ebtno}`,
            },
            function(data){
                dokumanadi = data[0].aircode
            })
            dokumanadi = dokumanadi + "," + localStorage.getItem("sicil") + "," + localStorage.getItem("soyisim") + "," + document.getElementById("change_status").value + "," + document.getElementById("expecteddate").value

          e.preventDefault();

          var file = document.getElementById('filetoupload').files[0]
          var fileName = file.name;
          var path = file.path


            if (!fileName.includes(".docx")) {
                alert("Lütfen docx formatında doküman yükleyiniz!")
                return false;
            }
            else{


          var data = new FormData()
          data.set('file', file, dokumanadi);




          $.ajax({

              url: '/yukleme',
              type: 'POST',

              data: data,

              cache: false,
              contentType: false,
              processData: false,

              success: function (data) {

                  alert("Dosya karşıya yüklendi.")
                  for (let i = 1; i<=16; i ++) {
                    localStorage.setItem("search"+i, document.getElementById("myInput"+i).value)
                }
                localStorage.setItem("navigateto", 1)
                navigateTo("/taslaklar")
                //   navigateTo("/"+window.location.pathname.replace(/^\/([^\/]*).*$/, '$1'))
                //  navigateTo("/")
                  var link = document.getElementById("filetoupload").value.replace("C:\\fakepath\\", "")
                  document.getElementById('filetoupload').value= null;
                  if (document.getElementById("popup")) {
                    document.getElementById("popup").remove()
                    }
                  if (document.getElementById("dimScreen")) {
                    document.getElementById("dimScreen").remove()
                }
                  document.getElementById("air"+ebtno).style.background = ""
              }

            })
            .fail(function() {
              alert( "Dosya karşıya yüklenemedi! Lütfen bağlantınızı kontrol ediniz." );
            })
            return false;
        }

        }
        if (e.target.matches("[soruduzenle]")) {

            $.post("/soruduzenle",  {soru:`${document.getElementById("soru").value}` ,a:`${document.getElementById("asikki").value}` , b:`${document.getElementById("bsikki").value}` ,
             c:`${document.getElementById("csikki").value}`,d:`${document.getElementById("dsikki").value}`,e:`${document.getElementById("esikki").value}`,cevap:`${document.getElementById("cevap").value}`,
             egitimadi:`${document.getElementById("egitimadi").value}`, secilensoru: `${e.target.id}`},
            function(data){
                alert("Soru düzenlendi!")
                navigateTo("/questionpool")
            })
        }


        if (e.target.matches("[sorusil]")) {
            if (confirm(text) == true) {
                $.post("/taslaksil",  {ebtno: `${e.target.id}`
                },
                function(data){
                    alert("Soru silindi!")
                })

            }
        }

        if (e.target.matches("[sinavkaydet]")) {
            $.post("/sinavkaydet",  {sinavkonusu:`${document.getElementById("yenisinavkonusu").value}` ,
            sorusayisi:`${document.getElementById("yenisinavsorusayisi").value}`,
            sahibi:`${document.getElementById("sahibi").value}`
             },
            function(data){
                alert("Sınav kaydedildi!")
                navigateTo("/exams")
            })
        }



        if (e.target.matches("[sinavduzenle]")) {
            $.post("/sinavduzenle",  {sinavkonusu:`${document.getElementById("yenisinavkonusu").value}` ,
            sorusayisi:`${document.getElementById("yenisinavsorusayisi").value}`,
            sahibi:`${document.getElementById("sahibi").value}`, secilensinav: `${e.target.id}`
             },
            function(data){
                alert("Sınav düzenlendi!")
                navigateTo("/exams")
            })
        }

        if (e.target.matches("[sinavsil]")) {
            $.post("/sinavsil",  {secilensinav: `${e.target.id}`
             },
            function(data){
                alert("Sınav silindi!")
                navigateTo("/exams")
            })
        }

        if (e.target.matches("[gonder]")) {
            var radios = document.getElementsByTagName('input');
            var value = [];
            var sorular = []
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].type == 'radio') {
                    if (radios[i].checked) {
                        // get value, set checked flag or do whatever you need to
                        value[i] = radios[i].id;
                    }
                    else {
                        sorular [i] = radios[i].name.replace("radio", "")
                    }
                }
            }
            const counts = {};
            sorular.forEach(function (x) { counts[x] = (counts[x] || 0) + 1});
            var len = Object.keys(counts).length
            var bossoru = 0
            for (var i = 0; i < len; i++) {
                if (counts[i] == 5) {
                    bossoru = 1
                }
            }
            if (bossoru == 1) {
                alert("Bütün sorular işaretli olmalıdır!")
            }
            else {
                const result = value.filter(element => {
                    return element !== '';
                });
                loginhash().then((value) => {
                    var kullanici = localStorage.getItem("isim") + " " + localStorage.getItem("soyisim")
                    var sicil = localStorage.getItem("sicil")
                    $.post("/sonuckaydet",  {sinavsonucu: `${result}`, sicil: `${sicil}`, kullanici: `${kullanici}`, grup: `${grup}`
                        },
                    function(data){
                        alert("Sınav tamamnamıştır. Sonuç için yöneticinizle iletişime geçiniz!")
                        navigateTo("/exams")
                    })

                })
            }






        }
        if (e.target.matches("[indir]")) {
            // function Export2Doc(element, filename = '') {
                var filename = "htmlozgun"
                //  _html_ will be replace with custom html
                var meta= "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>";
                //  _styles_ will be replaced with custome css
                var head= "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n";

                var html = document.getElementById("app").innerHTML ;

                var blob = new Blob(['\ufeff', html], {
                    type: 'application/msword'
                });

                var  css = (
                       '<style>' +
                       'img {width:300px;}table {border-collapse: collapse; border-spacing: 0;}td{padding: 6px;}' +
                       '</style>'
                      );
    //  Image Area %%%%
                var options = { maxWidth: 624};
                var images = Array();
                var img = $("#"+"app").find("img");
                for (var i = 0; i < img.length; i++) {
                    // Calculate dimensions of output image
                    var w = Math.min(img[i].width, options.maxWidth);
                    var h = img[i].height * (w / img[i].width);
                    // Create canvas for converting image to data URL
                    var canvas = document.createElement("CANVAS");
                    canvas.width = w;
                    canvas.height = h;
                    // Draw image to canvas
                    var context = canvas.getContext('2d');
                    context.drawImage(img[i], 0, 0, w, h);
                    // Get data URL encoding of image
                    var uri = canvas.toDataURL("image/png");
                    $(img[i]).attr("src", img[i].src);
                    img[i].width = w;
                    img[i].height = h;
                    // Save encoded image to array
                    images[i] = {
                        type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                        encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                        location: $(img[i]).attr("src"),
                        data: uri.substring(uri.indexOf(",") + 1)
                    };
                }

                // Prepare bottom of mhtml file with image data
                var imgMetaData = "\n";
                for (var i = 0; i < images.length; i++) {
                    imgMetaData += "--NEXT.ITEM-BOUNDARY\n";
                    imgMetaData += "Content-Location: " + images[i].location + "\n";
                    imgMetaData += "Content-Type: " + images[i].type + "\n";
                    imgMetaData += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
                    imgMetaData += images[i].data + "\n\n";

                }
                imgMetaData += "--NEXT.ITEM-BOUNDARY--";
    // end Image Area %%

                 var output = meta.replace("_html_", head.replace("_styles_", css) +  html) + imgMetaData;

                var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(output);


                filename = filename ? filename + '.doc' : 'document.doc';


                var downloadLink = document.createElement("a");

                document.body.appendChild(downloadLink);

                if (navigator.msSaveOrOpenBlob) {
                    navigator.msSaveOrOpenBlob(blob, filename);
                } else {

                    downloadLink.href = url;
                    downloadLink.download = filename;
                    downloadLink.click();
                }

                document.body.removeChild(downloadLink);
            // }
        }

        if (e.target.matches("[yukle]")) {

            // new FormData($('form')[0]),


            $.ajax({

                // Your server script to process the upload
                url: '/yukleme',
                type: 'POST',
                // Form data
                data: new FormData($('form')[0]),


                // Tell jQuery not to process data or worry about content-type
                // You *must* include these options!
                cache: false,
                contentType: false,
                processData: false,

                // Custom XMLHttpRequest
                success: function (data) {
                    // alert('success');

                    var z = CKEDITOR.instances.airtext.getData()

                    var link = document.getElementById("filetoupload").value.replace("C:\\fakepath\\", "")

                    var charMap = {Ç:'C',Ö:'O',Ş:'S',İ:'I',I:'i',Ü:'U',Ğ:'G',ç:'c',ö:'o',ş:'s',ı:'i',ü:'u',ğ:'g'};


			        var str_array = link.split('');

			        for(var i=0, len = str_array.length; i < len; i++) {
			            str_array[i] = charMap[ str_array[i] ] || str_array[i];
			        }

			        var str = str_array.join('');

			        var clearStr = str.replace(" ","").replace("-","").replace(/[^a-z0-9-.çöşüğı]/gi,"");

                    if (clearStr.includes(".jpg") || clearStr.includes(".png") || clearStr.includes(".JPG") || clearStr.includes(".PNG")) {
                        CKEDITOR.instances.airtext.setData(z + "<img style='width:400px' src = '/upload/" + clearStr + "'>")
                    }
                    else {
                        var z = document.createElement("div");
                        z.setAttribute("id", "div/upload/" + clearStr);
                        z.setAttribute("style", "overflow:hidden");
                        document.getElementById("yuklemekutusu").appendChild(z);

                        var x = document.createElement("a");
                        x.setAttribute("href", "/upload/" + clearStr);
                        x.setAttribute("style", "width:10px");
                        x.innerHTML = clearStr
                        document.getElementById("div/upload/" + clearStr).appendChild(x);

                        var br = document.createElement("br");
                        document.getElementById("div/upload/" + clearStr).appendChild(br);

                        var y = document.createElement("button");
                        y.innerHTML = "Sil"
                        y.setAttribute("id", "/upload/" + clearStr);
                        document.getElementById("div/upload/" + clearStr).appendChild(y);

                        var br1 = document.createElement("br");
                        document.getElementById("div/upload/" + clearStr).appendChild(br1);
                    }


                    return false;

                }

              });


        }
    })

    document.body.addEventListener("input", async (e) => {
        if (document.getElementById("kullanici")) {
            if (document.getElementById("kullanici").value !== "") {
                document.getElementById("girisbutonu").textContent  = "GİRİŞ"
            }
            else {
                document.getElementById("girisbutonu").textContent  = "misafir girişi"
                document.getElementById("sifre").value = ""
            }
        }
        if (document.getElementById("expecteddate")) {
            if (document.getElementById("expecteddate").value !== "") {
                var selectedDate = new Date(document.getElementById("expecteddate").value);
                var dayOfWeek = selectedDate.getUTCDay();
                if (dayOfWeek === 0 || dayOfWeek === 6) { // 0 for Sunday, 6 for Saturday
                  alert("Hafta sonları seçilemez!");
                  document.getElementById("expecteddate").value = ""
                } 
                else {
                    var currentDate = new Date();
                    var timeDiff = Math.abs(currentDate.getTime() - selectedDate.getTime());
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                    if (diffDays < 45) {
                        alert("En az bir buçuk ay sonrası seçilebilir!");
                        document.getElementById("expecteddate").value = ""
                    }
                    if (diffDays > 365) {
                        alert("Bir yıldan uzun süre tanımlanamaz!");
                        document.getElementById("expecteddate").value = ""
                    }
                    
                }
                // document.getElementById("girisbutonu").textContent  = "GİRİŞ"
            }
        }
    })
        document.body.addEventListener("keyup", async (e) => {
            var key = e.keyCode;
            let scroll = window.pageXOffset

                if(key == 39) { // right arrow
                    if (scrolleski == scroll) {
                    if (pageIndex !== parseInt(total / pagesize) + 1) {
                        pageIndex = pageIndex + 1
                        scrolleski = 0;
                        localStorage.setItem("pagenumber", parseInt(pageIndex))
                        myFunction(pageIndex)
                        return false;  
                    }
                    }
                    scrolleski = scroll
                } 
                if (key == 37) { // left arrow   
                    if (scrolleski == 0) {
                    if (pageIndex - 1 !== 0) {
                        pageIndex = pageIndex - 1
                        localStorage.setItem("pagenumber", parseInt(pageIndex))
                        myFunction(pageIndex)
                        return false;  
                    }
                    }
                    scrolleski = scroll
                }

            

        if (e.target.matches("[myFunction]")) {
            myFunction(1)

            // toplamekle (sayilansatir, tamamlanan, kosultamamlanan, cevapbekleyen, değerlendirilen, qpassessment, kisiseldeğerlendirilen, kisiseltamamlanan, kisiselkosultamamlanan, kisiselcevapbekleyen, kisiselqp);
          }
    });


    router();
});

/* function showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    console.log(`alert alert-${className}`)
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('#ebtler');
    const form = document.querySelector('#unit1body');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 30000);
  }  */


function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;
    G = (G<255)?G:255;
    B = (B<255)?B:255;

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}




String.prototype.turkishToUpper = function(){
	var string = this;
	var letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" };
	string = string.replace(/(([iışğüçö]))/g, function(letter){ return letters[letter]; })
	return string.toUpperCase();
}



function myFunction(pagenumber) {


    var sayfapozisyonufiltre = window.pageYOffset
    if (localStorage.getItem("navigateto") == 1) {
        for (let i = 1; i<=16; i ++) {
            document.getElementById("myInput"+i).value = localStorage.getItem("search"+i)
        } 
        localStorage.setItem("navigateto", 0)
    }



    pagenumber = parseInt(pagenumber)
    


    var filter, table, tr, td, i, j, txtValue;
    var myarray = [];
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
    var input14 = document.getElementById("myInput14").value.turkishToUpper();
    var input15 = document.getElementById("myInput15").value.turkishToUpper();
    var input16 = document.getElementById("myInput16").value.turkishToUpper();



    if (input !== "" || input1 !== "" || input2 !== "" || input3 !== "" || input4 !== "" || input5 !== "" ||
    input6 !== "" || input7 !== "" || input8 !== "" || input9 !== "" || input10 !== "" || input11 !== ""  ||
    input12 !== "" || input13 !== "" || input14 !== "" || input15 !== "" || input15 !== "" || input16 !== ""){
    //   filtretemizle.style.display= "block";
    //   document.getElementById("bolum1").style.display= "none" 
    //   document.getElementById("bolum2").style.display= "none"
    //   document.getElementById("bolum3").style.display= "none" 
    //   document.getElementById("bolum4").style.display= "none" 
    //   document.getElementById("bolum5").style.display= "none" 
      var filtreflag = 1
    }
    else{
    //   filtretemizle.style.display= "none"
    //   document.getElementById("bolum1").style.display= "block" 
    //   document.getElementById("bolum2").style.display= "block" 
    //   document.getElementById("bolum3").style.display= "block" 
    //   document.getElementById("bolum4").style.display= "block" 
    //   document.getElementById("bolum5").style.display= "block"
      var filtreflag = 0 
    }

    if (input !== "") {
      myInput.style.backgroundColor = "coral";

    }
    else {
      myInput.style.backgroundColor = "";
  
    }
    
    if (input1 !== "") {
      myInput1.style.backgroundColor = "coral";

    }
    else {
      myInput1.style.backgroundColor = "";

    }

    if (input2 !== "") {
      myInput2.style.backgroundColor = "coral";

    }
    else {
      myInput2.style.backgroundColor = "";

    }

    if (input3 !== "") {
      myInput3.style.backgroundColor = "coral";

    }
    else {
      myInput3.style.backgroundColor = "";
 
    }

    if (input4 !== "") {
      myInput4.style.backgroundColor = "coral";

    }
    else {
      myInput4.style.backgroundColor = "";

    }

    if (input5 !== "") {
      myInput5.style.backgroundColor = "coral";

    }
    else {
      myInput5.style.backgroundColor = "";

    }
    if (input6 !== "") {
      myInput6.style.backgroundColor = "coral";
      
    }
    else {
      myInput6.style.backgroundColor = "";
 
    }
    if (input7 !== "") {
      myInput7.style.backgroundColor = "coral";
    
    }
    else {
      myInput7.style.backgroundColor = "";
      
    }
    if (input8 !== "") {
      myInput8.style.backgroundColor = "coral";
 
    }
    else {
      myInput8.style.backgroundColor = "";
 
    }
    if (input9 !== "") {
      myInput9.style.backgroundColor = "coral";
  
    }
    else {
      myInput9.style.backgroundColor = "";
    
    }
    if (input10 !== "") {
      myInput10.style.backgroundColor = "coral";
     
    }
    else {
      myInput10.style.backgroundColor = "";
   
    }
    if (input11 !== "") {
      myInput11.style.backgroundColor = "coral";

    }
    else {
      myInput11.style.backgroundColor = "";

    }
    if (input12 !== "") {
      myInput12.style.backgroundColor = "coral";

    }
    else {
      myInput12.style.backgroundColor = "";

    }
    if (input13 !== "") {
      myInput13.style.backgroundColor = "coral";

    }
    else {
      myInput13.style.backgroundColor = "";

    }
    if (input14 !== "") {
        myInput14.style.backgroundColor = "coral";
  
      }
      else {
        myInput14.style.backgroundColor = "";
  
      }
      if (input15 !== "") {
        myInput15.style.backgroundColor = "coral";
  
      }
      else {
        myInput15.style.backgroundColor = "";
  
      }

      if (input16 !== "") {
        myInput16.style.backgroundColor = "coral";
  
      }
      else {
        myInput16.style.backgroundColor = "";
  
      }

    table = document.getElementById("ebtler");
    tr = table.getElementsByTagName("tr");
    let sayilansatir = 0


    let draft = 0
    let closedp = 0
    let closedn = 0
    let waiting = 0
    let cancelled = 0
    let sent = 0
    let received = 0
    let revsent = 0
    let revreceived = 0
    let gdraft = 0
    let gclosedp = 0
    let gclosedn = 0
    let gwaiting = 0
    let gcancelled = 0
    let gsent = 0
    let greceived = 0
    let grevsent = 0
    let grevreceived = 0
    total = 0
    let sayilan = 0
    pagesize = parseInt(window.innerHeight/39);

    for (i = 1; i < tr.length; i++) {
      for (j = 0; j < 17; j++) {
        td = tr[i].getElementsByTagName("td")[j]
        if (td) {
        myarray[j] = td.textContent
        }
        else {
          myarray[j] = ""
        }
      }

      let inputarray = input.split(";")
      let inputvar = false

      let inputarray1 = input1.split(";")
      let inputvar1 = false

      let inputarray2 = input2.split(";")
      let inputvar2 = false

      let inputarray3 = input3.split(";")
      let inputvar3 = false

      let inputarray4 = input4.split(";")
      let inputvar4 = false

      let inputarray5 = input5.split(";")
      let inputvar5 = false

      let inputarray6 = input6.split(";")
      let inputvar6 = false

      let inputarray7 = input7.split(";")
      let inputvar7 = false

      let inputarray8 = input8.split(";")
      let inputvar8 = false

      let inputarray9 = input9.split(";")
      let inputvar9 = false

      let inputarray10 = input10.split(";")
      let inputvar10 = false

      let inputarray11 = input11.split(";")
      let inputvar11 = false

      let inputarray12 = input12.split(";")
      let inputvar12 = false

      let inputarray13 = input13.split(";")
      let inputvar13 = false

      let inputarray14 = input14.split(";")
      let inputvar14 = false

      let inputarray15 = input15.split(";")
      let inputvar15 = false

      let inputarray16 = input16.split(";")
      let inputvar16 = false

    for (let m = 0; m<inputarray.length; m++) {
        if (myarray[0]==inputarray[m] || inputarray[m]=="") {
            inputvar = true
        }
    }

    for (let m = 0; m<inputarray1.length; m++) {
        if (myarray[1].toString().turkishToUpper().includes(inputarray1[m])) {
            inputvar1 = true
        }
    }

    for (let m = 0; m<inputarray2.length; m++) {
        if (myarray[2].toString().turkishToUpper().includes(inputarray2[m])) {
            inputvar2 = true
        }
    }

    for (let m = 0; m<inputarray3.length; m++) {
        if (myarray[3].toString().turkishToUpper().includes(inputarray3[m])) {
            inputvar3 = true
        }
    }

    for (let m = 0; m<inputarray4.length; m++) {
        if (myarray[4].toString().turkishToUpper().includes(inputarray4[m])) {
            inputvar4 = true
        }
    }

    for (let m = 0; m<inputarray5.length; m++) {
        if (myarray[5].toString().turkishToUpper().includes(inputarray5[m])) {
            inputvar5 = true
        }
    }

    for (let m = 0; m<inputarray6.length; m++) {
        if (myarray[6].toString().turkishToUpper().includes(inputarray6[m])) {
            inputvar6 = true
        }
    }

    for (let m = 0; m<inputarray7.length; m++) {
        
        if (myarray[7]==inputarray7[m] || inputarray7[m]=="") {
            inputvar7 = true
        }
    }

    for (let m = 0; m<inputarray8.length; m++) {
        if (myarray[8].toString().turkishToUpper().includes(inputarray8[m])) {
            inputvar8 = true
        }
    }

    for (let m = 0; m<inputarray9.length; m++) {
        if (myarray[9].toString().turkishToUpper().includes(inputarray9[m])) {
            inputvar9 = true
        }
    }

    for (let m = 0; m<inputarray10.length; m++) {
        if (myarray[10].toString().turkishToUpper().includes(inputarray10[m])) {
            inputvar10 = true
        }
    }

    for (let m = 0; m<inputarray11.length; m++) {
        if (myarray[11].toString().turkishToUpper().includes(inputarray11[m])) {
            inputvar11 = true
        }
    }

    for (let m = 0; m<inputarray12.length; m++) {
        if (myarray[12].toString().turkishToUpper().includes(inputarray12[m])) {
            inputvar12 = true
        }
    }

    for (let m = 0; m<inputarray13.length; m++) {
        if (myarray[13].toString().turkishToUpper().includes(inputarray13[m])) {
            inputvar13 = true
        }
    }

    for (let m = 0; m<inputarray14.length; m++) {
        if (myarray[14].toString().turkishToUpper().includes(inputarray14[m])) {
            inputvar14 = true
        }
    }

    for (let m = 0; m<inputarray15.length; m++) {
        if (myarray[15].toString().turkishToUpper().includes(inputarray15[m])) {
            inputvar15 = true
        }
    }

    for (let m = 0; m<inputarray16.length; m++) {
        if (myarray[16].toString().turkishToUpper().includes(inputarray16[m])) {
            inputvar16 = true
        }
    }

      if (inputvar == true && inputvar1 == true && inputvar2 == true && inputvar3 == true && inputvar4 == true &&
        inputvar5 == true && inputvar6 == true && inputvar7 == true && inputvar8 == true && inputvar9 == true && 
        inputvar10 == true && inputvar11 == true && inputvar12 == true && inputvar13 == true && inputvar14 == true && inputvar15 == true && inputvar16 == true 
    ) {
        

        total = total + 1



        




        if (myarray[10].includes('Draft')) {
            draft = draft + 1
            if (myarray[5].includes(localStorage.getItem("grup"))) {
                gdraft = gdraft + 1
            }
        }
        if (myarray[10]==('Sent') || myarray[10]==('RevSent') || myarray[10]==('SENT')|| myarray[10]==('REVSENT')) {
            sent = sent + 1
            if (myarray[5].includes(localStorage.getItem("grup"))) {
                gsent = gsent + 1
            }
        }
        if (myarray[10]==('Received') || myarray[10]==('RevReceived')|| myarray[10]==('RECEIVED')|| myarray[10]==('REVRECEIVED')) {
            received = received + 1
            if (myarray[5].includes(localStorage.getItem("grup"))) {
                greceived = greceived + 1
            }
        }
        if (myarray[10].includes('Closed+') || myarray[10].includes('CLOSED +')) {
            closedp = closedp + 1
            if (myarray[5].includes(localStorage.getItem("grup"))) {
                gclosedp = gclosedp + 1
            }
        }
        if (myarray[10].includes('Closed-')|| myarray[10].includes ('CLOSED -')) {
            closedn = closedn + 1
            if (myarray[5].includes(localStorage.getItem("grup"))) {
                gclosedn = gclosedn + 1
            }
        }
        if (myarray[10].includes('Waiting') || myarray[10].includes('Checked')) {
            waiting = waiting + 1
            if (myarray[5].includes(localStorage.getItem("grup"))) {
                gwaiting = gwaiting + 1
            }
        }

        if (pagesize*(pagenumber-1) < total &&  total <= pagesize*pagenumber) {

            tr[i].style.display = "";

      } 
      else {
        tr[i].style.display = "none";
      } 
    }
      else {
        tr[i].style.display = "none";
    
      }  

    }

            
    window.scrollTo(0,document.body.scrollHeight)
    const div = document.createElement('div');
    div.id = 'toplamkayit';
    div.className = `unselectable toplamkayit`;
    var divici = `
    <div style= "font-size:13px;">
        <span style = "color: white; cursor: pointer" id = "Toplamk">Toplam kayıt: ${total} </span> | 
        <span style = "color :#e1cff6; cursor: pointer" id = "Sent"> Sent: ${sent}  </span> | 
        <span style = "color :#ddebfd; cursor: pointer" id = "Received"> Received: ${received}  </span> | 
        <span style = "color :#cff6dd; cursor: pointer" id = "Closedp"> Closed(+): ${closedp}  </span> | 
        <span style = "color :#f6cfcf; cursor: pointer" id = "Closedn"> Closed(-): ${closedn}  </span> | 
        <span style = "color :#fdf5dd; cursor: pointer" id = "Waiting"> Waiting: ${waiting}</span>
    </div>`

    document.getElementById("bottombar").innerHTML = divici;

    // let dbrows = tr.length;
    // let bolum = parseInt(dbrows / 6);
    // let bolum2 = 2*bolum;
    // let bolum3 = 3*bolum;
    // let bolum4 = 4*bolum;
    // let bolum5 = 5*bolum;

    // if (document.getElementById("bolum1")) {
    //   document.getElementById("bolum1").remove()
    // }
    // if (document.getElementById("bolum2")) {
    //   document.getElementById("bolum2").remove()
    // }
    // if (document.getElementById("bolum3")) {
    //   document.getElementById("bolum3").remove()
    // }
    // if (document.getElementById("bolum4")) {
    //   document.getElementById("bolum4").remove()
    // }
    // if (document.getElementById("bolum5")) {
    //   document.getElementById("bolum5").remove()
    // }
    // var bolumegit = document.createElement("div");
    // bolumegit.innerHTML = bolum;
    // bolumegit.onclick = function () {
    //   dbrows = tr.length;
    //   bolum = parseInt(dbrows / 6);
    //   var gidileceksatir = "air" + bolum
    //   if (document.getElementById(gidileceksatir)){
    //   document.getElementById(gidileceksatir).scrollIntoView();
    //   window.scrollBy(0, -20)
    //   }
    // };
    // bolumegit.id = "bolum1"
    // document.body.appendChild(bolumegit);


    // var bolumegit1 = document.createElement("div");
    // bolumegit1.innerHTML = bolum2 ;
    // bolumegit1.onclick = function () {
    //   dbrows = tr.length;
    //   bolum = parseInt(dbrows / 6);
    //   bolum2 = 2*bolum;
    //  var gidileceksatir = "air" + bolum2
    //   if (document.getElementById(gidileceksatir)){
    //   document.getElementById(gidileceksatir).scrollIntoView();
    //   window.scrollBy(0, -20)
    //   }
    // };
    // bolumegit1.id = "bolum2"
    // document.body.appendChild(bolumegit1);

    // var bolumegit2 = document.createElement("div");
    // bolumegit2.innerHTML = bolum3 ;
    // bolumegit2.onclick = function () {
    //   dbrows = tr.length;
    //   bolum = parseInt(dbrows / 6);
    //   bolum3 = 3*bolum;
    //  var gidileceksatir = "air" + bolum3
    //   if (document.getElementById(gidileceksatir)){
    //   document.getElementById(gidileceksatir).scrollIntoView();
    //   window.scrollBy(0, -20)
    //   }
    // };
    // bolumegit2.id = "bolum3"
    // document.body.appendChild(bolumegit2);

    // var bolumegit3 = document.createElement("div");
    // bolumegit3.innerHTML = bolum4 ;
    // bolumegit3.onclick = function () {
    //   dbrows = tr.length;
    //   bolum = parseInt(dbrows / 6); 
    //   bolum4 = 4*bolum;
    //  var gidileceksatir = "air" + bolum4
    //   if (document.getElementById(gidileceksatir)){
    //   document.getElementById(gidileceksatir).scrollIntoView();
    //   window.scrollBy(0, -20)
    //   }
    // };
    // bolumegit3.id = "bolum4"
    // document.body.appendChild(bolumegit3);

    // var bolumegit4 = document.createElement("div");
    // bolumegit4.innerHTML = bolum5 ;
    // bolumegit4.onclick = function () {
    //   dbrows = tr.length;
    //   bolum = parseInt(dbrows / 6);
    //   bolum5 = 5*bolum;
    // var  gidileceksatir = "air" + bolum5
    //   if (document.getElementById(gidileceksatir)){
    //   document.getElementById(gidileceksatir).scrollIntoView();
    //   window.scrollBy(0, -20)
    //   }
    // };
    // bolumegit4.id = "bolum5"
    // document.body.appendChild(bolumegit4);




    document.getElementById("pagearea").innerHTML = ""


    for (let i = 1; i <= parseInt(total / pagesize + 1); i++) {
        if (i == 1 || i == parseInt(total / pagesize + 1) || i == pagenumber-1 || i == pagenumber || i == pagenumber + 1) {
            if (i == parseInt(total / pagesize + 1) && parseInt(total / pagesize + 1) - pagenumber >= 3) {
                const pageNumber = document.createElement("button");
                pageNumber.className = "pagination-number";

                pageNumber.innerHTML = "...";

              
                document.getElementById("pagearea").appendChild(pageNumber);
            }
            const pageNumber = document.createElement("button");
            pageNumber.className = "pagination-number";
            pageNumber.id = "pagination-number"+i;
            pageNumber.innerHTML = i;
            pageNumber.setAttribute("page-index", i);
            pageNumber.setAttribute("aria-label", "Page " + i);
          
            document.getElementById("pagearea").appendChild(pageNumber);
            if (i == 1 && pagenumber-1 >= 3) {
                const pageNumber = document.createElement("button");
                pageNumber.className = "pagination-number";

                pageNumber.innerHTML = "...";

              
                document.getElementById("pagearea").appendChild(pageNumber);
            }
        }

    }
    document.getElementById("pagination-number"+pagenumber).style = "background-color: yellow"
    pageIndex = pagenumber
    localStorage.setItem("pagenumber", parseInt(pageIndex))

}

function sortTable(n) {

    var table = document.getElementById("ebtler");
    let rows = table.rows;
    let rowsarray = []
    for (let i = 1; i < (rows.length); i++) {
        var matches = rows[i].getElementsByTagName("TD")[8].innerHTML.substring( rows[i].getElementsByTagName("TD")[8].innerHTML.indexOf( '[' ) + 1, rows[i].getElementsByTagName("TD")[8].innerHTML.indexOf( ']' ) );
        console.log(rows[i].getElementsByTagName("TD")[8].innerHTML)
        if ((matches.lastIndexOf("-")-matches.indexOf("-")) == 2) {
            matches = matches.substring(0, matches.indexOf("-")+1)+"0"+matches.substring(matches.indexOf("-")+1)
        }
        if (matches.length-(matches.lastIndexOf("-")) == 2) {
            matches = matches.substring(0, matches.lastIndexOf("-")+1)+"0"+matches.substring(matches.lastIndexOf("-")+1)
        }
        if (!matches.includes("-")) {
            matches = ""
        }
        // console.log(rows[i].getElementsByTagName("TD")[0].innerHTML)

        // console.log("deneme "+rows[i].id.replace("air",""))
        // rowsarray[i] = matches + "$" + rows[i].getElementsByTagName("TD")[0].innerHTML;
        rowsarray[i] = matches + "$" + rows[i].id.replace("air","");
    }
    rowsarray = rowsarray.sort()

    const list1 = document.querySelector('#unit1body');
    let a = rows.length-1
    for (let i = a-1; i >= 0; i--) {
      let x = rowsarray[i].lastIndexOf("$")
      let y = rowsarray[i].slice(x+1,)
    //   console.log(rowsarray[i])
    //   console.log(y)
      list1.appendChild(document.getElementById("air"+y));

    //   document.getElementById("air"+y).style.display = ""

    }
    myFunction(1)
    // for (let i = 0; i < 13; i++) {
    //   document.getElementById("aust"+i).style.color="white";
    // }
    document.getElementById("aust"+n).style.color="orange";


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
      link.download = date+"-akkuyu.xls";
      link.href = uri + base64(format(template, ctx))
      link.click();
    }
  })()
