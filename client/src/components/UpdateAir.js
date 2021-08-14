import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
import ReactQuill from 'react-quill';
import QuillEditor from '../components/editor/QuillEditor'


function UpdateAir() {
//     const history = useHistory()
    
//     const [title, setTitle] = useState(res.title)
//     const [body, setBody] = useState(req.body)
//     const [files, setFiles] = useState([req.files])

//     const onEditorChange = (value)=>{
//         setBody(value)
//     }

//     const onFilesChange = (files) =>{
//         setFiles(files)
//     }
   
//     const PostAir = ()=>{
    
//         fetch(`/update/${airid}`, {
//         method:"post",
//         headers: {
//             "Content-Type":"application/json",
//             "Authorization": "Bearer "+localStorage.getItem("jwt")
//         },
//         body:JSON.stringify({
//            title,
//            body
//         })
        
//         }).then(res=>res.json())
//         .then(data=>{
           
//             if(data.error){
//                 M.toast({html:data.error, classes:"#c62828 red darken-3"})
//             }
//             else 
//             {
//                M.toast({html:"Air eklendi", classes:"#66bb6a green lighten-1"})
//                 history.push('/')
//             }
//         }).catch(err=>{
//             console.log(err)
//         })
//     }


//     return (
//         <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
//         <div style={{ textAlign: 'center' }}>
//             <h2  > Editor</h2>
//         </div>

//         <QuillEditor 
//         placeholder={"ebt oluştur"} 
//         onEditorChange={onEditorChange}
//         onFilesChange = {onFilesChange}
//         />

//         <div className="card input-field"
//         style={{
//             margin:"30px auto",
//             maxWidth:"500px",
//             padding:"20px",
//             textAlign:"center"
//         }}
//         >
//              <input 
//             type="text" 
//             placeholder="title"
//             value={title}
//             onChange={(e)=>setTitle(e.target.value)}
//             />

//             <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
//                 onClick={()=>PostAir()} >
//                 Ebt Kaydet
//             </button>

//         </div>
//         </div>
//     )
}

export default UpdateAir
