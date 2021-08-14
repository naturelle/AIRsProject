import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// import ReactQuill from 'react-quill';
// import QuillEditor from '../components/editor/QuillEditor'


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


function CreatePersonel() {

    const history = useHistory()

    const [NO, setNO] = useState("")
    const [ADI, setADI] = useState("")
    const [SOYADI, setSOYADI] = useState("")
    const [DAİRE, setDAİRE] = useState("")
    const [UNVAN, setUNVAN] = useState("")
    const [MESLEK, setMESLEK] = useState("")
    const [BOLUM, setBOLUM] = useState("")
    const [KONU, setKONU] = useState("")
    const [EMAIL, setEMAIL] = useState("")
    const [KATILMA, setKATILMA] = useState("")
    const [AYRILMA, setAYRILMA] = useState("")
    
    useEffect(()=>{
        fetch('/personel', {
            headers: {
                      
            }
        }).then(res=>res.json())
        .then(result=>{
           setNO(result.personels.length+1)
        })
    },[])

    const PostPersonel = ()=>{
        
        fetch('/createpersonel', {
        method:"post",
        headers: {
            "Content-Type":"application/json",
            // "Authorization": "Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            NO,
            ADI,
            SOYADI,
            DAİRE,
            UNVAN,
            MESLEK,
            BOLUM,
            KONU,
            EMAIL,
            KATILMA,
            AYRILMA
        })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else 
            {
               M.toast({html:"Personel eklendi", classes:"#66bb6a green lighten-1"})
                history.push('/personel')
            }
        }).catch(err=>{
            console.log(err)
        })
    }


    return (
        <div style={{ maxWidth: '90%', margin: '5rem auto' }}>
        <div style={{ textAlign: 'center' }}>
            <h5> Yeni Personel</h5>
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
            type="text" 
            placeholder="Ad"
            value={ADI}
            onChange={(e)=>setADI(e.target.value)}
            />

            <input  
            type="text" 
            placeholder="Soyad"
            value={SOYADI}
            onChange={(e)=>setSOYADI(e.target.value)}
            />

             <input  
            type="text" 
            placeholder="Daire"
            value={DAİRE}
            onChange={(e)=>setDAİRE(e.target.value)}
            />

            <input  
            type="text" 
            placeholder="Ünvan"
            value={UNVAN}
            onChange={(e)=>setUNVAN(e.target.value)}
            />

             <input  
            type="text" 
            placeholder="Meslek"
            value={MESLEK}
            onChange={(e)=>setMESLEK(e.target.value)}
            />

            <input  
            type="text" 
            placeholder="Bolum/Program"
            value={BOLUM}
            onChange={(e)=>setBOLUM(e.target.value)}
            />   

            <input  
            type="text" 
            placeholder="Konu"
            value={KONU}
            onChange={(e)=>setKONU(e.target.value)}
            />       

            <input  
            type="text" 
            placeholder="Email"
            value={EMAIL}
            onChange={(e)=>setEMAIL(e.target.value)}
            />  

               <input  
            type="text" 
            placeholder="katılma"
            value={KATILMA}
            onChange={(e)=>setKATILMA(e.target.value)}
            />
               <input  
            type="text" 
            placeholder="ayrılma"
            value={AYRILMA}
            onChange={(e)=>setAYRILMA(e.target.value)}
            />

 
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>PostPersonel()} >
                 Kaydet
            </button>

        </div> 
            
        </div>
    )
}

export default CreatePersonel
