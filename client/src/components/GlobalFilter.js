import React, {useState} from 'react'
import {useAsyncDebounce} from 'react-table'
import SearchIcon from '@material-ui/icons/Search';

export const GlobalFilter = ({filter, setFilter}) => {
    const [value, setValue] = useState(filter)

    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 100)

    return (
        <span>
           {''}
            <input type="text"  value={value || ''}
            onChange={(e) => {
                setValue(e.target.value)
                onChange(e.target.value)
            }}
            ></input>
         
        </span>
    )
}
