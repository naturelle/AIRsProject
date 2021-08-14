import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'

function Login() {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()   
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
           return M.toast({html:"email adresini kontrol edin", classes:"#c62828 red darken-3"})
        }
        fetch("/login", {
            method:"post",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            // console.log(data)
            if(data.error) {
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else 
            {
                //in local storage, we can store only strings. data.user object olduğu için
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"giriş başarılı", classes:"#66bb6a green lighten-1"})
                history.push('/createair')
            }
        }).catch(err=>{
            console.log(err)
        })
    
    }


    return (
        <div style={{ maxWidth: '90%', margin: '5rem auto' }}>
            <div className=" auth-card ">
                <h3>Kullanıcı Giriş</h3>
                <input type="text" placeholder="email"
            value={email}
            onChange = {(e)=>setEmail(e.target.value)}
            />
            <input type="password" placeholder="password"
            value={password}
            onChange = {(e)=>setPassword(e.target.value)}
            />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>PostData()} >
               Giriş Yap
          </button>
            </div>
        </div>
    )
}

export default Login
