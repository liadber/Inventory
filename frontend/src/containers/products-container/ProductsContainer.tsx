import Table from "../../components/Table";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useCurrentProductType} from "../../context/CurrentProductTypeContext";

export interface PaginationModel {
    page: number,
    pageSize: number,
}

export default function ProductsContainer() {
    const [products, setProducts] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const currentProductType = useCurrentProductType();

    function fetchData() {

    }

    useEffect(() => {
        const queryParams = {
            sort: 'name:asc',
            page: `${paginationModel.page}`,
            filters: `${{}}`
        };

        // Convert query parameters object to URL-encoded query string
        const queryString = new URLSearchParams(queryParams).toString();

        currentProductType?.type !== '' &&
        axios.get(`/product/${currentProductType?.type}?${queryString}`)
            .then(response => {
                setProducts(response.data);
                console.log("done");
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            })
    }, [currentProductType, paginationModel.page]);

    return (
        <Table rows={products} columns={
            products.length > 0 ?
                Object.keys(products[0]).map((colName) => {
                    return ({
                        field: colName,
                        headerName: colName,
                        type: "singleSelect",
                        valueOptions: ['United Kingdom', 'Spain', 'Brazil']
                    });
                })
                :
                [{field: 'col2', headerName: 'Column 2', width: 150}]
        } rowCount={currentProductType ? currentProductType?.quantity : 0}
               paginationModel={paginationModel}
               handlePaginationModelChange={setPaginationModel}></Table>
    );
}
