import Table from "../../components/Table";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useCurrentProductType} from "../../context/CurrentProductTypeContext";


export default function ProductsContainer({children = null}: any) {
    const [products, setProducts] = useState([]);
    const currentProductType = useCurrentProductType();

    useEffect(() => {

        const queryParams = {
            sort: 'name:asc', // Example sorting by name in ascending order
            page: `${1}`, // Convert page number to string
            filters: `${{  }}` // Example filter by color
        };

        // Convert query parameters object to URL-encoded query string
        const queryString = new URLSearchParams(queryParams).toString();


        axios.get(`/product/${currentProductType}?${queryString}`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [currentProductType]);

    return (
        <>
            <Table rows={products} columns={
                products.length > 0 ?
                    Object.keys(products[0]).map((colName) => {
                        return ({
                            field: colName,
                            headerName: colName,
                            minWidth: 150,
                            type: "singleSelect",
                            valueOptions: ['United Kingdom', 'Spain', 'Brazil']
                        });
                    })
                    :
                    [{field: 'col2', headerName: 'Column 2', width: 150}]
            }></Table>
        </>
    );
}
