import React, { useEffect, useState } from "react";

import { useHttpClient } from '../../hooks/http-hook';
import OperationItem from './OperationItem';

const OperationRow = props => {

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedOpeartion, setLoadedOpeartion] = useState();

    useEffect(() => {
        const fetchOperation = async () => {
          try {
            const responseData = await sendRequest(
                process.env.REACT_APP_ROOT_URL + '/operations/' + props.id
            );
    
            setLoadedOpeartion(responseData.operation);
          } catch (err) {}
        };
        fetchOperation();
      }, [sendRequest, props.id]);

      return (
        <>
            {isLoading && 
                <tr>
                </tr>
            }
            {!isLoading && loadedOpeartion && 
                <OperationItem
                  operation={loadedOpeartion}
                  field={props.field}  
                />
            }
        </>
    );
}

export default OperationRow;