import React, {useEffect, useState} from "react";
import SelectableList from "../components/SelectableList";
import axios from 'axios';
import {useCurrentProductStatisticsDispatch} from "../context/CurrentProductStatisticsContextProvider";
import {ProductStatistics} from "../types/ProductStatistics";

export default function ProductsStatisticsContainer() {
    const [productsStatisticsArray, setProductsStatisticsArray] = useState<ProductStatistics[]>([]);
    const dispatch = useCurrentProductStatisticsDispatch();

    useEffect(() => {
        // Fetch product statistics
        axios.get('/products/statistics')
            .then(response => {
                const productsStatisticsArray: ProductStatistics[] = response.data.map((item: { type: string, quantity: string }) => {
                    return {type: item.type, quantity: parseInt(item.quantity)};
                });
                setProductsStatisticsArray(productsStatisticsArray);
                const first: ProductStatistics = productsStatisticsArray[0];
                dispatch && dispatch({type: 'changed', nextProductStatistics: first});
            })
            .catch(error => {
                console.error('Error fetching product statistics:', error);
            });
    }, [dispatch]);

    function handleSelect(nextProductStatistics: ProductStatistics) {
        dispatch && dispatch({type: 'changed', nextProductStatistics});
    }

    return (
        <SelectableList onSelect={handleSelect}
                        listItems={productsStatisticsArray.map((productStatistics: ProductStatistics) => {
                            return {item: productStatistics, label: `${productStatistics.type} (${productStatistics.quantity})`};
                        })}></SelectableList>
    );
}
