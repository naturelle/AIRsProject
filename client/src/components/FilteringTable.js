import React,{useState,useEffect,useContext, useMemo} from 'react'
// import {UserContext} from '../App'
import {useTable, useGlobalFilter, useFilters, useSortBy} from "react-table";
import { ColumnFilter } from './ColumnFilter';
import {COLUMNS} from './columns'
import {GlobalFilter} from './GlobalFilter'
import PuffLoader from "react-spinners/PuffLoader";


const FilteringTable = () => {
    
    const [data,setData] = useState([])
    const [pending,setPending] = useState(true)
    // const {state,dispatch} = useContext(UserContext)

    const defaultColumn = useMemo(()=> {
        return {
            Filter: ColumnFilter
        }
    }, [])


    useEffect(()=>{
        fetch('/personel', {
            headers: {
                // "Authorization":"Bearer "+localStorage.getItem("jwt"),
                
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.personels)
            setPending(false)
        })
    },[])

// const Columns = useMemo(()=>COLUMNS,[])
// const Data = useMemo(()=>data,[])

/*     const tableInstance = useTable({
        columns: COLUMNS,
        data
    }) */

    const 
    {getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
 } =  useTable({
        columns: COLUMNS,
        data,
        defaultColumn
    },useFilters,
     useGlobalFilter,
     useSortBy)

    const { globalFilter } = state
    
    return (
        <>
        {pending ?  <div className="app"> <PuffLoader color={'#36AAD7'} loading={pending} size={30} /> </div>
        :
        <div className="home">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps()}>
            <thead>
               {headerGroups.map((headerGroup)=>(
                   <tr {...headerGroup.getFooterGroupProps()}>
                       {headerGroup.headers.map((column)=>(
                        //    <th {...column.getHeaderProps()}>
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

export default FilteringTable
