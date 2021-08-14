import React, {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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


function CreateAir() {

    useEffect(() => {
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);
          })
        
      }, [])

      
    const history = useHistory()
    const [files, setFiles] = useState([])
    const [image,setImage] = useState("")

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    // const [postedBy, setPostedBy] = useState("")
    const [airCode, setAirCode] = useState("")
    const [category, setCategory] = useState("")
    const [dateofMade, setDateofMade] = useState(new Date())
    const [relevant, setRelevant] = useState("Relevant to")
    const [projectGroup, setProjectGroup] = useState("")
    const [expRespDate, setExpRespDate] = useState(new Date())
    const [documentArea, setDocumentArea] = useState("")
    const [rationale, setRationale] = useState("")
 


    const onChangeFile = e =>{
        setFiles (e.target.files[0])
    }

    const onBodyChange = (event,editor)=>{
        const data = editor.getData()
        setBody(data)
    }
    const onRationaleChange = (event,editor)=>{
        const data = editor.getData()
        setRationale(data)
    }

    const onFilesChange = (files) =>{
        setFiles(files)
    }
   
    const PostAir = ()=>{
    
        fetch('/createair', {
        method:"post",
        headers: {
            "Content-Type":"application/json",
            "Authorization": "Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
           title,
           body,
        //    postedBy:req.user,
           airCode,
           category,
           dateofMade,
           relevant,
           projectGroup,
           expRespDate,
           documentArea,
           rationale,
        })
        
        }).then(res=>res.json())
        .then(data=>{
           
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else 
            {
               M.toast({html:"Air eklendi", classes:"#66bb6a green lighten-1"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        
        <div style={{ maxWidth: '90%', margin: '5rem auto' }}>
        <div style={{ textAlign: 'center' }}>
            <h3 > Yeni EBT Oluştur</h3>
        </div>

<div>
        <div className=" input-field">
            {/* <label for="rel">Relevant To</label> */}
             <div className="input-field col s6" id="rel" >
                <select className="selector"   value={relevant} onChange={(e)=>setRelevant(e.target.value)}>
                <option disabled selected>Relevant to</option>
                <option >LWP</option>
                <option >CL</option>
                </select>
             </div>
              


             <div className="input-field col s6">
             <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value="" disabled selected>Kategori</option>
                <option >E</option>
                <option >A</option>
                <option >B</option>
                <option >Y</option>
                <option >O</option>
                </select>
             </div>

             <div className="input-field col s6">
             <select value={projectGroup} onChange={(e)=>setProjectGroup(e.target.value)}>
                <option disabled selected>Project Group</option>
                <option >E</option>
                <option >A</option>
                <option >B</option>
                <option >Y</option>
                <option >O</option>
                </select>
             </div>

            <div className="input-field col s6">
             <DatePicker  selected={dateofMade} onChange={(date) => setDateofMade(date)} 
             placeholder="Date of Air" 
             isClearable
             />
             </div>

             <div className="input-field col s6">
             <DatePicker selected={expRespDate} onChange={(date)=>setExpRespDate(date)}
               placeholder="Expected Res. Date"   isClearable
               />
             </div>

            <div className="input-field col s6">
            <input 
            type="text" 
            placeholder="AirCode"
            value={airCode}
            onChange={(e)=>setAirCode(e.target.value)}
            />
            </div>

            <input  
            type="text" 
            placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
                
          <textarea id="textarea1" className="materialize-textarea"  placeholder="documentArea" value={documentArea} onChange={(e)=>setDocumentArea(e.target.value)}></textarea>
      
          </div> 

        <CKEditor minheight="300px" editor={ ClassicEditor } placeholder="Air Body" 
         data={body} onChange={onBodyChange}

         config={{
            ckfinder:{
                uploadUrl:'/uploads'
            }
            
         }   
         }
        />

        <CKEditor editor={ ClassicEditor } placeholder="Rationale" 
         data={rationale} onChange={onRationaleChange}

         config={{
            ckfinder:{
                uploadUrl:'/uploads'
            }
            
         }   
         }
        />
   
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>PostAir()} >
                    Ebt Kaydet
            </button>
         </div>
        </div>
    )
}

export default CreateAir
