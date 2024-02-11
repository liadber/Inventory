import React, {useEffect, useState} from "react";
import SelectableList from "../../components/SelectableList";
import axios from 'axios';
import {useCurrentProductTypeDispatch} from "../../context/CurrentProductTypeContext";

export default function ProductsTypesContainer() {
    const [productStatistics, setProductStatistics] = useState([]);
    const dispatch = useCurrentProductTypeDispatch();

    useEffect(() => {
        // Fetch product statistics
        axios.get('/products/statistics')
            .then(response => {
                setProductStatistics(response.data);
                const first: string = response.data[0].type;
                dispatch && dispatch({type: 'changed', nextProductType: first});
            })
            .catch(error => {
                console.error('Error fetching product statistics:', error);
            });
    }, []);

    function handleSelect(nextProductType: string) {
         dispatch && dispatch({type: 'changed', nextProductType})
         ;}

    return (
        <SelectableList onSelect={handleSelect}
                        listItems={productStatistics.map(({type, quantity}: { type: string, quantity: number }) => {
                            return {id: type, label: `${type} (${quantity})`};
                        })}></SelectableList>
    );
}
