import React, { useEffect, useState } from "react";

import { useHttpClient } from '../../hooks/http-hook';
import CategoryItem from './CategoryItem';
import '../style/EntrieItem.css';

const EntrieItem = props => {
    
    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedEntrie, setLoadedEntrie] = useState();

    useEffect(() => {
        const fetchEntrie = async () => {
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_ROOT_URL + '/entries/' + props.entrie
            );
            setLoadedEntrie(responseData.entrie);
        } catch (err) {}
        };
        fetchEntrie();
    }, [sendRequest, props.entrie]);

    return (
        <>
            {isLoading && (
                <td>
                </td>
            )}
            {!isLoading && loadedEntrie && 
                <>
                    <td>{ loadedEntrie.name }</td>
                    <CategoryItem category={ loadedEntrie.category } />
                    <td>
                        { !loadedEntrie.type && '-'}
                        { loadedEntrie.type && '+' }
                        { (props.recordPrice !== undefined) && props.recordPrice }
                        { (props.recordPrice === undefined) && loadedEntrie.price }
                    </td>
                    <td className='invis'>
                        {setTimeout(()=> {
                            if (props.recordPrice !== undefined) {
                                props.price(props.recordPrice)
                            } else {
                                props.price(loadedEntrie.price)
                            }
                        }, 100)}
                        {setTimeout(() => {
                            props.type(loadedEntrie.type)
                        }, 100)}
                    </td>
                </>
            }
        </>
    );
}

export default EntrieItem;