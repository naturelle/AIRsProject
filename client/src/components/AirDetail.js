import React,{useState,useEffect,useContext} from 'react'
import axios from "axios";
import {UserContext} from '../App'
import {Link} from 'react-router-dom'
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
 

function AirDetail() {

    const history = useHistory()
    const [files, setFiles] = useState([])
    const [image,setImage] = useState("")

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [postedBy, setPostedBy] = useState("")
    // const [airCode, setAirCode] = useState("")
    const [category, setCategory] = useState("")
    const [dateofMade, setDateofMade] = useState("")
    const [relevant, setRelevant] = useState("")
    const [projectGroup, setProjectGroup] = useState("")
    const [expRespDate, setExpRespDate] = useState("")
    const [documentArea, setDocumentArea] = useState("")
    const [rationale, setRationale] = useState("")

    const {state,dispatch} = useContext(UserContext)
    const airCode = window.location.href.replace("http://localhost:3000/airs/", "")
    const [value, setValue] = useState('');
    const [updateMode, setUpdateMode] = useState(false);
    
 
     useEffect(()=>{
        fetch(`/airs/${airCode}`, {
            
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            
            setTitle(result.air.title)
            setBody(result.air.body)
            setRationale(result.air.rationale)
            // setAirCode(result.air.airCode)
            setCategory(result.air.category)
            setDateofMade(result.air.dateofMade)
          
            setRelevant(result.air.relevant)
            
            setProjectGroup(result.air.projectGroup)
            setExpRespDate(result.air.expRespDate)
            setDocumentArea(result.air.documentArea)
            

            const ebtsahibi =result.air.postedBy._id
        })
    },[])


    const onEditorChange = (body)=>{
        setBody(body)
    }

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

   
    const handleDelete = async () => {
        try {
          await axios.delete(`/airs/${airCode}`, {
            // data: { username: user.username },
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
          });
          window.location.replace("/");
        } catch (err) {}
      };
    
    const handleUpdate = async () => {
        try {
            fetch(`/airs/${airCode}`, {
              method:"put",
              headers: {
                  "Content-Type":"application/json",
                  "Authorization": "Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                title,
                body,
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
                   M.toast({html:"Air güncellendi", classes:"#66bb6a green lighten-1"})
                    history.push('/')
                }
            }).catch(err=>{
                console.log(err)
            })
            setUpdateMode(false)
          } catch (err) {
            console.log(err)
          }
      };


    return (

     
        <div style={{ maxWidth: '100%', margin: '1rem auto', textAlign: 'center' }}>
        <div style={{ textAlign: 'center', margin: '1rem auto' }}>
            <h3 > EBT Detay Sayfası </h3>
        </div>

     

        <div className=" input-field">
             <div className="input-field col s6" >
             <select>
                <option >Relevant to</option>
                <option >LWP</option>
                <option >CL</option>
                </select>
             </div>
              
             <div className="input-field col s6">
             <select>
                <option >Kategori</option>
                <option >E</option>
                <option >A</option>
                <option >B</option>
                <option >Y</option>
                <option >O</option>
                </select>
             </div>

             <div className="input-field col s6">
             <select>
                <option >Project Group</option>
                <option >E</option>
                <option >A</option>
                <option >B</option>
                <option >Y</option>
                <option >O</option>
                </select>
             </div>

            <div className="input-field col s6">
             <input  placeholder="Date of Air" type="text" className="datepicker"></input>
             </div>

             <div className="input-field col s6">
             <input  placeholder="Expected Res. Date" type="text" className="datepicker"></input>
             </div>

            <div className="input-field col s6">
            <input 
            type="text" 
            placeholder="AirCode"
            value={airCode}
            // onChange={(e)=>setAirCode(e.target.value)}
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

          <div className="text-field">  
        <CKEditor minheight="300px" editor={ ClassicEditor } placeholder="Air Body" 
         data={body} onChange={onBodyChange}

         config={{
            ckfinder:{
                uploadUrl:'/uploads'
            }  
         }   
         }
        />
        </div> 

        <div className="text-field">  
        <CKEditor editor={ ClassicEditor } placeholder="Rationale" 
         data={rationale} onChange={onRationaleChange}

         config={{
            ckfinder:{
                uploadUrl:'/uploads'
            }  
         }   
         }
        />
           </div> 

            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={handleUpdate} >
                Ebt Düzenle
            </button>
            <div className="singlePostEdit">
               
               
      
    {/*         {ebtsahibi == state._id  &&  <i className="material-icons" style={{float:"left", cursor:"pointer"}}
  onClick={()=>setUpdateMode(true)}>edit</i>  */}
                               
 <i className="material-icons" style={{float:"left", cursor:"pointer"}}
  onClick={()=>setUpdateMode(true)}>edit</i> 

   {/*  {ebtsahibi == state._id  &&  <i className="material-icons" style={{float:"left", cursor:"pointer"}}
  onClick={handleDelete}>delete</i> }  */}
               <i className="material-icons" style={{float:"left", cursor:"pointer"}}
  onClick={handleDelete}>delete</i>
               
              </div>
        
        </div>
    )
}

export default AirDetail

