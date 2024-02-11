import Table from "../components/Table";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useCurrentProductStatistics} from "../context/CurrentProductStatisticsContextProvider";
import {GridSortModel} from "@mui/x-data-grid";

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
    const [queryOptions, setQueryOptions] = useState<{ sortModel: GridSortModel }>();
    const currentProductType = useCurrentProductStatistics();

    useEffect(() => {
        if (currentProductType && currentProductType?.type && currentProductType?.type !== '') {
            const queryParams = {
                sort: queryOptions ? `${queryOptions.sortModel[0].field}:${queryOptions.sortModel[0].sort}` : 'name:asc',
                page: `${paginationModel.page}`,
                filters: `${{}}`
            };

            // Convert query parameters object to URL-encoded query string
            const queryString = new URLSearchParams(queryParams).toString();

            axios.get(`/product/${currentProductType?.type}?${queryString}`)
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                })
        }
    }, [currentProductType?.type, paginationModel.page, queryOptions]);

    const handleSortModelChange: (sortModel: GridSortModel) => void = useCallback((sortModel: GridSortModel) => {
        setQueryOptions({sortModel: [...sortModel]});
    }, []);

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
                []
        } rowCount={(currentProductType && currentProductType?.type !== '') ? currentProductType?.quantity : 0}
               paginationModel={paginationModel}
               onPaginationModelChange={setPaginationModel}
               onSortModelChange={handleSortModelChange}
        ></Table>
    );
}
