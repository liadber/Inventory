import React from 'react';
import "./App.scss";
import Section from "./components/section/Section";
import ProductsStatisticsContainer from "./containers/ProductsStatisticsContainer";
import axios from 'axios';
import ProductsContainer from "./containers/ProductsContainer";
import {CurrentProductStatisticsContextProvider} from "./context/CurrentProductStatisticsContextProvider";

function App() {

    axios.defaults.baseURL = 'http://localhost:8000';

    return (
        <>
            <CurrentProductStatisticsContextProvider>
                <Section>
                    <ProductsStatisticsContainer></ProductsStatisticsContainer>
                </Section>
                <Section>
                    <ProductsContainer></ProductsContainer>
                </Section>
            </CurrentProductStatisticsContextProvider>
        </>
    );
}

export default App;


