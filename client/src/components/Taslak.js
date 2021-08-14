import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../App'
import {Link} from 'react-router-dom'

function Taslak() {

    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)

    useEffect(()=>{
        fetch('/myair', {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.myair)
            console.log(result.myair)
        })
    },[])

    const deleteAir = (deneme) =>{
        fetch(`/deleteair/${deneme}`,{
            method:"delete",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " +localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }


    return (
        <div style={{ maxWidth: '100%', margin: '5rem auto' }}>
        <div className="ebttablo" >
             <table>
             <thead style={{backgroundColor:'white' }}>
                        <tr>
                        <th>Air Code</th>
                            <th>Category</th>
                            <th>Relevant to</th>
                            <th>Title</th>
                            <th>Güncelle / Sil</th>
                        </tr>
                        </thead>
                        {
            data.map(item=>{
              return (
                        <tbody key={item._id}>
                        <tr>
                            <td>{item.airCode}</td>
                            <td>{item.category}</td>
                            <td>{item.relevant}</td>
                            <td>{item.title}</td>
                            <td>{item.projectGroup}</td>
                            <td>{new Date(item.dateofMade).toDateString( )}</td>
                            <td>{item.postedBy.name}</td>
                            <td>
                            <Link to={"/airs/"+item._id}>
{item.postedBy._id == state._id  &&  <i className="material-icons" style={{float:"left", cursor:"pointer"}}
  onClick={()=>deleteAir(item._id)}>edit</i> 
                               }
</Link> 
    {item.postedBy._id == state._id  &&  <i className="material-icons" style={{float:"left", cursor:"pointer"}}
  onClick={()=>deleteAir(item._id)}>delete</i> 
                               }
                            </td>
                        </tr>
                        </tbody>
                         )
                        })
                    }
                    </table>
              </div>
           
          
        </div>
    )
}

export default Taslak
