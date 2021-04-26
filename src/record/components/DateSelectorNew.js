import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';

const DateSelectorNew = () => {

    useEffect(() => {
        const setDefaultDate = () => {
            let dateSelector = document.getElementById('dateSelector');
            
            if (dateSelector && !dateSelector.value) {
                const today = new Date();
                const y = today.getFullYear();
                const m = today.getMonth() + 1;
                const M = (m < 10) ? ('0' + m) : m;
                const d = today.getDate();
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

export default DateSelectorNew;