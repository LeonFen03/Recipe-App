import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectAutoWidth(props) {
    const {handleChange } = props;
  

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={handleChange}
          autoWidth
          label="Categories"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {props.selectItems.map((item) => {
                return (<MenuItem value={item}>{item}</MenuItem>)
            })}
        </Select>
      </FormControl>
    </div>
  );
}