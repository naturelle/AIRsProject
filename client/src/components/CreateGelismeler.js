import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import PuffLoader from "react-spinners/PuffLoader";


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    let options = {};
    var instances = M.FormSelect.init(elems, options);
  })

  document.addEventListener('DOMContentLoaded', function() {
    var tarihsec = document.querySelectorAll('.datepicker');
    let tarihler = {};
    var instances = M.Datepicker.init(tarihsec, tarihler);
  });


function CreateGelismeler() {

    const history = useHistory()
    const [files, setFiles] = useState({})
    const [pending,setPending] = useState(true)
 

    const [YIL, setYIL] = useState("")
    const [TARIH, setTARIH] = useState("")
    const [GELISMELER, setGELISMELER] = useState("")
    const [BELGEKODU, setBELGEKODU] = useState("")
    const [YETKIBELGESI, setYETKIBELGESI] = useState("")
    const [KARARMETNI, setKARARMETNI] = useState("")
    const [GGDRAPORU, setGGDRAPORU] = useState("") 
 
    const sendFile = (event) =>{
       
        let formData = new FormData()
        formData.append("avatar", files)
        fetch("http://localhost:3000/uploadImage", {
            method:"post",
            body: formData
        })
        .then((res)=>res.text())
        .then((resBody)=>{
            setPending(false)
            return { msg : `${resBody} Uploaded Successfully...!`}
        })
    }


    const PostGelisme = ()=>{
        
        fetch('/creategelisme', {
        method:"post",
        headers: {
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            YIL,
            TARIH,
            GELISMELER,
            BELGEKODU,
            YETKIBELGESI,
            KARARMETNI,
            GGDRAPORU
         
        })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else 
            {
               M.toast({html:"Gelişme eklendi", classes:"#66bb6a green lighten-1"})
                history.push('/gelismeler')
            }
        }).catch(err=>{
            console.log(err)
        })
    }


    return (
        <div style={{ maxWidth: '90%', margin: '5rem auto' }}>
        <div style={{ textAlign: 'center' }}>
            <h5> Yeni Gelişme</h5>
        </div>

        <div className=" input-field"
        style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}
        >
            <input  
            type="number" 
            placeholder="Yıl"
            value={YIL}
            onChange={(e)=>setYIL(e.target.value)}
            />

            <input  
            type="text" 
            placeholder="Tarih"
            value={TARIH}
            onChange={(e)=>setTARIH(e.target.value)}
            />

             <input  
            type="text" 
            placeholder="Gelişmeler"
            value={GELISMELER}
            onChange={(e)=>setGELISMELER(e.target.value)}
            />

            <input  
            type="text" 
            placeholder="Belge Kodu"
            value={BELGEKODU}
            onChange={(e)=>setBELGEKODU(e.target.value)}
            />

             <input  
            type="text" 
            placeholder="Yetki BElgesi"
           
            value={YETKIBELGESI}
            onChange={(e)=>setYETKIBELGESI(e.target.value)}
            />

<div >
<input type="file"  onChange={(e)=>setFiles(e.target.files[0]) } />
<button><svg onClick={sendFile} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></svg></button>								

</div>




            <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
            <span>Yetki Belgesi Yükle</span>
                <input type="file" id="file" filename="yetki"  onChange={(e)=>setFiles(e.target.files[0]) } />
            </div>
       
            <button onClick={sendFile} >Yetki Belgesi Yükle</button>
            </div>

            <input  
            type="text" 
            placeholder="Karar Metni"
            value={KARARMETNI}
            onChange={(e)=>setKARARMETNI(e.target.value)}
            />   

            <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Karar Metni Yükle</span>
                <input type="file"  name="karar" onChange={(e)=>setFiles(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>

            <input  
            type="text" 
            placeholder="GGD Raporu"
            value={GGDRAPORU}
            onChange={(e)=>setGGDRAPORU(e.target.value)}
            />       

            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>PostGelisme()} >
                 Kaydet
            </button>

        </div>   
        </div>
    )
}

export default CreateGelismeler
