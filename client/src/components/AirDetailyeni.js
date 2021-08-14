import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {Link} from 'react-router-dom'
// import ReactQuill, { Quill }  from 'react-quill';
//import QuillEditor from '../components/editor/QuillEditor'
import Quill from 'quill'


function AirDetailyeni() {
    
    const [data,setData] = useState([])
 
    const {state,dispatch} = useContext(UserContext)
    const airId = window.location.href.replace("http://localhost:3000/airs/", "")
    const [value, setValue] = useState('');
     useEffect(()=>{
        fetch(`/airs/${airId}`, {
            
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.myair)
            
            console.log("deneme " + result.myair.body)
        })
    },[])

    
 
export default {
  name: "QuillEditor",
  mounted () {
    this.initQuill()
  },
  beforeDestroy () {
    this.quill = null
    delete this.quill
  },
  methods: {
    initQuill () {
      const quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: '#toolbar'
        }
      })
      this.quill = quill
      this.quill.getModule("toolbar").addHandler("image", this.uploadImageHandler)
    },
    uploadImageHandler () {
      const input = document.querySelector('#uploadImg')
      input.value = ''
      input.click()
    },
    async uploadImage (event) {
      const form = new FormData()
      form.append('upload_file', event.target.files[0])
      const url = await $.ajax(...)
      const addImageRange = this.quill.getSelection()
      const newRange = 0 + (addImageRange !== null ? addImageRange.index : 0)
      this.quill.insertEmbed(newRange, 'image', url)
      this.quill.setSelection(1 + newRange)
    }
  }
}




    return (
        
        // <div style={{ maxWidth: '700px', margin: '2rem auto' }}> 
        //   <div id="toolbar">
        //     <span class="ql-formats">
        //       <button class="ql-image"></button>
        //       <button class="ql-video"></button>
        //     </span>
        //   </div>

          <div id="editor">
            <p>Hello World!</p>
            <p>Some initial <strong>bold</strong> text</p>
          </div>

          /* <input id="uploadImg" type="file" style="display:none" 
          accept="image/png, image/jpeg, image/gif" onChange="uploadImage" />

       </div>
        */
    )
}

export default AirDetailyeni



