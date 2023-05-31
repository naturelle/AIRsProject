// const routes = {
//   '/': home,
//   '/contact' : contact,
//   '/about': about
// }


const rootDiv = document.getElementById('root')


const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  )
  rootDiv.innerHTML = routes[pathname]
}

window.onpopstate = () => {
  rootDiv.innerHTML = routes[window.location.pathname]
}

function login(){
    
    alertflag = 0
    kullanici = document.getElementById("email").value;
    sifre = document.getElementById("password").value;
  
    if (kullanici==0) {
      alert("Lütfen geçerli bir kullanıcı adı giriniz!")
      document.getElementById("email").focus();
    }
    else {
      
    $.get("/login/12",  {kullanici: `${kullanici}`, sifre: `${sifre}`},
    function(data){
      alert("den")
      if (data.includes("$2b$")){
        localStorage.setItem("hash", data);
        alertflag = 1;
        // loginhash();
      }
      if (data.includes("sifrekontrol")){
        alert("Lütfen şifrenizi kontrol ediniz!");
        document.getElementById("password").focus();
        alertflag = 1;
      }
      if (data.includes("bilgiyok")){
        alert("Bu kullanıcıya ait bilgi bulunamadı" +data);
        document.getElementById("username").focus();
      }
    })
    
    }
  }

  function loginhash() {
    $.post("loginhash",  {hash: `${localStorage.getItem("hash")}`},
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
      grup = data[9]
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