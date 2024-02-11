import React, {useEffect, useState} from "react";
import SelectableList from "../../components/SelectableList";
import axios from 'axios';
import {useCurrentProductTypeDispatch} from "../../context/CurrentProductTypeContext";

export default function ProductsTypesContainer() {
    const [productStatistics, setProductStatistics] = useState<{ type: string, quantity: number }[]>([]);
    const dispatch = useCurrentProductTypeDispatch();

    useEffect(() => {
        // Fetch product statistics
        axios.get('/products/statistics')
            .then(response => {
                const types: { type: string, quantity: number }[] = response.data.map((item: { type: string, quantity: string }) => {
                    return {type: item.type, quantity: parseInt(item.quantity)};
                });
                setProductStatistics(types);
                const first: { type: string, quantity: number } = types[0];
                dispatch && dispatch({type: 'changed', nextProductType: first});
            })
            .catch(error => {
                console.error('Error fetching product statistics:', error);
            });
    }, [dispatch]);

    function handleSelect(nextProductType: { type: string, quantity: number }) {
        dispatch && dispatch({type: 'changed', nextProductType})
        ;
    }

    return (
        <SelectableList onSelect={handleSelect}
                        listItems={productStatistics.map((productType: { type: string, quantity: number }) => {
                            return {item: productType, label: `${productType.type} (${productType.quantity})`};
                        })}></SelectableList>
    );
}
