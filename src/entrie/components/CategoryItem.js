import React, { useEffect, useState } from "react";

import { useHttpClient } from '../../hooks/http-hook';
import EntrieList from './EntrieList';

const CategoryItem = (props) => {
    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedEntries, setLoadedEntries] = useState();

    useEffect(() => {
        const fetchEntries = async () => {
          try {
            const responseData = await sendRequest(
                process.env.REACT_APP_ROOT_URL + '/entries/category/' + props.category
            );
    
            setLoadedEntries(responseData.entries);
          } catch (err) {}
        };
        fetchEntries();
    }, [sendRequest, props.category]);

    return(
        <>
            {isLoading && (
                <tr>
                    <td>Loading...</td>
                </tr>
            )}
            {!isLoading && loadedEntries && 
                <EntrieList category={props.category} entries={loadedEntries} />
            }
        </>
    );
}

export default CategoryItem;