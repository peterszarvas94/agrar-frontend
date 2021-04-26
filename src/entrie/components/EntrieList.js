import React from 'react';

import EntrieItem from './EntrieItem';

const EntrieList = (props) => {
    
    return (
        <>
            {(props.entries.length > 0) && props.entries.map((item) => (
                <EntrieItem
                    key={item.id}
                    id={item.id}
                    category={props.category}
                    name={item.name}
                    price={item.price}
                    type={item.type}
                />
            ))}
        </>
    );
}

export default EntrieList;