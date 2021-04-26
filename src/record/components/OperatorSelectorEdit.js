import React, { useEffect, useState } from "react";

import { useHttpClient } from '../../hooks/http-hook';

const OperatorSelectorEdit = (props) => {

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedOpeartors, setLoadedOpeartors] = useState();

    useEffect(() => {
        const fetchOperators = async () => {
          try {
            const responseData = await sendRequest(
                process.env.REACT_APP_ROOT_URL + '/operators/'
            );
            setLoadedOpeartors(responseData.operators);
          } catch (err) {}
        };
        fetchOperators();
    }, [sendRequest]);

    useEffect(() => {
        const setDefaultOperator = () => {
            const operators = document.getElementById('operatorSelector');
            let optionToSelect;
            for(let option of operators.options) {
                if (option.getAttribute('id') === props.operator) {
                    optionToSelect = option;
                }
            }

            if(operators && optionToSelect) {
                operators.value = optionToSelect.value;
            }
        }

        setDefaultOperator();
    });

    return (
        <>
            {isLoading && (
                <option></option>
            )}
            {!isLoading && loadedOpeartors && 
                <>
                    {loadedOpeartors.map(item=> (
                        <option
                            key={item.id}
                            id={item.id}
                        >
                            {item.name}
                        </option>
                    ))}
                </>
            }
        </>
    );
}  

export default OperatorSelectorEdit;