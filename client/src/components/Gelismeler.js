import React,{useState,useEffect,useContext, useMemo} from 'react'
import {useTable, useGlobalFilter, useFilters, useSortBy} from "react-table";
import { ColumnFilter } from './ColumnFilter';
import {GELISMELERCOLUMNS} from './gelismelercolumns'
import {GlobalFilter} from './GlobalFilter'
import PuffLoader from "react-spinners/PuffLoader";


const Gelismeler = () => {

    const [data,setData] = useState([])
    const [pending,setPending] = useState(true)

    const defaultColumn = useMemo(()=> {
        return {
            Filter: ColumnFilter
        }
    }, [])

    
    useEffect(()=>{
        fetch('/gelismeler', {
            headers: {
                               
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.gelismeler)
            setPending(false)
        })
    },[])

    const 
    {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
    } =  
    useTable({
        columns: GELISMELERCOLUMNS,
        data,
        defaultColumn
    },
    useFilters,
    useGlobalFilter,
    useSortBy)

    const { globalFilter } = state
   
 return (
<>
        {pending ?  <div className="app"> <PuffLoader color={'#36AAD7'} loading={pending} size={30} /> </div>
        :
        <div className="home">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table  {...getTableProps()}>
            <thead>
               {headerGroups.map((headerGroup)=>(
                   <tr {...headerGroup.getFooterGroupProps()}>
                       {headerGroup.headers.map((column)=>(
                               <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                               {column.render('Header')}
                               <span>
                                   {column.isSorted ? (column.isSortedDesc ?  ' 🔽' : ' 🔼'): ''}
                               </span>
                               <div>{column.canFilter ? column.render('Filter'): null}</div>
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
        
        </table>
        </div>
        }
        </>

)
}
export default Gelismeler
