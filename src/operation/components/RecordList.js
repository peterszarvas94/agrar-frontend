import React from 'react';

import RecordItem from './RecordItem';

const RecordList = props => {
    return (
        <>
            {props.records.map(item => (
                <RecordItem
                    key={item}
                    operation={props.operation}
                    record={item}/>
            ))}
        </>
    );
}

export default RecordList;