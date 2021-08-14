// import * as React from 'react';
// import { DataGrid } from '@material-ui/data-grid';
// import { useDemoData } from '@material-ui/x-grid-data-generator';

// export default function BasicToolbarFilteringGrid() {
//   const { data } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 1000,
//     maxColumns: 6,
//   });

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid pagination {...data} />
//     </div>
//   );
// }




// // import * as React from 'react';
// // import { DataGrid, GridToolbar } from '@material-ui/data-grid';
// // import { useDemoData } from '@material-ui/x-grid-data-generator';

// // const riceFilterModel = {
// //   items: [{ columnField: 'commodity', operatorValue: 'contains', value: 'rice' }],
// // };

// // export default function BasicToolbarFilteringGrid() {
// //   const { data } = useDemoData({
// //     dataSet: 'Commodity',
// //     rowLength: 100,
// //     maxColumns: 6,
// //   });

// //   return (
// //     <div style={{ height: 400, width: '100%' }}>
// //       <DataGrid
// //         {...data}
// //         filterModel={riceFilterModel}
// //         components={{
// //           Toolbar: GridToolbar,
// //         }}
// //       />
// //     </div>
// //   );
// // }
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

// Function for global search
/* function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div style={{ padding: 10, border: "1px solid", marginTop: 20 }}>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0"
        }}
      />
    </div>
  );
} */
// Global search function ended



// Function for default filters
/* function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
} */
// Default filters function Ended


// Function for select filter
/* function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
} */
// Select filter function end



// Function for slider range filter
/* function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <span>{filterValue || min}</span>{" "}
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  );
} */
// Slider filter function end

// Function for Min-Max range filter
/* function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id }
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: "flex"
      }}
    >
      <input
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1]
          ]);
        }}
        placeholder={`Min (${min})`}
        style={{
          width: "70px",
          marginRight: "0.5rem"
        }}
      />
      to
      <input
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined
          ]);
        }}
        placeholder={`Max (${max})`}
        style={{
          width: "70px",
          marginLeft: "0.5rem"
        }}
      />
    </div>
  );
} */
// Min-Max range filter function end



/* // Table function. It creates UI.
function Table({columns, data}) {
  
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );
  
  

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  // Render the UI for your table
  return (
    <>
      
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      
      <table
        {...getTableProps()}
        border={1}
        style={{
          borderCollapse: "collapse",
          width: "100%",
          margin: "auto"
        }}
      >
        
        <thead>
          {headerGroups.map((group) => (
            <tr {...group.getHeaderGroupProps()}>
              {group.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : column.canSort
                          ? "⏺"
                          : ""}
                      </span>
                    </div>
                  
                  
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  
                </th>
              ))}
            </tr>
          ))}
        </thead>
        

        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        
        <tfoot>
          {footerGroups.map((group) => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <td {...column.getFooterProps()}>
                  {column.render("Footer")}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
        
      </table>
      
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      
    </>
  );
} */
// Table function component end

// App component start
function BasicToolbarFilteringGrid() {
 
  // Columns array. This array contains your table headings and accessors which maps keys from data array
  const columns = useMemo(
    () => [
      {
        columns: [
          {
           id:1,
            Header: "No",
            accessor: "NO"
          },
          {
            id:2,
            Header: "Daire",
            accessor: "DAIRE"
          },
          {
            id:3,
            Header: "Ad",
            accessor: "ADI"
          },
          {
            id:4,
            Header: "Soyad",
            accessor: "SOYADI"
          },
          {
            id:5,
            Header: "Ünvan",
            accessor: "UNVAN"
          },
          {
            id:6,
            Header: "Meslek",
            accessor: "MESLEK"
          },
          {
            id:7,
            Header: "Bölüm/Program",
            accessor: "BOLUM"
          },
          {
            id:8,
            Header: "Konu",
            accessor: "KONU"
          },
          {
            id:9,
            Header: "Proje Katılma",
            accessor: "KATILMA"
          },
          {
            id:10,
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
      })

  },[])

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}



  
 /*  return (
    <Table columns={columns} data={data} />
  ); */

// App component end

export default BasicToolbarFilteringGrid;