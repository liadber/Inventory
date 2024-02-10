import React, {useEffect, useState} from "react";
import SelectableList from "../../components/list/SelectableList";
import axios from 'axios';

export default function ProductsTypesContainer() {
    const [currentType, setCurrentType] = useState(null);
    const [productStatistics, setProductStatistics] = useState([]);

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
    }, [currentType]);

    return (
        <SelectableList listItems={productStatistics.map(({type, quantity}: { type: string, quantity: number }) => {
            return {id: type, label: `${type} (${quantity})`};
        })}></SelectableList>
    );
}
