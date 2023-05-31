import AbstractView from "./AbstractView.js";
import { loginhash } from "../index.js";
export default class extends AbstractView {

    constructor(params) {
        super(params);
        this.setTitle("EBT Özet Tablosu");
        this.postId = params.id;
    }
 
    async getHtml() {

        var ebtler
  
        await $.post("/ebtler", function (books){
            ebtler = books
        }) 

        var rnumber1 = 0 
        var rnumber1e = 0
        var rnumber1a = 0
        var rnumber1b = 0
        var snumber1 = 0 
        var snumber1e = 0 
        var snumber1a = 0 
        var snumber1b = 0 
        var cpnumber1 = 0
        var cpnumber1e = 0
        var cpnumber1a = 0
        var cpnumber1b = 0
        var cnnumber1 = 0
        var cnnumber1e = 0
        var cnnumber1a = 0
        var cnnumber1b = 0
        var rnumber2 = 0 
        var rnumber2e = 0
        var rnumber2a = 0
        var rnumber2b = 0
        var snumber2 = 0 
        var snumber2e = 0 
        var snumber2a = 0 
        var snumber2b = 0 
        var cpnumber2 = 0
        var cpnumber2e = 0
        var cpnumber2a = 0
        var cpnumber2b = 0
        var cnnumber2 = 0
        var cnnumber2e = 0
        var cnnumber2a = 0
        var cnnumber2b = 0
        var rnumber3 = 0 
        var rnumber3e = 0
        var rnumber3a = 0
        var rnumber3b = 0
        var snumber3 = 0 
        var snumber3e = 0 
        var snumber3a = 0 
        var snumber3b = 0 
        var cpnumber3 = 0
        var cpnumber3e = 0
        var cpnumber3a = 0
        var cpnumber3b = 0
        var cnnumber3 = 0
        var cnnumber3e = 0
        var cnnumber3a = 0
        var cnnumber3b = 0
        var rnumber4 = 0 
        var rnumber4e = 0
        var rnumber4a = 0
        var rnumber4b = 0
        var snumber4 = 0
        var snumber4e = 0 
        var snumber4a = 0 
        var snumber4b = 0  
        var cpnumber4 = 0
        var cpnumber4e = 0
        var cpnumber4a = 0
        var cpnumber4b = 0
        var cnnumber4 = 0
        var cnnumber4e = 0
        var cnnumber4a = 0
        var cnnumber4b = 0
        var total1 = 0
        var total2 = 0
        var total3 = 0
        var total4 = 0
        var total1e = 0
        var total2e = 0
        var total3e = 0
        var total4e = 0
        var total1a = 0
        var total2a = 0
        var total3a = 0
        var total4a = 0
        var total1b = 0
        var total2b = 0
        var total3b = 0
        var total4b = 0


        for (let k=0;k<ebtler.length;k++){
            if (ebtler[k].aircode.includes("ANS1")) {
                total1 = total1 + 1
                if (ebtler[k].category == "E") {
                    total1e = total1e + 1
                }
                if (ebtler[k].category == "A") {
                    total1a = total1a + 1
                }
                if (ebtler[k].category == "B") {
                    total1b = total1b + 1
                }
            }
            if (ebtler[k].aircode.includes("ANS2")) {
                total2 = total2 + 1
                if (ebtler[k].category == "E") {
                    total2e = total2e + 1
                }
                if (ebtler[k].category == "A") {
                    total2a = total2a + 1
                }
                if (ebtler[k].category == "B") {
                    total2b = total2b + 1
                }
            }
            if (ebtler[k].aircode.includes("ANS3")) {
                total3 = total3 + 1
                if (ebtler[k].category == "E") {
                    total3e = total3e + 1
                }
                if (ebtler[k].category == "A") {
                    total3a = total3a + 1
                }
                if (ebtler[k].category == "B") {
                    total3b = total3b + 1
                }
            }
            if (ebtler[k].aircode.includes("ANS4")) {
                total4 = total4 + 1
                if (ebtler[k].category == "E") {
                    total4e = total4e + 1
                }
                if (ebtler[k].category == "A") {
                    total4a = total4a + 1
                }
                if (ebtler[k].category == "B") {
                    total4b = total4b + 1
                }
            } 

            
            if (ebtler[k].status.includes("Sent")) {
                if (ebtler[k].aircode.includes("ANS1")) {
                    rnumber1 = rnumber1 + 1
                    if (ebtler[k].category == "E") {
                        rnumber1e = rnumber1e + 1
                    }
                    if (ebtler[k].category == "A") {
                        rnumber1a = rnumber1a + 1
                    }
                    if (ebtler[k].category == "B") {
                        rnumber1b = rnumber1b + 1
                    }
                }
                if (ebtler[k].aircode.includes("ANS2")) {
                    rnumber2 = rnumber2 + 1
                    if (ebtler[k].category == "E") {
                        rnumber2e = rnumber2e + 1
                    }
                    if (ebtler[k].category == "A") {
                        rnumber2a = rnumber2a + 1
                    }
                    if (ebtler[k].category == "B") {
                        rnumber2b = rnumber2b + 1
                    }
                }
                if (ebtler[k].aircode.includes("ANS3")) {
                    rnumber3 = rnumber3 + 1
                    if (ebtler[k].category == "E") {
                        rnumber3e = rnumber3e + 1
                    }
                    if (ebtler[k].category == "A") {
                        rnumber3a = rnumber3a + 1
                    }
                    if (ebtler[k].category == "B") {
                        rnumber3b = rnumber3b + 1
                    }
                }
                if (ebtler[k].aircode.includes("ANS4")) {
                    rnumber4 = rnumber4 + 1
                    if (ebtler[k].category == "E") {
                        rnumber4e = rnumber4e + 1
                    }
                    if (ebtler[k].category == "A") {
                        rnumber4a = rnumber4a + 1
                    }
                    if (ebtler[k].category == "B") {
                        rnumber4b = rnumber4b + 1
                    }
                }               
            }
    /*        if (!ebtler[k].history.includes("Received")) {
                if (ebtler[k].aircode.includes("ANS1")) {
                    snumber1 = snumber1 + 1
                    if (ebtler[k].category == "E") {
                        snumber1e = snumber1e + 1
                    }
                    if (ebtler[k].category == "A") {
                        snumber1a = snumber1a + 1
                    }
                    if (ebtler[k].category == "B") {
                        snumber1b = snumber1b + 1
                    }
                }
                if (ebtler[k].aircode.includes("ANS2")) {
                    snumber2 = snumber2 + 1
                    if (ebtler[k].category == "E") {
                        snumber2e = snumber2e + 1
                    }
                    if (ebtler[k].category == "A") {
                        snumber2a = snumber2a + 1
                    }
                    if (ebtler[k].category == "B") {
                        snumber2b = snumber2b + 1
                    }
                }
                if (ebtler[k].aircode.includes("ANS3")) {
                    snumber3 = snumber3 + 1
                    if (ebtler[k].category == "E") {
                        snumber3e = snumber3e + 1
                    }
                    if (ebtler[k].category == "A") {
                        snumber3a = snumber3a + 1
                    }
                    if (ebtler[k].category == "B") {
                        snumber3b = snumber3b + 1
                    }
                }
                if (ebtler[k].aircode.includes("ANS4")) {
                    snumber4 = snumber4 + 1
                    if (ebtler[k].category == "E") {
                        snumber4e = snumber4e + 1
                    }
                    if (ebtler[k].category == "A") {
                        snumber4a = snumber4a + 1
                    }
                    if (ebtler[k].category == "B") {
                        snumber4b = snumber4b + 1
                    }
                }  
            } */
            if ((ebtler[k].status.includes("Waiting") || ebtler[k].status.includes("Checked")) && (ebtler[k].history.includes("Received")) || ebtler[k].status.includes("Received")) {
                if (ebtler[k].aircode.includes("ANS1")) {
                    snumber1 = snumber1 + 1
                    if (ebtler[k].category == "E") {
                        snumber1e = snumber1e + 1
                    }
                    if (ebtler[k].category == "A") {
                        snumber1a = snumber1a + 1
                    }
                    if (ebtler[k].category == "B") {
                        snumber1b = snumber1b + 1
                    }
                }
                if (ebtler[k].aircode.includes("ANS2")) {
                    snumber2 = snumber2 + 1
                    if (ebtler[k].category == "E") {
                        snumber2e = snumber2e + 1
                    }
                    if (ebtler[k].category == "A") {
                        snumber2a = snumber2a + 1
                    }
                    if (ebtler[k].category == "B") {
                        snumber2b = snumber2b + 1
                    }
                }
                if (ebtler[k].aircode.includes("ANS3")) {
                    snumber3 = snumber3 + 1
                    if (ebtler[k].category == "E") {
                        snumber3e = snumber3e + 1
                    }
                    if (ebtler[k].category == "A") {
                        snumber3a = snumber3a + 1
                    }
                    if (ebtler[k].category == "B") {
                        snumber3b = snumber3b + 1
                    }
                }
                if (ebtler[k].aircode.includes("ANS4")) {
                    snumber4 = snumber4 + 1
                    if (ebtler[k].category == "E") {
                        snumber4e = snumber4e + 1
                    }
                    if (ebtler[k].category == "A") {
                        snumber4a = snumber4a + 1
                    }
                    if (ebtler[k].category == "B") {
                        snumber4b = snumber4b + 1
                    }
                }  
            }

            if (ebtler[k].status.includes("Closed+")) {
                if (ebtler[k].aircode.includes("ANS1")) {
                    cpnumber1 = cpnumber1 + 1
                    if (ebtler[k].category == "E") {
                        cpnumber1e = cpnumber1e + 1
                    }
                    if (ebtler[k].category == "A") {
                        cpnumber1a = cpnumber1a + 1
                    }
                    if (ebtler[k].category == "B") {
                        cpnumber1b = cpnumber1b + 1
                    }
                }
                if (ebtler[k].aircode.includes("ANS2")) {
                    cpnumber2 = cpnumber2 + 1
                    if (ebtler[k].category == "E") {
                        cpnumber2e = cpnumber2e + 1
                    }
                    if (ebtler[k].category == "A") {
                        cpnumber2a = cpnumber2a + 1
                    }
                    if (ebtler[k].category == "B") {
                        cpnumber2b = cpnumber2b + 1
                    }
                }
                if (ebtler[k].aircode.includes("ANS3")) {
                    cpnumber3 = cpnumber3 + 1
                    if (ebtler[k].category == "E") {
                        cpnumber3e = cpnumber3e + 1
                    }
                    if (ebtler[k].category == "A") {
                        cpnumber3a = cpnumber3a + 1
                    }
                    if (ebtler[k].category == "B") {
                        cpnumber3b = cpnumber3b + 1
                    }
                }
                if (ebtler[k].aircode.includes("ANS4")) {
                    cpnumber4 = cpnumber4 + 1
                    if (ebtler[k].category == "E") {
                        cpnumber4e = cpnumber4e + 1
                    }
                    if (ebtler[k].category == "A") {
                        cpnumber4a = cpnumber4a + 1
                    }
                    if (ebtler[k].category == "B") {
                        cpnumber4b = cpnumber4b + 1
                    }
                }  
            }
            else if (ebtler[k].status.includes("Closed-")) {
                if (ebtler[k].aircode.includes("ANS1")) {
                    cnnumber1 = cnnumber1 + 1
                    if (ebtler[k].category == "E") {
                        cnnumber1e = cnnumber1e + 1
                    }
                    if (ebtler[k].category == "A") {
                        cnnumber1a = cnnumber1a + 1
                    }
                    if (ebtler[k].category == "B") {
                        cnnumber1b = cnnumber1b + 1
                    }
                }
                if (ebtler[k].aircode.includes("ANS2")) {
                    cnnumber2 = cnnumber2 + 1
                    if (ebtler[k].category == "E") {
                        cnnumber2e = cnnumber2e + 1
                    }
                    if (ebtler[k].category == "A") {
                        cnnumber2a = cnnumber2a + 1
                    }
                    if (ebtler[k].category == "B") {
                        cnnumber2b = cnnumber2b + 1
                    }
                }
                if (ebtler[k].aircode.includes("ANS3")) {
                    cnnumber3 = cnnumber3 + 1
                    if (ebtler[k].category == "E") {
                        cnnumber3e = cnnumber3e + 1
                    }
                    if (ebtler[k].category == "A") {
                        cnnumber3a = cnnumber3a + 1
                    }
                    if (ebtler[k].category == "B") {
                        cnnumber3b = cnnumber3b + 1
                    }
                }
                if (ebtler[k].aircode.includes("ANS4")) {
                    cnnumber4 = cnnumber4 + 1
                    if (ebtler[k].category == "E") {
                        cnnumber4e = cnnumber4e + 1
                    }
                    if (ebtler[k].category == "A") {
                        cnnumber4a = cnnumber4a + 1
                    }
                    if (ebtler[k].category == "B") {
                        cnnumber4b = cnnumber4b + 1
                    }
                }  
            }

        }

        document.getElementById("tablo").className += "active";
        var x
        var dataexcel = new google.visualization.DataTable()
        dataexcel.addColumn('string', 'Ünite No.');
        dataexcel.addColumn('number', 'Toplam');
        dataexcel.addColumn('number', 'E');
        dataexcel.addColumn('number', 'A');
        dataexcel.addColumn('number', 'B');
        dataexcel.addColumn('number', 'Toplam');
        dataexcel.addColumn('number', 'E');
        dataexcel.addColumn('number', 'A');
        dataexcel.addColumn('number', 'B');
        dataexcel.addColumn('number', 'Toplam');
        dataexcel.addColumn('number', 'E');
        dataexcel.addColumn('number', 'A');
        dataexcel.addColumn('number', 'B');
        dataexcel.addColumn('number', 'Toplam');
        dataexcel.addColumn('number', 'E');
        dataexcel.addColumn('number', 'A');
        dataexcel.addColumn('number', 'B');
        dataexcel.addColumn('number', 'Toplam');
        dataexcel.addColumn('number', 'E');
        dataexcel.addColumn('number', 'A');
        dataexcel.addColumn('number', 'B');
        dataexcel.addColumn('number', 'Toplam');
        dataexcel.addColumn('number', 'E');
        dataexcel.addColumn('number', 'A');
        dataexcel.addColumn('number', 'B');
        dataexcel.addRows(5)
        // dataexcel.setCell(0,0, 'Ortak')
        dataexcel.setCell(0,0, 'Ünite 1')
        dataexcel.setCell(1,0, 'Ünite 2')
        dataexcel.setCell(2,0, 'Ünite 3')
        dataexcel.setCell(3,0, 'Ünite 4')
        dataexcel.setCell(4,0, 'Toplam')

        var options = {
       
            title : 'Yıllara Göre Dağılım',
            vAxis: {title: 'Onay/Bildirim Sayısı'},
            hAxis: {title: 'Yıllar'},
            seriesType: 'bars',
            series: {5: {type: 'line'}},
            isStacked: false,
            displayAnnotations: true,
            annotations: {
              textStyle: {
                  color: 'black',
                  fontSize: 11,
                               },
              alwaysOutside: true
          }
        };



        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        var chart1 = new google.visualization.PieChart(document.getElementById('chart_div1'));
        var table = new google.visualization.Table(document.getElementById('table_div'));

        google.visualization.events.addListener(table, 'ready', function () {
            var headerRow;
            var newRow;
            var newRow2;
        
            // get header row and clone to keep google chart style
            headerRow = document.getElementById('table_div').getElementsByTagName('THEAD')[0].rows[0];
            newRow = headerRow.cloneNode(true);
            newRow2 = headerRow.cloneNode(true);
        
            // modify new row to combine cells and add labels
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.deleteCell(newRow.cells.length - 1);
            newRow.cells[0].innerHTML = '';
            newRow.cells[1].colSpan = 4;
            newRow.cells[1].innerHTML = 'Gönderilen';
            newRow.cells[2].colSpan = 4;
            newRow.cells[2].innerHTML = 'Değerlendirilmesi Devam Eden';
            newRow.cells[3].colSpan = 4;
            newRow.cells[3].innerHTML = 'Yanıtlanan';
            newRow.cells[4].colSpan = 4;
            newRow.cells[4].innerHTML = 'Yanıtlanmayan';
            newRow.cells[5].colSpan = 4;
            newRow.cells[5].innerHTML = 'Olumlu Kapatılan';
            newRow.cells[6].colSpan = 4;
            newRow.cells[6].innerHTML = 'Olumsuz Kapatılan';

            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.deleteCell(newRow2.cells.length - 1);
            newRow2.cells[0].innerHTML = '';
            newRow2.cells[1].colSpan = 8;
            newRow2.cells[1].innerHTML = 'NDK';
            newRow2.cells[2].colSpan = 8;
            newRow2.cells[2].innerHTML = 'ANAŞ';
            newRow2.cells[3].colSpan = 8;
            newRow2.cells[3].innerHTML = 'EBT Kapanma Durumu';

        
            // insert new / cloned row
            document.getElementById('table_div').getElementsByTagName('THEAD')[0].insertBefore(newRow, headerRow);
            document.getElementById('table_div').getElementsByTagName('THEAD')[0].insertBefore(newRow2, newRow);


          });

          dataexcel.setCell(0,1, total1);
          dataexcel.setCell(1,1, total2);
          dataexcel.setCell(2,1, total3);
          dataexcel.setCell(3,1, total4);

          dataexcel.setCell(0,2, total1e);
          dataexcel.setCell(1,2, total2e);
          dataexcel.setCell(2,2, total3e);
          dataexcel.setCell(3,2, total4e);

          dataexcel.setCell(0,3, total1a);
          dataexcel.setCell(1,3, total2a);
          dataexcel.setCell(2,3, total3a);
          dataexcel.setCell(3,3, total4a);

          dataexcel.setCell(0,4, total1b);
          dataexcel.setCell(1,4, total2b);
          dataexcel.setCell(2,4, total3b);
          dataexcel.setCell(3,4, total4b);

          dataexcel.setCell(0,5, rnumber1);
          dataexcel.setCell(1,5, rnumber2);
          dataexcel.setCell(2,5, rnumber3);
          dataexcel.setCell(3,5, rnumber4);

          dataexcel.setCell(0,6, rnumber1e);
          dataexcel.setCell(1,6, rnumber2e);
          dataexcel.setCell(2,6, rnumber3e);
          dataexcel.setCell(3,6, rnumber4e);

          dataexcel.setCell(0,7, rnumber1a);
          dataexcel.setCell(1,7, rnumber2a);
          dataexcel.setCell(2,7, rnumber3a);
          dataexcel.setCell(3,7, rnumber4a);

          dataexcel.setCell(0,8, rnumber1b);
          dataexcel.setCell(1,8, rnumber2b);
          dataexcel.setCell(2,8, rnumber3b);
          dataexcel.setCell(3,8, rnumber4b);

          dataexcel.setCell(0,9, total1-snumber1);
          dataexcel.setCell(1,9, total2-snumber2);
          dataexcel.setCell(2,9, total3-snumber3);
          dataexcel.setCell(3,9, total4-snumber4);

          dataexcel.setCell(0,10, total1e-snumber1e);
          dataexcel.setCell(1,10, total2e-snumber2e);
          dataexcel.setCell(2,10, total3e-snumber3e);
          dataexcel.setCell(3,10, total4e-snumber4e);

          dataexcel.setCell(0,11, total1a-snumber1a);
          dataexcel.setCell(1,11, total2a-snumber2a);
          dataexcel.setCell(2,11, total3a-snumber3a);
          dataexcel.setCell(3,11, total4a-snumber4a);

          dataexcel.setCell(0,12, total1b-snumber1b);
          dataexcel.setCell(1,12, total2b-snumber2b);
          dataexcel.setCell(2,12, total3b-snumber3b);
          dataexcel.setCell(3,12, total4b-snumber4b);

          dataexcel.setCell(0,13, snumber1);
          dataexcel.setCell(1,13, snumber2);
          dataexcel.setCell(2,13, snumber3);
          dataexcel.setCell(3,13, snumber4);

          dataexcel.setCell(0,14, snumber1e);
          dataexcel.setCell(1,14, snumber2e);
          dataexcel.setCell(2,14, snumber3e);
          dataexcel.setCell(3,14, snumber4e);

          dataexcel.setCell(0,15, snumber1a);
          dataexcel.setCell(1,15, snumber2a);
          dataexcel.setCell(2,15, snumber3a);
          dataexcel.setCell(3,15, snumber4a);

          dataexcel.setCell(0,16, snumber1b);
          dataexcel.setCell(1,16, snumber2b);
          dataexcel.setCell(2,16, snumber3b);
          dataexcel.setCell(3,16, snumber4b);

          dataexcel.setCell(0,17, cpnumber1);
          dataexcel.setCell(1,17, cpnumber2);
          dataexcel.setCell(2,17, cpnumber3);
          dataexcel.setCell(3,17, cpnumber4);

          dataexcel.setCell(0,18, cpnumber1e);
          dataexcel.setCell(1,18, cpnumber2e);
          dataexcel.setCell(2,18, cpnumber3e);
          dataexcel.setCell(3,18, cpnumber4e);

          dataexcel.setCell(0,19, cpnumber1a);
          dataexcel.setCell(1,19, cpnumber2a);
          dataexcel.setCell(2,19, cpnumber3a);
          dataexcel.setCell(3,19, cpnumber4a);

          dataexcel.setCell(0,20, cpnumber1b);
          dataexcel.setCell(1,20, cpnumber2b);
          dataexcel.setCell(2,20, cpnumber3b);
          dataexcel.setCell(3,20, cpnumber4b);

          dataexcel.setCell(0,21, cnnumber1);
          dataexcel.setCell(1,21, cnnumber2);
          dataexcel.setCell(2,21, cnnumber3);
          dataexcel.setCell(3,21, cnnumber4);

          dataexcel.setCell(0,22, cnnumber1e);
          dataexcel.setCell(1,22, cnnumber2e);
          dataexcel.setCell(2,22, cnnumber3e);
          dataexcel.setCell(3,22, cnnumber4e);

          dataexcel.setCell(0,23, cnnumber1a);
          dataexcel.setCell(1,23, cnnumber2a);
          dataexcel.setCell(2,23, cnnumber3a);
          dataexcel.setCell(3,23, cnnumber4a);

          dataexcel.setCell(0,24, cnnumber1b);
          dataexcel.setCell(1,24, cnnumber2b);
          dataexcel.setCell(2,24, cnnumber3b);
          dataexcel.setCell(3,24, cnnumber4b);

for (let i=1; i<25; i++) {
    var toplam = dataexcel.getValue(0,i) + dataexcel.getValue(1,i) + dataexcel.getValue(2,i) + dataexcel.getValue(3,i)
    dataexcel.setCell(4,i, toplam);
}

var data = google.visualization.arrayToDataTable([
    ['Üniteler', 'EBT Sayısı'],
    ['Ünite 1', total1],
    ['Ünite 2', total2],
    ['Ünite 3', total3],
    ['Ünite 4', total4],
]);

  var options = {
    width: 600,
    height: 400,
    title: 'EBT Ünite Dağılımı',

  };

  var data1 = google.visualization.arrayToDataTable([
    ['Üniteler', 'EBT Sayısı'],
    ['Açık', rnumber1+rnumber2+rnumber3+rnumber4],
    ['Değerlendirme Aşamasında', snumber1+snumber2+snumber3+snumber4],
    ['Negatif Kapanmış', cnnumber1+cnnumber2+cnnumber3+cnnumber4],
    ['Pozitif Kapanmış', cpnumber1+cpnumber2+cpnumber3+cpnumber4],
]);

  var options1 = {
    width: 600,
    height: 400,
    title: 'EBT Durum Dağılımı',

  };

  var formatter = new google.visualization.NumberFormat(
    { pattern: '####'});
    for (let i=1;i<25;i++)
    {
        formatter.format(dataexcel,i); // Apply formatter to second column
    }


        table.draw(dataexcel, {showRowNumber: false, width: '100%', height: '100%'})
        chart.draw(data, options);
        chart1.draw(data1, options1);

        var projegrubu = localStorage.getItem("grup")

        return `
        <form style="text-align: center; padding-top:20px;">
        <h2 id="ozettablo">EBT Özet Tablosu</h2>
        </form>
    `  
        }
        
}

