import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import {TextField  } from '@mui/material'
import Search from '@mui/icons-material/Search'

interface ISearchBarProps {
    placeholder: string;
    onSearch: (searchQuery: string) => void;
}

export default function SearchBar(props: ISearchBarProps) {
    const { placeholder, onSearch } = props
    const [value, setValue] = useState<string>("")

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => setValue(String(e.target.value))
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.code === "Enter") {
            onSearch(value);
        }
    }

    return (
        <TextField
        size='small' 
        onKeyDown={onKeyDown} 
        value={value}
        onChange={onChange} 
        placeholder={placeholder} 
        sx={{ fontSize: '11px', borderRadius: '20px', width: '600px', '&:focus-within::before': { boxShadow: 'none' }}} 
     
        type="search" 
       //startDecorator={<Search fontSize='small' />} 
        />
    )
}