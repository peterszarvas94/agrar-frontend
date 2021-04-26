import React, { useEffect, useState } from "react";

import { useHttpClient } from '../../hooks/http-hook';
import OperationList from '../../operation/components/OperationList';

const Operations = props => {

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedField, setLoadedField] = useState();

    useEffect(() => {
        const fetchOperations = async () => {
        try {
            const responseData = await sendRequest(
               process.env.REACT_APP_ROOT_URL + '/fields/' + props.history.location.state.id
            );
    
            setLoadedField(responseData.field);
        } catch (err) {}
    };
	fetchOperations();
    }, [sendRequest, props.history.location.state.id]);

    return (
        <>
            {isLoading && (
                <h1>loading...</h1>
            )}
            {!isLoading && loadedField && 
                <OperationList
                    operations={loadedField.operations}
                    history={props.history}
                    field_id={props.history.location.state.id}
                    field_name={props.history.location.state.name}
                />
            }
        </>
    );
}

export default Operations;