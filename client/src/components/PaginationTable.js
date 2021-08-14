import React,{useState,useEffect,useContext, useMemo} from 'react'
// import {UserContext} from '../App'
import {useTable, useGlobalFilter, useFilters, useSortBy, usePagination} from "react-table";
import { ColumnFilter } from './ColumnFilter';
import {COLUMNS} from './columns'
import {GlobalFilter} from './GlobalFilter'


const PaginationTable = () => {
    
    const [data,setData] = useState([])
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
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    statePage,
    prepareRow,
    state,
    setGlobalFilter
 } =  useTable({
        columns: COLUMNS,
        data,
        defaultColumn
    },useFilters,
     useGlobalFilter,
     useSortBy,
     usePagination)

    const { globalFilter } = state
    const {pageIndex} = statePage
    
    return (
        <>
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
                    page.map(row=>{
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
        <div>
            <span>
                Sayfa{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong> {' '}
            </span>
            <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Önceki</button>
            <button onClick={()=>nextPage()} disabled={!canNextPage}>Sonraki</button>
        </div>
        </>
    )
}

export default PaginationTable
