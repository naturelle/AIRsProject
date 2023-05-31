var sayac = 0

function deneme() {
    var today = new Date();
    var day = today.getDay()
    var hours = today.getHours()
    var minutes = today.getUTCMinutes()
    console.log(day +" "+ hours +" "+ minutes)
    
    
      if (sayac == 0 && hours>=13 && hours<14 && minutes>=15 && minutes<45) {
        sayac = 1
        console.log("çalışıyor")
      }
      else {
        sayac = 0
      }
}
deneme()
setInterval(deneme, 30*60*1000);