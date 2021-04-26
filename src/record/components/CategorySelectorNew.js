import React, { useEffect, useState } from "react";

import { useHttpClient } from '../../hooks/http-hook';

const CategorySelectorNew = props => {

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedCategories, setLoadedCategories] = useState();
    const [defaultCategory, setDefaultCategory] = useState();

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const responseData = await sendRequest(
                process.env.REACT_APP_ROOT_URL + '/categories'
            );
            setLoadedCategories(responseData.categories);
          } catch (err) {}
        };
        fetchCategories();
    }, [sendRequest]);

    return (
        <>
            {isLoading && (
                <option></option>
            )}
            {!isLoading && loadedCategories && !defaultCategory && 
                <>
                    {setDefaultCategory(loadedCategories[0].id)}
                </>
            }
            {!isLoading && loadedCategories && defaultCategory &&
                <>
                    {loadedCategories.map(item => (
                        <option
                            id={item.id}
                            key={item.id}
                        >{item.name}</option>
                    ))}
                    {setTimeout(()=>{
                        props.onDefault(defaultCategory)
                    }, 100)}
                </>
            }
        </>
    );
}

export default CategorySelectorNew;
