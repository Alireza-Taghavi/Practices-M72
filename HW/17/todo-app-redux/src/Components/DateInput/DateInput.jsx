import * as React from 'react';
import TextField from '@mui/material/TextField';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

export default function DateInput({disabled}) {
    const [value, setValue] = React.useState(null);
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                disabled={disabled}
                label="Deadline"
                value={value}
                inputFormat="yyyy/dd/MM"
                onChange={(newValue) => {
                    setValue(newValue.toISOString().slice(0, 10));
                }}
                    renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}