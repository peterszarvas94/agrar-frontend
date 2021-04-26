import React, { useEffect, useState } from "react";

import { useHttpClient } from '../../hooks/http-hook';

const CategoryItem = props => {

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedCategory, setLoadedCategory] = useState();

    useEffect(() => {
        const fetchCategory = async () => {
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_ROOT_URL + '/categories/' + props.category
            );
            setLoadedCategory(responseData.category);
        } catch (err) {}
        };
        fetchCategory();
    }, [sendRequest, props.category]);

    return (
        <>
            {isLoading && (
                <td>
                </td>
            )}
            {!isLoading && loadedCategory && 
                <td>
                    { loadedCategory.name }
                </td>
            }
        </>
    );

}

export default CategoryItem;