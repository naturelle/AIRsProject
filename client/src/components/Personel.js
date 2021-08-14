import React,{useState,useEffect,useContext, useMemo} from 'react'
import {UserContext} from '../App'
import Table from "./Table"
import {
    useTable
    ,useSortBy
    ,usePagination
    ,useFilters
    ,useGlobalFilter
    ,useAsyncDebounce
  } from "react-table";
import {Link} from 'react-router-dom'

function Personel() {

    const columns = useMemo(
        () => [
          {
            columns: [
              {
                Header: "No",
                accessor: "NO"
              },
              {
                Header: "Daire",
                accessor: "DAIRE"
              },
              {
                Header: "Ad",
                accessor: "ADI"
              },
              {
                Header: "Soyad",
                accessor: "SOYADI"
              },
              {
                Header: "Ünvan",
                accessor: "UNVAN"
              },
              {
                Header: "Meslek",
                accessor: "MESLEK"
              },
              {
                Header: "Bölüm/Program",
                accessor: "BOLUM"
              },
              {
                Header: "Konu",
                accessor: "KONU"
              },
              {
                Header: "Proje Katılma",
                accessor: "KATILMA"
              },
              {
                Header: "Proje Ayrılma",
                accessor: "AYRILMA"
              }
            ]
          },
        ]
      );
    

    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)

    useEffect(()=>{
        fetch('/personel', {
            headers: {
                // "Authorization":"Bearer "+localStorage.getItem("jwt"),
                
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.personels)
            console.log(result.personels)
            console.log(columns)
        })

       
    },[])


   
 return (
        <div className="home">
<Table columns={columns} data={data} />
                  <div className="ebttablo" >
                
                        <table className="highlight responsive-table">
                        <thead>
                        <tr>
                             <th>No</th>
                             <th>Daire</th>
                             <th>Ad</th>
                             <th>Soyad</th>
                             <th>Ünvan</th>
                             <th>Meslek</th>
                             <th>Bölüm/Program</th>
                             <th>Konu</th>
                             <th>P. Katılma</th>
                             <th>P. Ayrılma</th>
                         </tr>
                         </thead>
                        
                         {
            data.map(item=>{
               return (
                  
                        <tbody key={item._id} >
                        <tr>
                            {/* <td> <Link to={"/airs/"+item._id}>{item.title+item._id}</Link></td>
                            <td ><Link to={"/profile/"+item.postedBy._id}><div dangerouslySetInnerHTML={{__html:item.body}}></div></Link></td> */}
                            <td>{item.NO}</td>
                            <td>{item.DAIRE}</td>
                            <td>{item.ADI}</td>
                            <td>{item.SOYADI}</td>
                            <td>{item.UNVAN}</td>
                            <td>{item.MESLEK}</td>
                            <td>{item.BOLUM}</td>
                            <td>{item.KONU}</td>
                            <td>{item.KATILMA}</td>
                            <td>{item.AYRILMA}</td>
                      
                         </tr>
                         </tbody>
                          )
                         })
                     }
                    </table>
               </div>
    
          
         </div>
     )}

export default Personel
