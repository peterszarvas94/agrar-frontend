import React, {useEffect} from 'react';
import { Form } from 'react-bootstrap';

const DateSelectorEdit = (props) => {
    
    useEffect(() => {
        const setDefaultDate = () => {
            const dateSelector = document.getElementById('dateSelector');
            if (dateSelector && !dateSelector.value) {
                const date = new Date(props.date);
                const y = date.getFullYear();
                const m = date.getMonth() + 1
                const M = (m < 10) ? ('0' + m) : m;
                const d = date.getDate();
                const D = (d < 10) ? ('0' + d) : d; 
    
                dateSelector.value = y + '-' + M + '-' + D;
            }
        }
        setDefaultDate();
    });

    return (
        <Form.Control
            type='date'
        />
    );
}

export default DateSelectorEdit;