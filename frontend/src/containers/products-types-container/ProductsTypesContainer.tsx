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
                const first: { type: string, quantity: number } = {type: response.data[0].type, quantity: parseInt(response.data[0].quantity)};
                dispatch && dispatch({type: 'changed', nextProductType: first});
            })
            .catch(error => {
                console.error('Error fetching product statistics:', error);
            });
    }, [dispatch]);

    function handleSelect(nextProductType: { type: string, quantity: number  }) {
         dispatch && dispatch({type: 'changed', nextProductType})
         ;}

    return (
        <SelectableList onSelect={handleSelect}
                        listItems={productStatistics.map((productType: { type: string, quantity: number }) => {
                            return {item: productType, label:`${productType.type} (${productType.quantity})`};
                        })}></SelectableList>
    );
}
