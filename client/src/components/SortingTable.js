import React,{useState,useEffect,useContext, useMemo} from 'react'
import {UserContext} from '../App'
import {useTable, useSortBy} from "react-table";
import {COLUMNS} from './columns'


const SortingTable = () => {
    
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

        })
    },[])

// const Columns = useMemo(()=>COLUMNS,[])
// const Data = useMemo(()=>data,[])

/*     const tableInstance = useTable({
        columns: COLUMNS,
        data
    }) */

    const {getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow } = useTable({
        columns: COLUMNS,
        data
    },useSortBy)
    
    return (
        <table {...getTableProps()}>
            <thead>
               {headerGroups.map((headerGroup)=>(
                   <tr {...headerGroup.getFooterGroupProps()}>
                       {headerGroup.headers.map((column)=>(
                           <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                               {column.render('Header')}
                               <span>
                                   {column.isSorted ? (column.isSortedDesc ?  ' 🔽' : ' 🔼'): ''}
                               </span>
                           </th>
                       ))}
                   </tr>
               ))}
            </thead>

            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row=>{
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell=>{
                                       return <td {...cell.getCellProps()}>
                                           {cell.render('Cell')}
                                       </td>
                                    })
                                 }
                               
                           </tr>
                        )
                    })
                }  
            </tbody>
            <tfoot>
                {
                    footerGroups.map(footerGroup=>(
                        <tr {...footerGroup.getFooterGroupProps()}>
                            
                            {footerGroup.headers.map(column=>(
                                <td {...column.getFooterProps}>
                                    {column.render('Footer')}
                                </td>
                            ))
                            }       
                        </tr>
                    ))
                }
            </tfoot>
        </table>
    )
}

export default SortingTable
