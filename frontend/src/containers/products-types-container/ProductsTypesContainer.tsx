import React, {useEffect, useState} from "react";
import SelectableList from "../../components/list/SelectableList";

export default function ProductsTypesContainer() {
    const [currentType, setCurrentType] = useState(null);
    const [productStatistics, setProductStatistics] = useState([]);

    useEffect(() => {
        // Fetch product statistics
        fetch('http://localhost:8000/product/statistics')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log("disco!");
                setProductStatistics(data);
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
