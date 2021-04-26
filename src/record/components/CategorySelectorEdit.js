import React, { useEffect, useState } from "react";

import { useHttpClient } from '../../hooks/http-hook';

const CategorySelectorEdit = props => {

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedCategories, setLoadedCategories] = useState();
    const [loadedRecord, setLoadedRecord] = useState(0);
    const [loadedEntrie, setLoadedEntrie] = useState(0);
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

        const fetchRecord = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/records/' + props.record
                );
                setLoadedRecord(responseData.record);
            } catch(err) {}
        }
        if(loadedRecord === 0) {
            fetchRecord();
        }

        const fetchEntrie = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/entries/' + loadedRecord.entrie
                );
                setLoadedEntrie(responseData.entrie);
            } catch(err) {}
        }
        if(loadedRecord !== 0 && loadedEntrie === 0) {
            fetchEntrie();
        }

        /*if(loadedEntrie !==0) {
            console.log({
                entrie: loadedEntrie
            });
        }*/

    }, [sendRequest, props.record, loadedRecord.entrie, loadedEntrie, loadedRecord]);

    //console.log(props);
    return (
        <>
            {isLoading && (
                <option></option>
            )}
            {!isLoading && loadedCategories && !defaultCategory && (loadedEntrie === 0) &&
                <>
                </>
            }
            {!isLoading && loadedCategories && !defaultCategory && (loadedEntrie !== 0) &&
                <>
                    {setDefaultCategory(loadedEntrie.category)}
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

export default CategorySelectorEdit;
