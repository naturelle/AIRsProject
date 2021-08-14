import React,{useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from './App'

function Navbar() {

    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = ()=>{
       
        if (state) {
            return [
                <li key="1"><Link to="/taslak">Taslak EBT</Link></li>,
                <li key="2"><Link to="/createair" >Yeni EBT</Link></li>,
                <li key="3"><Link to="/createpersonel" >Yeni Personel</Link></li>,
                <li key="4"><Link to="/creategelisme" >Yeni Gelişme</Link></li>,
                <li key="5">
                    <button className="btn #c62828 red darken-3" style = {{
                     borderRadius:'8px'}}
                    onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/login')
                    }} >
                Çıkış
                    </button>
                </li>
            ]
        }
        else {
            return [
                <li key="6"><Link to="/personel">Personel Listesi</Link></li>,
                <li key="7"><Link to="/signup">Signup</Link></li>,
                <li key="8"><Link to="/login">Login</Link></li>,
                <li key="9"><Link to="/deneme">Deneme</Link></li>,
                <li key="10"><Link to="/material">MaterialTable</Link></li>,
                <li key="11"><Link to="/gelismeler">Önemli Gelişmeler</Link></li>,
            ]
        }
    }
    return (
       <nav >
       
               <div className="nav-wrapper white">
                   <Link to={state?"/":"/login"} className="brand-logo left">Tesisler Dairesi</Link>
                <ul id="nav-mobile" className="right">
                 {renderList()}
                </ul>

               </div>
           
       </nav>
    )
}

export default Navbar
