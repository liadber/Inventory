import React from 'react';
import "./App.scss";
import Section from "./components/section/Section";
import {GridColDef, GridRowsProp} from "@mui/x-data-grid";
import ProductsTypesContainer from "./containers/products-types-container/ProductsTypesContainer";
import axios from 'axios';
import ProductsContainer from "./containers/products-container/ProductsContainer";
import {CurrentProductTypeContextProvider} from "./context/CurrentProductTypeContext";

function App() {

    axios.defaults.baseURL = 'http://localhost:8000';

    const rows: GridRowsProp = [
        {id: 1, col1: 'Hello', col2: 'World'},
        {id: 2, col1: 'DataGridPro', col2: 'is Awesome'},
        {id: 3, col1: 'MUI', col2: 'is Amazing'}];
    const columns: GridColDef[] = [
        {
            field: 'col1',
            headerName: 'Column 1',
            width: 150,
            type: "singleSelect",
            valueOptions: ['United Kingdom', 'Spain', 'Brazil']
        },
        {field: 'col2', headerName: 'Column 2', width: 150},
    ];

    return (
        <>
            <CurrentProductTypeContextProvider>
                <Section>
                    <ProductsTypesContainer></ProductsTypesContainer>
                </Section>
                <Section bigger={true}>
                    <ProductsContainer></ProductsContainer>
                </Section>
            </CurrentProductTypeContextProvider>
        </>
    );
}

export default App;


