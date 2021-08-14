import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

function Signup() {

const history = useHistory()   
const [name,setName] = useState("")
const [password,setPassword] = useState("")
const [email,setEmail] = useState("")

const PostData = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
       return M.toast({html:"email adresini kontrol edin", classes:"#c62828 red darken-3"})
    }
    fetch("/signup", {
        method:"post",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            password,
            email
        })
    }).then(res=>res.json())
    .then(data=>{
        if(data.error) {
            M.toast({html:data.error, classes:"#c62828 red darken-3"})
        }
        else 
        {
            M.toast({html:data.message, classes:"#66bb6a green lighten-1"})
            history.push('/login')
        }
    }).catch(err=>{
        console.log(err)
    })

}

    return (
        <div style={{ maxWidth: '90%', margin: '5rem auto' }}>
        <div className=" auth-card input-field">
            <h3>Yeni Kullanıcı</h3>

            <input type="text" placeholder="name"
            value={name}
            onChange = {(e)=>setName(e.target.value)}/>

            <input type="text" placeholder="email"
            value={email}
            onChange = {(e)=>setEmail(e.target.value)}
            />
            <input type="password" placeholder="password"
            value={password}
            onChange = {(e)=>setPassword(e.target.value)}
            />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>PostData()} >
           Kayıt
      </button>
        </div>
    </div>
    )
}

export default Signup
