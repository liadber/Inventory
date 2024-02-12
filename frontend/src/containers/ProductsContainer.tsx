import Table from "../components/Table";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useCurrentProductStatistics} from "../context/CurrentProductStatisticsContextProvider";
import {GridFilterModel, GridSortModel} from "@mui/x-data-grid";

export interface PaginationModel {
    page: number,
    pageSize: number,
}

export default function ProductsContainer() {
    const [products, setProducts] = useState([]);
    const [valuesDictionary, setValuesDictionary] = useState<{ [colName: string]: string[] }>();
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [queryOptions, setQueryOptions] = useState<{
        sortModel: GridSortModel,
        filterModel: GridFilterModel
    }>({sortModel: [], filterModel: {items: []}});
    const currentProductType = useCurrentProductStatistics();

    const handleSortModelChange: (sortModel: GridSortModel) => void = useCallback((sortModel: GridSortModel) => {
        setQueryOptions({...queryOptions, sortModel: [...sortModel]});
    }, []);

    useEffect(() => {
        if (currentProductType && currentProductType?.type && currentProductType?.type !== '') {
            const queryParams = {
                sort: queryOptions && queryOptions.sortModel[0] ? `${queryOptions.sortModel[0].field}:${queryOptions.sortModel[0].sort}` : 'name:asc',
                page: `${paginationModel.page}`
            };

            let filters = '';
            //adding filters
            if ((queryOptions.filterModel.items.length > 0)) {
                const actualFilters = queryOptions.filterModel.items
                    .filter((item) => item?.value !== undefined && item?.value?.length !== 0);
                if (actualFilters.length > 0) {
                    filters = `{${actualFilters.map(item =>
                        `"${item.field}":[
                        ${(item?.value?.length > 0) ?
                            item?.value?.map((v: any) => `"${v.toString()}"`).join(",")
                            : `"${item?.value}"`}]`).join(', ')}}`
                }
            }
            // Convert query parameters object to URL-encoded query string
            const queryString = new URLSearchParams(filters !== '' ? {
                ...queryParams,
                filters: filters
            } : queryParams).toString();

            axios.get(`/product/list/${currentProductType?.type}?${queryString}`)
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                })
        }
    }, [
        currentProductType?.type,
        paginationModel.page,
        queryOptions.sortModel,
        queryOptions.filterModel.items[0]?.value
    ]);

    useEffect(() => {
        if (currentProductType && currentProductType?.type && currentProductType?.type !== '') {
            axios.get(`/product/filter-values/${currentProductType?.type}`)
                .then(response => {
                    setValuesDictionary(response.data);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                })
        }
    }, [currentProductType?.type]);

    const handleFilterModelChange = React.useCallback((filterModel: GridFilterModel) => {
        // Here you save the data you need from the filter model
        setQueryOptions({...queryOptions, filterModel: {...filterModel}});
    }, []);
    return (
        <Table rows={products} columns={
            products.length > 0 ?
                Object.keys(products[0]).map((colName) => {
                    return ({
                        field: colName,
                        headerName: colName,
                        type: "singleSelect",
                        // valueOptions: ['Black', 'Silver', 'Brazil'],
                        valueOptions: valuesDictionary ? valuesDictionary[colName] : []

                    });
                })
                :
                []
        } rowCount={(currentProductType && currentProductType?.type !== '') ? currentProductType?.quantity : 0}
               paginationModel={paginationModel}
               onPaginationModelChange={setPaginationModel}
               onSortModelChange={handleSortModelChange}
               onFilterModelChange={handleFilterModelChange}
        ></Table>
    );
}
