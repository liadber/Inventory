import React, {useEffect, useState} from "react";
import SelectableList from "../components/SelectableList";
import axios from 'axios';
import {
    useCurrentProductStatistics,
    useCurrentProductStatisticsDispatch
} from "../context/CurrentProductStatisticsContextProvider";
import {ProductStatistics} from "../types/ProductStatistics";

export default function ProductsStatisticsContainer() {
    const [productsStatisticsArray, setProductsStatisticsArray] = useState<ProductStatistics[]>([]);
    const dispatch = useCurrentProductStatisticsDispatch();
    const currentProductStatistics = useCurrentProductStatistics();

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

    function handleSelect(nextProductStatisticsKey: string) {
        dispatch && dispatch({
            type: 'changed',
            nextProductStatistics:
                productsStatisticsArray.find((productsStatistics) =>
                    productsStatistics.type === nextProductStatisticsKey)
        });
    }

    return (
        <SelectableList onSelect={handleSelect}
                        currentItemKey={currentProductStatistics?.type || ''}
                        listItems={productsStatisticsArray.map((productStatistics: ProductStatistics) => {
                            return {
                                key: productStatistics.type,
                                label: `${productStatistics.type} (${productStatistics.quantity})`
                            };
                        })}></SelectableList>
    );
}
