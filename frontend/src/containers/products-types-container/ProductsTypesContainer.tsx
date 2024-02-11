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
                console.log(response.data);
                setProductStatistics(response.data);
            })
            .catch(error => {
                console.error('Error fetching product statistics:', error);
            });
    }, []);

    return (
        <SelectableList onSelect={(nextProductType) => dispatch && dispatch({type: 'changed', nextProductType})}
                        listItems={productStatistics.map(({type, quantity}: { type: string, quantity: number }) => {
                            return {id: type, label: `${type} (${quantity})`};
                        })}></SelectableList>
    );
}
